import { PhysicsEngine } from "./physicsEngine.js";


let physicsEngine = null;

onmessage = ({data} = event) => {

    console.log(data);

    switch (data.type) {
        case "physicsChannel":
            physicsEngine = new PhysicsEngine(data.physicsChannelPort);
            break;
    }
}
