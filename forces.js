import { Acceleration } from "./acceleration.js";
import { Thrust } from "./thrust.js";

export class Forces {
    #acceleration;
    #thrust;

    constructor(acceleration = new Acceleration(), thrust = new Thrust()) {
        this.#acceleration = acceleration;
        this.#thrust = thrust;
        this.#thrust = thrust;
    }

    get acceleration() {
        return this.#acceleration;
    }

    set acceleration(value) {
        this.#acceleration = value;
    }

    get thrust() {
        return this.#thrust;
    }

    set thrust(value) {
        this.#thrust = value;
    }

    export() {
        return {
            acceleration: this.#acceleration.export(),
            thrust: this.#thrust.export()
        };
    }

    static import({acceleration, thrust}) {
        return new Forces(Acceleration.import(acceleration), Thrust.import(thrust));
    }
}
