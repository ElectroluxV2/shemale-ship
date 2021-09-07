import { Coord } from '../objects/coord.js';

// http://szudzik.com/ElegantPairing.pdf
export class SzudziksPairing {

    /**
     * A pairing function on a set A associates each pair of members from A with a single member of A, so that any two distinct pairs are associated with two distinct members.
     * @param {Coord}
     * @returns {Number} a single member of A
     */
    static pair({x: a, y: b} = coord) {
        const A = a >= 0 ? 2 * a : -2 * a - 1;
        const B = b >= 0 ? 2 * b : -2 * b - 1;
        return A >= B ? A * A + A + B : A + B * B;
    }

    /**
     * Inverse of pair
     * @param {Number} x 
     * @returns {Coord}
     */
    static unpair(x) {
        const sqrtX = Math.floor(Math.sqrt(x));
        const sqx = sqrtX * sqrtX;
        const result = ((x - sqx) >= sqrtX) ? [sqrtX, x - sqx - sqrtX] : [x - sqx, sqrtX];
        const a = result[0] % 2 === 0 ? result[0] / 2 : result[0] / -2 + 1;
        const b = result[1] % 2 === 0 ? result[1] / 2 : result[1] / -2 + 1;
        return new Coord(a, b);
    }
}