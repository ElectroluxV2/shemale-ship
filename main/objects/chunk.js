import { Random } from '../utils/random.js';
import { Coord } from './coord.js';
import { SzudziksPairing } from '../utils/szudziksPairing.js';
import { Position } from './position.js';
import { BackgroundStar } from '../static-entities/backgroundStar.js';

export class Chunk extends Map {
    // static NEIGHBOUR = {
    //     LEFT: 'LEFT',
    //     RIGHT: 'RIGHT',
    //     TOP: 'TOP',
    //     BOTTOM: 'BOTTOM',
    // };

    // static DIAGONAL_NEIGHBOUR = {
    //     TOP_LEFT: 'TOP_LEFT',
    //     TOP_RIGHT: 'TOP_RIGHT',
    //     BOTTOM_LEFT: 'BOTTOM_LEFT',
    //     BOTTOM_RIGHT: 'BOTTOM_RIGHT',
    // };

    static DEBUG = false;
    static CHUNK_SIZE = 300;
    static MAX_STARS = 5;
    static MIN_STARS = 1;
    #coord;
    #index;
    #random;

    constructor(coord) {
        super();
        this.#coord = coord;
        this.#index = SzudziksPairing.pair(coord)
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
     * Transforms world coord to chunk coord
     * @param x {Number} X-axis
     * @param y {Number} Y-axis
     * @returns {Coord} Chunk based coord
     */
    static toChunkCoord({x, y}) {
        const resultX = Math.floor(x / Chunk.CHUNK_SIZE);
        const resultY = Math.floor(y / Chunk.CHUNK_SIZE);
        return new Coord(resultX, resultY);
    }

    /**
     * @returns {Generator<Coord>}
     */
    // *neighbours() {
        
    // }

    // neighbour(direction) {
    //     switch (direction) {
    //         case Chunk.NEIGHBOUR.BOTTOM: return new Coord(this.#coord.x, this.#coord.y - 1);
    //         case Chunk.NEIGHBOUR.LEFT: return new Coord(this.#coord.x - 1, this.#coord.y);
    //         case Chunk.NEIGHBOUR.RIGHT: return new Coord(this.#coord.x + 1, this.#coord.y);
    //         case Chunk.NEIGHBOUR.TOP: return new Coord(this.#coord.x, this.#coord.y + 1);
    //         case Chunk.DIAGONAL_NEIGHBOUR.BOTTOM_LEFT: return new Coord(this.#coord.x - 1, this.#coord.y - 1);
    //         case Chunk.DIAGONAL_NEIGHBOUR.BOTTOM_RIGHT: return new Coord(this.#coord.x + 1, this.#coord.y - 1);
    //         case Chunk.DIAGONAL_NEIGHBOUR.TOP_LEFT: return new Coord(this.#coord.x - 1, this.#coord.y + 1);
    //         case Chunk.DIAGONAL_NEIGHBOUR.TOP_RIGHT: return new Coord(this.#coord.x + 1, this.#coord.y + 1);
    //         default: 
    //     }
    // }

    /**
     * Adds entity to Chunk
     * @param entity {Entity|StaticEntity} Entity to add
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

    /**
     * Gets entities iterator with location within this Chunk
     * @return {IterableIterator}
     */
    get entities() {
        return this.values();
    }

    /**
     * Returns Chunk's Szudziks pair
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
}
