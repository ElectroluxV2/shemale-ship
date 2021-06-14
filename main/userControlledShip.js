import { GraphicEntity } from './graphicEntity.js';
import { Point } from '../utils/point.js';
import { Polyfills } from '../utils/polyfills.js';

export class UserControlledShip extends GraphicEntity {
    static ID = -1;
    static thrustLeft = 0.8;
    static thrustRight = UserControlledShip.thrustLeft;
    static thrustForward = 1;
    static thrustBackward = 0.2;
    color = '#FFF';

    constructor(position) {
        super(UserControlledShip.ID, position);
    }

    static vertices(object) {
        const result = [];
        result.push(Polyfills.rotate(object.position, new Point(object.position.x - 36, object.position.y + 25), -object.position.radians));
        result.push(Polyfills.rotate(object.position, new Point(object.position.x + 36, object.position.y + 25), -object.position.radians));
        result.push(Polyfills.rotate(object.position, new Point(object.position.x, object.position.y - 65), -object.position.radians));
        return result;
    }

    static path(vertices) {
        const path = new Path2D();
        path.moveTo(vertices[0].x, vertices[0].y);
        path.lineTo(vertices[1].x, vertices[1].y);
        path.lineTo(vertices[2].x, vertices[2].y);
        path.lineWidth = 4;
        path.closePath();

        return path;
    }

    draw(ctx) {
        UserControlledShip.draw(ctx, this);
    }

    static draw(ctx, object) {
        // Body
        const path = UserControlledShip.path(UserControlledShip.vertices(object));
        ctx.strokeStyle = object.color;
        ctx.lineWidth = path.lineWidth;
        ctx.stroke(path);

        // center
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(object.position.x - 2, object.position.y - 2, 4, 4);

        ctx.fillStyle = '#a0937d';
        ctx.font = 'bold 16px Arial';

        const text = `${object.position.toChunkCoord().x} ${object.position.toChunkCoord().y}`;
        const textSize = ctx.measureText(text);
        ctx.fillText(text, object.position.x - textSize.width / 2, object.position.y + textSize.fontBoundingBoxAscent / 2);
    }
}
