import { Entity } from "./entity.js";

export class Ship extends Entity {
    // currAccX = 0;
    // currAccY = 0;
    currAcc = 0;
    currAccAngular = 0;
    draw(ctx) {
        ctx.lineWidth = 5;

        // center
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.position.x-2, this.position.y-2, 4, 4);

        // body
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.position.angle * Math.PI / 180);
        ctx.translate(-this.position.x, -this.position.y);
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.position.x-36, this.position.y+25);
        ctx.lineTo(this.position.x+36, this.position.y+25);
        ctx.lineTo(this.position.x, this.position.y-65);
        ctx.closePath();
        ctx.stroke();

        // direction

        const direction = this.angledVector();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(-this.position.angle * Math.PI / 180);
        ctx.translate(-this.position.x, -this.position.y);
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + 50 * direction.x, this.position.y - 50 * direction.y);
        ctx.closePath();
        ctx.stroke();
    };
}
