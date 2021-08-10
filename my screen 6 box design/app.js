const PI2 = Math.PI * 2

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticlesx = 5;
        this.totalParticlesy = 5;
        this.minsize = 50;
        this.maxsize = 100;
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
        for (let i = 0; i < this.totalParticlesx; i++) {
            this.particles[i] = [];
        }

        for (let i = 0; i < this.totalParticlesx; i++) {
            for (let j = 0; j < this.totalParticlesy; j++) {
                const item = new GlowParticle(
                    this.stageWidth / (this.totalParticlesx + 1) * (i + 1),
                    this.stageHeight / (this.totalParticlesy + 1) * (j + 1),
                    this.minsize,
                    this.maxsize
                );
                this.particles[i][j] = item;
            }
        }
    }

    animate() {

        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticlesx; i++) {
            for (let j = 0; j < this.totalParticlesy; j++) {
                const item = this.particles[i][j];
                item.animate(this.ctx, this.stageWidth, this.stageHeight);
            }
        }
    }
}

class GlowParticle {
    constructor(x, y, min, max) {
        this.x = x;
        this.y = y;
        this.min = min;
        this.max = max;
        this.timer = 0;
    }

    animate(ctx, stageWidth, stageHeight) {

        this.timer += 0.03;
        this.size = Math.abs(Math.sin(this.timer)) * (this.max - this.min) + this.min;
        this.theta = this.timer / 3

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.moveTo(this.x + this.size * Math.cos(this.theta), this.y + this.size * Math.sin(this.theta));
        ctx.lineTo(this.x + this.size * Math.cos(this.theta + PI2 / 4), this.y + this.size * Math.sin(this.theta + PI2 / 4));
        ctx.lineTo(this.x + this.size * Math.cos(this.theta + PI2 / 2), this.y + this.size * Math.sin(this.theta + PI2 / 2));
        ctx.lineTo(this.x + this.size * Math.cos(this.theta + PI2 * 3 / 4), this.y + this.size * Math.sin(this.theta + PI2 * 3 / 4));
        ctx.fill();
    }
}

window.onload = () => {
    new App();
}