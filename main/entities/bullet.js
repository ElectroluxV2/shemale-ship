import { PhysicsData } from '../objects/physicsData.js';
import { Point } from '../objects/point.js';
import { Position } from '../objects/position.js';
import { Polyfills } from '../utils/polyfills.js';
import { Entity } from './entity.js';

export class Bullet extends Entity {
    #life = 90;
    #force = 10;
    constructor(worldMap, id = null, position){
        super(worldMap, id, position);
        const accX = this.#force * Math.cos(position.radians);
        const accY = this.#force * Math.sin(position.radians);
        // this.#worldMap = worldMap
        this.physicsData = new PhysicsData(1, {x: accX, y: accY, angular: 0})
    }
    
    vertices(){
        const result = [];
        result.push(Polyfills.rotate(this.position, new Point(this.position.x, this.position.y), -this.position.radians));
        result.push(Polyfills.rotate(this.position, new Point(this.position.x+5, this.position.y), -this.position.radians));
        return result;
    }

    path(vertices){
        const path = new Path2D();
        path.moveTo(vertices[0].x, vertices[0].y);
        path.lineTo(vertices[1].x, vertices[1].y);
        path.closePath();
        path.lineWidth = 6;
        return path;
    }

    draw(ctx){
        const vertices = this.vertices();
        const path = this.path(vertices);
        ctx.strokeStyle = "#FFF"
        ctx.lineWidth = path.lineWidth;
        ctx.stroke(path);
    }

    tick(){
        console.logs("żyje");
        if(this.#life == 0){
            this.worldMap.removeEntity(this.id);
        }
        this.position.x += this.physicsData.acceleration.x;
        this.position.y += this.physicsData.acceleration.y;
        this.#life -= 1; 
    }
}