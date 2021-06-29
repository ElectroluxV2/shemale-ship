import { WorldMap } from './objects/worldMap.js';

export class PhysicsEngine {
    static resistance = 0.95;
    static angularResistance = 0.85;
    #physicsCanvas;
    #physicsCanvasContext;
    #worldMap;

    /**
     *
     * @param physicsCanvas {CanvasRenderingContext2D} Canvas
     * @param worldMap {WorldMap} World map
     */
    constructor(physicsCanvas, worldMap) {
        this.#physicsCanvas = physicsCanvas;
        this.#physicsCanvasContext = this.#physicsCanvas.getContext('2d');
        this.#worldMap = worldMap;
    }

    collision() {

    }

    tick() {
        this.#physicsCanvasContext.reset();
        this.collision();

        for (const entity of this.#worldMap.entities) {
            entity?.tick();
        }
    }
}
