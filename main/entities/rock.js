import { Entity } from './entity.js';
import { Position } from '../objects/position.js';
import { Point } from '../objects/point.js';
import { Polyfills } from '../utils/polyfills.js';
import { Chunk } from '../objects/chunk.js';
import { Vector } from '../objects/vector.js';

export class Rock extends Entity {
    #sides;
    #size;
    color = '#FFF';
    #angles = [];

    constructor(id = null, position = new Position()) {
        super(id, position);
        this.#sides = Math.floor(this.random() * 10) % 8 + 5;
        this.#size = this.#sides * 10;
        this.#angles = this.#generateRandomAngles();
        this.physicsData.mass = this.#size;

        const randAngle = Math.floor(this.random() * 400 % 330 + 30);
        const angled = Vector.j.multiply(Math.cos(randAngle * Math.PI / 180)).add(Vector.i.multiply(Math.sin(randAngle * Math.PI / 180))).multiply(60 / this.physicsData.mass);

        this.physicsData.acceleration.x = angled.x;
        this.physicsData.acceleration.y = angled.y;
        this.physicsData.acceleration.angular = randAngle / 100 * (50 / this.physicsData.mass);
    }

    #generateRandomAngles() {
        const angles = [];
        let sum = 0;
        for (let i = 0; i < this.#sides - 1; i++) {
            let randFactor = ((Math.floor(this.random() * 100) % 10) + 5);
            if (sum + 360 / this.#sides + randFactor > 360) break;
            sum += 360 / this.#sides + randFactor;
            angles.push(sum);
        }
        return angles;
    }

    vertices() {
        const position = new Position(this.position.x, this.position.y, this.position.angle);
        const result = [];
        const first = new Point(position.x + this.#size * Math.cos(0), position.y - this.#size * Math.sin(0));
        result.push(Polyfills.rotate(position, first, position.radians));
        for (let i = 0; i < this.#sides - 1; i++) {
            let tempX = this.#size * Math.cos(this.#angles[i] * Math.PI / 180) + position.x;
            let tempY = this.#size * Math.sin(this.#angles[i] * Math.PI / 180) + position.y;

            const temp = new Point(tempX, tempY);
            result.push(Polyfills.rotate(position, temp, position.radians));
        }
        return result;
    }

    path(vertices) {
        const path = new Path2D();
        path.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
            path.lineTo(vertices[i].x, vertices[i].y);
        }
        path.lineWidth = 3;
        path.closePath();
        return path;
    }

    draw(ctx) {
        const path = this.path(this.vertices());
        ctx.strokeStyle = this.color;
        ctx.lineWidth = path.lineWidth;
        ctx.stroke(path);

        this.box.draw(ctx);

        // center
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);

        ctx.fillStyle = '#a0937d';
        ctx.font = 'bold 16px Arial';

        const chunkCoord = Chunk.toChunkCoord(this.position);
        const text = `${chunkCoord.x} ${chunkCoord.y}`;
        const textSize = ctx.measureText(text);
        ctx.fillText(text, this.position.x - textSize.width / 2, this.position.y + textSize.fontBoundingBoxAscent / 2);
    }

    tick() {
        this.position.x += this.physicsData.acceleration.x;
        this.position.y -= this.physicsData.acceleration.y;
        this.position.angle += this.physicsData.acceleration.angular;
    }
}
