import { Renderer } from "./render";
import Coordinate from "./Coordinate";
import { Options } from "./World";

export default class CanvasRenderer implements Renderer {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly options: Options;

    constructor(ctx: CanvasRenderingContext2D, options: Options) {
        this.ctx = ctx;
        this.options = options;
    }

    clear(): void {
        const { width, height } = this.ctx.canvas;
        this.ctx.fillStyle = this.options.palette.background_colour;
        this.ctx.fillRect(0, 0, width, height);
    }

    tile(location: Coordinate, contents: string): void {
        const tileWidth = this.ctx.canvas.width / this.options.columns;
        const tileHeight = this.ctx.canvas.height / this.options.rows;

        this.ctx.beginPath();
        this.ctx.fillStyle = contents;
        this.ctx.fillRect(location.x * tileWidth, location.y * tileHeight, tileWidth, tileHeight);
    }
}