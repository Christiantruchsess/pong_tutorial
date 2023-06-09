import { mousePosition } from "./mouseposition.js"
import Ball from "./ball.js"
import Paddle from "./paddle.js"

// Define Global Variables 
var player1Paddle = new Paddle(200,"black")
var canvas 
var ctx
var entities = []
entities.push(player1Paddle)

var ballIsInPlay = false

// Define Functions

function draw() {
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)
    ctx.fillStyle = "gray"
    ctx.beginPath()
    ctx.rect(0, 0, canvas.clientWidth,canvas.clientHeight)
    ctx.fill()
    entities.forEach((entity) => {
        entity.draw(ctx)
    })
}

function update() {
    entities.forEach((entity) => {
        entity.update()
    })
    checkPaddleCollisions(player1Paddle)
    // removeDeadEntities()
}

function checkPaddleCollisions(paddle) {
    //filter out the paddle from the entities list (don't want to collide with myself!)
    // var notPaddleEntities = entities.filter((entity) => entity != paddle)
    
    var notPaddleEntities = []
    for(var index = entities.length - 1; index >= 0; index -= 1) {
        var entity = entities[index]
        if(entity != paddle) {
            notPaddleEntities.push(entity)
        }
    }
    
    notPaddleEntities.forEach((ball) => {
        ball.collisionCheck(paddle)
    })
    //loop over all of the remaining entities
    //if the entity is within the paddle
    //call entity.collide(paddle)
}

function removeDeadEntities() {
    //entities = entities.filter((entity) => { return entity.alive } )
    for(var index = entities.length - 1; index >= 0; index -= 1) {
        var entity = entities[index]
        if(!entity.alive) {
            entities.splice(index, 1)
        }
    }
}

//                  *
// [ P, B, B, B, B, B, P, B, B]
//   x  x  x  x  x  5 /
//   5

//   [ P, B, B, B, B, P, B, B]

export function onBallDeath(deadBall) {
    // var ballIndex = 0
    // for(var index = 0; index < entities.length; index++) {
    //     var entity = entities[index]
    //     if(entity == deadBall) {
    //         ballIndex = index
    //         break
    //     }
    // }
    var mickey = (x) => x == deadBall
    var deadBallIndex = entities.myFindIndex(mickey)   

    // pseudo-code -> lambda = (entity) => entity == deadbBall 
    entities.splice(deadBallIndex, 1)

    ballIsInPlay = false
}

function compareToDeadball(entity) {
    return entity == deadBall
}

// function(entity) {
//     return entity == deadBall
// }

Array.prototype.myFindIndex = function(mickey) {
    var ballIndex = 0
    for(var index = 0; index < this.length; index++) {
        var element = this[index]
        if(mickey(element)) {
            ballIndex = index
            break
        }
    }
    return ballIndex
}

var bananas = function(value) {
    return value + 1
}

var mathResult = 3 + 3
var result = bananas(mathResult)

var result = 7

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
    if(ballIsInPlay) {
        return
    }
    console.log("clicked!", event)
    var availableColors = ["blue", "green", "purple", "red", "yellow","orange"]
    var randomIndex = Math.floor(availableColors.length * Math.random())
    entities.push(new Ball(40,mousePosition.y,15,availableColors[randomIndex]))
    ballIsInPlay = true
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
 