export class Pos {
    x = 0;
    y = 0;
    angle = 0;
    setPos (x, y) {
        this.x = x;
        this.y = y;
    }

    setAngle (n) {
        this.angle = n
    }

    turnRight () {
        this.angle++;
    }

    turnLeft () {
        this.angle--;
    }
}
