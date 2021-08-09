const PI2 = Math.PI * 2;
const g = 9.8;

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
        this.particles = [];

        for (let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                i
            );
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

        // this.ctx.

    }
}

class GlowParticle {
    constructor(number) {
        this.number = number;
        this.timer = 0;
        this.length = 500 + this.number * 30;
        this.theta = PI2 / 4 + PI2 / 6;
        this.m = 10;
        this.vtheta = 0;
    }

    animate(ctx, stageWidth, stageHeight) {

        this.timer += 0.01;

        this.theta += this.vtheta;
        let atheta = g / this.length * Math.sin(this.theta) / 10;
        this.vtheta += atheta;


        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.moveTo(stageWidth / 2, stageHeight / 4);
        ctx.lineTo(stageWidth / 2 + this.length * Math.cos(this.theta - PI2 / 4),
            stageHeight / 4 + this.length * Math.sin(this.theta - PI2 / 4));
        ctx.lineTo(stageWidth / 2 + this.length * Math.cos(this.theta - PI2 / 4) + 3,
            stageHeight / 4 + this.length * Math.sin(this.theta - PI2 / 4));
        ctx.moveTo(stageWidth / 2 + 3, stageHeight / 4);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = 'orange';
        ctx.arc(stageWidth / 2 + this.length * Math.cos(this.theta - PI2 / 4),
            stageHeight / 4 + this.length * Math.sin(this.theta - PI2 / 4),
            40, 0, PI2, false);
        ctx.fill();
        ctx.closePath();
    }
}

window.onload = () => {
    new App();
}