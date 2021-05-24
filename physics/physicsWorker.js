import { PhysicsEngine } from "./physicsEngine.js";

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

// Contains physics engine, can not be const because engine needs communication channel with main worker
let physicsEngine = null;
let physicsChannel = null;
let physicsCanvas = null;

onmessage = ({data} = event) => {
    switch (data.type) {
        case "windowOnResize":

            // Adjust to new dimensions
            physicsCanvas.height = data.windowInnerHeight * data.windowDevicePixelRatio;
            physicsCanvas.width = data.windowInnerWidth * data.windowDevicePixelRatio;
            physicsCanvas.getContext("2d").scale(data.windowDevicePixelRatio, data.windowDevicePixelRatio);
            break;
        case "physicsChannel":
            physicsChannel = data.physicsChannel;
            break;
        case "transferCanvas":
            physicsCanvas = data.canvas;

            // Adjust to screen
            physicsCanvas.height = data.windowInnerHeight * data.windowDevicePixelRatio;
            physicsCanvas.width = data.windowInnerWidth * data.windowDevicePixelRatio;
            physicsCanvas.getContext("2d").scale(data.windowDevicePixelRatio, data.windowDevicePixelRatio);

            // Crate new object only when canvas is present
            physicsEngine = new PhysicsEngine(physicsCanvas, physicsChannel);
            break;
        default:
            console.warn(`Undefined data type "${data.type}"`, data);
    }
}
