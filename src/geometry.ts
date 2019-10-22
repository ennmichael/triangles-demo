export interface Point {
    readonly x: number
    readonly y: number
}

export interface Line {
    readonly a: Point
    readonly b: Point
}

export type Triangle = readonly Point[]

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

export function createTriangle(): Triangle {
    const a = 1
    const h = a / 2 * Math.sqrt(3)
    return [
        { x: 0, y: -2 * h / 3 },
        { x: a / 2, y: h / 3 },
        { x: -a / 2, y: h / 3 },
    ]
}

/**
 * Generate triangle height lines. The ith line is always connected to the ith point
 * and the middle of the opposite side.
 */
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

export function triangleCenter(t: Triangle): Point {
    return {
        x: (t[0].x + t[1].x + t[2].x) / 3,
        y: (t[0].y + t[1].y + t[2].y) / 3,
    }
}

/**
 * @returns The triangle t rotate by angle radians.
 * @param t The target triangle.
 * @param angle The rotation angle in radians.
 */
export function rotateTriangle(t: Triangle, angle: number): Triangle {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return t.map(({ x, y }) => ({
        x: x * cos - y * sin,
        y: x * sin + y * cos,
    }))
}
