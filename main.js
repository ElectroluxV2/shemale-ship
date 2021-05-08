import { Ship } from "./ship.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let currentFrameRequestId;
const entities = [];
const keyboard = new Worker("./keyboard.js");
let fps = 'test';

const mainLoop = () => {

    const start = performance.now();

    context.reset();
    context.save();

    for (const entity of entities) {

        entity.draw(context);
        context.resetTransform();
    }

    context.restore();
    context.fillStyle = "#a0937d";
    context.font = "bold 16px Arial";
    const textSize = context.measureText(fps);
    context.fillText(fps,  canvas.width - textSize.width, textSize.fontBoundingBoxAscent);

    const stop = performance.now();

    fps = `${(1000 / (stop - start)).toFixed(2)} fps`
    currentFrameRequestId = window.requestAnimationFrame(mainLoop);
};

const initialize = () => {
    // Change context dimensions
    canvas.height = canvas.parentElement.offsetHeight * window.devicePixelRatio;
    canvas.width = canvas.parentElement.offsetWidth * window.devicePixelRatio;
    context.scale(window.devicePixelRatio, window.devicePixelRatio);

    window.onresize = () => {
        canvas.height = canvas.parentElement.offsetHeight * window.devicePixelRatio;
        canvas.width = canvas.parentElement.offsetWidth * window.devicePixelRatio;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    window.onkeydown = event => {
        keyboard.postMessage({ship: ship, key: event.key, state: true});
    }

    window.onkeyup = event => {
        keyboard.postMessage({key: event.key, state: false});
    }

    const ship = new Ship();
    ship.pos.setPos(100, 100);
    ship.pos.angle = 0
    entities.push(ship);
    mainLoop();
};

initialize();
