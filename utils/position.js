import { Coord } from './coord.js';

export class Position extends Coord {
    #angle;

    constructor(x = 0, y = 0, angle = 0) {
        super(x, y);
        this.angle = angle;
    }

    import({x, y, angle}) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    export() {
        return {
          x: this.x,
          y: this.y,
          angle: this.#angle
        };
    }

    get radians() {
        return this.angle * Math.PI / 180;
    }

    get angle() {
        return this.#angle;
    }

    set angle(degrees) {
        this.#angle = degrees % 360;
    }
}
