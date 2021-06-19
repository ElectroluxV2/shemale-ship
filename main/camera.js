import { Position } from '../utils/position.js';
import { Coord } from '../utils/coord.js';
import { WorldMap } from '../utils/worldMap.js';
import { Point } from '../utils/point.js';

export class Camera {
    static #DRAW_CHUNK_GRID = true;
    #context;
    #canvas;
    position;

    constructor(context, window, position = new Position(0, 0,0)) {
        this.position = position;
        this.#context = context;
        this.#canvas = context.canvas;
    }

    draw(worldMap) {
        const cameraChunk = this.position.toChunkCoord();
        const renderDistance = 3;

        for (let x = -renderDistance; x <= renderDistance; x++) {
            for (let y = -renderDistance; y <= renderDistance; y++) {
                const coord = new Coord(cameraChunk.x - x, cameraChunk.y - y);
                const chunk = worldMap.getChunkByChunkCoord(coord);

                if (Camera.#DRAW_CHUNK_GRID) {
                    this.#context.strokeStyle = '#FFF';
                    this.#context.lineWidth = 0.05;
                    this.#context.beginPath();
                    this.#context.rect(coord.x * WorldMap.CHUNK_SIZE - this.position.x + (this.#canvas.width / 2),
                        coord.y * WorldMap.CHUNK_SIZE - this.position.y + (this.#canvas.height / 2),
                        WorldMap.CHUNK_SIZE,
                        WorldMap.CHUNK_SIZE
                    );
                }

                this.#context.stroke();
                for (const entity of chunk.values()) {
                    const point = new Point(- this.position.x + (this.#canvas.width / 2), - this.position.y + (this.#canvas.height / 2));
                    entity.draw(this.#context, point);
                }
            }
        }
    }
}


