import { Matrix } from '../utils/matrix.js';
import { Chunk } from './chunk.js';
import { Coord } from './coord.js';
import { Entity } from '../entities/entity.js';
import { UserControlledShip } from '../entities/userControlledShip.js';

export class WorldMap {
    #chunks = new Map();
    #entities = new Map();

    get entities() {
        return this.#entities.values();
    }

    get chunks() {
        return this.#chunks.values();
    }

    addEntity(entity) {
        // General purpose Map
        this.#entities.set(entity.id, entity);
        // Add to chunk
        this.getChunkByWorldCoord(entity.position).set(entity.id, entity);

        // Listen to Chunk Change
        entity.addEventListener(Entity.EVENT_ON_CHUNK_CHANGE, this.entityChunkChangeListener.bind(this));
    }

    removeEntity(id) {
        // Remove listener
        const entity = this.#entities.get(id);
        entity.removeEventListener(Entity.EVENT_ON_CHUNK_CHANGE, this.entityChunkChangeListener);

        // Remove from chunk
        this.getChunkByWorldCoord(entity.position).delete(id);
        // Remove from general purpose Map
        this.#entities.delete(id);
    }

    entityChunkChangeListener({detail: {entity}}) {
        this.moveEntityBetweenChunks(entity);
    }

    moveEntityBetweenChunks(entity) {

        if (entity.chunkCoord.old !== undefined) {
            // Remove from old
            if (!this.getChunkByChunkCoord(entity.chunkCoord.old).delete(entity.id)) {
                console.error('Trying to delete non existing object from chunk');
            }
        }

        // Add to new
        this.getChunkByChunkCoord(entity.chunkCoord.now).set(entity.id, entity);
    }

    /**
     * Will create new chunk if not exists
     * @param coord {Coord} Chunk Coordinate
     * @returns {Chunk} Chunk
     */
    getChunkByChunkCoord(coord) {
        const index = Matrix.getIndex(coord);

        if (this.#chunks.has(index)) {
            return this.#chunks.get(index);
        }

        // Generate new Chunk
        const chunk = new Chunk(coord);
        this.#chunks.set(index, chunk);
        return chunk;
    }

    /**
     * Will create new chunk if not exists
     * @param coord {Coord} World Coordinate
     * @returns {Chunk} Chunk
     */
    getChunkByWorldCoord(coord) {
        return this.getChunkByChunkCoord(Chunk.toChunkCoord(coord));
    }
}
