import { Ship } from "./ship.js";

const canvas = document.getElementById("canvas");
const canvasCTX = canvas.getContext("2d");
let currentFrameRequestId;
const entities = [];

const mainLoop = () => {
    canvasCTX.reset();

    for (const entity of entities) {
        entity.draw(canvasCTX);
    }

    currentFrameRequestId = window.requestAnimationFrame(mainLoop);
};

const initialize = () => {
    const ship = new Ship();
    entities.push(ship);
    mainLoop();
};
