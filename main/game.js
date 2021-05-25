import { Rock } from './rock.js';
import { Position } from '../utils/position.js';
import { UserControlledShip } from './userControlledShip.js';

export class Game {
    keyboardStates = new Map();
    entities = new Map();
    #userControlledShip = new UserControlledShip();
    #mainCanvas;
    #mainCanvasContext;
    #physicsChannel;

    constructor(mainCanvas, physicsChannel) {
        this.#mainCanvas = mainCanvas;
        this.#mainCanvasContext = this.#mainCanvas.getContext('2d');
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => this[data.type](data);

        const rock = new Rock(new Position(500, 500, 40.3));
        this.entities.set(rock.id, rock);

        this.mainLoop();
    }

    updateUserControlledShip({position}) {
        this.#userControlledShip.position.import(position);
    }

    updateEntityPosition({id, position}) {
        this.entities.get(id)?.position.import(position);
    }

    handleUserInput() {
        if (this.keyboardStates['w'] || this.keyboardStates['W']) {
            this.#physicsChannel.postMessage({
                type: 'onUserControlledShipAction',
                action: 'moveW'
            });
        }

        if (this.keyboardStates['s'] || this.keyboardStates['S']) {
            this.#physicsChannel.postMessage({
                type: 'onUserControlledShipAction',
                action: 'moveS'
            });
        }

        if (this.keyboardStates['a'] || this.keyboardStates['A']) {
            this.#physicsChannel.postMessage({
                type: 'onUserControlledShipAction',
                action: 'moveA'
            });
        }

        if (this.keyboardStates['d'] || this.keyboardStates['D']) {
            this.#physicsChannel.postMessage({
                type: 'onUserControlledShipAction',
                action: 'moveD'
            });
        }
    }

    mainLoop() {
        this.#mainCanvasContext.reset();

        this.handleUserInput();

        for (const rock of this.entities.values()) {
            rock.draw(this.#mainCanvasContext);
        }

        this.#userControlledShip.draw(this.#mainCanvasContext);

        // Print ship position
        this.#mainCanvasContext.fillStyle = '#a0937d';
        this.#mainCanvasContext.font = 'bold 16px Arial';

        const text = `${this.#userControlledShip.position.x.toFixed(2)} x, ${this.#userControlledShip.position.y.toFixed(2)} y, angle: ${this.#userControlledShip.position.angle.toFixed(2)}`;
        const textSize = this.#mainCanvasContext.measureText(text);
        this.#mainCanvasContext.fillText(text, this.#mainCanvas.width - textSize.width, textSize.fontBoundingBoxAscent);

        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
