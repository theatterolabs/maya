let detections = [];


const videoElement = document.getElementById('video');

function gotFaces(results) {
 detections = results;
  if (detections.multiFaceLandmarks) {
  for (const landmarks of detections.multiFaceLandmarks) {
    console.log(FACEMESH_LIPS);
  }
  }
 
}

const faceMesh = new FaceMesh({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}});
faceMesh.setOptions({
  maxNumFaces: 1,
  selfieMode: true,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
faceMesh.onResults(gotFaces);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({image: videoElement});
  },
  width: 640,
  height: 480
});
camera.start();
