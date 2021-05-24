import { GraphicEntity } from './graphicEntity.js';

export class UserControlledShip extends GraphicEntity {
    static thrustLeft = 0.8;
    static thrustRight = UserControlledShip.thrustLeft;
    static thrustForward = 1;
    static thrustBackward = 0.2;

    draw(ctx){
        // center
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);

        // body
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 5;
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.position.radians);
        ctx.translate(-this.position.x, -this.position.y);

        ctx.beginPath();
        ctx.moveTo(this.position.x - 36, this.position.y + 25);
        ctx.lineTo(this.position.x + 36, this.position.y + 25);
        ctx.lineTo(this.position.x, this.position.y - 65);
        ctx.closePath();
        ctx.stroke();
    }
}
