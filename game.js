import { UserControlledShip } from "./userControlledShip.js";
import { PhysicsEngine } from "./physicsEngine.js";
import { Position } from "./position.js";

export class Game {
    keyboardStates = new Map();
    #ship;
    #canvas;
    #context;
    #physicsEngine;

    constructor(offScreenCanvas) {
        this.#canvas = offScreenCanvas;
        this.#context = this.#canvas.getContext("2d");

        // Add main ship
        this.#ship = new UserControlledShip(new Position(this.#canvas.width / 2, this.#canvas.height / 2, 45));

        // Initialize physics engine
        this.#physicsEngine = new PhysicsEngine();

        this.mainLoop();
    }

    mainLoop() {
        // Measure frame time
        const start = performance.now();

        // Clear screen
        this.#context.reset();

        // Handle user input (In feature communicate with physic worker)
        if (this.keyboardStates["D"] || this.keyboardStates["d"]) {
            this.#ship.left();
        }

        if (this.keyboardStates["A"] || this.keyboardStates["a"]) {
            this.#ship.right();
        }

        if (this.keyboardStates["S"] || this.keyboardStates["s"]) {
            this.#ship.backward();
        }

        if (this.keyboardStates["W"] || this.keyboardStates["w"]) {
            this.#ship.forward();
        }

        this.#physicsEngine.addTask(this.#ship);

        this.#ship.draw(this.#context);

        this.#context.resetTransform()

        // Measure frame time
        const stop = performance.now()
        this.#context.fillStyle = "#a0937d";
        this.#context.font = "bold 16px Arial";
        const text = `${(1000 / (stop - start)).toFixed(2)} fps`;
        const textSize = this.#context.measureText(text);
        this.#context.fillText(text, this.#canvas.width - textSize.width, textSize.fontBoundingBoxAscent);

        // Loop
        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
