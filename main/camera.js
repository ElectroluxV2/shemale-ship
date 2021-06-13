import { Position } from '../utils/position.js';

export class Camera {
    position;
    #canvas;

    constructor(canvas, position = new Position(0, 0,0)) {
        this.position = position;
        this.#canvas = canvas
    }


}