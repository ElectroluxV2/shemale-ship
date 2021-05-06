import { Pos } from "./pos.js"
export class Ship {
    constructor(contex) {
        console.log('ship');
        this.ctx = contex;
        this.pos.setPos(0, 0)
        this.pos.setAngle(0)
    }
    ctx = null;
    pos = new Pos()
    draw () {
        // center

        this.ctx.fillStyle = "#FF0000"
        this.ctx.fillRect(this.pos.x-5, this.pos.y-5, 10, 10)

        // body

        this.ctx.translate(this.pos.x, this.pos.y)
        this.ctx.rotate(this.angle * Math.PI / 180)
        this.ctx.translate(-this.pos.x, -this.pos.y)
        this.ctx.strokeStyle = "#FFF"
        this.ctx.beginPath();
        this.ctx.moveTo(this.pos.x-36, this.pos.y+25)
        this.ctx.lineTo(this.pos.x+36, this.pos.y+25)
        this.ctx.lineTo(this.pos.x, this.pos.y-65)
        this.ctx.closePath()
        this.ctx.stroke()


    }
}
