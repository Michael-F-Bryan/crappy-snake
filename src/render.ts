import Coordinate from "./Coordinate";
import World, { Palette } from "./World";
import { Item } from "./Item";
import Snake from "./Snake";

export function render(world: World, renderer: Renderer): void {
    renderer.clear();

    for (const item of world.items) {
        render_item(item, renderer, world.options.palette);
    }

    render_snake(world.snake, renderer, world.options.palette);
}

function render_item(item: Item, renderer: Renderer, palette: Palette): void {
    renderer.tile(item.location, palette.item_colour);
}

function render_snake(snake: Snake, renderer: Renderer, palette: Palette): void {
    renderer.tile(snake.head, palette.snake_head);

    for (const segment of snake.body) {
        renderer.tile(segment, palette.snake_body);
    }
}

export type Pattern = string;

export interface Renderer {
    /**
     * Clear the canvas.
     */
    clear(): void;

    /**
     * Render a single tile to the canvas.
     * @param location The tile to paint
     * @param contents The tile's contents
     */
    tile(location: Coordinate, contents: Pattern): void;
}
