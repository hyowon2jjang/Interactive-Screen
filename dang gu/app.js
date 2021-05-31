function distance(x1, y1, x2, y2) {
    const x = x2 - x1;
    const y = y2 - y1;
    const length = Math.sqrt(x * x + y * y);
    return length;
}

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball1 = new Ball(this.stageWidth, this.stageHeight, 110, 15, 15, '#fdd700');
        this.ball2 = new Ball(this.stageWidth, this.stageHeight, 110, 15, 15, '#abb9d4');

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.ball1.draw(this.ctx, this.stageWidth, this.stageHeight, this.ball2);

        this.ball2.draw(this.ctx, this.stageWidth, this.stageHeight, this.ball1);
    }
}

class Ball {
    constructor(stageWidth, stageHeight, redius, speedx, speedy, color) {
        this.radius = redius;
        this.vx = speedx;
        this.vy = speedy;
        this.color = color

        const diameter = this.radius * 2;
        this.x = diameter + (Math.random() * stageWidth - diameter);
        this.y = diameter + (Math.random() * stageHeight - diameter);
    }

    draw(ctx, stageWidth, stageHeight, anotherB) {
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);

        this.bounceBalls(anotherB)

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= -1;
            this.x += this.vx;
        } else if (this.y <= minY || this.y >= maxY) {
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBalls(anotherB) {

        if (distance(this.x, this.y, anotherB.x, anotherB.y) <= this.radius * 2) {

            const V = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

            const slope = (this.y - anotherB.y) / (this.x - anotherB.x);
            const radian = Math.atan(-1 / slope);
            const Vslope = this.vy / this.vx
            const Vradian = Math.atan(Vslope);

            const newVx = Math.sin(2 * radian + Vradian) * V
            const newVy = Math.cos(2 * radian + Vradian) * V

            this.vx = newVx * Math.abs(this.vx) / this.vx;
            this.vy = newVy * Math.abs(this.vy) / this.vy;
        }
    }
}

window.onload = () => {
    new App();
};
