export class PhysicsEngine {
    static resistance = 0.97;
    static angularResistance = 0.85;
    #workers = [];
    #currentWorker = 0;
    #tasks = new Map();

    constructor(workerCount = navigator.hardwareConcurrency) {
        for (let i = 0; i < workerCount; i++) {
            const worker = new Worker("physicsWorker.js", {
                type: "module"
            });

            worker.onmessage = ({data} = event) => {
                const callback = this.#tasks.get(data.taskId);
                this.#tasks.delete(data.taskId);
                callback(data.physicsData);
            }

            this.#workers.push(worker);
        }
    }

    /**
     *
     * @param entity
     * @param callback
     */
    addTask(entity) {
        const taskId = PhysicsEngine.#generateId();

        this.#tasks.set(taskId, exportedPhysicsData => {
            entity.physicsData.import(exportedPhysicsData);
        });

        this.#getWorker().postMessage({
            taskId: taskId,
            physicsData: entity.physicsData.export()
        });
    }

    /**
     * Selects worker
     * @return {Worker}
     */
    #getWorker() {
        this.#currentWorker = ++this.#currentWorker % navigator.hardwareConcurrency;
        return this.#workers[this.#currentWorker];
    }

    /**
     * Generates random id
     * @return {string}
     */
    static #generateId() {
        return Math.random().toString(36).substring(2, 15);
    }
}
