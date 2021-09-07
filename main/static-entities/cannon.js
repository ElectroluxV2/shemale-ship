import { StaticEntity } from './staticEntity.js';
import { Point } from '../objects/point.js';
import { Polyfills } from '../utils/polyfills.js';


export class Cannon extends StaticEntity {
    static vertices(anchor, rotation) {
        const result = [];
        result.push(Polyfills.rotate(anchor, new Point(anchor.x - 10, anchor.y - 80), rotation));
        result.push(Polyfills.rotate(anchor, new Point(anchor.x - 10, anchor.y - 40), rotation));
        result.push(Polyfills.rotate(anchor, new Point(anchor.x + 10, anchor.y - 40), rotation));
        result.push(Polyfills.rotate(anchor, new Point(anchor.x + 10, anchor.y - 80), rotation));
        return result;
    }

    /**
     * 
     * @param {Point} anchor 
     * @param {Number} rotation in radians
     * @returns {Path2D} warning its modded version with line specifiers
     * 
     */
    static getPath(anchor, rotation) {
        const vertices = Cannon.vertices(anchor, rotation);
        const path = new Path2D();
        path.moveTo(vertices[0].x, vertices[0].y);
        for (const vertex of vertices) {
            path.lineTo(vertex.x, vertex.y);
        }
        path.closePath();
        path.lineWidth = 4;
        return path;
    }
}