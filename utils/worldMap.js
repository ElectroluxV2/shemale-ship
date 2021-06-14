import { Matrix } from './matrix.js';
import { Coord } from './coord.js';

export class WorldMap {
    static CHUNK_SIZE = 200;
    #chunks = new Map();
    #entities = new Map();

    constructor() {

    }

    get entities() {
        return this.#entities.values();
    }

    get chunks() {
        return this.#chunks.values();
    }

    addEntity(entity) {
        this.getChunkByWorldCoord(entity.position).set(entity.id, entity);
        this.#entities.set(entity.id, entity);
    }

    removeEntity(id) {
        const entityCoord = this.#entities.get(id).position;
        this.getChunkByWorldCoord(entityCoord).delete(id);
        this.#entities.delete(id);
    }

    updateEntityPosition(id, position) {
        // Get last chunk based on last position
        const lastChunkIndex = this.getChunkIndexByChunkCoord(this.#entities.get(id).position.toChunkCoord());

        // Update entity position
        const entity = this.#entities.get(id);
        entity.position.import(position);

        // Get new chunk based on new position
        const newChunkIndex = this.getChunkIndexByChunkCoord(entity.position.toChunkCoord());

        // If chunk has changed
        if (lastChunkIndex !== newChunkIndex) {
            // Remove from previous chunk
            if (!this.getChunkByIndex(lastChunkIndex).delete(id)) {
                console.error("tf", this.getChunkByIndex(lastChunkIndex), id, this.#chunks);
            }

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
        const index = this.getChunkIndexByChunkCoord(coord);
        return this.getChunkByIndex(index);
    }

    /**
     * Returns Matrix index of chunk
     * @param coord {Coord} Chunk Coordinate
     * @return {Number}
     */
    getChunkIndexByChunkCoord(coord) {
        return Matrix.getIndex(coord);
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
