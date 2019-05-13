import { View, Transition } from "./View";
import { Renderer } from "../render";
import Game from "./Game";
import { Options } from "../World";

export default class LoseScreen implements View {
    private options: Options;

    constructor(options: Options) {
        this.options = options;
    }

    animate(renderer: Renderer, dt: number): Transition {
        renderer.text("You Died!", "56px ariel", "red");
        return;
    }

    onKeyDown(e: KeyboardEvent): Transition {
        if (e.key == "Enter") {
            e.preventDefault();
            return Game.Randomized(this.options);
        }

    }
}