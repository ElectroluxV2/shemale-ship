import { Position } from '../utils/position.js';
export class GraphicEntity {
    #id;
    #position;

    constructor(id = null, position = new Position()) {
        this.#id = id ?? Math.trunc(performance.now() * 1000000);
        Object.freeze(this.#id);
        this.#position = position;
    }

    get position() {
        return this.#position;
    }

    get id() {
        return this.#id;
    }

    draw(ctx) {
        console.warn("Not implemented!");
    }
}
