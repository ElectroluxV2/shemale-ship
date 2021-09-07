    import { WorldMap } from './objects/worldMap.js';
import { Entity } from './entities/entity.js';
import { Chunk } from './objects/chunk.js';

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
        for (const parent of this.#worldMap.entities) {
            if (!parent instanceof Entity) continue;

            parent.color = '#FFF';
            const parentVertices = parent.vertices();
            const chunkCoordParent = Chunk.toChunkCoord(parent.position);
            const parentBox = parent.box;

            for (const child of this.#worldMap.entities) {
                if (!child instanceof Entity) continue;
                if (parent === child) continue;

                // Check chunk distance
                const chunkCoordChild = Chunk.toChunkCoord(child.position);
                const manhattanDistance = Math.abs(chunkCoordChild.x - chunkCoordParent.x) + Math.abs(chunkCoordChild.y - chunkCoordParent.y);

                
                // Every entity MUST be less in both dimensions than one chunk dimensions
                // TODO: Check if manually checking chunk by chunk's neighbour is faster than 4 unnecessary additional checks because of diagonal
                if (manhattanDistance > 2) continue;

                // Simple box check
                if (!parentBox.isBoxIntercepts(child.box)) {
                    // console.logs("LIGHT");
                    continue;
                }

                const childVertices = child.vertices();
           
                // Advanced box check
                if (!child.isColliding(this.#physicsCanvasContext, parentVertices, child.path(childVertices))
                && !parent.isColliding(this.#physicsCanvasContext, childVertices, parent.path(parentVertices))) {
                    // console.log("HARD");
                    continue;
                }

                // Do something when colliding
                parent.color = '#db3992';
                child.color = '#db3992';
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
