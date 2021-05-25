import { GraphicEntity } from './graphicEntity.js';

export class Rock extends GraphicEntity {
    #sides = 6;
    #size = 50;

    set sides(value) {
        this.#sides = value;
    }

    get sides() {
        return this.#sides;
    }

    sign(x) {
        if (x % 2 === 0) {
            return -1;
        } else return 1;
    }

    draw(ctx) {
        //center

        ctx.fillStyle = '#FF0000';

        ctx.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);

        // body
        ctx.strokeStyle = '#FFF'
        ctx.lineWidth = 3;
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.position.angle * Math.PI / 180);
        ctx.translate(-this.position.x, -this.position.y);

        ctx.beginPath();
        ctx.moveTo(this.position.x + this.#size * Math.cos(0), this.position.y - this.#size * Math.sin(0));
        ctx.lineTo(this.position.x + this.#size * Math.cos(0), this.position.y - this.#size * Math.sin(0));
        for(let i = 1; i < this.#sides; i++){
            let tempX = this.#size * Math.cos((2 * Math.PI * i ) / this.#sides) + this.position.x;
            let tempY = this.#size * Math.sin((2 * Math.PI * i ) / this.#sides) + this.position.y;
            ctx.lineTo(tempX, tempY);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.resetTransform();
    }
}
