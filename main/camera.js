import { Position } from '../utils/position.js';
import { WorldMap } from '../utils/worldMap.js';
import { Coord } from '../utils/coord.js';

export class Camera {
    position;
    #canvas;
    #context
    constructor(canvas, position = new Position(0, 0,0)) {
        this.position = position;
        this.#canvas = canvas
        this.#context = canvas.getContext('2d')
    }

    draw(worldMap){
        const width = this.#canvas.width;
        const height = this.#canvas.height;

        const cameraChunk = this.position.toChunkCoord();
        const renderDistance = 1;

        for (let x = -renderDistance; x <= renderDistance; x++) {
            for (let y = -renderDistance; y <= renderDistance; y++) {
                const chunk = worldMap.getChunkByChunkCoord(new Coord(cameraChunk.x - x, cameraChunk.y - y));
                for (const entity of chunk.values()){
                    entity.draw(this.#context, entity, this.position)
                }
            }
        }

        for(let i = this.position.x; i < this.position.x+width; i+= WorldMap.CHUNK_SIZE){
            for(let j = this.position.y; j < this.position.y+height; j+= WorldMap.CHUNK_SIZE){
                for (const entity of worldMap.getChunkByWorldCoord(new Coord(i, j)).values()) {

                }
            }
        }
    }
}