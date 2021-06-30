import { Polyfills } from './utils/polyfills.js';
import { Game } from './game.js';

const workerContext = {
    game: null,
    mainCanvas: null,
    physicsCanvas: null,
    constructor: ({mainCanvas, physicsCanvas, window}) => {
        workerContext.mainCanvas = mainCanvas;
        workerContext.physicsCanvas = physicsCanvas;
        workerContext.windowOnResize({window});
        workerContext.game = new Game(workerContext.mainCanvas, workerContext.physicsCanvas, window);
    },
    windowOnKeyDown: ({key}) => {
        workerContext.game.keyboardStates[key] = true;
    },
    windowOnKeyUp: ({key}) => {
        workerContext.game.keyboardStates[key] = false;
    },
    windowOnResize: ({window}) => {
        // Adjust to new dimensions
        workerContext.mainCanvas.height = window.innerHeight;
        workerContext.mainCanvas.width = window.innerWidth;
    },
    onPointerMove: ({x, y}) => {
        workerContext.game?.onPointerMove(x, y);
    }
};

onmessage = ({data} = event) => workerContext[data.function](data);

// Polyfill for canvas.context.reset();
OffscreenCanvasRenderingContext2D.prototype.reset = Polyfills.canvasContextReset;
