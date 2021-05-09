const mainWorker = new Worker("main.js", {
    type: "module"
});
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
