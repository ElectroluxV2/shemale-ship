import { Pos } from "./pos.js"
export class Ship {
    constructor() {
        console.log('ship');
        this.pos.setPos(0, 0)
        this.pos.setAngle(0)
    }
    pos = new Pos()

    draw (ctx) {
        // center

        ctx.fillStyle = "#FF0000"
        ctx.fillRect(this.pos.x-5, this.pos.y-5, 10, 10)

        // body

        ctx.translate(this.pos.x, this.pos.y)
        ctx.rotate(this.pos.angle * Math.PI / 180)
        ctx.translate(-this.pos.x, -this.pos.y)
        ctx.strokeStyle = "#FFF"
        ctx.beginPath();
        ctx.moveTo(this.pos.x-36, this.pos.y+25)
        ctx.lineTo(this.pos.x+36, this.pos.y+25)
        ctx.lineTo(this.pos.x, this.pos.y-65)
        ctx.closePath()
        ctx.stroke()
    }
}
