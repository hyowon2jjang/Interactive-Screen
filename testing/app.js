
const PI2 = Math.PI * 2;
var objectdata = [];


class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

    }


    resize() {
        this.stageWidth = window.innerWidth - 20;
        this.stageHeight = window.innerHeight - 20;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate() {

        window.requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < objectdata.length; i++) {
            const item = objectdata[i];
            item.draw(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}
class bab {
    constructor() {
        this.x = Math.random();
        this.y = Math.random();
    }

    draw(ctx, stageWidth, stageHeight) {
        this.posx = 20 + Math.round(this.x * stageWidth - 40);
        this.posy = 20 + Math.round(this.y * stageHeight - 40);

        ctx.beginPath();
        ctx.fillStyle = 'orange';
        ctx.arc(this.posx, this.posy, 50, 0, PI2, false);
        ctx.fill();
    }

}

class player {
    constructor() {
        this.x = Math.random();
        this.y = Math.random();
        this.size = 5
    }

    draw(ctx, stageWidth, stageHeight) {

        this.addEven

        this.posx = 20 + Math.round(this.x * stageWidth - 40);
        this.posy = 20 + Math.round(this.y * stageHeight - 40);

    }

}

for (let i = 0; i < 100; i++) {
    objectdata[i] = new bab();
}

window.onload = () => {
    new App()
}