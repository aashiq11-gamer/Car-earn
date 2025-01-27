// Scene, Camera, Renderer Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Light blue sky

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(50, 50, 50);
scene.add(directionalLight);

// Loaders
const loader = new THREE.GLTFLoader();

// Variables
let car, track;
const aiCars = [];

// Load Car Model
loader.load(
  'models/car.glb',
  function (gltf) {
    car = gltf.scene;
    car.scale.set(0.5, 0.5, 0.5);
    car.position.set(0, 0, 0);
    scene.add(car);
    animate(); // Start the animation loop after the car is loaded
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Load AI Cars
for (let i = 0; i < 3; i++) {
  loader.load(
    'models/car.glb',
    function (gltf) {
      const aiCar = gltf.scene.clone();
      aiCar.scale.set(0.5, 0.5, 0.5);
      aiCar.position.set(0, 0, -10 * (i + 1));
      scene.add(aiCar);
      aiCars.push(aiCar);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

// Load Track Model
loader.load(
  'models/track.glb',
  function (gltf) {
    track = gltf.scene;
    scene.add(track);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Keyboard Controls
const keys = {};

document.addEventListener('keydown', (event) => {
  keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});

// External Link Function
setInterval(() => {
  window.open('https://www.example.com', '_blank');
}, 15000); // Opens every 15 seconds

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  if (car) {
    const speed = 0.2;
    const turnSpeed = 0.03;

    // Forward and Backward
    if (keys['ArrowUp']) {
      car.translateZ(-speed);
    }
    if (keys['ArrowDown']) {
