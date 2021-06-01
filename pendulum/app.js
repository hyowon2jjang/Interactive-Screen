const PI2 = Math.PI * 2
const g = 9.8

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
                3 * PI2 / 8,
                0,
                300,
                100,
                2,
                2
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

class Car {
    constructor(theta1, theta2, radius1, radius2, size1, size2) {
        this.theta1 = theta1;
        this.theta2 = theta2;
        this.radius1 = radius1;
        this.radius2 = radius2;
        this.size1 = size1;
        this.size2 = size2;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = this.x1 + radius2 * Math.cos(this.theta2);
        this.y2 = this.y1 + radius2 * Math.sin(this.theta2);
        this.vtheta1 = 0;
        this.vtheta2 = 0;
        this.m1 = 1;
    }

    animate(ctx, stageWidth, stageHeight) {

        this.x1 = 1 / 2 * stageWidth + this.radius1 * Math.cos(this.theta1);
        this.y1 = 1 / 2 * stageHeight + this.radius1 * Math.sin(this.theta1);
        this.x2 = this.x1 + this.radius2 * Math.cos(this.theta2);
        this.y2 = this.y1 + this.radius2 * Math.sin(this.theta2);

        this.theta1 += this.vtheta1;
        let atheta1 = Math.cos(this.theta1) / 3000 //* this.m1 * g;
        this.vtheta1 += atheta1;

        this.theta2 += this.vtheta2;
        let atheta2 = Math.cos(this.theta2) / 7000//* this.m1 * g ;
        this.vtheta2 += atheta2;

        ctx.beginPath();
        ctx.fillStyle = 'lightblue';
        ctx.moveTo(this.x1 + this.size1 * Math.cos(PI2 / 3 + this.theta1),
            this.y1 + this.size1 * Math.sin(PI2 / 3 + this.theta1));
        ctx.lineTo(this.x1 - this.size1 * Math.cos(Math.PI * 1 / 3 + this.theta1),
            this.y1 - this.size1 * Math.sin(Math.PI * 1 / 3 + this.theta1));
        ctx.lineTo(stageWidth / 2 - this.size1 * Math.cos(Math.PI * 1 / 3 + this.theta1),
            stageHeight / 2 - this.size1 * Math.sin(Math.PI * 1 / 3 + this.theta1));
        ctx.lineTo(stageWidth / 2 + this.size1 * Math.cos(PI2 / 3 + this.theta1),
            stageHeight / 2 + this.size1 * Math.sin(PI2 / 3 + this.theta1));
        ctx.fill();

        this.animate1(ctx, stageWidth, stageHeight)
    }
    animate1(ctx, stageWidth, stageHeight) {
        ctx.beginPath();
        ctx.fillStyle = 'lightgreen';
        ctx.moveTo(this.x2 + this.size2 * Math.cos(PI2 / 3 + this.theta2),
            this.y2 + this.size2 * Math.sin(PI2 / 3 + this.theta2));
        ctx.lineTo(this.x2 - this.size2 * Math.cos(Math.PI * 1 / 3 + this.theta2),
            this.y2 - this.size2 * Math.sin(Math.PI * 1 / 3 + this.theta2));
        ctx.lineTo(this.x1 - this.size2 * Math.cos(Math.PI * 1 / 3 + this.theta2),
            this.y1 - this.size2 * Math.sin(Math.PI * 1 / 3 + this.theta2));
        ctx.lineTo(this.x1 + this.size2 * Math.cos(PI2 / 3 + this.theta2),
            this.y1 + this.size2 * Math.sin(PI2 / 3 + this.theta2));
        ctx.fill();

    }
}

window.onload = () => {
    new App();
}