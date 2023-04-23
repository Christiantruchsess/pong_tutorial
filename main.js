// Define Ball Class
class Ball {
    constructor(startX, startY, startRadius, startColor) {
        this.xPosition = startX
        this.yPosition = startY
        this.radius = startRadius
        this.color = startColor
        this.xDirection = 1
        this.yDirection = 1
        this.speed = 1

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
        }
        if(this.xPosition - this.radius < 0) {
            this.xDirection = 1*this.speed
            this.speed += 1
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

class Paddle {
    constructor(startYPosition,inColor) {
        this.color = inColor
        this.yPosition = startYPosition
        this.height = 100
    }

    draw (ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.rect(10, this.yPosition - this.height/2 , 20, this.height)
        ctx.fill() 
    }

    update () {
        this.yPosition = mousePosition.y
    }
}

// Define Global Variables 
var ball1 = new Ball(300,300,15,"blue")
var ball2 = new Ball(200,200,15,"green")
var ball3 = new Ball(100,100,15,"purple")
var player1Paddle = new Paddle(200,"black")
var mousePosition = {
    x: 0,
    y: 0
}

var entities = []
// entities.push(ball1)
// entities.push(ball2)
// entities.push(ball3)
entities.push(player1Paddle)

// Define Functions

function draw() {
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)

    ctx.fillStyle = "gray"
    ctx.beginPath()
    ctx.rect(0, 0, canvas.clientWidth,canvas.clientHeight)
    ctx.fill()

    entities.forEach(eachEntityDraw)

}

function eachEntityDraw(entity) {
    entity.draw(ctx)
}

function eachEntityUpdate(entity) {
    entity.update()
}

function update() {
    entities.forEach(eachEntityUpdate)
}

function animate() {
    // calls "draw" and "update" functions continuously as requestAnimationFrame runs
    draw()
    update()
    requestAnimationFrame(animate)
}

function onContentLoaded() {

    // defines "canvas" and its "context"; initializes program by calling "animate" function
    canvas = document.getElementById("canvas");

    canvas.addEventListener("click", onClick)

    canvas.addEventListener("mousemove", onMousemove)

    window.addEventListener("keydown", onKeyDown)

    ctx = canvas.getContext("2d");
    animate()
}

function onClick(event) {
    console.log("clicked!", event)

    var availableColors = ["blue", "green", "purple", "red", "yellow","orange"]
    var randomIndex = Math.floor(availableColors.length * Math.random())

    entities.push(new Ball(40,mousePosition.y,15,availableColors[randomIndex]))
}

function onMousemove(event) {
    //console.log("mouse moved!", event)
    mousePosition.x = event.clientX
    mousePosition.y = event.clientY
}

function onKeyDown(event) {
    console.log("key down!", event)
}

// "turns on the ignition" by waiting for HTML Content to load, at which point "onContentLoaded" function is run
document.addEventListener("DOMContentLoaded", onContentLoaded)