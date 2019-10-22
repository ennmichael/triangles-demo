import TriangleDrawing from './triangleDrawing'

function createHTMLTriangle(
    svgId: string,
    leftRotateButtonId: string,
    rightRotateButtonId: string,
): void {
    const svg = document.getElementById(svgId)
    const leftRotateButton = document.getElementById(leftRotateButtonId)
    const rightRotateButton = document.getElementById(rightRotateButtonId)
    if (svg === null)
        throw new Error('No SVG element with requested ID')
    if (leftRotateButton === null || rightRotateButton === null)
        throw new Error('No button with requested ID')

    const drawing = new TriangleDrawing(svg)
    leftRotateButton.onclick = () => drawing.animateTriangleRotation(-1)
    rightRotateButton.onclick = () => drawing.animateTriangleRotation(1)
}

createHTMLTriangle('left-triangle', 'left-rotate-1', 'left-rotate-2')
createHTMLTriangle('right-triangle', 'right-rotate-1', 'right-rotate-2')
