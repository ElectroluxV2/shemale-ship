import { Position } from '../utils/position.js';
import { Vector } from '../utils/vector.js';

export class PhysicsEntity {
    position;
    currAccX = 0;
    currAccY = 0;
    currAccAngular = 0;

    constructor(position = new Position(0, 0, 0)) {
        this.position = position;
    }

    angledVector() {
        return Vector.j.multiply(Math.cos(this.position.radians)).add(Vector.i.multiply(Math.sin(this.position.radians)));
    }
}
