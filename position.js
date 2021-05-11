import { Vector } from "./vector.js";

export class Position {
    #x;
    #y;
    #angle;

    constructor(x = 0, y = 0, angle = 0) {
        this.#x = x;
        this.#y = y;
        this.#angle = angle;
    }

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = value;
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = value;
    }

    get angle() {
        return this.#angle;
    }

    set angle(value) {
        this.#angle = value;
    }

    get radians() {
        return this.#angle * Math.PI / 180;
    }

    angledVector() {
        return Vector.j.multiply(Math.cos(this.radians)).add(Vector.i.multiply(Math.sin(this.radians)));
    }

    export() {
        return {
            x: this.#x,
            y: this.#y,
            angle: this.#angle
        };
    }

    static import({x, y, angle}) {
        return new Position(x, y, angle);
    }
}
