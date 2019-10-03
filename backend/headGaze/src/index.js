// Based on python code provided in "Head Pose Estimation using OpenCV and Dlib"
//   https://www.learnopencv.com/head-pose-estimation-using-opencv-and-dlib/#code

import cv from "@mjyc/opencv.js";
import xs from "xstream";
import { makeDOMDriver } from "@cycle/dom";
import { run } from "@cycle/run"; //
import { makePoseDetectionDriver } from "cycle-posenet-driver";

let OUTPUT = []
const THRESHOLD = 0.30
let count = 0
let abc 

let str = []
function arrayToCSV(objArray) {
  
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let head = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

  return array.reduce((str, next) => {
      str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
      return str;
     }, str);
}

abc =["headpose","xCord", "yCord","timestamp","count","numPerson", "personId"] + "\n"
window.setInterval(function(){
  //console.log(OUTPUT);
  abc += (arrayToCSV(OUTPUT));
  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", abc]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "HeadGaze.csv";  //Name the file here
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
  OUTPUT = []
  abc =["headpose","xCord", "yCord","timestamp","count","numPerson", "personId"] + "\n"
}, 5000);

let detectedEye = true;
let angle = 50;
let i = 0
let im;
let result;
let person1;

function main(sources) {
  // 3D model points
  const numRows = 4;
  const modelPoints = cv.matFromArray(numRows, 3, cv.CV_64FC1, [
    0.0,
    0.0,
    0.0, // Nose tip
    0.0,
    0.0,
    0.0, // HACK! solvePnP doesn't work with 3 points, so copied the
    //   first point to make the input 4 points
    // 0.0, -330.0, -65.0,  // Chin
    -225.0,
    170.0,
    -135.0, // Left eye left corner
    225.0,
    170.0,
    -135.0 // Right eye right corne
    // -150.0, -150.0, -125.0,  // Left Mouth corner
    // 150.0, -150.0, -125.0,  // Right mouth corner
  ]);

  // Camera internals

  const size = { width: 720, height: 560 };
  const focalLength = size.width;
  const center = [size.width / 2, size.height / 2];
  const cameraMatrix = cv.matFromArray(3, 3, cv.CV_64FC1, [
    focalLength,
    0,
    center[0],
    0,
    focalLength,
    center[1],
    0,
    0,
    1
  ]);
  // console.log("Camera Matrix:", cameraMatrix.data64F);

  // Create Matrixes
  const imagePoints = cv.Mat.zeros(numRows, 2, cv.CV_64FC1);
  const distCoeffs = cv.Mat.zeros(4, 1, cv.CV_64FC1); // Assuming no lens distortion
  const rvec = new cv.Mat({ width: 1, height: 3 }, cv.CV_64FC1);
  const tvec = new cv.Mat({ width: 1, height: 3 }, cv.CV_64FC1);
  const pointZ = cv.matFromArray(1, 3, cv.CV_64FC1, [0.0, 0.0, 500.0]);
  const pointY = cv.matFromArray(1, 3, cv.CV_64FC1, [0.0, 500.0, 0.0]);
  const pointX = cv.matFromArray(1, 3, cv.CV_64FC1, [500.0, 0.0, 0.0]);
  const noseEndPoint2DZ = new cv.Mat();
  const nose_end_point2DY = new cv.Mat();
  const nose_end_point2DX = new cv.Mat();
  const jaco = new cv.Mat();
  window.beforeunload = () => {
    im.delete();
    imagePoints.delete();
    distCoeffs.delete();
    rvec.delete();
    tvec.delete();
    pointZ.delete();
    pointY.delete();
    pointX.delete();
    noseEndPoint2DZ.delete();
    nose_end_point2DY.delete();
    nose_end_point2DX.delete();
    jaco.delete();
  };

  // main event loop
  sources.PoseDetection.poses.addListener({
    next: poses => {
      // let OUTPUT = []
      im = cv.imread(document.querySelector("canvas"));
      // console.log(poses.length + " is the POSE LENGTH")
      
      poses = poses.filter( function(pose) {
          return (pose.score > THRESHOLD);
      });
      // console.log(poses.length + " is the POSE LENGTH")
      count += 1;
      let poseLength = poses.length
      for (i = 0; i < poseLength; i++) {
        im = cv.imread(document.querySelector("canvas"));
        detectedEye = true;
        person1 = poses[i];
        console.log(person1)

        if (
          !person1.keypoints.find(kpt => kpt.part === "nose") ||
          !person1.keypoints.find(kpt => kpt.part === "leftEye") ||
          !person1.keypoints.find(kpt => kpt.part === "rightEye")
        ) {
          detectedEye = false;
        }
        if (detectedEye == true) {
          const ns = person1.keypoints.filter(kpt => kpt.part === "nose")[0]
            .position;
          const le = person1.keypoints.filter(kpt => kpt.part === "leftEye")[0]
            .position;
          const re = person1.keypoints.filter(kpt => kpt.part === "rightEye")[0]
            .position;

          // 2D image points. If you change the image, you need to change vector
          [
            ns.x,
            ns.y, // Nose tip
            ns.x,
            ns.y, // Nose tip (see HACK! above)
            // 399, 561, // Chin
            le.x,
            le.y, // Left eye left corner
            re.x,
            re.y // Right eye right corner
            // 345, 465, // Left Mouth corner
            // 453, 469 // Right mouth corner
          ].map((v, i) => {
            imagePoints.data64F[i] = v;
          });

          // Hack! initialize transition and rotation matrixes to improve estimation
          tvec.data64F[0] = -100;
          tvec.data64F[1] = 100;
          tvec.data64F[2] = 1000;
          const distToLeftEyeX = Math.abs(le.x - ns.x);
          const distToRightEyeX = Math.abs(re.x - ns.x);
          if (distToLeftEyeX < distToRightEyeX) {
            // looking at left
            rvec.data64F[0] = -1.0;
            rvec.data64F[1] = -0.75;
            rvec.data64F[2] = -3.0;
          } else {
            // looking at right
            rvec.data64F[0] = 1.0;
            rvec.data64F[1] = -0.75;
            rvec.data64F[2] = -3.0;
          }

          const success = cv.solvePnP(
            modelPoints,
            imagePoints,
            cameraMatrix,
            distCoeffs,
            rvec,
            tvec,
            true
          );
          if (!success) {
            return;
          }

          cv.projectPoints(
            pointZ,
            rvec,
            tvec,
            cameraMatrix,
            distCoeffs,
            noseEndPoint2DZ,
            jaco
          );
          cv.projectPoints(
            pointY,
            rvec,
            tvec,
            cameraMatrix,
            distCoeffs,
            nose_end_point2DY,
            jaco
          );
          cv.projectPoints(
            pointX,
            rvec,
            tvec,
            cameraMatrix,
            distCoeffs,
            nose_end_point2DX,
            jaco
          );

          

          // draw axis
          const pNose = {
            x: imagePoints.data64F[0],
            y: imagePoints.data64F[1]
          };
          const pZ = {
            x: noseEndPoint2DZ.data64F[0],
            y: noseEndPoint2DZ.data64F[1]
          };
          const p3 = {
            x: nose_end_point2DY.data64F[0],
            y: nose_end_point2DY.data64F[1]
          };
          const p4 = {
            x: nose_end_point2DX.data64F[0],
            y: nose_end_point2DX.data64F[1]
          };
          cv.line(im, pNose, pZ, [255, 0, 0, 255], 2);
          cv.line(im, pNose, p3, [0, 255, 0, 255], 2);
          cv.line(im, pNose, p4, [0, 0, 255, 255], 2);

          const angleWidth = Math.abs(pZ.x - pNose.x);
          const angleHeight = Math.abs(pZ.y - pNose.y);
          const angleTangent = angleHeight / angleWidth;
          angle = (Math.atan(angleTangent) * 180) / Math.PI;
          
        }

        // CONSOLE STATEMENTS TO OUTPUT
        if (!detectedEye) {
          // console.log("2 Eye not in frame");
          result = 0
        } else if (angle < 16) {
          // console.log("1 Facing Away");
          result = 1
        } else {
          // console.log("0 All good");
          result = 2
        }


        if (detectedEye) {
          let date = new Date()
          OUTPUT.push({
            headpose: result,
            xCord: person1.keypoints.find(kpt => kpt.part === "leftEye").position.x,
            yCord: person1.keypoints.find(kpt => kpt.part === "rightEye").position.y,
            timestamp: date.getSeconds() + date.getMinutes() * 60,
            count: count,
            numPersons: poseLength,
            personId: i,

          })
          
          
          // console.log(OUTPUT)
        }
      }


      

      // Display image
      cv.imshow(document.querySelector("canvas"), im);
      if (detectedEye == true) {
        im.delete();
      }
      
    }
  });

  const params$ = xs.of({
    algorithm: 'multi-pose',
    singlePoseDetection: { minPoseConfidence: 0.2 }
  });
  const vdom$ = sources.PoseDetection.DOM;

  return {
    DOM: vdom$,
    PoseDetection: params$
  };
}

// Check out https://cycle.js.org/ for using Cycle.js
run(main, {
  DOM: makeDOMDriver("#app"),
  PoseDetection: makePoseDetectionDriver()
});
