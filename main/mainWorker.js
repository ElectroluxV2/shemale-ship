import { Game } from './game.js';

// Polyfill for canvas.context.reset();
OffscreenCanvasRenderingContext2D.prototype.reset = OffscreenCanvasRenderingContext2D.prototype.reset || function (preserveTransform) {
    if (preserveTransform) {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
        this.restore();
    }
};

// Main Worker variables received from browsers main thread
let game = null;
let physicsChannel = null;
let mainCanvas = null;

onmessage = ({data} = event) => {
    switch (data.type) {
        case "windowOnKeyDown":
            game.keyboardStates[data.key] = true;
            break;
        case "windowOnKeyUp":
            game.keyboardStates[data.key] = false;
            break;
        case "windowOnResize":

            // Adjust to new dimensions
            mainCanvas.height = data.windowInnerHeight * data.windowDevicePixelRatio;
            mainCanvas.width = data.windowInnerWidth * data.windowDevicePixelRatio;
            mainCanvas.getContext("2d").scale(data.windowDevicePixelRatio, data.windowDevicePixelRatio);
            break;
        case "physicsChannel":
            physicsChannel = data.physicsChannel;
            break;
        case "transferCanvas":
            mainCanvas = data.canvas;

            // Adjust to screen
            mainCanvas.height = data.windowInnerHeight * data.windowDevicePixelRatio;
            mainCanvas.width = data.windowInnerWidth * data.windowDevicePixelRatio;
            mainCanvas.getContext("2d").scale(data.windowDevicePixelRatio, data.windowDevicePixelRatio);

            // Crate new object only when canvas is present
            game = new Game(mainCanvas, physicsChannel);
            break;
        default:
            console.warn(`Undefined data type "${data.type}"`, data);
    }
}
