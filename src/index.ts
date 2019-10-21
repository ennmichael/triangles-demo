import SVGTriangle from './svgTriangle'
import { createTriangle } from './geometry'

export function drawTriangles() {
    const leftSvg = document.getElementById('left-triangle')
    const rightSvg = document.getElementById('right-triangle')
    if (leftSvg === null || rightSvg === null)
        throw new Error('No SVG element with requested ID')

    const leftTriangle = createTriangle()
    const leftSvgTriangle = new SVGTriangle(leftSvg, leftTriangle)

    const rightTriangle = createTriangle()
    const rightSvgTriangle = new SVGTriangle(rightSvg, rightTriangle)

    leftSvgTriangle.draw()
    rightSvgTriangle.draw()
}

drawTriangles()
