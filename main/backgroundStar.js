import { GraphicEntity } from './graphicEntity.js';
import { Point } from '../utils/point.js';
import { Position } from '../utils/position.js';
import { Polyfills } from '../utils/polyfills.js';

export class BackgroundStar extends GraphicEntity {
    size = 6;

    constructor(position = new Position()) {
        super(Math.trunc(performance.now() * 1000000), position);
    }

    static vertices(object, origin = new Point(0, 0)) {
        const position = new Position(object.position.x + origin.x, object.position.y + origin.y, object.angle);
        const result = [];
        for(let i = 0; i < 6; i++){
            let tempX = object.size * Math.cos(i * 60 * Math.PI / 180) + position.x;
            let tempY = object.size * Math.sin(i * 60 * Math.PI / 180) + position.y;

            const temp = new Point(tempX, tempY);
            result.push(Polyfills.rotate(position, temp, position.radians));
        }
        return result;
    }

    static path(vertices) {
        const path = new Path2D();
        for(let i = 0; i < 3; i++) {
            path.moveTo(vertices[i].x, vertices[i].y)
            path.lineTo(vertices[i+3].x, vertices[i+3].y)
        }
        path.closePath();
        return path;
    }

    draw(ctx, origin = new Point(0, 0)) {
        BackgroundStar.draw(ctx, this, origin);
    }

    static draw(ctx, object, origin) {
        const gradient = ctx.createRadialGradient(object.position.x + origin.x, object.position.y + origin.y, 1,object.position.x + origin.x, object.position.y + origin.y, 30)
        gradient.addColorStop(0, '#FFFFFF30');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(object.position.x + origin.x, object.position.y + origin.y, object.size * object.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();


        ctx.beginPath();
        const path = BackgroundStar.path(BackgroundStar.vertices(object, origin));
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 1;
        ctx.stroke(path);
        ctx.closePath();
    }
}
