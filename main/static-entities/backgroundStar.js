import { StaticEntity } from './staticEntity.js';
import { Position } from '../objects/position.js';
import { Point } from '../objects/point.js';
import { Polyfills } from '../utils/polyfills.js';

export class BackgroundStar extends StaticEntity {
    static #MAX_SIZE = 10;
    static #MIN_SIZE = 4;
    #size;

    constructor(position = new Position()) {
        super(null, position);
        this.#size = (this.random() * (BackgroundStar.#MAX_SIZE - BackgroundStar.#MIN_SIZE + 1) + BackgroundStar.#MIN_SIZE) << 0;
    }

    vertices() {
        const position = new Position(this.position.x, this.position.y, this.position.angle);
        const result = [];
        for (let i = 0; i < 6; i++) {
            let tempX = this.#size * Math.cos(i * 60 * Math.PI / 180) + position.x;
            let tempY = this.#size * Math.sin(i * 60 * Math.PI / 180) + position.y;

            const temp = new Point(tempX, tempY);
            result.push(Polyfills.rotate(position, temp, position.radians));
        }
        return result;
    }

    path(vertices) {
        const path = new Path2D();
        for (let i = 0; i < 3; i++) {
            path.moveTo(vertices[i].x, vertices[i].y)
            path.lineTo(vertices[i + 3].x, vertices[i + 3].y)
        }
        path.closePath();
        return path;
    }

    draw(ctx) {
        const gradient = ctx.createRadialGradient(this.position.x, this.position.y, 1, this.position.x, this.position.y, 30);
        gradient.addColorStop(0, '#FFFFFF30');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.#size * this.#size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        const path = this.path(this.vertices());
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 1;
        ctx.stroke(path);
        ctx.closePath();
    }
}
