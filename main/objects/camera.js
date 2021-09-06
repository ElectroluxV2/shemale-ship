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
        console.log(this.#worldMap)

    }

    draw() {
        const cameraChunk = Chunk.toChunkCoord(this.position);
        const renderDistance = 3;

        for (let x = -renderDistance; x <= renderDistance; x++) {
            for (let y = -renderDistance; y <= renderDistance; y++) {
                const coord = new Coord(cameraChunk.x - x, cameraChunk.y - y);
                const chunk = this.#worldMap.getChunkByChunkCoord(coord);

                // this.#context.translate(this.position.x-this.#canvas.width/2, this.position.y - this.#canvas.height/2)

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

                    this.#context.stroke();
                }

                
                for (const entity of chunk.values()) {
                    // const offset = new Point(-this.position.x + (this.#canvas.width / 2), -this.position.y + (this.#canvas.height / 2));
                    entity.draw(this.#context);
                //     this.#context.transform(...offset);  
                }

                // this.#context.translate((-this.position.x-this.#canvas.width/2), -(this.position.y - this.#canvas.height/2))
            }
        }
    }

    draw2(){
        const cameraChunk = Chunk.toChunkCoord(new Point(this.position.x, this.position.y));
        const renderDistance = 3;

        this.#context.translate(this.position.x, this.position.y);

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

                for (const entity of chunk.values()){
                    entity.draw(this.#context);
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
