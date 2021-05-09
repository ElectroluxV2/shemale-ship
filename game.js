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
        this.#ship = new Ship(new Pos(this.#canvas.width / 2, this.#canvas.height / 2, 1231345234.12312324154));

        this.mainLoop();
    }

    mainLoop() {
        // Measure frame time
        const start = performance.now();

        // Clear screen
        this.#context.reset();

        // Handle user input (In feature communicate with physic worker)
        if (this.keyboardStates["D"] || this.keyboardStates["d"]) {
            PhysicsEngine.accRight(this.#ship, 0.05)
        }

        if (this.keyboardStates["A"] || this.keyboardStates["a"]) {
            PhysicsEngine.accLeft(this.#ship, 0.05)
        }

        if (this.keyboardStates["S"] || this.keyboardStates["s"]) {
            const direction = this.#ship.angledVector().reverse();
            PhysicsEngine.accX(this.#ship, direction.x);
            PhysicsEngine.accY(this.#ship, direction.y);
        }

        if (this.keyboardStates["W"] || this.keyboardStates["w"]) {
            const direction = this.#ship.angledVector();
            PhysicsEngine.accX(this.#ship, direction.x);
            PhysicsEngine.accY(this.#ship, direction.y);
        }

        PhysicsEngine.physicsLoop(this.#ship);

        this.#ship.draw(this.#context);
        this.#context.resetTransform()

        let counter = 0;
        for (let i = 0; i < 1000000; i++) {
            counter ++;
        }

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
