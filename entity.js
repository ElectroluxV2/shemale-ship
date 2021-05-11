import { PhysicsData } from "./physicsData.js";

export class Entity {
    #physicsData;

    constructor(physicsData = new PhysicsData()) {
        this.#physicsData = physicsData;
    }

    get physicsData() {
        return this.#physicsData;
    }

    set physicsData(value) {
        this.#physicsData = value;
    }
}
