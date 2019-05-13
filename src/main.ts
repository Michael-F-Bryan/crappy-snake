import { Options } from "./World";
import CanvasRenderer from "./CanvasRenderer";
import { Renderer } from "./render";
import { View, Transition } from "./views/View";
import Game from "./views/Game";

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
    initialTickLength: 0.5,
    tickSpeedup: 0.95,
};

let view: View;
let canvas: HTMLCanvasElement | undefined;
let renderer: Renderer | undefined;

function initialize() {
    updateView(Game.Randomized(options));
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
        const transition = view.animate(renderer, dt);

        if (transition) {
            updateView(transition);
        }
    }

    lastTick = now;
    requestAnimationFrame(animate);
}

function onKeyDown(e: KeyboardEvent) {
    if (view.onKeyDown) {
        view.onKeyDown(e);
    }
}

function updateView(trans: Transition): void {
    if (trans) {
        view = trans;
        (window as any).gameView = view;
    }
}

window.addEventListener("resize", onResize);
window.addEventListener("keydown", onKeyDown);

initialize();