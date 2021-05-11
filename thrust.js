export class Thrust {
    #left;
    #right;
    #forward;
    #backward;

    constructor(left = 0, right = 0, forward = 0, backward = 0) {
        this.#left = left;
        this.#right = right;
        this.#forward = forward;
        this.#backward = backward;
    }

    get left() {
        return this.#left;
    }

    set left(value) {
        this.#left = value;
    }

    get right() {
        return this.#right;
    }

    set right(value) {
        this.#right = value;
    }

    get forward() {
        return this.#forward;
    }

    set forward(value) {
        this.#forward = value;
    }

    get backward() {
        return this.#backward;
    }

    set backward(value) {
        this.#backward = value;
    }

    export() {
        return {
            left: this.#left,
            right: this.#right,
            forward: this.#forward,
            backward: this.#backward
        };
    }

    static import({left, right, forward, backward}) {
        return new Thrust(left, right, forward, backward);
    }
}
