//Initial references
let colorRef = document.getElementsByClassName("colors");
let canvas = document.getElementById("canvas");
let backgroundButton = document.getElementById("color-background");
let colorButton = document.getElementById("color-input");
let clearButton = document.getElementById("button-clear");
let eraseButton = document.getElementById("button-erase");
let penButton = document.getElementById("button-pen");
let penSize = document.getElementById("pen-slider");
let toolType = document.getElementById("tool-type");


let erase_bool = false;
let draw_bool = false;

let ctx = canvas.getContext("2d");

let mouseX = 0;
let mouseY = 0;

let rectLeft = canvas.getBoundingClientRect().left
let rectTop = canvas.getBoundingClientRect().top;

const init = () => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    //set canvas height to parent div height
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    //set range title to pen size
    toolType.innerHTML = "Pen";
    //set background and color inputs initially
    canvas.style.backgroundColor = "#ffffff";
    backgroundButton.value = "#ffffff";
    penButton.value = ctx.strokeStyle;
}

//detect touch device
const is_touch_device = () => {
    try { //try to create TouchEvent 
        document.createEvent("Touch Event");
        return true
    } catch (e) {
        return false
    }
};

//exact x and y position of mouse/touch
const getXY = (e) => {
    mouseX = (!is_touch_device() ? e.pageX : e.touches?.[0].pageX) - rectLeft;
    mouseY = (!is_touch_device() ? e.pageY : e.touches?.[0].pageY) - rectTop;
};

const stopDrawing = () => {
    ctx.beginPath();
    draw_bool = false;
};

//User has started drawing
const startDrawing = (e) => {
    //drawing = true
    draw_bool = true;
    getXY(e);
    //start drawing
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
};


//draw function
const drawOnCanvas = (e) => {
    if (!is_touch_device()) {
        e.preventDefault();
    }
    getXY(e);
    //if user is drawing
    if (draw_bool) {
        //create a line to x and y position of cursor
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        if (erase_bool) {
            //destination-out draws new shape behind the existing canvas content
            ctx.globalCompositeOperation = "destination-out";
        } else {
            ctx.globalCompositeOperation = "source-over"
        }
    }
};

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);

canvas.addEventListener("mousemove", drawOnCanvas);
canvas.addEventListener("touchmove", drawOnCanvas);


//when mouse click stop/touch stops then stop drawing and begin a new path
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);

//when mouse leaves the canvas
canvas.addEventListener("mouseleave", stopDrawing);

//button for pen mode
penButton.addEventListener("click", () => {
    //set range title to pen size
    toolType.innerHTML = "Pen";
    erase_bool = false;
})

//Button for erase mode
eraseButton.addEventListener("click", () => {
    erase_bool = true;
    //set range title to erase size
    toolType.innerHTML = "Eraser";
});

//Adjust pen size
penSize.addEventListener("input", () => {
    //set width to range value
    ctx.lineWidth = penSize.value;
});

//Change color
colorButton.addEventListener("change", () => {
    ctx.strokeStyle = colorButton.value;
});

//Change Background
backgroundButton.addEventListener("change", () => {
    canvas.style.backgroundColor = backgroundButton.value;
});

//Clear button
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = "#ffffff";
    backgroundButton.value = "#ffffff";
    console.log(ctx.clearRect)
});

window.onload = init();
