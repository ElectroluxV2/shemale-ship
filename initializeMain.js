// Prepare all Workers
const mainWorker = new Worker("main/mainWorker.js", {
    type: "module"
});

const physicsWorker = new Worker("physics/physicsWorker.js", {
    type: "module"
});

// Prepare communication channels between Workers
const physicsChannel = new MessageChannel();
physicsWorker.postMessage({
    type: "physicsChannel",
    physicsChannelPort: physicsChannel.port1
}, [physicsChannel.port1]);

mainWorker.postMessage({
    type: "physicsChannel",
    physicsChannelPort: physicsChannel.port2
}, [physicsChannel.port2]);

// Prepare canvas for moving to background Worker
const canvas = document.getElementById("canvas").transferControlToOffscreen();

mainWorker.postMessage({
    type: "transferCanvas",
    canvas: canvas,
    windowInnerHeight: window.innerHeight,
    windowInnerWidth: window.innerWidth,
    windowDevicePixelRatio: window.devicePixelRatio
}, [canvas]);

window.onresize = event => mainWorker.postMessage({
    type: "windowOnResize",
    windowInnerHeight: window.innerHeight,
    windowInnerWidth: window.innerWidth,
    windowDevicePixelRatio: window.devicePixelRatio
});

window.onkeydown = event => {
    mainWorker.postMessage({
        type: "windowOnKeyDown",
        key: event.key
    })
};

window.onkeyup = event => mainWorker.postMessage({
    type: "windowOnKeyUp",
    key: event.key
});

// Etc. eg. PointerEvents

