import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


var cameraAngleChange = false;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

function generateCubes() {
  for( let i = 0; i < 3; i++ ) {
      const cube = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({ color: 0xffffff }) );
      cube.position.set((i - 1 ) * 2, 0, 0);
      scene.add(cube);
    }
}


function resetColors() {
  scene.children.forEach(child => {
    if (child instanceof THREE.Mesh) {
      child.material.color.set(0xffffff);
    }
  });
}

function onMouseClick(event) {
  if (cameraAngleChange) {
    cameraAngleChange = false;
    return;
  }

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  resetColors();

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0xff00ff);
  }
}
  

function animate() {
  controls.update()
  requestAnimationFrame( animate );
	renderer.render( scene, camera );
}


generateCubes();
animate();

window.addEventListener( 'mouseup', onMouseClick );
controls.addEventListener( 'change', function() { cameraAngleChange = true; } );