import { Game } from './game.js';
import { Polyfills } from '../utils/polyfills.js';

const workerContext = {
    game: null,
    mainCanvas: null,
    physicsWorkerToMainWorkerChannel: null,
    constructor: ({canvas, window, physicsWorkerToMainWorkerChannel}) => {
        workerContext.physicsWorkerToMainWorkerChannel = physicsWorkerToMainWorkerChannel;
        workerContext.mainCanvas = canvas;
        workerContext.windowOnResize({window});
        workerContext.game = new Game(workerContext.mainCanvas, window, physicsWorkerToMainWorkerChannel);
    },
    windowOnKeyDown: ({key}) => {
        workerContext.game.keyboardStates[key] = true;
    },
    windowOnKeyUp: ({key}) => {
        workerContext.game.keyboardStates[key] = false;
    },
    windowOnResize: ({window}) => {
        // Adjust to new dimensions
        workerContext.mainCanvas.height = window.innerHeight * window.devicePixelRatio;
        workerContext.mainCanvas.width = window.innerWidth * window.devicePixelRatio;
        workerContext.mainCanvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
    },
    onPointerMove: ({x, y}) => {
        workerContext.physicsWorkerToMainWorkerChannel?.postMessage({
            type: 'onPointerMove',
            x,
            y
        });
    }
};

onmessage = ({data} = event) => workerContext[data.type](data);

// Polyfill for canvas.context.reset();
OffscreenCanvasRenderingContext2D.prototype.reset = Polyfills.canvasContextReset;
