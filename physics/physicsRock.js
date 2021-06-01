import { PhysicsEntity } from './physicsEntity.js';
import { Position } from '../utils/position.js';
import { Random } from '../utils/random.js';
import { Rock } from '../main/rock.js';

export class PhysicsRock extends PhysicsEntity {
    sides;
    size;
    angles = [];
    rng;

    constructor(id, position = new Position(0, 0, 0)) {
        super(id, position);
        this.rng = Random.getSeededRandom(this.id);
        this.sides = Math.floor(this.rng() * 10) % 8 + 5;
        this.size = this.sides * 10;
        this.angles = Rock.generateRandomAngles(this.rng, this.sides)
    }

    path(vertices) {
        return Rock.path(vertices);
    }

    get vertices() {
        return Rock.vertices(this);
    }


    isColliding(ctx, other) {
        const myVertices = this.vertices;
        const myPath = this.path(myVertices);

        const otherVertices = other.vertices;
        const otherPath = other.path(myVertices);

        ctx.resetTransform();
        //Rock.draw(ctx, other, 'red');
        Rock.draw(ctx, other, 'red')

        for (const myVertex of myVertices) {
            if (ctx.isPointInPath(otherPath, myVertex.x, myVertex.y)) {
                ctx.resetTransform();
                return true;
            }

        }

        ctx.resetTransform();
        //Rock.draw(ctx, this, 'green');
        //
        // for (const otherVertex of otherVertices) {
        //     if (ctx.isPointInPath(myPath, otherVertex.x, otherVertex.y)) {
        //         ctx.resetTransform();
        //         return true;
        //     }
        // }
        //
        // ctx.resetTransform();
        return false;
    }
}
