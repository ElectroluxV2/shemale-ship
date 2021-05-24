import { Point } from "./point.js";

export class Vector extends Point {

    static i = Vector.makeVector(new Point(0, 0), new Point(1, 0));
    static j = Vector.makeVector(new Point(0, 0), new Point(0, 1));

    static makeVector(p1, p2) {
        return new Vector(p2.x - p1.x, p2.y - p1.y);
    }

    static perpendicularClockwise(vector) {
        return new Vector(vector.y, -vector.x);
    }

    static perpendicularCounterClockwise(vector) {
        return new Vector(-vector.y, vector.x);
    }

    static normalize(vector) {
        const length = this.magnitude(vector, vector);
        return new Vector(vector.x / length, vector.y / length);
    }

    static multiply(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }

    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static magnitude(v1, v2) {
        return Math.sqrt(v1.x * v2.x + v1.y * v2.y);
    }

    static reverse(v) {
        return new Vector(-v.x, -v.y);
    }

    perpendicularClockwise() {
        return Vector.perpendicularClockwise(this);
    }

    perpendicularCounterClockwise() {
        return Vector.perpendicularCounterClockwise(this);
    }

    normalize() {
        return Vector.normalize(this);
    }

    multiply(scalar) {
        return Vector.multiply(this, scalar);
    }

    add(v2) {
        return Vector.add(this, v2);
    }

    magnitude(v2) {
        return Vector.magnitude(this, v2);
    }

    reverse() {
        return Vector.reverse(this);
    }
}
