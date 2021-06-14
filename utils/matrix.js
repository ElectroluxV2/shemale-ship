export class Matrix {
   static #MAX_CONCURRENT_CHUNK = 10_000_000;

   static getIndex({x, y}) {
      return Math.trunc(x) * Matrix.#MAX_CONCURRENT_CHUNK + Math.trunc(y);
   }
}
