const mainWorker = new Worker("mainWorker.js", {
    type: "module"
});

const physicsWorker = new Worker("physicsWorker.js", {
    type: "module"
});


const physicsChannel = new MessageChannel();

physicsWorker.postMessage({
    type: "physicsChannel",
    physicsChannelPort: physicsChannel.port1
}, [physicsChannel.port1]);

mainWorker.postMessage({
    type: "physicsChannel",
    physicsChannelPort: physicsChannel.port2
}, [physicsChannel.port2]);

const canvas = document.getElementById("canvas").transferControlToOffscreen();

mainWorker.postMessage({
    type: "transferCanvas",
    canvas: canvas,
    windowInnerHeight: window.innerHeight,
    windowInnerWidth: window.innerWidth,
    windowDevicePixelRatio: window.devicePixelRatio
}, [canvas]);

mainWorker.onmessage = message => {
    console.log(message);
};

window.onresize = event => mainWorker.postMessage({
    type: "windowOnResize",
    windowInnerHeight: window.innerHeight,
    windowInnerWidth: window.innerWidth,
    windowDevicePixelRatio: window.devicePixelRatio
});

window.onkeydown = event => { mainWorker.postMessage({
    type: "windowOnKeyDown",
    key: event.key
})};

window.onkeyup = event => mainWorker.postMessage({
    type: "windowOnKeyUp",
    key: event.key
});

// Etc. eg. PointerEvents

