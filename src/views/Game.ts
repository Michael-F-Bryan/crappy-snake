import { View, Transition } from "./View";
import { Renderer, render } from "../render";
import World, { Options } from "../World";
import Snake, { directions } from "../Snake";
import Coordinate from "../Coordinate";
import { Item } from "../Item";
import updateWorld, { Outcome } from "../physics";

export default class Game implements View {
    public static Randomized(options: Options): Game {
        const startTile = Coordinate.RandomTile(options.columns, options.rows);
        const initialDirection = choose(Object.values(directions));
        const snake = new Snake(startTile, initialDirection);
        const world = new World(snake, options);

        world.items.push(new Item(Coordinate.RandomTile(options.columns, options.rows)));

        return new Game(world);
    }

    public readonly world: World;

    constructor(world: World) {
        this.world = world;
    }

    animate(renderer: Renderer, dt: number): Transition {
        const outcome = updateWorld(this.world, dt);

        switch (outcome) {
            case Outcome.Died:
                throw new Error("Unimplemented");
            case Outcome.Won:
                throw new Error("Unimplemented");
            default:
                break;
        }

        render(this.world, renderer);

        return;
    }

    onKeyDown(e: KeyboardEvent): void {
        this.world.onKeyDown(e.key);
    }
}

function choose<T>(items: T[]): T {
    const ix = Math.floor(Math.random() * items.length);
    return items[ix];
}
