const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const detectedInfo = document.getElementById('detectedInfo');
let poseNetModel, faceApiLoaded = false;

async function setupWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
    });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      console.log("Webcam loaded successfully");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      detectPoseAndFace();
    };
  } catch (err) {
    console.error("Error accessing webcam: ", err);
    detectedInfo.textContent = "Unable to access the camera.";
  }
}

async function loadPoseNet() {
  try {
    poseNetModel = await posenet.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: { width: 640, height: 480 },
      multiplier: 0.5,
    });
    detectedInfo.textContent = 'PoseNet model loaded. Waiting for pose detection...';
  } catch (err) {
    console.error("Error loading PoseNet: ", err);
    detectedInfo.textContent = 'Error loading PoseNet model.';
  }
}

async function loadFaceApi() {
  console.log("----- START LOAD MODEL ------");
  try {
    // Menggunakan Promise.all untuk memuat semua model sekaligus
    await Promise.all([
      faceapi.nets.ageGenderNet.loadFromUri('models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
      faceapi.nets.tinyFaceDetector.loadFromUri('models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('models'),
      faceapi.nets.faceExpressionNet.loadFromUri('models')
    ]);

    console.log("All models loaded.");
    faceApiLoaded = true;
    detectedInfo.textContent = 'FaceAPI model loaded. Waiting for face detection...';
  } catch (err) {
    console.error("Error loading FaceAPI models: ", err);
    detectedInfo.textContent = 'Error loading FaceAPI model.';
  }
}


async function detectPoseAndFace() {
  if (!poseNetModel || !faceApiLoaded) return;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const pose = await poseNetModel.estimateSinglePose(video, { flipHorizontal: false });
  drawKeypoints(pose.keypoints);

  const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withAgeAndGender();
  detections.forEach((detection) => {
    const { age, gender } = detection;
    context.beginPath();
    context.rect(detection.detection.box.x, detection.detection.box.y, detection.detection.box.width, detection.detection.box.height);
    context.lineWidth = 2;
    context.strokeStyle = 'green';
    context.stroke();
    context.fillStyle = 'green';
    context.fillText(`${gender}, ${Math.round(age)} years`, detection.detection.box.x, detection.detection.box.y - 5);
  });

  if (detections.length > 0) {
    const { age, gender } = detections[0];
    detectedInfo.textContent = `Detected Age: ${Math.round(age)} years, Gender: ${gender}`;
  } else {
    detectedInfo.textContent = 'No face detected.';
  }

  requestAnimationFrame(detectPoseAndFace);
}

function drawKeypoints(keypoints) {
  keypoints.forEach((keypoint) => {
    if (keypoint.score > 0.5) {
      context.beginPath();
      context.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
    }
  });
}

async function init() {
  await loadPoseNet();
  await loadFaceApi();
  await setupWebcam();
}

init();
