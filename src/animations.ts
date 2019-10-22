import { Triangle, rotateTriangle } from "./geometry"

/**
 * An animation is just a function which returns different triangles with time.
 * 
 */
export type Animation = IterableIterator<Triangle>

/**
 * @returns An animation which moves the two points so that they end up swapped.
 * @param t The target triangle.
 * @param firstPointIndex Index of first point to move.
 * @param secondPointIndex Index of second point to move.
 */
export function * pointSwapAnimation(
    timestep: number,
    triangle: Triangle,
    firstPointIndex: number,
    secondPointIndex: number,
): IterableIterator<Triangle> {
    const speed = 1e-4
    let t = 0
}

/**
 * @returns An animation which rotates the given triangle for 120 degrees.
 * @param t The triangle to rotate.
 * @param direction The rotation direction. 1 means 120 degrees, -1 means -120 degrees.
 */
export function * triangleRotateAnimation(
    timestep: number,
    triangle: Triangle,
    direction: number,
): IterableIterator<Triangle> {
    const speed = 1e-4
    const angle = direction * 2 * Math.PI / 3
    let t = 0
    
    for (t; t <= 1; t += speed * timestep)
        yield rotateTriangle(triangle, angle * t)

    if (t !== 1)
        yield rotateTriangle(triangle, angle)
}