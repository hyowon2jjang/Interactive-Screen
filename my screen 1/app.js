const COLORS = [
    { r: 45, g: 74, b: 227 },
    //{ r: 250, g: 255, b: 89 },
    //{ r: 255, g: 104, b: 248 },
    { r: 44, g: 209, b: 252 },
    //{ r: 54, g: 233, b: 84 },
    { r: 40, g: 130, b: 230 }
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

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 500;
        this.particles = [];
        this.maxRadius = 90;
        this.minRadius = 30;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.picelRatio, this.pixelRatio);

        this.createParticles();
    }
    createParticles() {
        let curColor = 0;
        this.particles = [];

        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * (this.stageHeight + 600) - 300,
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
        this.distance = 200;

        this.vx = - Math.random() * 2 + 1;
        this.vy = Math.random() * 3 + 1;
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

        if (this.y > stageHeight + 300) {
            this.y = -300;
        }
        if (mouse.click) {
            if (Math.abs(this.x - mouse.x) <= this.distance + this.radius) {
                if (Math.abs(this.y - mouse.y) <= this.distance + this.radius) {
                    this.vx = (this.x - mouse.x) / 30;
                    this.vy += (this.y - mouse.y) / 400;
                }
            }
        }
        if (this.vx > 2) {
            this.vx -= 0.1
        }
        if (this.vy > 3) {
            this.vy -= 0.1
        }
        if (this.vy < 0.9) {
            this.vy += 0.05
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