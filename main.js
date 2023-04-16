// Define Ball Class
class Ball {
    constructor(startX, startY, startRadius, startColor) {
        this.xPosition = startX
        this.yPosition = startY
        this.radius = startRadius
        this.color = startColor
        this.xSpeed = 1
        this.ySpeed = 1
    }

    draw (ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.xPosition,this.yPosition,this.radius,0,2*Math.PI)
        ctx.fill() 
    }

    update () {
        if(this.xPosition + this.radius > canvas.clientWidth) {
            this.xSpeed = -1
        }
        if(this.xPosition - this.radius < 0) {
            this.xSpeed = 1
        }
        if(this.yPosition + this.radius > canvas.clientHeight) {
            this.ySpeed = -1 
        }
        if(this.yPosition - this.radius < 0) {
            this.ySpeed = 1
        }
        this.xPosition += this.xSpeed
        this.yPosition += this.ySpeed
    }
}

// Define Global Variables 
var canvas = document.getElementById("canvas")
var ball1 = new Ball(300,300,15,"blue")
var ball2 = new Ball(200,200,15,"green")
var ball3 = new Ball(100,100,15,"purple")

// Define Functions

function draw() {
    // draws "Canvas"
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)
    // draws ball instances
    ball1.draw(ctx)
    ball2.draw(ctx)
    ball3.draw(ctx)
}

function update() {
    // 
    ball1.update()
    ball2.update()
    ball3.update()
}

function animate() {
    update()
    draw()
    requestAnimationFrame(animate)
}

function onContentLoaded() {   
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    animate()
}

document.addEventListener("DOMContentLoaded", onContentLoaded)