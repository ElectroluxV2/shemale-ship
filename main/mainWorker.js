import { Game } from './game.js';
import { Polyfills } from '../utils/polyfills.js';

const workerContext = {
    game: null,
    physicsChannel: null,
    mainCanvas: null,
    windowOnKeyDown: ({key}) => {
        workerContext.game.keyboardStates[key] = true;
    },
    windowOnKeyUp: ({key}) => {
        workerContext.game.keyboardStates[key] = false;
    },
    windowOnResize: ({windowInnerWidth, windowInnerHeight, windowDevicePixelRatio}) => {
        // Adjust to new dimensions
        workerContext.mainCanvas.height = windowInnerHeight * windowDevicePixelRatio;
        workerContext.mainCanvas.width = windowInnerWidth * windowDevicePixelRatio;
        workerContext.mainCanvas.getContext("2d").scale(windowDevicePixelRatio, windowDevicePixelRatio);
    },
    assignPhysicsChannel: ({physicsChannel}) => {
        workerContext.physicsChannel = physicsChannel;
    },
    transferCanvas: ({canvas, windowInnerHeight, windowInnerWidth, windowDevicePixelRatio}) => {
        workerContext.mainCanvas = canvas;

        // Adjust to screen
        workerContext.mainCanvas.height = windowInnerHeight * windowDevicePixelRatio;
        workerContext.mainCanvas.width = windowInnerWidth * windowDevicePixelRatio;
        workerContext.mainCanvas.getContext("2d").scale(windowDevicePixelRatio, windowDevicePixelRatio);

        // Crate new object only when canvas is present
        workerContext.game = new Game(workerContext.mainCanvas, workerContext.physicsChannel);
    }
};

onmessage = ({data} = event) => workerContext[data.type](data);

// Polyfill for canvas.context.reset();
OffscreenCanvasRenderingContext2D.prototype.reset = Polyfills.canvasContextReset;
