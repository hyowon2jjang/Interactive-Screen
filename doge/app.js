const PI2 = Math.PI * 2
let t = 0;
let dt = 0.1;

stageWidth = document.body.clientWidth;
stageHeight = document.body.clientHeight;

const radiusT = [];
const radiusC = [30, 40, 50, 40, 30];
const pos = [];
let thetas = [];
let vthetas = [];
let atheta = [];
const speed = [];

const radiusT1 = [];
const radiusC1 = [30, 40, 50, 40, 30];
const pos1 = [];
let thetas1 = [];
let vthetas1 = [];
let atheta1 = [];
const speed1 = [];

for (let i = 0; i < 5; i++) {
    radiusT[i] = 30;
    //radiusC[i] = 40;
    thetas[i] = -PI2 * i / 36;
    vthetas[i] = 0;
    speed[i] = 90 + 10 * i;
}

for (let i = 0; i < 5; i++) {
    radiusT1[i] = 30;
    //radiusC[i] = 40;
    thetas1[i] = -PI2 * i / 36;
    vthetas1[i] = 0;
    speed1[i] = 90 + 10 * i;
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

        t += dt;

        pos[0] = [1 / 4 * stageWidth, 1 / 2 * stageHeight];
        pos1[0] = [3 / 4 * stageWidth, 1 / 2 * stageHeight];

        for (let i = 1; i < thetas.length; i++) {
            pos[i] = [];
            pos1[i] = [];
            pos[i][0] = pos[i - 1][0] + radiusT[i] * Math.cos(thetas[i]);
            pos[i][1] = pos[i - 1][1] + radiusT[i] * Math.sin(thetas[i]);

            pos1[i][0] = pos1[i - 1][0] + radiusT1[i] * Math.cos(thetas1[i]);
            pos1[i][1] = pos1[i - 1][1] + radiusT1[i] * Math.sin(thetas1[i]);
        }

        for (let i = 0; i < thetas.length; i++) {

            atheta[i] = Math.cos(t * PI2 / 1000 + PI2 / 4) / 600 * speed[i] / 90;
            vthetas[i] += atheta[i] * dt;
            thetas[i] += vthetas[i] * dt;

            thetas1[i] += vthetas1[i];
            atheta1[i] = Math.cos(thetas1[i]) / 60000 * speed1[i] / 90;
            vthetas1[i] += atheta1[i];

            ctx.beginPath();
            if (i == thetas.length - 1) {
                ctx.fillStyle = '#ECE1CB'
            } else {
                ctx.fillStyle = '#ED960B';
            }
            ctx.arc(pos[i][0], pos[i][1], radiusC[i], 0, PI2);
            ctx.fill();
            ctx.closePath();

            this.draw1(ctx, i)
        }
    }

    draw1(ctx, i) {
        ctx.beginPath();
        if (i == thetas1.length - 2) {
            ctx.fillStyle = 'white'
        } else {
            ctx.fillStyle = 'black';
        }
        ctx.arc(pos1[i][0], pos1[i][1], radiusC1[i], 0, PI2);
        ctx.fill();
    }
}

window.onload = () => {
    new App();
}