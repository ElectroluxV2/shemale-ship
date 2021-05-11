import { Position } from "./position.js";
import { Forces } from "./forces.js";

export class PhysicsData {
    #position;
    #forces;

    constructor(position = new Position(), forces = new Forces()) {
        this.#position = position;
        this.#forces = forces;
    }

    get position() {
        return this.#position;
    }

    set position(value) {
        this.#position = value;
    }

    get forces() {
        return this.#forces;
    }

    set forces(value) {
        this.#forces = value;
    }

    export() {
        return {
            position: this.#position.export(),
            forces: this.#forces.export()
        };
    }

    import({position, forces}) {
        this.#position = Position.import(position);
        this.#forces = Forces.import(forces);
    }

    static import({position, forces}) {
        return new PhysicsData(Position.import(position), Forces.import(forces));
    }
}
