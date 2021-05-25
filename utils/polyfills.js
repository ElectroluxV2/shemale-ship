export class Polyfills {
    static canvasContextReset() {
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
