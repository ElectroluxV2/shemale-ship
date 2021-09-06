import { Position } from './position.js';
import { Coord } from './coord.js';
import { Point } from './point.js';
import { Chunk } from './chunk.js';
 
export class Camera {
    static #DRAW_CHUNK_GRID = true;
    static #DRAW_CHUNK_COORD = true;
    #context;
    #canvas;
    #worldMap;
    #position;

    constructor(context, window, worldMap, position = new Position(0, 0, 0)) {
        this.#worldMap = worldMap;
        this.#context = context;
        this.#canvas = context.canvas;
        this.#position = position;
    }

    draw() {
        const cameraChunk = Chunk.toChunkCoord(new Point(this.position.x, this.position.y));
        const renderDistance = 3;

        this.#context.save();
        this.#context.translate(-this.position.x + this.#canvas.width / 2, -this.position.y + this.#canvas.height / 2);

        for (let x = -renderDistance; x <= renderDistance; x++) {
            for (let y = -renderDistance; y <= renderDistance; y++) {
                const coord = new Coord(cameraChunk.x - x, cameraChunk.y - y);
                const chunk = this.#worldMap.getChunkByChunkCoord(coord);


                if (Camera.#DRAW_CHUNK_GRID || True) {
                    this.#context.strokeStyle = '#222';
                    this.#context.lineWidth = 1;
                    this.#context.beginPath();
                    this.#context.rect(coord.x * Chunk.CHUNK_SIZE,
                        coord.y * Chunk.CHUNK_SIZE,
                        Chunk.CHUNK_SIZE,
                        Chunk.CHUNK_SIZE);
                    this.#context.stroke();
                }

                for (const entity of chunk.values()) {
                    entity.draw(this.#context);
                }
            }
        }

        this.#context.restore();
    }

    set position(value) {
        this.#position = value instanceof Position ? value : new Position().import(value);
    }

    get position() {
        return this.#position;
    }
}
