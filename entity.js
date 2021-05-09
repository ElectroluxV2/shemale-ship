import { Pos } from "./pos.js"
import { Vector } from "./vector.js";
import { Point } from "./point.js";

export class Entity {
    position;

    constructor(position = new Pos()) {
        this.position = position;
    }

    angledVector() {
        return Vector.j.multiply(Math.cos(this.position.radians)).add(Vector.i.multiply(Math.sin(this.position.radians)));
    }
}