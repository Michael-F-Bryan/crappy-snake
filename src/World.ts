import Snake, { directions } from "./Snake";
import { Item } from "./Item";
import Coordinate from "./Coordinate";

export default class World {
    public snake: Snake;
    public items: Item[] = [];
    public options: Options;
    public timeSinceLastTick: number = 0;
    public score: Score = new Score();

    public constructor(snake: Snake, options: Options) {
        this.options = options;
        this.snake = snake;
    }

    public get tickInterval(): number {
        return this.options.initialTickLength * Math.pow(this.options.tickSpeedup, this.score.food);
    }

    public get hasWon(): boolean {
        return false;
    }

    public at(location: Coordinate): Snake | Item | undefined {
        for (const item of this.items) {
            if (item.location.equals(location)) {
                return item;
            }
        }

        if (this.snake.head.equals(location)) {
            return this.snake;
        }

        for (const segment of this.snake.body) {
            if (segment.equals(location)) {
                return this.snake;
            }
        }
    }

    public randomEmptyLocation(): Coordinate {
        let tile: Coordinate;

        do {
            // the brute force method :P
            tile = Coordinate.RandomTile(this.options.columns, this.options.rows);
        } while (this.at(tile) !== undefined)

        return tile;
    }

    public onKeyDown(key: string): void {
        let direction: Coordinate;

        switch (key) {
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

        const { body, head } = this.snake;

        const nextTileWouldBe = head.add(direction);
        if (body.length == 0 || !nextTileWouldBe.equals(body[0])) {
            this.snake.velocity = direction;
        }
    }
}

export interface Options {
    readonly columns: number;
    readonly rows: number;
    readonly palette: Palette;
    readonly initialTickLength: number;
    readonly tickSpeedup: number;
}

export interface Palette {
    readonly background_colour: string;
    readonly snake_body: string;
    readonly snake_head: string;
    readonly item_colour: string;
}

export const defaultPalette = {
    background_colour: "black",
    snake_body: "orange",
    snake_head: "red",
    item_colour: "green",
};

export class Score {
    public ticks: number = 0;
    public food: number = 0;
}