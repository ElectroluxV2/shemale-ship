import { Ship } from "./ship.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let currentFrameRequestId;
const entities = [];
const keyboardSates = new Map();

const mainLoop = () => {

    if (keyboardSates["ArrowRight"]) {
        entities[0].pos.x++;
    }

    if (keyboardSates["ArrowLeft"]) {
        entities[0].pos.x--;
    }

    context.reset();

    for (const entity of entities) {
        entity.draw(context);
    }

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

    const ship = new Ship();
    ship.pos.setPos(100, 100);
    entities.push(ship);

    mainLoop();
};

initialize();
