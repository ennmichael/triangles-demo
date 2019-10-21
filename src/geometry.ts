export interface Point {
    x: number
    y: number
}

export interface Line {
    a: Point
    b: Point
}

export function translate(p: Point, displacement: Point, t: number): Point {
    return {
        x: p.x + displacement.x * t,
        y: p.y + displacement.y * t,
    }
}

export function midpoint(a: Point, b: Point): Point {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
    }
}

export type Triangle = [Point, Point, Point]

export function createTriangle(): Triangle {
    const a = 1
    const h = a / 2 * Math.sqrt(3)
    return [
        { x: 0, y: -h / 3 },
        { x: a / 2, y: 2 * h / 3 },
        { x: -a / 2, y: 2 * h / 3 },
    ]
}

export function triangleHeights(t: Triangle): [Line, Line, Line] {
    return [
        { a: midpoint(t[1], t[2]), b: t[0] },
        { a: midpoint(t[0], t[2]), b: t[1] },
        { a: midpoint(t[0], t[1]), b: t[2] },
    ]
}

export function triangleSides(t: Triangle): [Line, Line, Line] {
    return [
        { a: t[0], b: t[1] },
        { a: t[1], b: t[2] },
        { a: t[2], b: t[0] },
    ]
}
