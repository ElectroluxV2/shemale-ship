import { StaticEntity } from './staticEntity.js';
import { Point } from '../objects/point.js';


export class Cannon extends StaticEntity {
    /**
     * 
     * @param {Point} anchor 
     * @param {Number} rotation 
     * @returns {Path2D} warning its modded version with line specifiers
     * 
     */
    getPath(anchor, rotation) {
        const path = new Path2D();
        path.moveTo(anchor.x - 10, anchor.y-80);
        path.lineTo(anchor.x - 10, an)
    }
}