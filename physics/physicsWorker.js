import { PhysicsEngine } from './physicsEngine.js';
import { Polyfills } from '../utils/polyfills.js';

const workerContext = {
    // Contains physics engine, can not be const because engine needs communication channel with main worker
    physicsEngine: null,
    physicsChannel: null,
    physicsCanvas: null,
    assignPhysicsChannel: ({physicsChannel}) => {
        workerContext.physicsChannel = physicsChannel;
    },
    transferCanvas: ({canvas, windowInnerHeight, windowInnerWidth, windowDevicePixelRatio}) => {
        workerContext.physicsCanvas = canvas;

        // Adjust to screen
        workerContext.physicsCanvas.height = windowInnerHeight * windowDevicePixelRatio;
        workerContext.physicsCanvas.width = windowInnerWidth * windowDevicePixelRatio;
        workerContext.physicsCanvas.getContext('2d').scale(windowDevicePixelRatio, windowDevicePixelRatio);

        // Crate new object only when canvas is present
        workerContext.physicsEngine = new PhysicsEngine(workerContext.physicsCanvas, workerContext.physicsChannel);
    },
    windowOnResize: ({windowInnerWidth, windowInnerHeight, windowDevicePixelRatio}) => {
        // Adjust to new dimensions
        workerContext.physicsCanvas.height = windowInnerHeight * windowDevicePixelRatio;
        workerContext.physicsCanvas.width = windowInnerWidth * windowDevicePixelRatio;
        workerContext.physicsCanvas.getContext('2d').scale(windowDevicePixelRatio, windowDevicePixelRatio);
    }
};

onmessage = ({data} = event) => workerContext[data.type](data);

// Polyfill for canvas.context.reset();
OffscreenCanvasRenderingContext2D.prototype.reset = Polyfills.canvasContextReset;
