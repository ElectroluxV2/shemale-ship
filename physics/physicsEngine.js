import { PhysicsEntity } from './physicsEntity.js';
import { Position } from '../utils/position.js';
import { UserControlledShip } from '../main/userControlledShip.js';
import { Vector } from '../utils/vector.js';
import { Random } from '../utils/random.js';
import { PhysicsRock } from './physicsRock.js';
import { Rock } from '../main/rock.js';

export class PhysicsEngine {
    static #resistance = 0.95;
    static #angularResistance = 0.85;
    #rocks = new Map();
    #physicsCanvas;
    #physicsCanvasContext;
    #physicsChannel;
    #userControlledShip = new PhysicsEntity(new Position(200, 200));

    constructor(physicsCanvas, physicsChannel) {
        this.#physicsCanvas = physicsCanvas;
        this.#physicsCanvasContext = this.#physicsCanvas.getContext('2d');
        this.#physicsChannel = physicsChannel;
        this.#physicsChannel.onmessage = ({data} = event) => this[data.type](data);
        this.mainLoop();
    }

    onUserControlledShipAction({action}) {
        if (action === 'moveW') {
            const angled = this.#userControlledShip.angledVector().multiply(UserControlledShip.thrustForward);
            this.#userControlledShip.currAccX += angled.x;
            this.#userControlledShip.currAccY += angled.y;

        } else if (action === 'moveS') {
            const angled = this.#userControlledShip.angledVector().reverse().multiply(UserControlledShip.thrustBackward);
            this.#userControlledShip.currAccX += angled.x;
            this.#userControlledShip.currAccY += angled.y;

        } else if (action === 'moveA') {
            this.#userControlledShip.currAccAngular -= UserControlledShip.thrustLeft;

        } else if (action === 'moveD') {
            this.#userControlledShip.currAccAngular += UserControlledShip.thrustRight;
        }
    }

    updateUserControlledShip() {
        // Calculate forces for ship
        this.#userControlledShip.position.x += this.#userControlledShip.currAccX;
        this.#userControlledShip.currAccX *= PhysicsEngine.#resistance;
        this.#userControlledShip.position.y -= this.#userControlledShip.currAccY;
        this.#userControlledShip.currAccY *= PhysicsEngine.#resistance;
        this.#userControlledShip.position.angle += this.#userControlledShip.currAccAngular;
        this.#userControlledShip.currAccAngular *= PhysicsEngine.#angularResistance;

        // TODO: Check if any changes to "visual" position (up to 2 digits precision changes) were made
        // Send result
        this.#physicsChannel.postMessage({
            type: 'updateEntityPosition',
            id: UserControlledShip.ID,
            position: this.#userControlledShip.position.export()
        });
    }

    newRockCreated({id, position, mass}) {
        const rock = new PhysicsRock(id);
        rock.position.import(position);
        rock.mass = mass;
        this.#rocks.set(id, rock);

        const RNG = Random.getSeededRandom(id);
        const randAngle = Math.floor( RNG() * 400 % 330 + 30);
        const angled = Vector.j.multiply(Math.cos(randAngle * Math.PI / 180)).add(Vector.i.multiply(Math.sin(randAngle * Math.PI / 180))).multiply(60 / mass);

        rock.currAccX = angled.x;
        rock.currAccY = angled.y;
        rock.currAccAngular =  randAngle / 100 * (50 / rock.mass);

    }

    updateRocks() {
        for (const rock of this.#rocks.values()) {

            rock.position.x += rock.currAccX;
            rock.position.y -= rock.currAccY;
            rock.position.angle += rock.currAccAngular;

            this.#physicsChannel.postMessage({
                type: 'updateEntityPosition',
                id: rock.id,
                position: rock.position.export()
            })
        }
    }

    static PERFORMANCE_FIX_1 = true;

    collision() {

        let saves = 0;
        const collide = new Map();

        for (const parent of this.#rocks.values()) {
            const parentVertices = parent.vertices;

            collide.set(parent, []);

            for (const child of this.#rocks.values()) {
                if (parent === child) continue;

                const parentHadAlreadyCollisionWithThisChild = PhysicsEngine.PERFORMANCE_FIX_1 ? collide.get(parent).includes(child) || collide.get(child)?.includes(parent) : false;

                if (parentHadAlreadyCollisionWithThisChild) {
                    saves++;
                }

                if (parentHadAlreadyCollisionWithThisChild || child.isColliding(this.#physicsCanvasContext, parentVertices, Rock.path(child.vertices))) {
                    collide.get(parent).push(child);

                    this.#physicsChannel.postMessage({
                        type: 'updateEntityColor',
                        id: parent.id,
                        color: '#db3992'
                    });

                    this.#physicsChannel.postMessage({
                        type: 'updateEntityColor',
                        id: child.id,
                        color: '#db3992'
                    });
                }

            }

            for (const vertex of parent.vertices) {
                this.#physicsCanvasContext.fillStyle = parent.id % 2 === 0 ? 'red' : 'green';
                this.#physicsCanvasContext.fillRect(vertex.x - 4, vertex.y - 4, 8, 8);
            }
        }

        // console.log(saves)
    }

    i = 0;
    mainLoop() {
        // Measure frame time
        const start = performance.now();

        this.#physicsCanvasContext.reset();
        this.collision();
        this.updateUserControlledShip();
        this.updateRocks();

        // Measure frame time
        const stop = performance.now();
        const fps = `${(1000 / (stop - start)).toFixed(2)} cpu fps`;

        this.#physicsCanvasContext.fillStyle = '#a0937d';
        this.#physicsCanvasContext.font = 'bold 16px Arial';

        const textSize = this.#physicsCanvasContext.measureText(fps);
        this.#physicsCanvasContext.fillText(fps, this.#physicsCanvas.width - textSize.width, textSize.fontBoundingBoxAscent * 2);

        // setTimeout(this.mainLoop.bind(this), 2000);
        requestAnimationFrame(this.mainLoop.bind(this));
        //this.i < 3 ? requestAnimationFrame(this.mainLoop.bind(this)) : '';
    }
}
