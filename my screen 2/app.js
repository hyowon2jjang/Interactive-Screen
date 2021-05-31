const COLORS = [
    { r: 159, g: 142, b: 111 },
    { r: 188, g: 182, b: 163 },
    { r: 102, g: 93, b: 76 },
    { r: 222, g: 205, b: 167 },
    { r: 231, g: 228, b: 208 },
    { r: 203, g: 204, b: 174 }
];

const PI2 = Math.PI * 2
stageWidth = document.body.clientWidth;
stageHeight = document.body.clientHeight;

const mouse = { x: stageWidth / 2, y: stageHeight / 2, click: false };

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.totalParticles = 1000;
        this.particles = [];
        this.maxRadius = 90;
        this.minRadius = 30;


        window.requestAnimationFrame(this.animate.bind(this));


        window.addEventListener('resize', this.resize(this), false);
        this.resize();

        this.isLoaded = false;
        this.imgPos = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

        this.image = new Image();
        this.image.src = 'painting.jpg';
        this.image.onload = () => {
            this.isLoaded = true;
            this.drawImage();
        };
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.picelRatio, this.pixelRatio);

        this.createParticles();

        if (this.isLoaded) {
            this.drawImage();
        }
    }

    drawImage() {
        const stageRatio = this.stageWidth / this.stageHeight;
        const imgRatio = this.image.width / this.image.height;

        this.imgPos.width = this.stageWidth;
        this.imgPos.height = this.stageHeight;

        if (imgRatio > stageRatio) {
            this.imgPos.width = Math.round(
                this.image.width * (this.stageHeight / this.image.height)
            );
            this.imgPos.x = Math.round(
                (this.stageWidth - this.imgPos.width) / 2
            );
        } else {
            this.imgPos.height = Math.round(
                this.image.height * (this.stageWidth / this.image.width)
            );
            this.imgPos.x = Math.round(
                (this.stageHeight - this.imgPos.height) / 2
            );
        }

        this.ctx.drawImage(
            this.image,
            0, 0,
            this.image.width, this.image.height,
            this.imgPos.x, this.imgPos.y,
            this.imgPos.width, this.imgPos.height,
        );
        console.log('hello3');
    }

    createParticles() {
        let curColor = 0;
        this.particles = [];

        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * (this.stageHeight + 400) - 200,
                Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
                COLORS[curColor],
                mouse.click,
            );

            if (++curColor >= COLORS.length) {
                curColor = 0;
            }
            this.particles[i] = item;
        }
    }

    animate() {
        this.canvas.addEventListener('mousedown', function (event) {
            mouse.click = true;
            mouse.x = event.x;
            mouse.y = event.y;
        });

        this.canvas.addEventListener('mouseup', function () {
            mouse.click = false;
        })

        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}


class GlowParticle {
    constructor(x, y, radius, rgb, click) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;
        this.click = click;
        this.distance = 150;

        this.vx = - Math.random() * 2 + 1;
        this.vy = - Math.random() * 3 - 1;
    }

    animate(ctx, stageWidth, stageHeight) {

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.vx *= -1;
            this.x += 10;
        } else if (this.x > stageWidth) {
            this.vx *= -1;
            this.x -= 10;
        }

        if (this.y < - 200) {
            this.y = stageHeight + 200;
        }
        if (mouse.click) {
            if (Math.abs(this.x - mouse.x) <= this.distance + this.radius) {
                if (Math.abs(this.y - mouse.y) <= this.distance + this.radius) {
                    this.vx = (this.x - mouse.x) / 30;
                    this.vy += (this.y - mouse.y) / 400;
                }
            }
        }
        if (this.vx > 2 + Math.random() * 0.5) {
            this.vx -= 0.05
        }
        if (this.vy < -3 + Math.random() * 0.5) {
            this.vy += 0.05
        }
        if (this.vy > -0.9 + Math.random() * 0.5) {
            this.vy -= 0.05
        }

        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`;
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
        ctx.fill();
    }
}

window.onload = () => {
    new App();
}