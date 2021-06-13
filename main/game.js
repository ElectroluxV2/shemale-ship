import { Rock } from './rock.js';
import { Position } from '../utils/position.js';
import { UserControlledShip } from './userControlledShip.js';
import { WorldMap } from '../utils/worldMap.js';
import { Coord } from '../utils/coord.js';

export class Game {
    static #DRAW_CHUNK_GRID = true;
    keyboardStates = new Map();
    worldMap = new WorldMap();
    #userControlledShip = new UserControlledShip();
    #mainCanvas;
    #mainCanvasContext;
    #physicsChannel;
    #window
    #cursorX;
    #cursorY;

    constructor(mainCanvas, window, physicsChannel) {
        this.#mainCanvas = mainCanvas;
        this.#window = window;
        this.#mainCanvasContext = this.#mainCanvas.getContext('2d');
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => this[data.type](data);

        for (let i = 1; i < 2; i++) {
             this.createRock(new Rock(i, new Position(200 + i, 200 + i)));
        }

        // this.createRock(new Rock(10, new Position(150, 150)));
        // this.createRock(new Rock(33, new Position(200, 200)));
        // this.createRock(new Rock(67, new Position(280, 280)));
        this.mainLoop();
    }

    updateUserControlledShip({position}) {
        this.#userControlledShip.position.import(position);
    }

    updateEntityPosition({id, position}) {
        this.worldMap.updateEntityPosition(id, position);
    }

    updateEntityColor({id, color}) {
        this.worldMap.updateEntityColor(id, color);
    }

    onPointerMove(x, y) {
        this.#cursorX = x;
        this.#cursorY = y;
    }

    createRock(rock = new Rock(performance.now(), new Position(Math.random()*2000 % this.#window.innerWidth, Math.floor(Math.random()*2000 % this.#window.innerHeight)))) {
        this.worldMap.addEntity(rock)
        // this.entities.set(rock.id, rock);
        this.#physicsChannel.postMessage({
            type: 'newRockCreated',
            id: rock.id,
            position: rock.position.export(),
            mass: rock.size
        });
    }

    handleUserInput() {
        if (this.keyboardStates['w'] || this.keyboardStates['W']) {
            this.#physicsChannel.postMessage({
                type: 'onUserControlledShipAction',
                action: 'moveW'
            });
        }

        if (this.keyboardStates['s'] || this.keyboardStates['S']) {
            this.#physicsChannel.postMessage({
                type: 'onUserControlledShipAction',
                action: 'moveS'
            });
        }

        if (this.keyboardStates['a'] || this.keyboardStates['A']) {
            this.#physicsChannel.postMessage({
                type: 'onUserControlledShipAction',
                action: 'moveA'
            });
        }

        if (this.keyboardStates['d'] || this.keyboardStates['D']) {
            this.#physicsChannel.postMessage({
                type: 'onUserControlledShipAction',
                action: 'moveD'
            });
        }
    }

    mainLoop() {
        // Measure frame time
        const start = performance.now();

        this.#mainCanvasContext.reset();

        this.handleUserInput();

        for (const entity of this.worldMap.entities) {
            entity.draw(this.#mainCanvasContext);
        }

        this.#userControlledShip.draw(this.#mainCanvasContext);


        // if (Game.#DRAW_CHUNK_GRID) {
        //     for (let i = 0; i < this.#mainCanvas.width; i+= WorldMap.CHUNK_SIZE){
        //         for (let j = 0; j < this.#mainCanvas.height; i+= WorldMap.CHUNK_SIZE){
        //             // this.#mainCanvasContext.rect(i, j, WorldMap.CHUNK_SIZE, WorldMap.CHUNK_SIZE);
        //             // this.#mainCanvasContext.stroke()
        //         }
        //     }
        //
        // }

        this.#mainCanvasContext.fillStyle = 'red';
        this.#mainCanvasContext.fillRect(this.#cursorX, this.#cursorY, 1, 1);

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
    }
}
