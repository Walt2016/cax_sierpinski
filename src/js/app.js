import cax from './cax'
import tpler from './tpler'
const screen = document.documentElement;
const w = screen.clientWidth;
const h = screen.clientHeight;
const stage = new cax.Stage(w, h, '#renderTo')
const graphics = new cax.Graphics()
stage.add(graphics)

const link = (vs, color) => {
    graphics
        .beginPath()
    vs.forEach((t, i) => {
        graphics[i === 0 ? "moveTo" : "lineTo"](t.x, t.y)
    })
    graphics.closePath()
        .strokeStyle(color)
        .stroke()
}
const linkGroup = (vsGroup, color) => {
    vsGroup.forEach((vs) => {
        link(vs, color)
    })
}
const sierpinski = vertex => {
    let vs = vertex.vs,
        vsGroup = [vs];
    let invertices = (vs) => {
        let vs2 = vertex.invertices(vs);
        if (vs2) {
            vsGroup.push(vs2);
            vs.forEach((t, i) => {
                let vs3 = [t, vs2[i], vs2[i === 0 ? vs2.length - 1 : i - 1]]
                invertices(vs3)
            });
        }
    }
    invertices(vs)
    return vsGroup
}
let o = {
    x: w / 2,
    y: h / 2,
    vx: (Math.random() * 2 - 1) * 1,
    vy: (Math.random() * 2 - 1) * 1,
}
let opt = {
    r: 100,
    a: 45,
    num: 4,
    x: o.x,
    y: o.y,
}
let angle = 0;
let update = (o, n,r=30) => {
    _.extend(opt, {
        a: angle++,
        num: n,
        r: r,
        x: o.x,
        y: o.y
    })
    var colors = _.color.circle(n);
    _.vertex(opt).vs.forEach((t, i) => {
        let vt = _.vertex(_.extend(opt, { x: t.x, y: t.y }))
        linkGroup(sierpinski(vt), colors[i])
    })
    stage.update()
}
let move = (o) => {
    o.x += o.vx;
    o.y += o.vy;
    if (o.x >= w) {
        o.vx *= -1
    }
    if (o.x <= 0) {
        o.vx *= -1
    }
    if (o.y >= h) {
        o.vy *= -1
    }
    if (o.y <= 0) {
        o.vy *= -1
    }
}

let loop = () => {
    requestAnimationFrame(loop);
    // setTimeout(loop,17)
    move(o)
    graphics.fillStyle('rgba(0,0,0,0.05)').fillRect(0, 0, w, h);
    update(o, 4,60)
}
_.vertex(opt).vs.forEach((t, i) => update(t, i + 3))
setTimeout(loop,2000)

