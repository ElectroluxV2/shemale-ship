import { Matrix } from './matrix.js';
import { Random } from './random.js';
import { Coord } from './coord.js';
import { BackgroundStar } from '../main/backgroundStar.js';
import { Position } from './position.js';

export class Chunk extends Map {
    static DEBUG = false;
    static CHUNK_SIZE = 200;
    static MAX_STARS = 5;
    static MIN_STARS = 1;
    #coord;
    #index;
    #random;

    constructor(coord) {
        super();
        this.#coord = coord;
        this.#index = Matrix.getIndex(coord);
        this.#random = Random.getSeededRandom(this.#index);

        const worldCoordMin = new Coord(this.#coord.x * Chunk.CHUNK_SIZE, this.#coord.y * Chunk.CHUNK_SIZE);
        const worldCoordMax = new Coord(worldCoordMin.x + Chunk.CHUNK_SIZE, worldCoordMin.y + Chunk.CHUNK_SIZE);

        Chunk.DEBUG && console.info(`Preparing stars for Chunk#${(this.#index)} with coord[${this.#coord.x},${this.#coord.y}]`);

        for (let i = 0; i < this.#randomInRange(Chunk.MIN_STARS, Chunk.MAX_STARS); i++) {
            const x = this.#randomInRange(worldCoordMin.x, worldCoordMax.x);
            const y = this.#randomInRange(worldCoordMin.y, worldCoordMax.y);
            const angle = this.#randomInRange(0, 360);

            this.addEntity(new BackgroundStar(new Position(x, y, angle)));
        }
    }

    /**
     * Returns random (seeded) number within provided range
     * @param min {Number} Minimum
     * @param max {Number} Maximum
     * @return {Number}
     */
    #randomInRange(min, max) {
        return this.#random() * (max - min) + min;
    }

    /**
     * Gets entities iterator with location within this Chunk
     * @return {IterableIterator}
     */
    get entities() {
        return this.values();
    }

    /**
     * Returns Chunk's Matrix index
     * @return {Number}
     */
    get index() {
        return this.#index;
    }

    /**
     * Returns Chunk's Coord
     * @return {Coord}
     */
    get coord() {
        return this.#coord;
    }

    /**
     * Adds entity to Chunk
     * @param entity {GraphicEntity} Entity to add
     */
    addEntity(entity) {
        this.set(entity.id, entity);
    }

    /**
     * Removes entity from this chunk
     * @param id {Number} Entity Id
     * @return {boolean} true if found and deleted
     */
    removeEntity(id) {
        return this.delete(id);
    }
}
