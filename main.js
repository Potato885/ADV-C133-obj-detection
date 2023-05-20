img = "";
status_model = "";
objects = [];


function preload() {
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("cocossd model is loaded");
    status_model = true;
    objectDetector.detect(img, gotResult);
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (status_model != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            percent = floor(objects[i].confidence * 100);

            fill("#FF0000");
            noFill();
            text(objects[i].label+" "+percent+" %", objects[i].x+15, objects[i].y+15);
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
