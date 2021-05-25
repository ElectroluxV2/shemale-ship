import { PhysicsEngine } from './physicsEngine.js';
import { Polyfills } from '../utils/polyfills.js';

const workerContext = {
    physicsEngine: null,
    physicsCanvas: null,
    constructor: ({canvas, window, physicsWorkerToMainWorkerChannel}) => {
        workerContext.physicsCanvas = canvas;
        workerContext.windowOnResize({window});
        workerContext.physicsEngine = new PhysicsEngine(workerContext.physicsCanvas, physicsWorkerToMainWorkerChannel);
    },
    windowOnResize: ({window}) => {
        // Adjust to new dimensions
        workerContext.physicsCanvas.height = window.innerHeight * window.devicePixelRatio;
        workerContext.physicsCanvas.width = window.innerWidth * window.devicePixelRatio;
        workerContext.physicsCanvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
    }
};

onmessage = ({data} = event) => workerContext[data.type](data);

// Polyfill for canvas.context.reset();
OffscreenCanvasRenderingContext2D.prototype.reset = Polyfills.canvasContextReset;
