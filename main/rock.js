import { GraphicEntity } from './graphicEntity.js';
import { Random } from '../utils/random.js';
import { Position } from '../utils/position.js';
import { Point } from '../utils/point.js'

export class Rock extends GraphicEntity {
    color = '#FFF'; // TMP
    #sides;
    #size = 50;
    angles = [];
    rng;
    lineWidth = 3;

    constructor(id = performance.now(), position = new Position()) {
        super(id, position);
        this.rng = Random.getSeededRandom(this.id);
        this.#sides = Math.floor(this.rng() * 10) % 8 + 5;
        this.#size = this.#sides * 10;
        this.angles = Rock.generateRandomAngles(this.rng, this.sides);
    }

    static generateRandomAngles(rng, sides) {
        const angles = [];
        let sum = 0;
        for (let i = 0; i < sides - 1; i++) {
            let randFactor = ((Math.floor(rng() * 100) % 10) + 5);
            if (sum + 360 / sides + randFactor > 360) break;
            sum += 360 / sides + randFactor;
            angles.push(sum);
        }
        return angles;
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
        path.lineWidth = 3;
        path.closePath();
        return path;
    }

    static draw(ctx, object) {
        ctx.translate(object.position.x, object.position.y);
        ctx.rotate(object.position.radians);
        ctx.translate(-object.position.x, -object.position.y);

        const path = Rock.path(Rock.vertices(object));
        ctx.strokeStyle = object.color;
        ctx.lineWidth = path.lineWidth;
        ctx.stroke(path);

        // center
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(object.position.x - 2, object.position.y - 2, 4, 4);

        ctx.resetTransform();
    }
}
