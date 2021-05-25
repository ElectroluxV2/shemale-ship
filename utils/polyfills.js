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
}
