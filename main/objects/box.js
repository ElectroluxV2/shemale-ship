import { Point } from './point.js';
import { Position } from './position.js';

export class Box {
    /**
     * @var {Point} topLeft Top left corner of box
     */
    topLeft;

    /**
     * @var {Point} bottomRight Bottom right corner of box
     */
    bottomRight;

    /**
     * Creates Box
     * @param topLeft {Point} Top left corner of box
     * @param bottomRight {Point} Bottom right corner of box
     * @param position {Position} Entity's position
     */
    constructor(topLeft, bottomRight, position) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    /**
     * Returns true if point is inside Box
     * @param box {Box} Box to check on
     * @param point {Point} Point to check
     * @returns {boolean}
     */
    static isPointInside(box, point) {
        return point.x < box.bottomRight.x && point.x > box.topLeft.x && point.y < box.bottomRight.y && point.y > box.topLeft.y;
    }

    /**
     * Constructs Box on two points
     * @param p1 {Point} First point
     * @param p2 {Point} Second point
     * @returns {Box}
     */
    static fromPoints(p1, p2, position) {
        if (p1.x > p2.x && p1.y < p2.y) {
            return new Box(new Point(p2.x, p1.y), new Point(p1.x, p2.y), position);
        } else if (p1.x < p2.x && p1.y < p2.y) {
            return new Box(p1, p2, position);
        } else if (p1.x > p2.x && p1.y > p2.y) {
            return new Box(p2, p1, position);
        } else {
            return new Box(new Point(p1.x, p2.y), new Point(p2.x, p1.y), position);
        }
    }

    /**
     * Constructs Box on vertices
     * @param vertices {Point[]} Vertices
     * @returns {Box}
     */
    static fromVertices(vertices, position) {
        let min = new Point(Number.MAX_VALUE, Number.MAX_VALUE), max = new Point(Number.MIN_VALUE, Number.MIN_VALUE);
        for (const vertex of vertices) {
            if (vertex.x < min.x) min.x = vertex.x;
            if (vertex.y < min.y) min.y = vertex.y;

            if (vertex.x > max.x) max.x = vertex.x;
            if (vertex.y > max.y) max.y = vertex.y;
        }
        console.log(min, max)
        return Box.fromPoints(min, max, position);
    }

    /**
     * Returns true if point is inside Box
     * @param point Point to check
     * @returns {boolean}
     */
    isPointInside(point) {
        return Box.isPointInside(this, point);
    }

    /**
     * Draws box on given context
     * @param ctx {CanvasRenderingContext2D} Canvas context
     * @param origin {Point} Origin
     */
    draw(ctx, origin, entity_origin) {
        ctx.beginPath();
        ctx.moveTo(this.topLeft.x + origin.x + entity_origin.x, this.topLeft.y + origin.y + entity_origin.y);
        ctx.lineTo(this.bottomRight.x + origin.x + entity_origin.x, this.topLeft.y + origin.y + entity_origin.y);
        ctx.lineTo(this.bottomRight.x + origin.x + entity_origin.x, this.bottomRight.y + origin.y + entity_origin.y);
        ctx.lineTo(this.topLeft.x + origin.x + entity_origin.x, this.bottomRight.y + origin.y + entity_origin.y);
        ctx.closePath();
        ctx.strokeStyle = 'lime';
        ctx.stroke();
    }
}
