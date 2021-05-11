import { Ship } from "./ship.js";
import { Pos } from "./pos.js";
import { Rock } from "./rock.js";

export class Game {
    keyboardStates = new Map();
    #ship;
    #canvas;
    #context;
    #physicsChannelPort;
    #rock;

    constructor(offScreenCanvas, physicsChannelPort) {
        this.#canvas = offScreenCanvas;
        this.#context = this.#canvas.getContext("2d");
        this.#physicsChannelPort = physicsChannelPort;
        this.#physicsChannelPort.onmessage = ({data} = event) => {
            switch (data.type) {
                case "receivePhysicsResultForEntity":
                    this.#ship.position.x = data.physicsData.x;
                    this.#ship.position.y = data.physicsData.y;
                    this.#ship.position.angle = data.physicsData.angle;
                    break;
            }
        };

        // Add main ship
        this.#ship = new Ship(new Pos(this.#canvas.width / 2, this.#canvas.height / 2, 45));
        this.#rock = new Rock(new Pos(100, 200, 0));
        this.mainLoop();
    }

    mainLoop() {
        // Measure frame time
        const start = performance.now();

        // Clear screen
        this.#context.reset();

        let physicsData = {thrustPresent:{}};

        // Handle user input (In feature communicate with physic worker)
        if (this.keyboardStates["D"] || this.keyboardStates["d"]) {
            physicsData.thrustPresent.accLeft = true;
        }

        if (this.keyboardStates["A"] || this.keyboardStates["a"]) {
            physicsData.thrustPresent.accRight = true;
        }

        if (this.keyboardStates["S"] || this.keyboardStates["s"]) {
            physicsData.thrustPresent.accBackward = true;
        }

        if (this.keyboardStates["W"] || this.keyboardStates["w"]) {
            physicsData.thrustPresent.accForward = true;
        }

        physicsData.x = this.#ship.position.x;
        physicsData.y = this.#ship.position.y;
        physicsData.angle = this.#ship.position.angle;

        // PhysicsEngine.physicsLoop(this.#ship);
        this.#physicsChannelPort.postMessage({
            type: "sendPhysicsDataForEntity",
            physicsData: physicsData
        });

        this.#physicsChannelPort.postMessage({
            type: "loop",
        });

        this.#ship.draw(this.#context);
        this.#context.resetTransform()
        this.#rock.draw(this.#context);
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
