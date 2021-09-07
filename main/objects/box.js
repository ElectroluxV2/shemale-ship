import { Point } from './point.js';
import { Position } from './position.js';

export class Box {
    /**
     * @var {Point} topLeft Top left corner of box
     */
    topLeft;

    /**
     * @var {Point} topRight Top right corner of box
     */
    topRight;

    /**
     * @var {Point} bottomLeft Bottom left corner of box
     */
    bottomLeft;

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
    constructor(topLeft, bottomRight) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
        
        this.topRight = new Point(bottomRight.x, topLeft.y);
        this.bottomLeft = new Point(topLeft.x, bottomRight.y);
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
    static fromPoints(p1, p2) {
        if (p1.x > p2.x && p1.y < p2.y) {
            return new Box(new Point(p2.x, p1.y), new Point(p1.x, p2.y));
        } else if (p1.x < p2.x && p1.y < p2.y) {
            return new Box(p1, p2);
        } else if (p1.x > p2.x && p1.y > p2.y) {
            return new Box(p2, p1);
        } else {
            return new Box(new Point(p1.x, p2.y), new Point(p2.x, p1.y));
        }
    }

    /**
     * Constructs Box on vertices
     * @param vertices {Point[]} Vertices
     * @returns {Box}
     */
    static fromVertices(vertices) {
        let min = new Point(Number.MAX_VALUE, Number.MAX_VALUE), max = new Point(-Number.MAX_VALUE, -Number.MAX_VALUE);
        for (const vertex of vertices) {
            if (vertex.x < min.x) min.x = vertex.x;
            if (vertex.y < min.y) min.y = vertex.y;

            if (vertex.x > max.x) max.x = vertex.x;
            if (vertex.y > max.y) max.y = vertex.y;
        }
        return Box.fromPoints(min, max);
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
     * Returns true if top left or bottom right corner of given box is inside this Box
     * @param box {Box} Box to check
     * @returns {boolean}
     */
    isBoxIntercepts(box) {
        return Box.isPointInside(this, box.topLeft) ||
        Box.isPointInside(this, box.topRight) ||
        Box.isPointInside(this, box.bottomLeft) ||
        Box.isPointInside(this, box.bottomRight) ||

        Box.isPointInside(box, this.topLeft) ||
        Box.isPointInside(box, this.topRight) ||
        Box.isPointInside(box, this.bottomLeft) ||
        Box.isPointInside(box, this.bottomRight);
    }

    /**
     * Draws box on given context
     * @param ctx {CanvasRenderingContext2D} Canvas context
     * @param origin {Point} Origin
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.topLeft.x, this.topLeft.y);
        ctx.lineTo(this.bottomRight.x, this.topLeft.y);
        ctx.lineTo(this.bottomRight.x, this.bottomRight.y);
        ctx.lineTo(this.topLeft.x, this.bottomRight.y);
        ctx.closePath();
        ctx.strokeStyle = 'lime';
        ctx.stroke();
    }
}
