import { Position } from '../utils/position.js';
import { Vector } from '../utils/vector.js';

export class PhysicsEntity {
    #id = null;
    position = null;
    currAccX = 0;
    currAccY = 0;
    currAccAngular = 0;
    mass = 0;

    constructor(id, position = new Position(0, 0, 0)) {
        this.#id = id;
        Object.freeze(this.#id);
        this.position = position;
    }

    angledVector() {
        return Vector.j.multiply(Math.cos(this.position.radians)).add(Vector.i.multiply(Math.sin(this.position.radians)));
    }

    get id() {
        return this.#id;
    }

    isColliding(ctx, points, path) {
        ctx.lineWidth = path.lineWidth;

        for (const point of points) {
            if(ctx.isPointInPath(path, point.x, point.y)) {
                return true;
            }
        }

        return false;
    }
}
