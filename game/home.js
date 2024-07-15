import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

let round			= 1;
let newRound		= true;
let newScore		= true;
let roundStarted	= false;
let launchSide		= 1;
const SPACE			= ' ';
let game			= true;

/***********************************************************************************/
/************************** Initialisation de la scene *****************************/
/***********************************************************************************/

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.x = 0;
	camera.position.y = -5;
	camera.position.z = 0;
	camera.lookAt(0, 0, 0); // La caméra regarde vers le centre de la scène

	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('container').appendChild(renderer.domElement);

// 	Ajouter OrbitControls


/***********************************************************************************/
/******************************** Le background ************************************/
/***********************************************************************************/

let	texWallRight = new THREE.TextureLoader().load("wallRight.jpeg");
let	texWallLeft = new THREE.TextureLoader().load("wallLeft.jpeg");
let	texWallFront = new THREE.TextureLoader().load("wallFront.jpeg");
let	texCeilling = new THREE.TextureLoader().load("ceilling.jpeg");
let	texFloor = new THREE.TextureLoader().load("floor2.jpg");

let materialArray = [];
materialArray.push(new THREE.MeshPhongMaterial({map: texWallRight}));
materialArray.push(new THREE.MeshPhongMaterial({map: texWallLeft}));
materialArray.push(new THREE.MeshPhongMaterial({map: texWallFront}));
materialArray.push(new THREE.MeshPhongMaterial({map: texWallFront}));
materialArray.push(new THREE.MeshPhongMaterial({map: texCeilling}));
materialArray.push(new THREE.MeshPhongMaterial({map: texFloor}));

for (let i = 0; i < 6; i++)
	materialArray[i].side = THREE.BackSide;

let	envGeometry =  new THREE.BoxGeometry(5, 3, 2.5);

let env = new THREE.Mesh(envGeometry, materialArray);
env.position.set(0, 0, 0);
scene.add(env);

/***********************************************************************************/
/*********************************** Lumieres **************************************/
/***********************************************************************************/
			
// Lumière ambiante
	var ambientLight = new THREE.AmbientLight(0xffffff, 2);
	scene.add(ambientLight);

	// const light = new THREE.PointLight(0xff0000,100, 100);
	// light.position.set(0, 0, 0);
	// scene.add(light);




/***********************************************************************************/
/******************************** L'arcade **************************************/
/***********************************************************************************/

let arcade
var objloader = new GLTFLoader();
objloader.load(
	'newArcade.glb',
	function (gltf) {
		arcade = gltf.scene
		arcade.position.set(1.8, 0, -1.2);
		arcade.scale.set(0.4, 0.4, 0.4);
		arcade.rotateX(Math.PI / 2);
		scene.add(arcade);
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	},
	function (error) {
		console.log('An error happened', error);
	}
);
	
/***********************************************************************************/
/******************************** Event listener ***********************************/
/***********************************************************************************/

// Ajuster le rendu lors du redimensionnement de la fenêtre
	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});

// Gestion du défilement pour ajuster la position de la caméra
	window.addEventListener('wheel', function(event) {
		if (event.deltaY > 0) {
			camera.position.z += 1;
			// camera.rotation.z += 1;
		} else {
			camera.position.z -= 1;
			// camera.rotation.z -= 1;
		}
		console.log("camera z = " + camera.position.z);
	});



/***********************************************************************************/
/********************************** Animation **************************************/
/***********************************************************************************/

// Définir une fonction d'animation

	function animate()
	{
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

animate();
	