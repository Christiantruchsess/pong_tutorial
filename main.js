
// Define Classes

class Square {
    constructor(inPosition) {
        this.position = inPosition
    }
    draw(ctx) {
        ctx.fillStyle = "rgb(200, 0, 0)";
        ctx.fillRect(this.position, this.position, 50, 50);
    }
}

// Define Global Variables 
var firstSquare = new Square(10)
var secondSquare = new Square(100)

var canvas
var ctx

// Define Functions

function draw() {
        ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)

        firstSquare.draw(ctx)
        secondSquare.draw(ctx)

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect(30, 30, 50, 50);
}
function update() {
    firstSquare.position += 1
    secondSquare.position -= 1
}

function animate() {
    update()
    draw()
    requestAnimationFrame(animate)
}

function mickey() {
    console.log("dom content loaded!")
    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    animate()
}

document.addEventListener("DOMContentLoaded", mickey)

// Dom Content loads -> "listener" _heard_ the Dom content loading... so he calls mickey,
// mickey then gives value to global variable canvas, defines context of canvas, calls animate function
// animate calls update