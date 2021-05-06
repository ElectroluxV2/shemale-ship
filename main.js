import { Ship } from "./ship.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let currentFrameRequestId;
const entities = [];
const keyboardSates = new Map();

let fps = 'test';

const mainLoop = () => {

    const start = performance.now();

    context.reset();
    context.save();

    for (const entity of entities) {

        if (keyboardSates["ArrowRight"]) {
            entity.pos.turnRight();
        }

        if (keyboardSates["ArrowLeft"]) {
            entity.pos.turnLeft();
        }

        entity.draw(context);
    }

    context.restore();
    context.fillStyle = "#a0937d";
    context.font = "bold 16px Arial";
    const textSize = context.measureText(fps);
    context.fillText(fps,  (canvas.width / 2) - (textSize.width / 2), canvas.height / 2);

    const stop = performance.now();

    fps = `${1000 / (stop - start)} fps`
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
        keyboardSates[event.key] = true;
    }

    window.onkeyup = event => {
        keyboardSates[event.key] = false;
    }

    for (let i = 0; i < 100000; i++) {
        const ship = new Ship();
        ship.pos.setPos(100, 100);
        entities.push(ship);
    }

    mainLoop();
};

initialize();
