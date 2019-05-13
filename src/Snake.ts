import Coordinate from "./Coordinate";

export default class Snake {
    public head: Coordinate;
    public body: Coordinate[];
    public velocity: Coordinate;

    constructor(head: Coordinate, velocity: Coordinate, body?: Coordinate[]) {
        this.head = head;
        this.velocity = velocity;
        this.body = body || [];
    }
}

export const directions = {
    north: new Coordinate(0, -1),
    east: new Coordinate(1, 0),
    south: new Coordinate(0, 1),
    west: new Coordinate(-1, 0),
};