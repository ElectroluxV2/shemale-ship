import { Polyfills } from './utils/polyfills.js';

// Prepare all Workers
const mainWorker = new Worker('main/mainWorker.js', {
    type: 'module'
});

const physicsWorker = new Worker('physics/physicsWorker.js', {
    type: 'module'
});

// Prepare communication channels between Workers
/** port1 is PhysicsEngine (Physics Worker)
 *  port2 is Game (Main Worker) **/
const physicsWorkerToMainWorkerChannel = new MessageChannel();

// Transfer ownership of variables
const mainCanvas = document.getElementById('mainCanvas').transferControlToOffscreen();
const physicsCanvas = document.getElementById('physicsCanvas').transferControlToOffscreen();

// Run constructor inside workers
mainWorker.postMessage({
    type: 'constructor',
    canvas: mainCanvas,
    window: Polyfills.createWindow(),
    physicsWorkerToMainWorkerChannel: physicsWorkerToMainWorkerChannel.port2
}, [mainCanvas, physicsWorkerToMainWorkerChannel.port2]);

physicsWorker.postMessage({
    type: 'constructor',
    canvas: physicsCanvas,
    window: Polyfills.createWindow(),
    physicsWorkerToMainWorkerChannel: physicsWorkerToMainWorkerChannel.port1
}, [physicsCanvas, physicsWorkerToMainWorkerChannel.port1]);

// Forward window events
window.onresize = event => {
    const message = {
        type: 'windowOnResize',
        window: Polyfills.createWindow()
    };

    mainWorker.postMessage(message);
    physicsWorker.postMessage(message);
}

// Keyboard events
window.onkeydown = event => mainWorker.postMessage({
    type: 'windowOnKeyDown',
    key: event.key
});

window.onkeyup = event => mainWorker.postMessage({
    type: 'windowOnKeyUp',
    key: event.key
});

// Etc. eg. PointerEvents
window.onpointermove = event => mainWorker.postMessage({
    type: 'onPointerMove',
    x: event.clientX,
    y: event.clientY
})