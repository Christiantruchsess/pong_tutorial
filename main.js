import { mousePosition } from "./mouseposition.js"
import Ball from "./ball.js"
import Paddle from "./paddle.js"

// Define Global Variables 
var player1Paddle = new Paddle(200,"black")
var canvas 
var ctx
var entities = []
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
    removeDeadEntities()
}

export function checkBallCollisions(paddle) {
    console.log("does anybody hit me? ", paddle)

    //filter out the paddle from the entities list (don't want to collide with myself!)
    // var notPaddleEntities = entities.filter((entity) => entity != paddle)

    var notPaddleEntities = []
    for(var index = entities.length - 1; index >= 0; index -= 1) {
        var entity = entities[index]
        if(entity != paddle) {
            notPaddleEntities.push(entity)
        }
    }
    
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