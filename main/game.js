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

        // this.createRock();

        const rock1 = new Rock(69, new Position(500, 600));
        const rock2 = new Rock(422320, new Position(500, 700));
        //const rock3 = new Rock(12431412, new Position(400, 400));

        this.saveRock(rock1);
        this.saveRock(rock2);
        //this.saveRock(rock3);

        this.mainLoop();
    }

    saveRock(rock) {
        this.entities.set(rock.id, rock);
        this.#physicsChannel.postMessage({
            type: 'newRockCreated',
            id: rock.id,
            position: rock.position.export(),
            mass: rock.size
        })
    }

    updateUserControlledShip({position}) {
        this.#userControlledShip.position.import(position);
    }

    updateEntityPosition({id, position}) {
        this.entities.get(id)?.position.import(position);
    }

    updateEntityColor({id, color}) {
        this.entities.get(id).color = color;
    }

    createRock() {
        const rock = new Rock(performance.now(), new Position(Math.random()*2000 % this.#window.innerWidth, Math.floor(Math.random()*2000 % this.#window.innerHeight)));
        this.entities.set(rock.id, rock);
        this.#physicsChannel.postMessage({
            type: 'newRockCreated',
            id: rock.id,
            position: rock.position.export(),
            mass: rock.size
        })

        if (this.entities.size > 10) return;

        setTimeout(this.createRock.bind(this), 10);
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
            Rock.draw(this.#mainCanvasContext, rock);
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
