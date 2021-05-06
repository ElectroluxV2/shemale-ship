import { Ship } from "./ship.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let currentFrameRequestId;
const entities = [];

const mainLoop = () => {

    // context.reset();

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

    const ship = new Ship();
    ship.pos.setPos(100, 100);
    entities.push(ship);

    mainLoop();
};

initialize();
