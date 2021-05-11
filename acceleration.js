export class Acceleration {
    #x;
    #y;
    #angular;

    constructor(x = 0, y = 0, angular = 0) {
        this.#x = x;
        this.#y = y;
        this.#angular = angular;
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

    get angular() {
        return this.#angular;
    }

    set angular(value) {
        this.#angular = value;
    }

    export() {
        return {
            x: this.#x,
            y: this.#y,
            angular: this.#angular
        }
    }

    static import({x, y, angular}) {
        return new Acceleration(x, y, angular);
    }
}
