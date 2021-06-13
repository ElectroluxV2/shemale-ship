export class Matrix {
   static #size = Number.MAX_VALUE;

   static getIndex({x, y}) {
      return x * Matrix.#size + y;
   }
}