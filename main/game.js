import { Rock } from './rock.js';
import { Position } from './position.js';
import { UserControlledShip } from './userControlledShip.js';

export class Game {
    keyboardStates = new Map();
    #userControlledShip = new UserControlledShip(new Position(200, 300));
    #mainCanvas;
    #mainCanvasContext;
    #physicsChannel;

    constructor(mainCanvas, physicsChannel) {
        this.#mainCanvas = mainCanvas;
        this.#mainCanvasContext = this.#mainCanvas.getContext('2d');
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => {
            console.log(data);
        };

        this.mainLoop();
    }

    mainLoop() {
        this.#mainCanvasContext.reset();
        this.#mainCanvasContext.resetTransform();

        new Rock(new Position(500, 500, 40.3)).draw(this.#mainCanvasContext);
        this.#userControlledShip.draw(this.#mainCanvasContext);


        // requestAnimationFrame(this.mainLoop.bind(this));
    }
}
