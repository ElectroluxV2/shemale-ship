import { Matrix } from './matrix.js';
import { Coord } from './coord.js';
import { Chunk } from './chunk.js';

export class WorldMap {
    #chunks = new Map();
    #entities = new Map();

    constructor() { }

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
            (this.getChunkByIndex(newChunkIndex) ?? this.generateChunk(entity.position.toChunkCoord())).set(id, entity);
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
        const chunkCoord = coord.toChunkCoord();
        const index = Matrix.getIndex(chunkCoord);
        return this.getChunkByIndex(index) ?? this.generateChunk(chunkCoord);
    }

    /**
     * Will create new chunk if not exists
     * @param coord {Coord} Chunk Coordinate
     * @returns {Map}
     */
    getChunkByChunkCoord(coord) {
        const index = this.getChunkIndexByChunkCoord(coord);
        return this.getChunkByIndex(index) ?? this.generateChunk(coord);
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
     * You have to create chunk by yourself if this method fails
     * @param index {Number} Index of chunk
     * @returns {Map|null} chunk
     */
    getChunkByIndex(index) {
        return this.#chunks.get(index) ?? null;
    }

    /**
     * Called when chunk is needed and was never accessed before
     * @param chunkCoord {Coord} Chunk's coord
     * @return {Map} Chunk
     */
    generateChunk(chunkCoord) {
        const chunk = new Chunk(chunkCoord);
        this.#chunks.set(chunk.index, chunk);
        return chunk;
    }
}
