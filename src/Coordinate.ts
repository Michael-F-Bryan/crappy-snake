export default class Coordinate {
    public readonly x: number = 0;
    public readonly y: number = 0;

    public constructor(x: number, y: number);
    public constructor(init?: Partial<Coordinate>);

    constructor(first?: number | Partial<Coordinate>, second?: number) {
        if (second) {
            this.y = second;
        }

        if (typeof (first) == "number") {
            this.x = first;
        } else if (first) {
            Object.assign(this, first);
        }
    }
}