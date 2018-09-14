function setup() {
    createCanvas(300, 200);
}

function draw() {
    mouseDragged = () => {
        fill(0);
        noStroke();
        ellipse(mouseX, mouseY, 20, 20);
        // websocket.emit(data)
    }
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}