// import { GraphicEntity } from './graphicEntity.js';
import { Point } from '../utils/point.js';
import { Position } from '../utils/position.js';
import { Polyfills } from '../utils/polyfills.js';

export class BackgroundStar {
    #id;
    #position;

    constructor(position = new Position()) {
        this.#id = Math.trunc(performance.now() * 1000000);
        Object.freeze(this.#id);
        this.#position = position;
    }

    get position() {
        return this.#position;
    }

    get id() {
        return this.#id;
    }

    static vertices(object, origin = new Point(0, 0)) {
        const position = new Position(object.position.x + origin.x, object.position.y + origin.y, object.angle);
        const result = [];
        for(let i = 0; i < 3; i++){
            let tempX = Math.cos(i * 60 * Math.PI / 180) + position.x;
            let tempY = Math.sin(i * 60 * Math.PI / 180) + position.y;

            const temp = new Point(tempX, tempY);
            result.push(Polyfills.rotate(position, temp, position.radians));
        }
        return result;
    }

    static path(vertices) {
        const path = new Path2D();
        for(let i = 0; i < 6; i++) {
            if (i % 2 === 0) {
             path.moveTo(vertices[i].x, vertices[i].y);
            } else {
                path.lineTo(vertices[i].x, vertices[i].y);
            }
        }
        path.lineWidth = 1;
        path.closePath();
        return path;
    }

    draw(ctx, origin = new Point(0, 0)) {
        BackgroundStar.draw(ctx, this, origin);
    }

    static draw(ctx, object, origin) {
        const path = BackgroundStar.path(BackgroundStar.vertices(object, origin));
        ctx.strokeStyle = '#FFF'
        ctx.stroke(path);
    }
}