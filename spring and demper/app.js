const PI2 = Math.PI * 2

let t = 0;
let dt = 0.01;
let y = 0;
let v = 0;
let a = 0;
let F = 0;
let pos = [];
const C = 0.7;
const K = 1.56;
const m = 1;
const g = 9.8;



class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 1;
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
            const item = new object();
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

class object {
    constructor() {
    }

    animate(ctx, stageWidth, stageHeight) {

        if (t == 0) {
            y = stageHeight / 2
        }
        t += dt;
        F = -K * y - C * v + m * g;
        a = F / m;
        v += a * dt;
        y += v * dt;
        pos.push([t * 100, y + stageHeight / 4])

        for (let i = 0; i < pos.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = 'black'
            ctx.arc(pos[i][0], pos[i][1], 10, 0, PI2);
            ctx.fill();
            ctx.closePath();
        }
    }
}

window.onload = () => {
    new App();
}