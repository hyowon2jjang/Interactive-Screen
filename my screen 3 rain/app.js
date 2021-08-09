const COLORS = [
    { r: 124, g: 55, b: 152 },
    { r: 181, g: 100, b: 227 },
];
const PI2 = Math.PI * 2
stageWidth = document.body.clientWidth;
stageHeight = document.body.clientHeight;

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 500;
        this.particles = [];

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
                Math.random() * 3 / 7 + 6 / 7
            );

            if (++curColor >= COLORS.length) {
                curColor = 0;
            }
            this.particles[i] = item;
        }
    }

    animate() {

        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}


class GlowParticle {
    constructor(x, y, radius, rgb, size) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rgb = rgb;
        this.distance = 200;
        this.size = size;

        this.vy = Math.random() * 5 + 5;
    }

    animate(ctx, stageWidth, stageHeight) {

        this.y += this.vy;

        if (this.y > stageHeight + 300) {
            this.y = -300;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`;
        ctx.moveTo(this.x, this.y - 2 * this.size);
        ctx.lineTo(this.x + 6 * this.size, this.y + 14 * this.size);
        ctx.arc(this.x, this.y + 14 * this.size, 6 * this.size, 0, Math.PI, 0);
        ctx.lineTo(this.x, this.Y - 2 * this.size);
        ctx.fill();
    }
}

window.onload = () => {
    new App();
}