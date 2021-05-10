import { Pos } from "./pos.js"

export class GraphicEntity {
    position;

    constructor(position = new Pos()) {
        this.position = position;
    }
}
