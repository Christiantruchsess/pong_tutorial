import  { mousePosition } from "./mouseposition.js"

export default class Paddle {
    constructor(startYPosition,inColor) {
        this.color = inColor
        this.xPosition = 10
        this.yPosition = startYPosition
        this.width = 20
        this.height = 100
        this.alive = true 
    }

    draw (ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.rect(this.xPosition, this.yPosition , this.width, this.height)
        ctx.fill()

        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.xPosition, this.yPosition, 4, 0, 2 * Math.PI)
        ctx.fill()
    }

    update () {
        this.yPosition = mousePosition.y - this.height/2
    }
}