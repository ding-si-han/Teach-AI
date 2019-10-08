let video;
let poseNet;
let poses = [];
let skeletons = [];

let lastSleepTime = [];
let isSleeping = [];
let lastRaiseHand = [];
let isRaiseHand = []
function setup() {
  var canvas = createCanvas(720, 560);
  var img = document.getElementById('hand');
  var img1 = document.getElementById('sleep');
  canvas.parent('sketch-holder')
  var vid = document.getElementById("defaultCanvas1");
  vid.id = "actualvideo"
  var elem = document.getElementById("defaultCanvas0");
  elem.parentNode.removeChild(elem);
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPoses);
  setInterval(async()=>
  {
    if(flag == 0)
    img.style["visibility"]="hidden";
  else
    img.style["visibility"]="visible";
  if(flag1 == 0)
    img1.style["visibility"]="hidden";
  else
    img1.style["visibility"]="visible";
  },3000)
  setInterval(async () => {
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", abc]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "Pose.csv";  //Name the file here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }, 10000)
  video.hide();
}
let str = []
function arrayToCSV(objArray) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let head = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

  return array.reduce((str, next) => {
      str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
      return str;
     }, str);
}
// function modelReady() {
//   select('#status').html('Model Loaded');
// }

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
  drawSkeleton();
}

function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
var abc = ["raisHand","sleeping", "eyeCoordX","eyeCoordY","timestamp"]
var xyz = []
abc = abc + "\n"
var flag = 0, flag1 = 0
function gotPoses(results) {
  poses = results;
  let OUTPUT = []
  for (i = 0; i < poses.length; i++) {
    if (poses[i]["pose"]["score"] >= 0.15) {
      keypoints = poses[i]["pose"]["keypoints"]
      
       OUTPUT.push({
        sleeping: checkSleeping(keypoints, i), 
        raisHand: checkRaiseHand(keypoints, i),
        eyeCoordX: keypoints[1].position.x,
        eyeCoordY: keypoints[1].position.y,
        timestamp: getTime()
      })
      //console.log(OUTPUT)
      if(OUTPUT[i]['raisHand']==1)
        flag = 1
      else
        flag = 0
      if(OUTPUT[i]['sleeping']==1)
        flag1 = 1
      else
        flag1 = 0
      //console.log(flag)
    } 
  }   
  // OUTPUT VALUES: COORDINATES are for LEFT EYE
  //console.log(OUTPUT)
  if(abc !== undefined){
      abc += (arrayToCSV(OUTPUT));
  }
    else  
      abc = ''
}
  
function checkSleeping(keypoints, i) {
  const tanAngle = Math.abs(keypoints[1].position.y - keypoints[2].position.y)/Math.abs(keypoints[1].position.x - keypoints[2].position.x)
  const angle = Math.atan(tanAngle) * 180 / Math.PI
  if (angle > 35 || (keypoints[1].position.y > keypoints[3].position.y && keypoints[2].position.y > keypoints[4].position.y )) {
    if (isSleeping[i] == false) {
      isSleeping[i] = true
      lastSleepTime[i] = getTime()
    }     
  } else {
    isSleeping[i] = false;
  }

  if (getTime() - lastSleepTime[i] >= 2 && isSleeping[i] == true) {
    // console.log("SLEEPING ----------------------------------")
    return 1;
  } else {
    return 0;
  }
}

function checkRaiseHand(keypoints, i) {
  if (keypoints[7].position.y < keypoints[5].position.y || keypoints[8].position.y < keypoints[6].position.y) {
    if (isRaiseHand[i] == false) {
      isRaiseHand[i] = true
      lastRaiseHand[i] = getTime()
    } 
  } else {
    isRaiseHand[i] = false;
  }

  if (getTime() - lastRaiseHand[i] >= 2 && isRaiseHand[i] == true) {
    // console.log("RAISING HAND -----------------------------")
    return 1;
  } else {
    return 0;
  }
}

function getTime() {
  let today = new Date();
  return today.getMinutes() * 60 + today.getSeconds()
}