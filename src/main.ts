import World, { Options } from "./World";
import Snake, { directions } from "./Snake";
import Coordinate from "./Coordinate";
import CanvasRenderer from "./CanvasRenderer";
import { Renderer, render } from "./render";

import "./master.css";
import updateWorld from "./physics";
import { Item } from "./Item";

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

function choose<T>(items: T[]): T {
    const ix = Math.floor(Math.random() * items.length);
    return items[ix];
}

const snake = new Snake(Coordinate.RandomTile(options.columns, options.rows), choose(Object.values(directions)));
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

    world.items.push(new Item(Coordinate.RandomTile(options.columns, options.rows)));

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

    updateWorld(world, dt);

    if (renderer) {
        render(world, renderer);
    }

    lastTick = now;
    requestAnimationFrame(animate);
}

function onKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    console.log(e);

    let direction: Coordinate;

    switch (e.key) {
        case "ArrowRight":
            direction = directions.east;
            break;
        case "ArrowUp":
            direction = directions.north;
            break;
        case "ArrowLeft":
            direction = directions.west;
            break;
        case "ArrowDown":
            direction = directions.south;
            break;
        default:
            return;
    }

    const nextTileWouldBe = world.snake.head.add(direction);
    if (world.snake.body.length == 0 || !nextTileWouldBe.equals(world.snake.body[0])) {
        world.snake.velocity = direction;
    }
}

initialize();
window.addEventListener("resize", onResize);
window.addEventListener("keydown", onKeyDown);