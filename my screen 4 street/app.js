const COLORS = [
    { r: 124, g: 55, b: 152 },
    { r: 181, g: 100, b: 227 },
];
const PI2 = Math.PI * 2

stageWidth = document.body.clientWidth;
stageHeight = document.body.clientHeight;

const level = [
    1 / 7 * stageHeight,
    2 / 7 * stageHeight,
    3 / 7 * stageHeight,
    4 / 7 * stageHeight,
    5 / 7 * stageHeight,
    6 / 7 * stageHeight
];

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 10;
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
            const item = new Car(
                -100,
                level[Math.floor(Math.random() * level.length)],//1 / 2 * this.stageHeight + 1 / 2 * Math.random() * this.stageHeight,
                0,
                COLORS[curColor],
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


class Car {
    constructor(x, y, level, rgb) {
        this.x = x;
        this.y = y;
        this.level = level;
        this.rgb = rgb;

        this.vx = Math.random() * 2 + 2;
        this.vy = 0;
    }

    animate(ctx, stageWidth, stageHeight) {

        if (this.x > stageWidth + 200) {
            this.x = -200;
        }

        if (this.level = 0) {
            this.x += this.vx;
        }

        ctx.fillStyle = `rgb(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 1)`;
        ctx.beginPath();
        ctx.moveTo(this.x - 15, this.y);
        ctx.lineTo(this.x - 30, this.y);
        ctx.quadraticCurveTo(this.x - 40, this.y - 30, this.x, this.y - 25);
        ctx.lineTo(this.x, this.y - 50);
        ctx.lineTo(this.x + 40, this.y - 50);
        ctx.lineTo(this.x + 40, this.y - 25);
        ctx.quadraticCurveTo(this.x + 80, this.y - 30, this.x + 70, this.y);
        ctx.lineTo(this.x + 45, this.y);
        ctx.arcTo(this.x + 15, this.y, this.x + 45, this.y, 15);
        ctx.lineTo(this.x - 15, this.y);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, 0);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.moveTo(this.x + 40, this.y);
        ctx.arc(this.x + 40, this.y, 10, 0, 2 * Math.PI, 0);
        ctx.fill();

    }
}

window.onload = () => {
    new App();
}