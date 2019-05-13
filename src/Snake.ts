import Coordinate from "./Coordinate";

export default class Snake {
    public head: Coordinate;
    public body: Coordinate[];

    constructor(head: Coordinate);
    constructor(head: Coordinate, body?: Coordinate[]) {
        this.head = head;
        this.body = body || [];
    }
}