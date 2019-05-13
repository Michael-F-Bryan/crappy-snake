import Coordinate from "./Coordinate";

export class Item {
    public readonly location: Coordinate;

    constructor(location: Coordinate) {
        this.location = location;
    }
}