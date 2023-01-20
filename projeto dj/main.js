song=""
song2=""
songStatus = ""
songStatus2 = ""
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
scoreLeftWrist = 0
scoreRightWrist = 0
function preload(params) {
    song = loadSound("music.mp3")
    song = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose",gotPoses)
}
function draw() {
    image(video, 0, 0, 600, 500)
    fill("#15a3cf")
    stroke("#15a3cf")
    if (scoreLeftWrist>0.2) {
        circle(leftWristX, leftWristY, 20)
        song.stop()
        if (songStatus2==false) {
            document.getElementById("song").innerHTML="tocando harry potter"
            song2.player()
        }
    if (scoreRightWrist>0.2) {
        circle(rightWristX, rightWristY, 20)
        song2.stop()
        if (songStatus==false) {
            document.getElementById("song").innerHTML="tocando harry potter"
            song.player()
        }
       else if (rightWristY>100 && rightWristY<=200) {
            document.getElementById("speed").innerHTML="velocidade=1x"
            song.rate(1)
        }
        else if (rightWristY>200 && rightWristY<=300) {
            document.getElementById("speed").innerHTML="velocidade=1.5x"
            song.rate(1.5)
        }
        else if (rightWristY>300 && rightWristY<=400) {
            document.getElementById("speed").innerHTML="velocidade=2x"
            song.rate(2)
        }
        else if (rightWristY>400 && rightWristY<=500) {
            document.getElementById("speed").innerHTML="velocidade=2.5x"
            song.rate(2.5)
        }
    }
}

    function modelLoaded(params) {
    console.log("posenet inicio")
    
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log(" scoreLeftWrist= " + scoreLeftWrist + " scoreRightWrist"+ scoreRightWrist)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log(leftWristX, leftWristY)
        console.log(rightWristX, rightWristY)

    }
}
