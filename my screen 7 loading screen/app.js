const PI2 = Math.PI * 2

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 10;
        this.minsize = 5;
        this.maxsize = 20;
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
                this.stageWidth / 2,
                this.stageHeight / 2,
                this.minsize,
                this.maxsize,
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

    }
}

class GlowParticle {
    constructor(x, y, min, max, number) {
        this.x = x;
        this.y = y;
        this.min = min;
        this.max = max;
        this.number = number;
        this.timer = 0;
    }

    animate(ctx, stageWidth, stageHeight) {

        this.timer += 0.013;
        this.size = Math.abs(Math.sin(this.timer)) * (this.max - this.min) + this.min;
        this.theta = this.timer * this.number / 3

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x + 100 * Math.cos(this.theta),
            this.y + 100 * Math.sin(this.theta),
            this.size, 0, PI2, false);
        ctx.fill();
    }
}

window.onload = () => {
    new App();
}