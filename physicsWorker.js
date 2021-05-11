 import { PhysicsData } from "./physicsData.js";
 import { PhysicsEngine } from "./physicsEngine.js";

onmessage = ({data} = event) => {
    const taskId = data.taskId;
    const physicsData = PhysicsData.import(data.physicsData);

    // TODO: Move this logic to entity
    // Transform thrust into forces
    if (physicsData.forces.thrust.left) {
        physicsData.forces.acceleration.angular -= physicsData.forces.thrust.left;
        physicsData.forces.thrust.left = 0;
    }

    if (physicsData.forces.thrust.right) {
        physicsData.forces.acceleration.angular -= physicsData.forces.thrust.right;
        physicsData.forces.thrust.right = 0;
    }

    if (physicsData.forces.thrust.forward) {
        physicsData.forces.thrust.forward = 0;
        const directionForward = physicsData.position.angledVector();
        physicsData.forces.acceleration.x += directionForward.x;
        physicsData.forces.acceleration.y += directionForward.y;
    }

    if (physicsData.forces.thrust.backward) {
        physicsData.forces.thrust.backward = 0;
        const directionBackward = physicsData.position.angledVector().reverse();
        physicsData.forces.acceleration.x += directionBackward.x;
        physicsData.forces.acceleration.y += directionBackward.y;
    }
    // TODO: end

    // Calculate position
    physicsData.position.x += physicsData.forces.acceleration.x;
    physicsData.forces.acceleration.x *= PhysicsEngine.resistance;
    physicsData.position.y -= physicsData.forces.acceleration.y;
    physicsData.forces.acceleration.y *= PhysicsEngine.resistance;
    physicsData.position.angle += physicsData.forces.acceleration.angular;
    physicsData.forces.acceleration.angular *= PhysicsEngine.angularResistance;

    postMessage({
        taskId: taskId,
        physicsData: physicsData.export()
    });
}
