const COLORS = [
    { r: 124, g: 55, b: 152 },
    { r: 181, g: 100, b: 227 },
];
const PI2 = Math.PI * 2

stageWidth = document.body.clientWidth;
stageHeight = document.body.clientHeight;

const level = [
    100,
    200
]

const mouse = { x: stageWidth / 2, y: stageHeight / 2, click: false };

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 3;
        this.particles = [];

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        if (mouse.click) {
            window.requestAnimationFrame(this.animate.bind(this));
        }
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
                Math.random() * this.stageWidth * 3 / 4 + this.stageWidth / 8,
                this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
                COLORS[curColor],
            );
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

        if (mouse.click) {
            window.requestAnimationFrame(this.animate.bind(this));
            this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

            for (let i = 0; i < this.totalParticles; i++) {
                const item = this.particles[i];
                item.animate(this.ctx, this.stageWidth, this.stageHeight);
            }
        }
    }
}

class GlowParticle {
    constructor(x, y, radius, rgb) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;

        this.vy = 4.5 + Math.random() * 0.5;
        this.vx = Math.random() * 2 - 1;
    }

    animate(ctx, stageWidth, stageHeight) {

        this.x += this.vx;
        this.y -= this.vy;
        this.vy -= 0.01 + Math.random() * 0.004;

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y + 14, 10, 0, 2 * Math.PI, 0);
        ctx.fill();

        if (this.vy <= 0.1) {
        }
    }
}

class Particle {
    constructor(number, size, color) {

    }
}

window.onload = () => {
    new App();
}