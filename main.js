objects=[];
statuss="";
sound="";

function setup(){
    canvas=createCanvas(500, 420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(500, 420);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status2").innerHTML="Status: Detecting Objects";
}

function preload(){
    sound=loadSound("alarm_r.mp3");
}

function draw(){
    image(video, 0, 0, 500, 420);
    if(statuss != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status2").innerHTML="Status: Objects Detected";
            fill(r, g, b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("status").innerHTML="Status: Baby found";
                sound.stop();
            }
            else{
                document.getElementById("status").innerHTML="Status: Baby not found";
                sound.play();
            }
        }
        if(objects.length<0){
            document.getElementById("status").innerHTML="Status: Baby not detected";
            sound.play();
        }
    }
}

function modelLoaded(){
    console.log("Model is Loaded.");
    statuss="true"
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        objects=results;
    }
}