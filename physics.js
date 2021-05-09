export class PhysicsEngine {

static opor = 0.3

static accX(entity, value){
    entity.currAccX += value
}

static accY(entity, value){
    entity.currAccY += value
}

static accLeft(entity, value){
    entity.currAccAngular -= value
}

static accRight(entity, value){
    entity.currAccAngular += value
}

static physicsLoop(entity){
    entity.position.x += entity.currAccX;
    entity.currAccX -= PhysicsEngine.opor;
    entity.position.y += entity.currAccY;
    entity.currAccY -= PhysicsEngine.opor;
    entity.position.angle += entity.currAccAngular;

    if (entity.currAccX < 0) entity.currAccX = 0;
    if (entity.currAccY < 0) entity.currAccY = 0;
}

}