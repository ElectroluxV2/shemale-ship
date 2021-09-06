import { Point } from '../objects/point.js';

export class Polyfills {
    static canvasContextReset() {
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static createWindow() {
        return {
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            devicePixelRatio: window.devicePixelRatio
        };
    }

    static rotate(origin, point, radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const x = (cos * (point.x - origin.x)) + (sin * (point.y - origin.y)) + origin.x;
        const y = (cos * (point.y - origin.y)) - (sin * (point.x - origin.x)) + origin.y
        return new Point(x, y);
    }

    static lastTimer = null;
    static lastTime = 0;
    static logs(m) {
        const currentTime = performance.now();

        if (currentTime - Polyfills.lastTime > 1000) {
            Polyfills.lastTime = currentTime;
            console.log(m);
            return;
        }

        clearTimeout(Polyfills.lastTimer);
        Polyfills.lastTimer = setTimeout(() => {
            console.log(m);
        }, 20);
    }
}
