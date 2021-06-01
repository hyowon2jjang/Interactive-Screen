const PI2 = Math.PI * 2

stageWidth = document.body.clientWidth;
stageHeight = document.body.clientHeight;

const radiusT = [];
const radiusC = [30, 40, 50, 50, 40];
const pos = [];
let thetas = [];
let vthetas = [];
let atheta = [];
const speed = [];

for (let i = 0; i < 5; i++) {
    radiusT[i] = 30;
    //radiusC[i] = 40;
    thetas[i] = -PI2 * i / 36;
    vthetas[i] = 0;
    speed[i] = 90 - 10 * i;
}

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
            const item = new Tail();
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

class Tail {
    constructor() {
    }

    animate(ctx, stageWidth, stageHeight) {

        pos[0] = [1 / 4 * stageWidth, 1 / 2 * stageHeight, 3 / 4 * stageWidth];

        for (let i = 1; i < thetas.length; i++) {
            pos[i] = [];
            pos[i][0] = pos[i - 1][0] + radiusT[i] * Math.cos(thetas[i]);
            pos[i][1] = pos[i - 1][1] + radiusT[i] * Math.sin(thetas[i]);
            pos[i][2] = pos[i - 1][2] + radiusT[i] * Math.cos(thetas[i]);
        }

        for (let i = 0; i < thetas.length; i++) {

            thetas[i] += vthetas[i];
            atheta[i] = Math.cos(thetas[i]) / 60000 * speed[i] / 90;
            vthetas[i] += atheta[i];

            ctx.beginPath();
            if (i == thetas.length - 1) {
                ctx.fillStyle = '#ECE1CB'
            } else {
                ctx.fillStyle = '#ED960B';
            }
            ctx.arc(pos[i][0], pos[i][1], radiusC[i], 0, PI2);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            if (i == thetas.length - 1) {
                ctx.fillStyle = '#9f796c'
            } else {
                ctx.fillStyle = '#bd9a82';
            }
            ctx.arc(pos[i][2], pos[i][1], radiusC[i], 0, PI2);
            ctx.fill();
        }
    }
}

window.onload = () => {
    new App();
}