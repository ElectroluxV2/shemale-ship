export class PhysicsEngine {
    #physicsChannelPort;

    constructor(physicsChannelPort) {
        this.#physicsChannelPort = physicsChannelPort;
        this.#physicsChannelPort.postMessage("from PhysicsEngine");
        this.#physicsChannelPort.onmessage = console.log;
    }
}
