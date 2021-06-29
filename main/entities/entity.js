import { Position } from '../objects/position.js';
import { Vector } from '../objects/vector.js';
import { Random } from '../utils/random.js';
import { Coord } from '../objects/coord.js';
import { Point } from '../objects/point.js';
import { PhysicsData } from '../objects/physicsData.js';
import { Chunk } from '../objects/chunk.js';

export class Entity extends EventTarget {
    static EVENT_ON_CHUNK_CHANGE = 'EVENT_ON_CHUNK_CHANGE';
    #id;
    #position;
    #random;
    #physicsData;
    #onChunkChange;
    chunkCoord;

    /**
     * Creates new entity with id and position
     * @param id {Number} Preassigned id of object
     * @param position {Position} Initial position of object
     */
    constructor(id = null, position = new Position()) {
        super();
        this.#id = id ?? Math.trunc(performance.now() * 1000000);
        Object.freeze(this.#id);
        this.#position = position;
        this.#random = Random.getSeededRandom(this.#id);
        this.#physicsData = new PhysicsData();

        this.chunkCoord = {
            now: new Coord(),
            old: new Coord()
        };

        this.#onChunkChange = new CustomEvent(Entity.EVENT_ON_CHUNK_CHANGE, {
            detail: {
                entity: this
            }
        });

        this.position.addEventListener(Coord.EVENT_CHANGE, this.#onCoordChange.bind(this));
    }

    #onCoordChange() {
        this.chunkCoord.old = this.chunkCoord.now;
        this.chunkCoord.now = Chunk.toChunkCoord(this.position);

        if (this.chunkCoord.old.x === this.chunkCoord.now.x && this.chunkCoord.old.y === this.chunkCoord.now.y) {
            return;
        }

        this.dispatchEvent(this.#onChunkChange);
    }

    /**
     * Sets object position
     * @param value {Position} May be object literal too
     */
    set position(value) {
        this.#position = value instanceof Position ? value : new Position().import(value);
    }

    /**
     * Gets position
     * @return {Position} position
     */
    get position() {
        return this.#position;
    }

    /**
     * Sets objects physical data
     * @param value {PhysicsData} May be object literal too
     */
    set physicsData(value) {
        this.#physicsData = value instanceof PhysicsData ? value : new PhysicsData().import(value);
    }

    /**
     * Gets physical data
     * @returns {PhysicsData}
     */
    get physicsData() {
        return this.#physicsData;
    }

    /**
     * Gets id
     * @return {Number} id
     */
    get id() {
        return this.#id;
    }

    /**
     * Read only seeded random
     * @returns {Function}
     */
    get random() {
        return this.#random;
    }

    /**
     * Gets Angled Vector
     * @return {Vector} Angled Vector
     */
    angledVector() {
        return Vector.j.multiply(Math.cos(this.position.radians)).add(Vector.i.multiply(Math.sin(this.position.radians)));
    }

    /**
     * Check collision of points with path
     * @param ctx {CanvasRenderingContext2D} Canvas to call isPointInPath on
     * @param points {Point[]} Array of construction points, each point will be tested if is within path
     * @param path {Path2D} Path to test if point is within
     * @return {boolean} Returns true if any point is within given path
     */
    isColliding(ctx, points, path) {
        ctx.lineWidth = path.lineWidth;

        for (const point of points) {
            if (ctx.isPointInPath(path, point.x, point.y)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Draws entity on canvas
     * @param ctx {CanvasRenderingContext2D} Canvas to draw on
     * @param origin {Coord} Origin point that object rotates around
     */
    draw(ctx, origin) {
        console.warn('Not implemented!');
        console.trace(this);
    }

    /**
     * Handles physics etc.
     */
    tick() {
        console.warn('Not implemented!');
        console.trace(this);
    }

    /**
     * Gets rotated vertices from current state of object
     * @param origin {Point} Origin point, used in rotation
     * @returns {Point[]} Vertices
     */
    vertices(origin = new Point(0, 0)) {
        console.warn('Not implemented!');
        console.trace(this);
        return [];
    }

    /**
     * Gets path from current state of object
     * @param vertices {Point[]} Rotated vertices
     * @returns Path2D Path
     */
    path(vertices) {
        console.warn('Not implemented!');
        console.trace(this);
        return new Path2D();
    }
}
