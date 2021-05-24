import { PhysicsEngine } from "./physicsEngine.js";

// Contains physics engine, can not be const because engine needs communication channel with main worker
let physicsEngine = null;

onmessage = ({data} = event) => {

    console.log(data);

    switch (data.type) {
        case "physicsChannel":
            physicsEngine = new PhysicsEngine(data.physicsChannelPort);
            break;
    }
}
