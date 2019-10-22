import { Triangle, triangleHeights, triangleSides, createTriangle, translate } from "./geometry"
import { Animation, triangleRotateAnimation, pointSwapAnimation } from './animations'

const timestep = 20

export type HeightClickCallback = () => void

export default class TriangleDrawing {
    private animation: Animation|undefined
    private triangle = createTriangle()
    private svgPoints = [createSVGPoint('1.2'), createSVGPoint('1.2'), createSVGPoint('1.2')]
    private svgSides = [createSVGLine(), createSVGLine(), createSVGLine()]
    private svgHeights = [
        createSVGLine({ stroke: 'grey', strokeWidth: '5', opacity: '0.4' }),
        createSVGLine({ stroke: 'grey', strokeWidth: '5', opacity: '0.4' }),
        createSVGLine({ stroke: 'grey', strokeWidth: '5', opacity: '0.4' }),
    ]
    private svgNames = [
        createSvgText('1'),
        createSvgText('2'),
        createSvgText('3'),
    ]

    constructor(private svg: HTMLElement) {
        for (let i = 0; i < this.svgHeights.length; ++i) {
            this.svgHeights[i].setAttribute('cursor', 'pointer')
            switch (i) {
                case 0:
                    this.svgHeights[i].onclick = () => this.animatePointSwap(1, 2)
                    break
                case 1:
                    this.svgHeights[i].onclick = () => this.animatePointSwap(0, 2)
                    break
                case 2:
                    this.svgHeights[i].onclick = () => this.animatePointSwap(1, 0)
                    break
            }
        }

        svg.append(...this.svgHeights)
        svg.append(...this.svgSides)
        svg.append(...this.svgPoints)
        svg.append(...this.svgNames)

        this.draw()

        setInterval(() => {
            if (this.animation !== undefined) {
                const { value: newTriangle, done } = this.animation.next()
                if (!done)
                    this.triangle = newTriangle
                else
                    this.animation = undefined
                this.draw()
            }
        }, timestep)
    }

    public animateTriangleRotation(direction: number) {
        if (this.animation !== undefined)
            return
        this.animation = triangleRotateAnimation(timestep, this.triangle, direction)
    }

    public animatePointSwap(firstPointIndex: number, secondPointIndex: number) {
        if (this.animation !== undefined)
            return
        this.animation = pointSwapAnimation(timestep, this.triangle, firstPointIndex, secondPointIndex)
    }

    private draw(): void {
        const scaling = 130
        const heights = triangleHeights(this.triangle)
        const sides = triangleSides(this.triangle)

        for (let i = 0; i < this.triangle.length; ++i) {
            const p = this.triangle[i]
            const h = heights[i]
            const s = sides[i]

            this.svgHeights[i].setAttribute('x1', (h.a.x * scaling).toString())
            this.svgHeights[i].setAttribute('y1', (h.a.y * scaling).toString())
            this.svgHeights[i].setAttribute('x2', (h.b.x * scaling).toString())
            this.svgHeights[i].setAttribute('y2', (h.b.y * scaling).toString())
            this.svgSides[i].setAttribute('x1', (s.a.x * scaling).toString())
            this.svgSides[i].setAttribute('y1', (s.a.y * scaling).toString())
            this.svgSides[i].setAttribute('x2', (s.b.x * scaling).toString())
            this.svgSides[i].setAttribute('y2', (s.b.y * scaling).toString())
            this.svgPoints[i].setAttribute('cx', (p.x * scaling).toString())
            this.svgPoints[i].setAttribute('cy', (p.y * scaling).toString())
            
            const namePosition = {
                x: p.x,
                y: p.y - 0.015,
            }
            this.svgNames[i].setAttribute('x', (namePosition.x * scaling).toString())
            this.svgNames[i].setAttribute('y', (namePosition.y * scaling).toString())
        }
    }
}

function createSVGPoint(radius: string): SVGCircleElement {
    const c = createSvgElement('circle') as SVGCircleElement
    c.setAttribute('r', radius)
    return c
}

function createSvgText(content: string): SVGTextElement {
    const text = createSvgElement('text') as SVGTextElement
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('style', 'font-size: 15px')
    text.innerHTML = content
    return text
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
