import { Entity } from "./entity.js";

export class Ship extends Entity {
    currAccX = 0;
    currAccY = 0;
    currAccAngular = 0;
    draw(ctx) {
        // center
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.position.x-2, this.position.y-2, 4, 4);

        // body
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.position.angle * Math.PI / 180);
        ctx.translate(-this.position.x, -this.position.y);
        ctx.strokeStyle = "#FFF";
        ctx.beginPath();
        ctx.moveTo(this.position.x-36, this.position.y+25);
        ctx.lineTo(this.position.x+36, this.position.y+25);
        ctx.lineTo(this.position.x, this.position.y-65);
        ctx.closePath();
        ctx.stroke();

        // direction

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(-this.position.angle * Math.PI / 180);
        ctx.translate(-this.position.x, -this.position.y);
        ctx.strokeStyle = "#FF0000"
        ctx.beginPath()
        ctx.moveTo(this.position.x, this.position.y)
        ctx.lineTo(this.position.x + this.currAccX, this.position.y - this.currAccY)
        ctx.closePath()
        ctx.stroke()
    };
}
