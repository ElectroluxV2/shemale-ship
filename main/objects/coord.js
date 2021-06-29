export class Coord extends EventTarget {
    static EVENT_CHANGE = 'COORD_CHANGE_EVENT';
    #x;
    #y;
    #onChange;

    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
        this.#onChange = new CustomEvent(Coord.EVENT_CHANGE, {
            detail: {
                coord: this
            }
        });
    }

    set x(value) {
        if (Math.abs(this.#x - value) > Number.EPSILON) {
            this.dispatchEvent(this.#onChange);
        }

        this.#x = value;
    }

    get x() {
        return this.#x;
    }

    set y(value) {
        if (Math.abs(this.#y - value) > Number.EPSILON) {
            this.dispatchEvent(this.#onChange);
        }

        this.#y = value;
    }

    get y() {
        return this.#y;
    }
}
