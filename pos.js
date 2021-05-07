export class Pos {
    #x;
    #y;
    #angle;

    constructor(x = 0, y = 0, angle = 0) {
        this.#x = x;
        this.#y = y;
        this.#angle = angle % 360;
    }

    setPos(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get angle() {
        return this.#angle
    }

    get radians() {
        return this.#angle * Math.PI / 180;
    }

    set angle(n) {
        this.#angle = n % 360
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
}

