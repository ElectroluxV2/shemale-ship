import { Entity } from "./entity.js";
import { PhysicsData } from "./physicsData.js";

export class UserControlledShip extends Entity {
    static thrustLeft = 1.5;
    static thrustRight = UserControlledShip.thrustLeft;
    static thrustForward = 1;
    static thrustBackward = 0.8;

    constructor(position) {
        super(new PhysicsData(position));
    }

    left() {
        this.physicsData.forces.thrust.left -= UserControlledShip.thrustLeft;
    }

    right() {
        this.physicsData.forces.thrust.right += UserControlledShip.thrustRight;
    }

    forward() {
        this.physicsData.forces.thrust.forward += UserControlledShip.thrustForward;
    }

    backward() {
        this.physicsData.forces.thrust.backward += UserControlledShip.thrustBackward;
    }

    draw(ctx) {
        ctx.lineWidth = 5;

        // center
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.physicsData.position.x-2, this.physicsData.position.y-2, 4, 4);

        // body
        ctx.translate(this.physicsData.position.x, this.physicsData.position.y);
        ctx.rotate(this.physicsData.position.angle * Math.PI / 180);
        ctx.translate(-this.physicsData.position.x, -this.physicsData.position.y);
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.physicsData.position.x-36, this.physicsData.position.y+25);
        ctx.lineTo(this.physicsData.position.x+36, this.physicsData.position.y+25);
        ctx.lineTo(this.physicsData.position.x, this.physicsData.position.y-65);
        ctx.closePath();
        ctx.stroke();

        // direction
        // ctx.translate(this.position.x, this.position.y);
        // ctx.rotate(-this.position.angle * Math.PI / 180);
        // ctx.translate(-this.position.x, -this.position.y);
        // ctx.strokeStyle = "#FF0000";
        // ctx.lineWidth = 1;
        // ctx.beginPath();
        // ctx.moveTo(this.position.x, this.position.y);
        // ctx.lineTo(this.position.x + 50 * this.angledVector().x, this.position.y - 50 * this.angledVector().y);
        // ctx.closePath();
        // ctx.stroke();
    };
}
