import { Entity } from './entity.js';
import { Polyfills } from '../utils/polyfills.js';
import { Position } from '../objects/position.js';
import { Point } from '../objects/point.js';
import { Chunk } from '../objects/chunk.js';
import { PhysicsEngine } from '../physicsEngine.js';

export class UserControlledShip extends Entity {
    static #DRAW_VERTICES = true;
    static #DRAW_BOX = true;
    static ID = -1;
    static thrustLeft = 0.8;
    static thrustRight = UserControlledShip.thrustLeft;
    static thrustForward = 1;
    static thrustBackward = 0.2;
    #color = '#FFF';

    constructor(position) {
        super(UserControlledShip.ID, position);
    }

    vertices() {
        const position = new Position(this.position.x, this.position.y, this.position.angle);
        const result = [];
        result.push(Polyfills.rotate(position, new Point(position.x - 36, position.y + 25), -position.radians));
        result.push(Polyfills.rotate(position, new Point(position.x + 36, position.y + 25), -position.radians));
        result.push(Polyfills.rotate(position, new Point(position.x, position.y - 65), -position.radians));
        return result;
    }

    path(vertices) {
        const gun = new Path2D(); 
        gun.rect(this.position.x-10,this.position.y-80, 20, 40);
        gun.closePath();

        const path = new Path2D();
        path.moveTo(vertices[0].x, vertices[0].y);
        path.lineTo(vertices[1].x, vertices[1].y);
        path.lineTo(vertices[2].x, vertices[2].y);
        path.closePath();

        path.lineWidth = 4;
        
        path.addPath(gun);
        return path;
    }

    draw(ctx) {
        // Body
        const vertices = this.vertices();
        const path = this.path(vertices);
        ctx.strokeStyle = this.#color;
        ctx.lineWidth = path.lineWidth;
        ctx.fillStyle = '#222';
        ctx.fill(path);
        ctx.stroke(path);

        if (UserControlledShip.#DRAW_VERTICES) {
            for (const vertex of vertices) {
                ctx.fillStyle = 'red';
                ctx.fillRect(vertex.x - 4, vertex.y - 4,4,4);

            }
        }

        if (UserControlledShip.#DRAW_BOX) {
            this.box.draw(ctx, this.position);
        }

        // center
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);

        ctx.fillStyle = '#a0937d';
        ctx.font = 'bold 16px Arial';

        const text = `${Chunk.toChunkCoord(this.position).x} ${Chunk.toChunkCoord(this.position).y}`;
        const textSize = ctx.measureText(text);
        ctx.fillText(text, this.position.x - textSize.width / 2, this.position.y + textSize.fontBoundingBoxAscent / 2);
    }

    tick() {
        if (Math.abs(this.physicsData.acceleration.x) > Number.EPSILON) {
            this.position.x += this.physicsData.acceleration.x;
            this.physicsData.acceleration.x *= PhysicsEngine.resistance;
        }

        if (Math.abs(this.physicsData.acceleration.y) > Number.EPSILON) {
            this.position.y -= this.physicsData.acceleration.y;
            this.physicsData.acceleration.y *= PhysicsEngine.resistance;
        }

        if (Math.abs(this.physicsData.acceleration.angular) > Number.EPSILON) {
            this.position.angle += this.physicsData.acceleration.angular;
            this.physicsData.acceleration.angular *= PhysicsEngine.angularResistance;
        }
    }
}
