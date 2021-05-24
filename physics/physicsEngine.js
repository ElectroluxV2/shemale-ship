import { PhysicsEntity } from './physicsEntity.js';
import { Position } from '../utils/position.js';
import { UserControlledShip } from '../main/userControlledShip.js';

export class PhysicsEngine {
    static #resistance = 0.95;
    static #angularResistance = 0.85;
    #physicsCanvas;
    #physicsCanvasContext;
    #physicsChannel;
    #userControlledShip = new PhysicsEntity(new Position(200, 200));

    constructor(physicsCanvas, physicsChannel) {
        this.#physicsCanvas = physicsCanvas;
        this.#physicsCanvasContext = this.#physicsCanvas.getContext("2d");
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => {
            switch (data.type) {
                case 'userControlledShipMoveW':
                    // NADAWANIE ACC
                    const angled = this.#userControlledShip.angledVector().multiply(UserControlledShip.thrustForward);
                    this.#userControlledShip.accX += angled.x;
                    this.#userControlledShip.accY += angled.y;
                    break;
            }
        };

        this.mainLoop();
    }

    i = 0;

    mainLoop() {
        this.#physicsCanvasContext.reset();

        // TUUUUUUUUU
        // Calculate forces for ship
        this.#userControlledShip.position.x += this.#userControlledShip.currAccX;
        this.#userControlledShip.currAccX *= PhysicsEngine.#resistance;
        this.#userControlledShip.position.y -= this.#userControlledShip.currAccY;
        this.#userControlledShip.currAccY *= PhysicsEngine.#resistance;
        this.#userControlledShip.position.angle += this.#userControlledShip.currAccAngular;
        this.#userControlledShip.currAccAngular *= PhysicsEngine.#angularResistance;

        console.log(this.#userControlledShip.position);

        // Wysyłamy
        this.#physicsChannel.postMessage({
            type: 'latestUserControlledShipPosition',
            position: this.#userControlledShip.position
        });

        if (this.i++ < 10) requestAnimationFrame(this.mainLoop.bind(this));
    }
}
