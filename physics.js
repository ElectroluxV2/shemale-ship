export class PhysicsEngine {

static opor = 0.97;
static katopor = 0.85;

// static accX(entity, value){
//     entity.currAccX += value
// }
//
// static accY(entity, value){
//     entity.currAccY += value
// }

static acc(entity, value){
    if (entity.currAcc < 15) {
        entity.currAcc += value;
    }
}

static accLeft(entity, value){
    entity.currAccAngular -= value
}

static accRight(entity, value){
    entity.currAccAngular += value
}

static physicsLoop(entity){

    // entity.position.x += entity.currAccX;
    // entity.currAccX *= PhysicsEngine.opor;
    // entity.position.y -= entity.currAccY;
    // entity.currAccY *= PhysicsEngine.opor;

    const direction = entity.angledVector();
    if (Math.abs(entity.currAcc) > 0.05) {
        entity.position.x += entity.currAcc * direction.x;
        entity.position.y -= entity.currAcc * direction.y;
        entity.currAcc *= PhysicsEngine.opor;
    } else {
        entity.currAcc = 0;
    }
    entity.position.angle += entity.currAccAngular;
    entity.currAccAngular *= PhysicsEngine.katopor

}

}