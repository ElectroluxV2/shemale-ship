import { Position } from '../utils/position.js';
export class GraphicEntity {
    #id;
    #position;

    constructor(id = performance.now(), position = new Position()) {
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
