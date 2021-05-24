export class PhysicsEngine {
    #physicsChannelPort;

    constructor(physicsChannelPort) {
        this.#physicsChannelPort = physicsChannelPort;
        this.#physicsChannelPort.onmessage = ({data} = event) => {
            console.log(data);
        };

        this.mainLoop();
    }

    mainLoop() {
        // Here calculate everything


        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
