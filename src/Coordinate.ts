export default class Coordinate {
    public static RandomTile(columns: number, rows: number): Coordinate {
        return new Coordinate(randInt(0, columns), randInt(0, rows));
    }

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

    public add(other: Coordinate): Coordinate {
        return new Coordinate(this.x + other.x, this.y + other.y);
    }

    public sub(other: Coordinate): Coordinate {
        return new Coordinate(this.x - other.x, this.y - other.y);
    }

    public equals(other: Coordinate): boolean {
        return this.x == other.x && this.y == other.y;
    }
}

function randInt(min: number, max: number): number {
    const range = max - min;
    return min + Math.floor(Math.random() * range);
}
