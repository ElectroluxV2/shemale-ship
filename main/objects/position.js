import { Coord } from './coord.js';

export class Position extends Coord {
    angle;
    onchange;
    handler;
    getHandler;
    setHandler;
    last;

    constructor(x = 0, y = 0, angle = 0) {
        super(x, y);
        this.angle = angle;
        const ctx = this;
        this.last = { };
        this.setHandler = (target, property, value) => {
            target[property] = value;
            if (!['x', 'y', 'angle'].includes(property)) return true;

            if (!(property in ctx.last) || Math.abs(ctx.last[property] - value) > Number.EPSILON) {
                ctx.onchange?.(this);
            }

            ctx.last[property] = value;
            return true;
        };

        this.getHandler = (target, property) => {
            return target[property];
        };

        this.handler = {
            set: (target, property, value) => {
                return this.setHandler(target, property, value);
            }, get: (target, property) => {
                return this.getHandler(target, property);
            }
        }

        return new Proxy(this, {
            set: (target, property, value) => {
                return this.handler.set(target, property, value);
            }, get: (target, property) => {
                return this.handler.get(target, property);
            }
        });
    }

    import({x, y, angle}) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    export() {
        return {
            x: this.x,
            y: this.y,
            angle: this.angle
        };
    }

    clone() {
        return new Position(this.x, this.y, this.angle);
    }

    get radians() {
        return this.angle * Math.PI / 180;
    }
}
