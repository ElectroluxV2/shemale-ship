import { PhysicsEntity } from "./physicsEntity.js";
import { Ship } from "./ship.js";

export class PhysicsEngine {
    static #resistance = 0.95;
    static #angularResistance = 0.85;
    #physicsChannelPort;
    #ship;

    constructor(physicsChannelPort) {
        this.#ship = new PhysicsEntity();
        this.#physicsChannelPort = physicsChannelPort;
        this.#physicsChannelPort.onmessage = ({data} = event) => {
            switch (data.type) {
            case "sendPhysicsDataForEntity":
                this.#ship.position.x = data.physicsData.x;
                this.#ship.position.y = data.physicsData.y;
                this.#ship.position.angle = data.physicsData.angle;
                this.#ship.thrustPresent = data.physicsData.thrustPresent;
                break;
                case "loop":
                    this.mainLoop();
            }
        };

        this.mainLoop();
    }

    mainLoop() {
        if (this.#ship.thrustPresent.accLeft) {
            this.#ship.accAngular += Ship.thrustLeft;
        }

        if (this.#ship.thrustPresent.accRight) {
            this.#ship.accAngular -= Ship.thrustRight;
        }

        if (this.#ship.thrustPresent.accForward) {
            const angled = this.#ship.angledVector().multiply(Ship.thrustForward);

            this.#ship.accX += angled.x;
            this.#ship.accY += angled.y;
        }

        if (this.#ship.thrustPresent.accBackward) {
            const angled = this.#ship.angledVector().reverse().multiply(Ship.thrustBackward);

            this.#ship.accX += angled.x;
            this.#ship.accY += angled.y;
        }

        // console.log(this.#ship.position.x);

        // Calculate forces for ship
        this.#ship.position.x += this.#ship.accX;
        this.#ship.accX *= PhysicsEngine.#resistance;
        this.#ship.position.y -= this.#ship.accY;
        this.#ship.accY *= PhysicsEngine.#resistance;
        this.#ship.position.angle += this.#ship.accAngular;
        this.#ship.accAngular *= PhysicsEngine.#angularResistance;

        // Here return calculations result
        const physicsData = {
            x: this.#ship.position.x,
            y: this.#ship.position.y,
            angle: this.#ship.position.angle,
        };

        this.#physicsChannelPort.postMessage({
            type: "receivePhysicsResultForEntity",
            physicsData: physicsData
        });

        // requestAnimationFrame(this.mainLoop.bind(this));
    }
}
