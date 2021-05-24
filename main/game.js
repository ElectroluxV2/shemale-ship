import { Rock } from './rock.js';
import { Position } from './position.js';

export class Game {
    keyboardStates = new Map();
    #userControlledShip;
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

        // New Ship();
        this.mainLoop();
    }

    mainLoop() {
        this.#mainCanvasContext.reset();

        this.#mainCanvasContext.strokeStyle = 'Red';
        this.#mainCanvasContext.lineWidth = 5;
        this.#mainCanvasContext.beginPath();
        this.#mainCanvasContext.moveTo(10, 10);
        this.#mainCanvasContext.lineTo(200, 200);
        this.#mainCanvasContext.stroke();


        // new Rock(new Position(200, 200, 40.3)).draw(this.#mainCanvasContext);


        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
