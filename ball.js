export default class Ball {
    constructor(startX, startY, startRadius, startColor) {
        this.xPosition = startX
        this.yPosition = startY
        this.radius = startRadius
        this.color = startColor
        this.xDirection = 1
        this.yDirection = 1
        this.speed = 1
        this.alive = true
    }

    draw (ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.xPosition,this.yPosition,this.radius,0,2*Math.PI)
        ctx.fill() 
    }

    update () {
        if(this.xPosition + this.radius > canvas.clientWidth) {
            this.xDirection = -1*this.speed
            this.speed += 1
            //this.alive = false
        }
        if(this.xPosition - this.radius < 0) {
            this.alive = false
        }
        if(this.yPosition + this.radius > canvas.clientHeight) {
            this.yDirection = -1*this.speed
        }
        if(this.yPosition - this.radius < 0) {
            this.yDirection = 1*this.speed
        }
        // caps speed
        if(this.speed > 10) {
            this.speed = 10
        }

        this.xPosition += this.xDirection
        this.yPosition += this.yDirection 
    }
}