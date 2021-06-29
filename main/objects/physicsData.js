export class PhysicsData {
    mass;
    acceleration;

    constructor(mass = 0, acceleration = {x: 0, y: 0, angular: 0}) {
        this.mass = mass;
        this.acceleration = acceleration;
    }

    import({mass, acceleration: {x, y, angular}}) {
        return new PhysicsData(mass, {x, y, angular});
    }
}
