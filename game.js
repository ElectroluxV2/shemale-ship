import { Ship } from "./ship.js";
import { Pos } from "./pos.js";

export class Game {
    keyboardStates = new Map();
    #ship;
    #canvas;
    #context;

    constructor(offScreenCanvas) {
        this.#canvas = offScreenCanvas;
        this.#context = this.#canvas.getContext("2d");

        // Add main ship
        this.#ship = new Ship(new Pos(this.#canvas.width / 2, this.#canvas.height / 2, 1231345234.12312324154));

        this.mainLoop();
    }

    mainLoop() {
        // Measure frame time
        const start = performance.now();

        // Clear screen
        this.#context.reset();

        // Handle user input (In feature communicate with physic worker)
        if (this.keyboardStates["D"]) {

        }

        if (this.keyboardStates["A"]) {

        }

        if (this.keyboardStates["S"]) {

        }

        this.#ship.draw(this.#context);
        this.#context.resetTransform()

        // Measure frame time
        const stop = performance.now()
        this.#context.fillStyle = "#a0937d";
        this.#context.font = "bold 16px Arial";
        const text = `${1000 / (stop - start)}`;
        const textSize = this.#context.measureText(text);
        this.#context.fillText(text, this.#canvas.width - textSize.width, textSize.fontBoundingBoxAscent);

        // Loop
        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
