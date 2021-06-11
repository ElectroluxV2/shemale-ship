import { PhysicsEntity } from './physicsEntity.js';
import { Position } from '../utils/position.js';
import { Random } from '../utils/random.js';
import { Rock } from '../main/rock.js';
import { Polyfills } from '../utils/polyfills.js';

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
}
