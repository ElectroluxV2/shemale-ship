import { Game } from "./game.js";

let game = null;
let physicsChannelPort = null;
let canvas = null;

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
            canvas.height = data.windowInnerHeight * data.windowDevicePixelRatio;
            canvas.width = data.windowInnerWidth * data.windowDevicePixelRatio;
            canvas.getContext("2d").scale(data.windowDevicePixelRatio, data.windowDevicePixelRatio);
            break;
        case "physicsChannel":
            physicsChannelPort = data.physicsChannelPort;
            break;
        case "transferCanvas":
            canvas = data.canvas;

            // Adjust to screen
            canvas.height = data.windowInnerHeight * data.windowDevicePixelRatio;
            canvas.width = data.windowInnerWidth * data.windowDevicePixelRatio;
            canvas.getContext("2d").scale(data.windowDevicePixelRatio, data.windowDevicePixelRatio);

            // Crate new object only when canvas is present
            game = new Game(canvas, physicsChannelPort);
            break;
    }
};
