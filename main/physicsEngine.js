import { WorldMap } from './objects/worldMap.js';
import { Entity } from './entities/entity.js';

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
        // TODO: threads
        // for (const parent of this.#worldMap.entities) {
        //     if (!parent instanceof Entity) continue;

        //     parent.color = '#FFF';
        //     const parentVertices = parent.vertices();

        //     for (const child of this.#worldMap.entities) {
        //         if (!child instanceof Entity) continue;
        //         if (parent === child) continue;

        //         const childVertices = child.vertices();


        //         // TODO: simple hit box
        //         if (child.isColliding(this.#physicsCanvasContext, parentVertices, child.path(childVertices)) || parent.isColliding(this.#physicsCanvasContext, childVertices, parent.path(parentVertices))) {

        //             parent.color = '#db3992';
        //             child.color = '#db3992';
        //         }
        //     }
        // }
    }

    collision2() {
        // TODO: threads
        for (const parent of this.#worldMap.entities) {
            if (!parent instanceof Entity) continue;

            parent.color = '#FFF';
            const parentVertices = parent.vertices();

            for (const child of this.#worldMap.entities) {
                if (!child instanceof Entity) continue;
                if (parent === child) continue;

                const childVertices = child.vertices();


                // TODO: simple hit box
                if (child.isColliding(this.#physicsCanvasContext, parentVertices, child.path(childVertices)) || parent.isColliding(this.#physicsCanvasContext, childVertices, parent.path(parentVertices))) {

                    parent.color = '#db3992';
                    child.color = '#db3992';
                }
            }
        }
    }

    tick() {
        this.#physicsCanvasContext.reset();
        this.collision();

        for (const entity of this.#worldMap.entities) {
            entity?.tick();
        }
    }
}
