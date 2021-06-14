import { WorldMap } from './worldMap.js';

export class Coord {
    x;
    y;

    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    toChunkCoord() {
        const resultX = Math.floor(this.x / WorldMap.CHUNK_SIZE);
        const resultY = Math.floor(this.y / WorldMap.CHUNK_SIZE);
        return new Coord(resultX, resultY)
    }
}