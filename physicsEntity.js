import { Vector } from "./vector.js";
import { Pos } from "./pos.js";

export class PhysicsEntity {
    position;
    #currAccX = 0;
    #currAccY = 0;
    #currAccAngular = 0;
    thrustPresent = {};

    constructor(position = new Pos(0, 0, 0)) {
        this.position = position;
    }

    angledVector() {
        return Vector.j.multiply(Math.cos(this.position.radians)).add(Vector.i.multiply(Math.sin(this.position.radians)));
    }

    set accX(value) {
        this.#currAccX = value;
    }

    get accX() {
        return this.#currAccX;
    }

    set accY(value) {
        this.#currAccY = value;
    }

    get accY() {
        return this.#currAccY;
    }

    set accAngular(value) {
        this.#currAccAngular = value;
    }

    get accAngular() {
        return this.#currAccAngular;
    }
}
