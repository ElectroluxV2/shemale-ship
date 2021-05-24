export class Game {
    keyboardStates = new Map();
    #userControlledShip;
    #canvas;
    #context;
    #physicsChannelPort;

    constructor(offScreenCanvas, physicsChannelPort) {
        this.#canvas = offScreenCanvas;
        this.#context = this.#canvas.getContext("2d");
        this.#physicsChannelPort = physicsChannelPort;
        this.#physicsChannelPort.onmessage = ({data} = event) => {
            console.log(data);
        };

        // New Ship();
        this.mainLoop();
    }

    mainLoop() {


        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
