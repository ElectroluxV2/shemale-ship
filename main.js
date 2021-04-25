"use strict";
import { Ship } from "./ship.js";

window.onload = () => {
    window.requestAnimationFrame(a);
}

const a = () => {
    const ship = new Ship();
    console.log(ship);

    const canvas = document.getElementsByTagName('canvas')[0];

    console.log(canvas);
}
