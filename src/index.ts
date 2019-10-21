import { Triangle, triangleHeights, triangleSides, createTriangle } from "./geometry"

function createFirstTriangle() {
    const svg = document.getElementById('firstTriangle')
    if (svg === null)
        throw new Error('No SVG element with requested ID')

    const triangle = createTriangle()
    const svgTriangle = new SVGTriangle(svg)
    svgTriangle.draw(triangle)
}

function createSvgElement(tagName: string): SVGElement {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName)
}

class SVGTriangle {
    private trianglePoints = [createSVGPoint(), createSVGPoint(), createSVGPoint()]
    private triangleSides = [createSVGLine(), createSVGLine(), createSVGLine()]
    private triangleHeights = [createSVGLine(), createSVGLine(), createSVGLine()]

    constructor(private svg: HTMLElement) {
        svg.append(...this.trianglePoints)
        svg.append(...this.triangleSides)
        svg.append(...this.triangleHeights)
    }

    public draw(triangle: Triangle): void {
        const sideScale = 150
        const heights = triangleHeights(triangle)
        const sides = triangleSides(triangle)

        for (let i = 0; i < triangle.length; ++i) {
            const p = triangle[i]
            const h = heights[i]
            const s = sides[i]

            this.trianglePoints[i].setAttribute('cx', (p.x * sideScale).toString())
            this.trianglePoints[i].setAttribute('cy', (p.y * sideScale).toString())
            this.triangleSides[i].setAttribute('x1', (s.a.x * sideScale).toString())
            this.triangleSides[i].setAttribute('y1', (s.a.y * sideScale).toString())
            this.triangleSides[i].setAttribute('x2', (s.b.x * sideScale).toString())
            this.triangleSides[i].setAttribute('y2', (s.b.y * sideScale).toString())
            this.triangleHeights[i].setAttribute('x1', (h.a.x * sideScale).toString())
            this.triangleHeights[i].setAttribute('y1', (h.a.y * sideScale).toString())
            this.triangleHeights[i].setAttribute('x2', (h.b.x * sideScale).toString())
            this.triangleHeights[i].setAttribute('y2', (h.b.y * sideScale).toString())
        }
    }
}

function createSVGPoint(): SVGCircleElement {
    return createSvgElement('circle') as SVGCircleElement
}

function createSVGLine(stroke: string = 'black'): SVGLineElement {
    const line = createSvgElement('line') as SVGLineElement
    line.setAttribute('stroke', stroke)
    return line
}

function secondTriangle() {}

createFirstTriangle()
secondTriangle()
