import cax from './cax'
const screen = document.documentElement;
const w = screen.clientWidth;
const h = screen.clientHeight;
const stage = new cax.Stage(w, h, '#renderTo')
const graphics = new cax.Graphics()
stage.add(graphics)

let draw = (p) => {
    // .globalAlpha(p.alpha)
    graphics
        .beginPath()
        .arc(p.x, p.y, p.r, 0, Math.PI * 2)
        .closePath()
        .fillStyle(p.color)
        .fill()
}
const { random, cos, PI, round } = Math
let _cos = (a) => {
    return cos(a * PI / 180);
}

let colorCircle = function(len) {
    var a = 0,
        step = 360 / len;
    var arr = [];
    for (var i = 0; i < len; i++) {
        a += step
        var r = _cos(a) * 127 + 128 << 0,
            g = _cos(a + 120) * 127 + 128 << 0,
            b = _cos(a + 240) * 127 + 128 << 0;
        arr[arr.length] = 'rgb(' + [r, g, b] + ')'
    }
    return arr;
};
class Ball {
    constructor(color, x = w / 2, y = h / 2) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.vx = (random() * 2 - 1) * 3;
        this.vy = (random() * 2 - 1) * 3;
        this.r = 1; 
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
        return this.bound();
    }
    bound() {
        if (this.x >= w || this.x <= 0) {
            this.vx *= -1
            // this.die = true
        }
        if (this.y >= h || this.y <= 0) {
            this.vy *= -1
            // this.die = true
        }
        return this;
    }

}
class Box {
    constructor(amount = 20) {
        this.colors = colorCircle(amount);
        this.amount = amount;
        this.balls = [];
    }
    createBall() {
        for (var i = 0; i < this.amount; i++) {
            this.balls[this.balls.length] = new Ball(this.colors[i])
        }
    }
    delBall() {
        for (var i = this.balls.length - 1; i >= 0; i--) {
            var b = this.balls[i];
            b && b.move().die && this.balls.splice(i, 1);
        }
    }
    update() {
        if (this.balls.length === 0) {
            this.createBall();
        }
        this.balls.forEach((t, i) => {
            draw(t.move())
        })
        // this.delBall()
    }
}

let box = new Box(100)
let update = () => {
    box.update();
    // graphics.globalAlpha(1);
    graphics.fillStyle('rgba(0,0,0,0.05)').fillRect(0, 0, w, h);
    stage.update()
}
cax.setInterval(update, 17)