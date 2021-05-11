import { GraphicEntity } from "./graphicEntity.js"

export class Rock extends GraphicEntity{
    #sides = 8;
    #size = 50;
    set sides(value){
        this.#sides = value
    }

    get sides(){
        return this.#sides
    }

    draw(ctx){
        //center

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.position.x-2, this.position.y-2, 4, 4);

        // body

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.position.angle * Math.PI / 180);
        ctx.translate(-this.position.x, -this.position.y);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.position.x+this.#size, this.position.y);
        for(let i = 0; i < this.#sides; i++){
            let tempX = this.#size * Math.cos(2 * Math.PI * i / this.#sides) + this.position.x;
            let tempY = this.#size * Math.sin(2 * Math.PI * i /this.#sides) + this.position.y;
            ctx.lineTo(tempX, tempY);
        }
        ctx.closePath();
        ctx.stroke();
        //
    }
}