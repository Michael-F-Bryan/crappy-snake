import { Options } from "./World";
import CanvasRenderer from "./CanvasRenderer";
import { Renderer, render } from "./render";

import "./master.css";
import updateWorld from "./physics";
import { View } from "./views/View";
import Game from "./views/Game";

const options: Options = {
    columns: 30,
    rows: 14,
    palette: {
        background_colour: "black",
        item_colour: "green",
        snake_head: "orange",
        snake_body: "yellow",
    },
    initialTickLength: 0.5,
    tickSpeedup: 0.95,
};

let view: View = Game.Randomized(options);
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

let lastTick = new Date();

function animate() {
    const now = new Date();
    const dt = (now.valueOf() - lastTick.valueOf()) / 1000;

    if (renderer) {
        view.animate(renderer, dt);
    }

    lastTick = now;
    requestAnimationFrame(animate);
}

function onKeyDown(e: KeyboardEvent) {
    e.preventDefault();

    if (view.onKeyDown) {
        view.onKeyDown(e);
    }
}

initialize();
window.addEventListener("resize", onResize);
window.addEventListener("keydown", onKeyDown);