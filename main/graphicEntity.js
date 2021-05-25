import { Position } from '../utils/position.js';
export class GraphicEntity {
    #id;
    #position;

    constructor(position = new Position(), id = performance.now()) {
        this.#id = id;
        this.#position = position;
    }

    get position() {
        return this.#position;
    }

    get id() {
        return this.#id;
    }
}
