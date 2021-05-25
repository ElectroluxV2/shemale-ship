import { Rock } from './rock.js';
import { Position } from '../utils/position.js';
import { UserControlledShip } from './userControlledShip.js';

export class Game {
    keyboardStates = new Map();
    entities = new Map();
    #userControlledShip = new UserControlledShip();
    #mainCanvas;
    #mainCanvasContext;
    #physicsChannel;
    #window

    constructor(mainCanvas, window, physicsChannel) {
        this.#mainCanvas = mainCanvas;
        this.#window = window;
        this.#mainCanvasContext = this.#mainCanvas.getContext('2d');
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => this[data.type](data);

        for (let i= 0; i<10; i++){
            this.createRock();
        }
        this.mainLoop();
    }

    updateUserControlledShip({position}) {
        this.#userControlledShip.position.import(position);
    }

    updateEntityPosition({id, position}) {
        // console.log(position)
        // console.log(id)
        this.entities.get(id)?.position.import(position);
    }

    createRock() {
        const rock = new Rock(new Position(Math.random()*2000 % this.#window.innerWidth, Math.floor(Math.random()*2000 % this.#window.innerHeight)));
        this.entities.set(rock.id, rock);
        this.#physicsChannel.postMessage({
            type: 'newRockCreated',
            id: rock.id,
            position: rock.position.export(),
            mass: rock.size
        })
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
        this.#mainCanvasContext.reset();

        this.handleUserInput();

        for (const rock of this.entities.values()) {
            rock.draw(this.#mainCanvasContext);
        }

        this.#userControlledShip.draw(this.#mainCanvasContext);

        // Print ship position
        this.#mainCanvasContext.fillStyle = '#a0937d';
        this.#mainCanvasContext.font = 'bold 16px Arial';

        const text = `${this.#userControlledShip.position.x.toFixed(2)} x, ${this.#userControlledShip.position.y.toFixed(2)} y, angle: ${this.#userControlledShip.position.angle.toFixed(2)}`;
        const textSize = this.#mainCanvasContext.measureText(text);
        this.#mainCanvasContext.fillText(text, this.#mainCanvas.width - textSize.width, textSize.fontBoundingBoxAscent);

        requestAnimationFrame(this.mainLoop.bind(this));
    }
}
