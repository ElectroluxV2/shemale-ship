export class Point {
    x;
    y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static distance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    static equals(p1, p2) {
        return Math.abs(p1.x - p2.x) < Number.EPSILON && Math.abs(p1.y - p2.y) < Number.EPSILON;
    }

    /**
     * Creates deep copy
     */
    duplicate() {
        return new Point(this.x, this.y);
    }

    distance(p2) {
        return Point.distance(this, p2);
    }

    equals(other) {
        return Point.equals(this, other);
    }
}
