import { GraphicEntity } from './graphicEntity.js';
import { Random } from '../utils/random.js';
import { Position } from '../utils/position.js';

export class Rock extends GraphicEntity {
    #sides;
    #size = 50;

    constructor(position = new Position(), id = performance.now()) {
        super(position, id);
        this.#sides = (Math.random() * 10 % 8) + 5;
        this.#size = this.#sides * 10;
    }

    get size(){
        return this.#size;
    }

    draw(ctx) {
        //center

        // ctx.fillStyle = '#FF0000';
        // ctx.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);

        // body
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 3;
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.position.angle * Math.PI / 180);
        ctx.translate(-this.position.x, -this.position.y);

        ctx.beginPath();
        ctx.moveTo(this.position.x + this.#size * Math.cos(0), this.position.y - this.#size * Math.sin(0));
        ctx.lineTo(this.position.x + this.#size * Math.cos(0), this.position.y - this.#size * Math.sin(0));

        let randFactor = 0;
        let sum = 0;
        const rng = Random.getSeededRandom(this.id);

        for (let i = 1; i < this.#sides - 1; i++) {
            randFactor = ((Math.floor(rng() * 100) % 10) + 5);
            if (sum + 360 / this.#sides + randFactor > 360) break;
            sum +=  360 / this.#sides + randFactor;
            let tempX = this.#size * Math.cos(sum * Math.PI / 180) + this.position.x;
            let tempY = this.#size * Math.sin(sum * Math.PI / 180) + this.position.y;
            ctx.lineTo(tempX, tempY);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.resetTransform();
    }
}
