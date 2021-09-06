import { Coord } from './objects/coord.js';
import { UserControlledShip } from './entities/userControlledShip.js';
import { Position } from './objects/position.js';
import { Camera } from './objects/camera.js';
import { PhysicsEngine } from './physicsEngine.js';
import { Rock } from './entities/rock.js';
import { WorldMap } from './objects/worldMap.js';

export class Game {
    keyboardStates;
    #worldMap;
    #userControlledShip;
    #mainCanvas;
    #mainCanvasContext;
    #window;
    #camera;
    #cursor;
    #physicsEngine;

    constructor(mainCanvas, physicsCanvas, window) {
        this.#window = window;
        this.#mainCanvas = mainCanvas;
        this.#mainCanvasContext = mainCanvas.getContext('2d');
        this.keyboardStates = new Map();
        this.#worldMap = new WorldMap();
        this.#userControlledShip = new UserControlledShip(new Position(this.#window.innerWidth / 3, this.#window.innerHeight / 3));
        this.#camera = new Camera(this.#mainCanvasContext, this.#window, this.#worldMap);
        this.#physicsEngine = new PhysicsEngine(physicsCanvas, this.#worldMap);

        // Update starting camera position
        this.#camera.position.import(this.#userControlledShip.position.export());

        // Assign player position to camera
        this.#userControlledShip.position.addEventListener(Coord.EVENT_CHANGE, ({detail: {coord}}) => {
            this.#camera.position.import(coord);
        });

        // Spawn player
        this.#worldMap.addEntity(this.#userControlledShip);

        // BEGIN TEST


        for (let i = 1; i < 20; i++) {
            // this.#worldMap.addEntity(new Rock(i, new Position(300 + i, 300 + i)));
        }

        this.mainLoop();
    }

    handleUserInput() {
        if (this.keyboardStates['w'] || this.keyboardStates['W']) {
            const angled = this.#userControlledShip.angledVector().multiply(UserControlledShip.thrustForward);
            this.#userControlledShip.physicsData.acceleration.x += angled.x;
            this.#userControlledShip.physicsData.acceleration.y += angled.y;
        }

        if (this.keyboardStates['s'] || this.keyboardStates['S']) {
            const angled = this.#userControlledShip.angledVector().reverse().multiply(UserControlledShip.thrustBackward);
            this.#userControlledShip.physicsData.acceleration.x += angled.x;
            this.#userControlledShip.physicsData.acceleration.y += angled.y;
        }

        if (this.keyboardStates['a'] || this.keyboardStates['A']) {
            this.#userControlledShip.physicsData.acceleration.angular -= UserControlledShip.thrustLeft;
        }

        if (this.keyboardStates['d'] || this.keyboardStates['D']) {
            this.#userControlledShip.physicsData.acceleration.angular += UserControlledShip.thrustRight;
        }

    }

    onPointerMove(x, y) {
        this.#cursor = new Coord(x, y);
    }

    frames = 0;
    mainLoop() {
        // Measure frame time
        const start = performance.now();

        this.#mainCanvasContext.reset();

        this.handleUserInput();

        this.#physicsEngine.tick();

        this.#camera.draw();

        this.#mainCanvasContext.fillStyle = 'red';
        this.#mainCanvasContext.fillRect(this.#cursor?.x - 2 ?? 0, this.#cursor?.y - 2 ?? 0, 2, 2);

        // Measure frame time
        const stop = performance.now();
        const fps = `${(1000 / (stop - start)).toFixed(2)} gpu fps`;

        // Print ship position
        this.#mainCanvasContext.fillStyle = '#a0937d';
        this.#mainCanvasContext.font = 'bold 16px Arial';

        const text = `${this.#userControlledShip.position.x.toFixed(2)} x, ${this.#userControlledShip.position.y.toFixed(2)} y, angle: ${this.#userControlledShip.position.angle.toFixed(2)}, ${fps}`;
        const textSize = this.#mainCanvasContext.measureText(text);
        this.#mainCanvasContext.fillText(text, this.#mainCanvas.width - textSize.width, textSize.fontBoundingBoxAscent);

        requestAnimationFrame(this.mainLoop.bind(this));
        //frames++ < 3 && setTimeout(this.mainLoop.bind(this), 200);
    }
}
