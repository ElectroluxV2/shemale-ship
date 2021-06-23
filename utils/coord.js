import { Chunk } from './chunk.js';

export class Coord {
    x;
    y;

    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    toChunkCoord() {
        const resultX = Math.floor(this.x / Chunk.CHUNK_SIZE);
        const resultY = Math.floor(this.y / Chunk.CHUNK_SIZE);
        return new Coord(resultX, resultY)
    }
}
