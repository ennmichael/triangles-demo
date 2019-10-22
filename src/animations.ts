import { Triangle, rotateTriangle, displacement, translate } from "./geometry"

/**
 * An animation is a function which returns different triangles with time,
 * or undefined when the animation is done.
 */
export type Animation = (deltaTime: number) => Triangle|undefined

const speed = 2.5e-3

/**
 * @returns An animation which moves the two points so that they end up swapped.
 * @param triangle The target triangle.
 * @param firstPointIndex Index of first point to move.
 * @param secondPointIndex Index of second point to move.
 */
export function pointSwapAnimation(
    triangle: Triangle,
    firstPointIndex: number,
    secondPointIndex: number,
): Animation {
    const firstToSecond = { a: triangle[firstPointIndex], b: triangle[secondPointIndex] }
    const secondToFirst = { a: triangle[secondPointIndex], b: triangle[firstPointIndex] }
    let t = 0

    return (dt) => {
        if (t === 1)
            return undefined

        t = Math.min(t + speed * dt, 1)
        const newTriangle = [...triangle]
        newTriangle[firstPointIndex] = translate(triangle[firstPointIndex], firstToSecond, t)
        newTriangle[secondPointIndex] = translate(triangle[secondPointIndex], secondToFirst, t)
        return newTriangle
    }
}

/**
 * @returns An animation which rotates the given triangle for 120 degrees.
 * @param triangle The triangle to rotate.
 * @param direction The rotation direction. 1 means 120 degrees, -1 means -120 degrees.
 */
export function triangleRotateAnimation(
    triangle: Triangle,
    direction: number,
): Animation {
    const angle = direction * 2 * Math.PI / 3
    let t = 0

    return (dt) => {
        if (t === 1)
            return undefined
        
        t = Math.min(t + speed * dt, 1)
        return rotateTriangle(triangle, angle * t)
    }
}
