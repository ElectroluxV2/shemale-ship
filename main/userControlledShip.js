import { GraphicEntity } from './graphicEntity.js';

export class UserControlledShip extends GraphicEntity {
    static thrustLeft = 0.8;
    static thrustRight = UserControlledShip.thrustLeft;
    static thrustForward = 1;
    static thrustBackward = 0.2;

    static vertices(object) {
        const result = [];
        result.push(new Point(object.position.x - 36, object.position.y + 25));
        result.push(new Point(object.position.x + 36, object.position.y + 25));
        result.push(new Point(object.position.x, object.position.y - 65));
        return result;
    }

    static path(vertices) {
        const path = new Path2D();
        path.moveTo(vertices[0].x, vertices[0].y);
        path.lineTo(vertices[1].x, vertices[1].y);
        path.lineTo(vertices[2].x, vertices[2].y);
        path.closePath();

        return path;
    }

    draw(ctx){
        // body
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 4;
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.position.radians);
        ctx.translate(-this.position.x, -this.position.y);

        ctx.beginPath();
        ctx.moveTo(this.position.x - 36, this.position.y + 25);
        ctx.lineTo(this.position.x + 36, this.position.y + 25);
        ctx.lineTo(this.position.x, this.position.y - 65);
        ctx.closePath();
        ctx.stroke();
        ctx.resetTransform();

        // center
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);
    }
}
