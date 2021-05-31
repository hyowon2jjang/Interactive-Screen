const PI2 = Math.PI * 2

stageWidth = document.body.clientWidth;
stageHeight = document.body.clientHeight;

function distance(x1, y1, x2, y2) {
    const x = x2 - x1;
    const y = y2 - y1;
    const length = Math.sqrt(x * x + y * y);
    return length;
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
            const item = new Car(
                i * PI2 / 10,
                400,
                0,
                30
            );
            this.particles[i] = item;
        }
    }

    animate() {

        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);


        for (let i = 0; i < this.totalParticles; i++) {
            let j = i + 1;
            if (j == this.totalParticles) { j = 0 };
            const item = this.particles[i];
            const item1 = this.particles[j];

            var gap = item1.theta - item.theta;
            if (j == 0) gap = item1.theta + PI2 - item.theta;

            var k = 1;
            if (i == 0) k = 0;

            item.animate(this.ctx, this.stageWidth, this.stageHeight, gap, k);
        }

    }
}


class Car {
    constructor(theta, radius, level, size) {
        this.theta = theta;
        this.radius = radius;
        this.level = level;
        this.size = size;
        this.x = 1 / 2 * stageWidth + radius * Math.cos(theta);
        this.y = 1 / 2 * stageHeight + radius * Math.sin(theta);
        this.vtheta = Math.random() * 0.0004 + 0.0006;
    }

    animate(ctx, stageWidth, stageHeight, gap, color) {


        this.x = 1 / 2 * stageWidth + this.radius * Math.cos(this.theta);
        this.y = 1 / 2 * stageHeight + this.radius * Math.sin(this.theta);

        this.vtheta += 0.0000005;
        if (this.vtheta < 0.00001) {
            this.vtheta += 0.00001
        }
        if (gap < 0.2) {
            this.vtheta -= 0.0004
        }
        if (gap < 0.4) {
            this.vtheta -= 0.000004
        }
        if (gap > 1) {
            this.vtheta += 0.000001
        }
        if (this.vtheta > 0.02) {
            this.vtheta = 0.02
        }
        if (this.vtheta < 0) {
            this.vtheta = 0.0001
        }
        this.theta += this.vtheta;

        ctx.beginPath();
        if (color == 0) {
            ctx.fillStyle = 'red';
        } else {
            ctx.fillStyle = 'lightblue';
        }
        ctx.moveTo(this.x + this.size * Math.cos(PI2 / 3 + this.theta),
            this.y + this.size * Math.sin(PI2 / 3 + this.theta));
        ctx.lineTo(this.x + this.size * Math.cos(Math.PI * 1 / 3 + this.theta),
            this.y + this.size * Math.sin(Math.PI * 1 / 3 + this.theta));
        ctx.lineTo(this.x - this.size * Math.cos(PI2 / 3 + this.theta),
            this.y - this.size * Math.sin(PI2 / 3 + this.theta));
        ctx.lineTo(this.x - this.size * Math.cos(Math.PI * 1 / 3 + this.theta),
            this.y - this.size * Math.sin(Math.PI * 1 / 3 + this.theta));
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'lightgreen'
        ctx.moveTo(stageWidth / 2, stageHeight / 2);
        ctx.arc(stageWidth / 2, stageHeight / 2, 350, 0, 2 * Math.PI, 0);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'lightgreen'
        ctx.moveTo(0, 0);
        ctx.lineTo(stageWidth, 0);
        ctx.lineTo(stageWidth, stageHeight);
        ctx.arc(stageWidth / 2, stageHeight / 2, 450, 0, 2 * Math.PI, true);
        ctx.lineTo(stageWidth, stageHeight)
        ctx.lineTo(0, stageHeight);
        ctx.lineTo(0, 0);
        ctx.fill();
    }

}

window.onload = () => {
    new App();
}