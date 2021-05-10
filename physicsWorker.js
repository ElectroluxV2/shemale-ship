import { PhysicsEngine } from "./physicsEngine.js";

let physicsEngine = null;

onmessage = ({data} = event) => {

    switch (data.type) {
        case "physicsChannel":
            physicsEngine = new PhysicsEngine(data.physicsChannelPort);
            break;
    }
}
