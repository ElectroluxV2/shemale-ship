import { Matrix } from './matrix.js';
import { Coord } from './coord.js';

export class WorldMap {
    static CHUNK_SIZE = 20;
    #chunks = new Map();
    #entities = new Map();

    constructor() {

    }

    get entities() {
        return this.#entities.values();
    }

    addEntity(entity) {

        this.getChunkByWorldCoord(entity.position).set(entity.id, entity);
        this.#entities.set(entity.id, entity);

        //const lastChunkCoord = this.#entities.get(entity.id).position.toChunkCoord();
        //console.log(`%c${lastChunkIndex}`, `color: #FF0000; font-size: 30em;`);
    }

    removeEntity(id) {
        const entityCoord = this.#entities.get(id).position;
        this.getChunkByWorldCoord(entityCoord).delete(id);
        this.#entities.delete(id);
    }

    updateEntityPosition(id, position) {
        const lastChunkIndex = Matrix.getIndex(this.#entities.get(id).position.toChunkCoord());
        // Update entity position
        const entity = this.getChunkByIndex(lastChunkIndex).get(id);
        console.log(this.getChunkByIndex(lastChunkIndex));
        console.log(entity);
        entity.position.import(position);

        const newChunkIndex = entity.position.toChunkCoord();

        if (lastChunkIndex !== newChunkIndex) {
            // Remove from previous chunk
            this.getChunkByIndex(lastChunkIndex).delete(id);
            // Add to new chunk
            this.getChunkByIndex(newChunkIndex).set(id, entity);
        }
    }

    /**
     * Updates color of entity
     * @param id {Number} Entity id
     * @param color {String} New Color
     */
    updateEntityColor(id, color) {
        this.#entities.get(id).color = color;
    }

    /**
     * Returns chunk by world x y
     * @param coord {Coord} World Coordinate
     */
    getChunkByWorldCoord(coord) {
        const index = Matrix.getIndex(coord.toChunkCoord());
        return this.getChunkByIndex(index);
    }

    /**
     * Will create new chunk if not exists
     * @param coord {Coord} Chunk Coordinate
     * @returns {Map}
     */
    getChunkByChunkCoord(coord) {
        const index = Matrix.getIndex(coord);
        return this.getChunkByIndex(index);
    }

    /**
     * Will create new chunk if not exists
     * @param index {Number} Index of chunk
     * @returns {Map} chunk
     */
    getChunkByIndex(index) {
        if (!this.#chunks.has(index)) {
            this.#chunks.set(index, new Map())
        }

        return this.#chunks.get(index);
    }
}