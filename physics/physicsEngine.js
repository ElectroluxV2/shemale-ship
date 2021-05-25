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
        this.#physicsCanvasContext = this.#physicsCanvas.getContext('2d');
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => {

            if (data.type === 'userControlledShipMoveW') {
                const angled = this.#userControlledShip.angledVector().multiply(UserControlledShip.thrustForward);
                this.#userControlledShip.currAccX += angled.x;
                this.#userControlledShip.currAccY += angled.y;

            } else if (data.type === 'userControlledShipMoveS') {
                const angled = this.#userControlledShip.angledVector().reverse().multiply(UserControlledShip.thrustBackward);
                this.#userControlledShip.currAccX += angled.x;
                this.#userControlledShip.currAccY += angled.y;

            } else if (data.type === 'userControlledShipMoveA') {
                this.#userControlledShip.currAccAngular -= UserControlledShip.thrustLeft;

            } else if (data.type === 'userControlledShipMoveD') {
                this.#userControlledShip.currAccAngular += UserControlledShip.thrustRight;

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

       // console.log(this.#userControlledShip.position);

        // Wysyłamy
        this.#physicsChannel.postMessage({
            type: 'latestUserControlledShipPosition',
            position: this.#userControlledShip.position.export()
        });

        //if (this.i++ < 50)
        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
