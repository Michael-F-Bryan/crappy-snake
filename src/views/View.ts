import { Renderer } from "../render";

/**
 * The page currently being displayed to the user (e.g. game or death screen).
 */
export interface View {
    animate(renderer: Renderer, dt: number): Transition;
    onKeyDown?(e: KeyboardEvent): Transition;
}

export type Transition = View | undefined;