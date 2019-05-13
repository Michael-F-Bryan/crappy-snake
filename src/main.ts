import World, { Options } from "./World";
import Snake from "./Snake";
import Coordinate from "./Coordinate";
import CanvasRenderer from "./CanvasRenderer";
import { Renderer, render } from "./render";

import "./master.css";

const options: Options = {
    columns: 30,
    rows: 14,
    palette: {
        background_colour: "black",
        item_colour: "green",
        snake_head: "orange",
        snake_body: "yellow",
    },
};

function randInt(min: number, max: number): number {
    const range = max - min;
    return min + Math.floor(Math.random() * range);
}

const snake = new Snake(new Coordinate(randInt(0, options.columns), randInt(0, options.rows)));
const world = new World(snake, options);
let canvas: HTMLCanvasElement | undefined;
let renderer: Renderer | undefined;

function initialize() {
    const el = document.querySelector("canvas");

    if (!el) {
        throw new Error("no canvas element on the page");
    }

    canvas = el;
    renderer = new CanvasRenderer(canvas.getContext("2d")!, options);

    onResize();
    requestAnimationFrame(animate);
}

function onResize() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

function animate() {
    if (renderer) {
        render(world, renderer);
    }

    requestAnimationFrame(animate);
}

initialize();
window.addEventListener("resize", onResize);