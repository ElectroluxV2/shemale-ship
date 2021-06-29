import { Position } from '../objects/position.js';
import { Random } from '../utils/random.js';

export class StaticEntity {
    #id;
    #position;
    #random;

    /**
     * Creates new entity with id and position
     * @param id {Number} Preassigned id of object
     * @param position {Position} Initial position of object
     */
    constructor(id = null, position = new Position()) {
        this.#id = id ?? Math.trunc(performance.now() * 1000000);
        Object.freeze(this.#id);
        this.#position = position;
        this.#random = Random.getSeededRandom(this.#id);
    }

    /**
     * Sets object position
     * @param value {Position} May be object literal too
     */
    set position(value) {
        this.#position = value instanceof Position ? value : new Position().import(value);
    }

    /**
     * Gets position
     * @return {Position} position
     */
    get position() {
        return this.#position;
    }

    /**
     * Gets id
     * @return {Number} id
     */
    get id() {
        return this.#id;
    }

    /**
     * Read only seeded random
     * @returns {Function}
     */
    get random() {
        return this.#random;
    }
}
