import { Triangle, triangleHeights, triangleSides, createTriangle } from "./geometry"

export default class SVGTriangle {
    private svgPoints = [createSVGPoint('1.2'), createSVGPoint('1.2'), createSVGPoint('1.2')]
    private svgSides = [createSVGLine(), createSVGLine(), createSVGLine()]
    private svgHeights = [
        createSVGLine({ stroke: 'grey', strokeWidth: '3', opacity: '0.4' }),
        createSVGLine({ stroke: 'grey', strokeWidth: '3', opacity: '0.4' }),
        createSVGLine({ stroke: 'grey', strokeWidth: '3', opacity: '0.4' }),
    ]

    constructor(private svg: HTMLElement, private triangle: Triangle) {
        svg.append(...this.svgHeights)
        svg.append(...this.svgSides)
        svg.append(...this.svgPoints)
    }

    public draw(): void {
        const sideScale = 150
        const heights = triangleHeights(this.triangle)
        const sides = triangleSides(this.triangle)

        for (let i = 0; i < this.triangle.length; ++i) {
            const p = this.triangle[i]
            const h = heights[i]
            const s = sides[i]

            this.svgHeights[i].setAttribute('x1', (h.a.x * sideScale).toString())
            this.svgHeights[i].setAttribute('y1', (h.a.y * sideScale).toString())
            this.svgHeights[i].setAttribute('x2', (h.b.x * sideScale).toString())
            this.svgHeights[i].setAttribute('y2', (h.b.y * sideScale).toString())
            this.svgSides[i].setAttribute('x1', (s.a.x * sideScale).toString())
            this.svgSides[i].setAttribute('y1', (s.a.y * sideScale).toString())
            this.svgSides[i].setAttribute('x2', (s.b.x * sideScale).toString())
            this.svgSides[i].setAttribute('y2', (s.b.y * sideScale).toString())
            this.svgPoints[i].setAttribute('cx', (p.x * sideScale).toString())
            this.svgPoints[i].setAttribute('cy', (p.y * sideScale).toString())
        }
    }
}

function createSVGPoint(radius: string): SVGCircleElement {
    const c = createSvgElement('circle') as SVGCircleElement
    c.setAttribute('r', radius)
    return c
}

function createSVGLine(
    options: { stroke?: string, strokeWidth?: string, opacity?: string } = {}
): SVGLineElement {
    const line = createSvgElement('line') as SVGLineElement
    line.setAttribute('stroke', options.stroke || 'black')
    if (typeof options.strokeWidth !== 'undefined')
        line.setAttribute('stroke-width', options.strokeWidth)
    if (typeof options.opacity !== 'undefined')
        line.setAttribute('opacity', options.opacity)
    return line
}

function createSvgElement(tagName: string): SVGElement {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName)
}
