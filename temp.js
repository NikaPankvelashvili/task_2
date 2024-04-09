import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create three cubes
const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
cube1.position.x = -2;
scene.add(cube1);

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
scene.add(cube2);

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
cube3.position.x = 2;
scene.add(cube3);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Add event listener for mouse movement
document.addEventListener('mousemove', onMouseMove, false);

// Function to handle mouse movement
function onMouseMove(event) {
  // Calculate normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections
  const intersects = raycaster.intersectObjects(scene.children);

  // Reset cube colors
  scene.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      child.material.color.setHex(0xffffff);
    }
  });

  // Change color of intersected cube
  if (intersects.length > 0) {
    const intersectedCube = intersects[0].object;
    intersectedCube.material.color.setHex(0xff00ff);
  }
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();