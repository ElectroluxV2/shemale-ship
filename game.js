import { Ship } from "./ship.js";
import { Pos } from "./pos.js";
import { PhysicsEngine } from "./physics.js"

export class Game {
    keyboardStates = new Map();
    #ship;
    #canvas;
    #context;

    constructor(offScreenCanvas) {
        this.#canvas = offScreenCanvas;
        this.#context = this.#canvas.getContext("2d");

        // Add main ship
        this.#ship = new Ship(new Pos(this.#canvas.width / 2, this.#canvas.height / 2, 45));

        this.mainLoop();
    }

    mainLoop() {
        // Measure frame time
        const start = performance.now();

        // Clear screen
        this.#context.reset();

        // Handle user input (In feature communicate with physic worker)
        if (this.keyboardStates["D"] || this.keyboardStates["d"]) {
            PhysicsEngine.accRight(this.#ship, 0.5);
        }

        if (this.keyboardStates["A"] || this.keyboardStates["a"]) {
            PhysicsEngine.accLeft(this.#ship, 0.5);
        }

        if (this.keyboardStates["S"] || this.keyboardStates["s"]) {
            // const direction = this.#ship.angledVector().reverse().multiply(1);
            // PhysicsEngine.accX(this.#ship, direction.x);
            // PhysicsEngine.accY(this.#ship, direction.y);
            PhysicsEngine.acc(this.#ship, -1)
        }

        if (this.keyboardStates["W"] || this.keyboardStates["w"]) {
            // const direction = this.#ship.angledVector().multiply(1);
            // PhysicsEngine.accX(this.#ship, direction.x);
            // PhysicsEngine.accY(this.#ship, direction.y);
            PhysicsEngine.acc(this.#ship, 1)
        }

        PhysicsEngine.physicsLoop(this.#ship);

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
