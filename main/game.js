import { Rock } from './rock.js';
import { Position } from '../utils/position.js';
import { UserControlledShip } from './userControlledShip.js';

export class Game {
    keyboardStates = new Map();
    #userControlledShip = new UserControlledShip(new Position(200, 200));
    #mainCanvas;
    #mainCanvasContext;
    #physicsChannel;

    constructor(mainCanvas, physicsChannel) {
        this.#mainCanvas = mainCanvas;
        this.#mainCanvasContext = this.#mainCanvas.getContext('2d');
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => {
            switch (data.type) {
                case 'latestUserControlledShipPosition':
                    this.#userControlledShip.position.import(data.position);
                    break;
            }
        };

        this.mainLoop();
    }

    mainLoop() {
        this.#mainCanvasContext.reset();

        if (this.keyboardStates['w'] || this.keyboardStates['W']) {
            this.#physicsChannel.postMessage({
                type: 'userControlledShipMoveW'
            });
        }

        if (this.keyboardStates['s'] || this.keyboardStates['S']) {
            this.#physicsChannel.postMessage({
                type: 'userControlledShipMoveS'
            });
        }

        if (this.keyboardStates['a'] || this.keyboardStates['A']) {
            this.#physicsChannel.postMessage({
                type: 'userControlledShipMoveA'
            });
        }

        if (this.keyboardStates['d'] || this.keyboardStates['D']) {
            this.#physicsChannel.postMessage({
                type: 'userControlledShipMoveD'
            });
        }

        new Rock(new Position(500, 500, 40.3)).draw(this.#mainCanvasContext);
        this.#userControlledShip.draw(this.#mainCanvasContext);

        // Print ship position
        this.#mainCanvasContext.fillStyle = '#a0937d';
        this.#mainCanvasContext.font = 'bold 16px Arial';

        if (this.#userControlledShip.position instanceof Position) {
            const text = `${this.#userControlledShip.position.x.toFixed(2)} x, ${this.#userControlledShip.position.y.toFixed(2)} y, angle: ${this.#userControlledShip.position.angle.toFixed(2)}`;
            const textSize = this.#mainCanvasContext.measureText(text);
            this.#mainCanvasContext.fillText(text, this.#mainCanvas.width - textSize.width, textSize.fontBoundingBoxAscent);
        }

        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
