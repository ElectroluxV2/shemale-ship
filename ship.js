import { Entity } from "./entity.js";

export class Ship extends Entity {
    draw (ctx) {
        // center
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.pos.x-2, this.pos.y-2, 4, 4);

        // body
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.pos.angle * Math.PI / 180);
        ctx.translate(-this.pos.x, -this.pos.y);
        ctx.strokeStyle = "#FFF";
        ctx.beginPath();
        ctx.moveTo(this.pos.x-36, this.pos.y+25);
        ctx.lineTo(this.pos.x+36, this.pos.y+25);
        ctx.lineTo(this.pos.x, this.pos.y-65);
        ctx.closePath();
        ctx.stroke();

        // direction

        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(-this.pos.angle * Math.PI / 180);
        ctx.translate(-this.pos.x, -this.pos.y);
        ctx.strokeStyle = "#FF0000"
        ctx.beginPath()
        ctx.moveTo(this.pos.x, this.pos.y)
        ctx.lineTo(this.pos.x + 90 * this.angledVector().x, this.pos.y - 90 * this.angledVector().y)
        ctx.closePath()
        ctx.stroke()
        console.log(this.angledVector())
        console.log(this.pos.angle)
    };
}
