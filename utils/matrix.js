import { Coord } from './coord.js';

export class Matrix {
   static #MAX_CONCURRENT_CHUNK = 100_000_000;

   static getIndex({x, y}) {
      return Math.trunc(x) * Matrix.#MAX_CONCURRENT_CHUNK + Math.trunc(y);
   }

   static getCoord(index) {
      for (let i = -Matrix.#MAX_CONCURRENT_CHUNK; i < Matrix.#MAX_CONCURRENT_CHUNK; i++) {
         if (index < (Matrix.#MAX_CONCURRENT_CHUNK * i) + Matrix.#MAX_CONCURRENT_CHUNK && index >= Matrix.#MAX_CONCURRENT_CHUNK * i){
            return new Coord(index - Matrix.#MAX_CONCURRENT_CHUNK * i, i);
         }
      }
      return null;
   }
}
