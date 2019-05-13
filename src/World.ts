import Snake from "./Snake";
import { Item } from "./Item";

export default class World {
    public snake: Snake;
    public items: Item[] = [];
    public options: Options;

    public constructor(snake: Snake, options: Options) {
        this.options = options;
        this.snake = snake;
    }
}

export interface Options {
    readonly columns: number;
    readonly rows: number;
    readonly palette: Palette;
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