export class PhysicsEngine {
    #physicsCanvas;
    #physicsCanvasContext;
    #physicsChannel;

    constructor(physicsCanvas, physicsChannel) {
        this.#physicsCanvas = physicsCanvas;
        this.#physicsCanvasContext = this.#physicsCanvas.getContext("2d");
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => {
            console.log(data);
        };

        this.mainLoop();
    }

    mainLoop() {
        this.#physicsCanvasContext.reset();

        this.#physicsCanvasContext.strokeStyle = 'Green';
        this.#physicsCanvasContext.lineWidth = 5;
        this.#physicsCanvasContext.beginPath();
        this.#physicsCanvasContext.moveTo(300, 10);
        this.#physicsCanvasContext.lineTo(10, 300);
        this.#physicsCanvasContext.stroke();

        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
