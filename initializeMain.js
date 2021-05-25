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
    type: "assignPhysicsChannel",
    physicsChannel: physicsChannel.port1
}, [physicsChannel.port1]);

mainWorker.postMessage({
    type: "assignPhysicsChannel",
    physicsChannel: physicsChannel.port2
}, [physicsChannel.port2]);

// Transfer ownership to main Worker
const mainCanvas = document.getElementById("mainCanvas").transferControlToOffscreen();

mainWorker.postMessage({
    type: "transferCanvas",
    canvas: mainCanvas,
    windowInnerHeight: window.innerHeight,
    windowInnerWidth: window.innerWidth,
    windowDevicePixelRatio: window.devicePixelRatio
}, [mainCanvas]);

// Transfer ownership to physics Worker
const physicsCanvas = document.getElementById("physicsCanvas").transferControlToOffscreen();

physicsWorker.postMessage({
    type: "transferCanvas",
    canvas: physicsCanvas,
    windowInnerHeight: window.innerHeight,
    windowInnerWidth: window.innerWidth,
    windowDevicePixelRatio: window.devicePixelRatio
}, [physicsCanvas]);

window.onresize = event => {
    mainWorker.postMessage({
        type: "windowOnResize",
        windowInnerHeight: window.innerHeight,
        windowInnerWidth: window.innerWidth,
        windowDevicePixelRatio: window.devicePixelRatio
    });

    physicsWorker.postMessage({
        type: "windowOnResize",
        windowInnerHeight: window.innerHeight,
        windowInnerWidth: window.innerWidth,
        windowDevicePixelRatio: window.devicePixelRatio
    });
}


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

