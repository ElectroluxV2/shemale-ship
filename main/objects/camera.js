import { Position } from './position.js';
import { Coord } from './coord.js';
import { Point } from './point.js';
import { Chunk } from './chunk.js';

export class Camera {
    static #DRAW_CHUNK_GRID = true;
    static #DRAW_CHUNK_COORD = true;
    #context;
    #canvas;
    #position;

    constructor(context, window, position = new Position(0, 0, 0)) {
        this.#position = position;
        this.#context = context;
        this.#canvas = context.canvas;
    }

    draw(worldMap) {
        const cameraChunk = Chunk.toChunkCoord(this.position);
        const renderDistance = 3;

        for (let x = -renderDistance; x <= renderDistance; x++) {
            for (let y = -renderDistance; y <= renderDistance; y++) {
                const coord = new Coord(cameraChunk.x - x, cameraChunk.y - y);
                const chunk = worldMap.getChunkByChunkCoord(coord);

                if (Camera.#DRAW_CHUNK_GRID) {
                    this.#context.strokeStyle = '#FFF';
                    this.#context.lineWidth = 0.05;
                    this.#context.beginPath();
                    this.#context.rect(coord.x * Chunk.CHUNK_SIZE - this.position.x + (this.#canvas.width / 2),
                        coord.y * Chunk.CHUNK_SIZE - this.position.y + (this.#canvas.height / 2),
                        Chunk.CHUNK_SIZE,
                        Chunk.CHUNK_SIZE
                    );

                    if (Camera.#DRAW_CHUNK_COORD) {

                        this.#context.fillStyle = '#a0937d';
                        this.#context.font = 'bold 16px Arial';

                        const text = `${coord.x} ${coord.y}`;
                        const textSize = this.#context.measureText(text);
                        this.#context.fillText(text, coord.x * Chunk.CHUNK_SIZE - this.position.x + (this.#canvas.width / 2), coord.y * Chunk.CHUNK_SIZE - this.position.y + (this.#canvas.height / 2) + textSize.fontBoundingBoxAscent);
                    }
                }

                this.#context.stroke();
                for (const entity of chunk.values()) {
                    const offset = new Point(-this.position.x + (this.#canvas.width / 2), -this.position.y + (this.#canvas.height / 2));
                    entity.draw(this.#context, offset);
                }
            }
        }
    }

    set position(value) {
        this.#position = value instanceof Position ? value : new Position().import(value);
    }

    get position() {
        return this.#position;
    }
}
