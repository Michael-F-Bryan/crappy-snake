import World, { Options } from "./World";
import Snake from "./Snake";
import Coordinate from "./Coordinate";
import { Item } from "./Item";

export default function updateWorld(world: World, dt: number): Outcome {
    world.timeSinceLastTick += dt;

    if (world.timeSinceLastTick < world.tickInterval) {
        return Outcome.Continue;
    }

    // we need to execute another tick
    world.timeSinceLastTick = 0;
    world.score.ticks += 1;

    updateSnake(world.snake, world.options);

    return checkCollisions(world);
}

function checkCollisions(world: World): Outcome {
    if (world.hasWon) {
        return Outcome.Won;
    }

    const { items, snake } = world;

    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (item.location.equals(snake.head)) {
            // the snake ate something
            snake.body.unshift(snake.head);
            world.score.food += 1;

            items[i] = new Item(world.randomEmptyLocation());
        }
    }

    return Outcome.Continue;
}

function updateSnake(snake: Snake, options: Options): void {
    let { x, y } = snake.head.add(snake.velocity);

    if (x < 0) {
        x = options.columns - 1;
    }
    if (x >= options.columns) {
        x = 0;
    }
    if (y < 0) {
        y = options.rows - 1;
    }
    if (y >= options.rows) {
        y = 0;
    }

    for (let i = snake.body.length - 1; i > 0; i--) {
        const current = snake.body[i];
        const prev = snake.body[i - 1];

        if (current.equals(prev)) {
            // overlapping body segments. Let "prev" move on while the current 
            // one stays where it is
            continue;
        }

        snake.body[i] = snake.body[i - 1];
    }
    if (snake.body.length > 0) {
        snake.body[0] = snake.head;
    }

    snake.head = new Coordinate(x, y);
}

export enum Outcome {
    Died,
    Won,
    Continue,
}