import { Polyfills } from './main/utils/polyfills.js';

// Prepare all Workers
const mainWorker = new Worker('./main/workers/mainWorker.js', {
    type: 'module'
});

// Transfer ownership of variables
const mainCanvas = document.getElementById('mainCanvas').transferControlToOffscreen();
const physicsCanvas = document.getElementById('physicsCanvas').transferControlToOffscreen();

// Run constructor inside workers
mainWorker.postMessage({
    function: 'constructor',
    mainCanvas: mainCanvas,
    physicsCanvas: physicsCanvas,
    window: Polyfills.createWindow(),
}, [mainCanvas, physicsCanvas]);

// Forward window events
window.onresize = event => {
    mainWorker.postMessage({
        function: 'windowOnResize',
        window: Polyfills.createWindow()
    });
}

// Keyboard events
window.onkeydown = event => mainWorker.postMessage({
    function: 'windowOnKeyDown',
    key: event.key
});

window.onkeyup = event => mainWorker.postMessage({
    function: 'windowOnKeyUp',
    key: event.key
});

// Etc. eg. PointerEvents
window.onpointermove = event => mainWorker.postMessage({
    function: 'onPointerMove',
    x: event.clientX,
    y: event.clientY
});
