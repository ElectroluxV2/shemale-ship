import { GraphicEntity } from './graphicEntity.js';
import { Random } from '../utils/random.js';
import { Position } from '../utils/position.js';
import { Point } from '../utils/point.js'

export class Rock extends GraphicEntity {
    #sides;
    #size = 50;
    angles = [];
    rng = Random.getSeededRandom(this.id);
    constructor(position = new Position(), id = performance.now()) {
        super(position, id);
        this.#sides = (Math.random() * 10 % 8) + 5;
        this.#size = this.#sides * 10;

        let sum = 0;
        for (let i = 1; i < this.#sides - 1; i++) {
            let randFactor = ((Math.floor(this.rng() * 100) % 10) + 5);
            if (sum + 360 / this.#sides + randFactor > 360) break;
            sum += 360 / this.#sides + randFactor;
            this.angles.push(sum);
        }
    }

    get size() {
        return this.#size;
    }

    get sides() {
        return this.#sides;
    }

    static vertices(object) {
        const result = []
        result.push(new Point(object.position.x + object.size * Math.cos(0), object.position.y - object.size * Math.sin(0)));
        for (let i = 0; i < object.sides - 1; i++) {
            let tempX = object.size * Math.cos(object.angles[i] * Math.PI / 180) + object.position.x;
            let tempY = object.size * Math.sin(object.angles[i] * Math.PI / 180) + object.position.y
            result.push(new Point(tempX, tempY));
        }
        return result
    }

    static path(vertices) {
        const path = new Path2D();
        path.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
            path.lineTo(vertices[i].x, vertices[i].y);
        }
        path.closePath();
        return path;
    }

    draw(ctx) {
        // body
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 3;
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.position.radians);
        ctx.translate(-this.position.x, -this.position.y);
        ctx.stroke(Rock.path(Rock.vertices(this)));
        ctx.resetTransform();

        // center
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);
        ctx.resetTransform();
    }
}
