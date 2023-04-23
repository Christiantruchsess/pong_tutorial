import  { mousePosition } from "./mousePosition.js"
import { checkBallCollisions } from "./main.js"

export default class Paddle {
    constructor(startYPosition,inColor) {
        this.color = inColor
        this.yPosition = startYPosition
        this.height = 100
        this.alive = true 
    }

    draw (ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.rect(10, this.yPosition - this.height/2 , 20, this.height)
        ctx.fill() 
    }

    update () {
        this.yPosition = mousePosition.y
        checkBallCollisions(this)
    }
}