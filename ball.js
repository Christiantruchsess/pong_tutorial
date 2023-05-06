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

        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(this.xPosition, this.yPosition, 4, 0, 2 * Math.PI)
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

    collisionCheck (paddle) {
        var paddleTopLeftCorner = {x: paddle.xPosition, y: paddle.yPosition}
        var paddleTopRightCorner = {x: paddle.xPosition + paddle.width, y: paddle.yPosition}
        var paddleBottomLeftCorner = {x: paddle.xPosition, y: paddle.yPosition + paddle.height}
        var paddleBottomRightCorner = {x: paddle.xPosition + paddle.width, y: paddle.yPosition + paddle.height}

        if(this.xPosition + this.radius > paddle.xPosition && this.xPosition - this.radius < paddle.xPosition + paddle.width) {
            if(this.yPosition + this.radius > paddle.yPosition && this.yPosition - this.radius < paddle.yPosition + paddle.height) {
                this.xDirection = 1*this.speed
            }
        }
        //TODO: compare the position of the paddle against this ball
        //If they intersect, this ball needs to change direction and be moved out of collision range

        //   A__B                 __ 
        //   |  |                |  |
        //   |  |   __           | _|_
        //   |  |  |__|          ||_|_|
        //   |  |                |  |
        //   |  |                |  |
        //   |__|                |__|
        //   C  D

        

    }
}
