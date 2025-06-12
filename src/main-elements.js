// main.js – Versión 2.0
// Fecha: 7 de junio de 2025 – 03:10h
// 🧠 Integración unificada y funcional con SVGs posicionados, materiales avanzados, FXAA y trazabilidad total.

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { loadSVG } from './loadSVG.js';
import { setupControls } from './controls-advanced.js';

import { PMREMGenerator } from 'three';
import { setupBackground } from './backgroundSetup.js';


// 🎬 ESCENA
const scene = new THREE.Scene();


scene.fog = new THREE.Fog(0x000000, 3000, 6000);

// 🎥 CÁMARA
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 3000);
camera.position.set(0, 0, 1000);

// 🖥️ RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

const rgbeLoader = new RGBELoader();
rgbeLoader.load('/textures/hdri/studio_small_03_4k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
  pmremGenerator.fromEquirectangular(texture).then((pmrem) => {
    scene.environment = pmrem.texture;
 
  });
}, undefined, function (err) {
  
  // opcional, o déjalo negro si quieres
});


pmremGenerator.compileEquirectangularShader();
import studioHDR from '/textures/hdri/studio_small_03_4k.hdr?url';







// 🌀 CONTROLES DE CÁMARA
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.target.set(0, 0, 0); // Mira al centro del canvas
controls.update();

// 💡 ILUMINACIÓN
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const ambientLight2 = new THREE.AmbientLight(0xfff8e7, 1.5);
scene.add(ambientLight2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(100, 100, 100);

directionalLight.shadow.mapSize.width = window.innerWidth;
directionalLight.shadow.mapSize.height = window.innerHeight;

scene.add(directionalLight);


const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight2.position.set(100, 100, -100);

directionalLight2.shadow.mapSize.width = window.innerWidth;
directionalLight2.shadow.mapSize.height = window.innerHeight;

scene.add(directionalLight2);




const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.25);
directionalLight3.position.set(-100, -100, -100);

directionalLight3.shadow.mapSize.width = window.innerWidth;
directionalLight3.shadow.mapSize.height = window.innerHeight;

scene.add(directionalLight3);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.025);
directionalLight4.position.set(-100, -100, 100);

directionalLight4.shadow.mapSize.width = window.innerWidth;
directionalLight4.shadow.mapSize.height = window.innerHeight;

scene.add(directionalLight4);


const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.025);
directionalLight5.position.set(0, 0, 1200);

directionalLight5.shadow.mapSize.width = window.innerWidth;
directionalLight5.shadow.mapSize.height = window.innerHeight;

scene.add(directionalLight5);

// 💡 ILUMINACIÓN BRUTALISTA
const hemiLight = new THREE.HemisphereLight(0xfff8e7, 0x1b1b1b, 0.6);
scene.add(hemiLight);

const spotLight = new THREE.SpotLight(0xffffff, 2, 1000, Math.PI / 6, 0.5, 1.5);
spotLight.position.set(200, 300, 400);
spotLight.castShadow = true;
scene.add(spotLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1.5);
backLight.position.set(-250, -250, 150);
scene.add(backLight);

const fillLight = new THREE.DirectionalLight(0xffddcc, 0.6);
fillLight.position.set(100, 50, -200);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
rimLight.position.set(0, 300, -500);
scene.add(rimLight);




// 🧪 POSTPROCESADO FXAA
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const fxaaPass = new ShaderPass(FXAAShader);
const pixelRatio = renderer.getPixelRatio();
fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);
composer.addPass(fxaaPass);

// 🪛 RESPONSIVE
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  const pixelRatio = renderer.getPixelRatio();
  fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
  fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);
});

// 🧩 SVGs A CARGAR
const svgGroup = new THREE.Group();
scene.add(svgGroup);

const elementos = [
  { name: 'anillo', path: '/anillo-center.svg', position: [0, 0, 0], color: 0xffd700 },
  { name: 'p', path: '/p-center.svg', position: [72.65, -45.18, 0], color: 0xd4d09e},
  { name: 's', path: '/s-center.svg', position: [32.12, -61.85, 0], color: 0xd4d09e},
  { name: 'p1-permanent', path: '/title-permanent-makeup/permanent/p1-permanent-center.svg', position: [67.77, -150.5, 0], color: 0xd4d09e },
  { name: 'e1-permanent', path: '/title-permanent-makeup/permanent/e1-permanent-center.svg', position: [77.22, -152.2, 0], color: 0xd4d09e },
  { name: 'r1-permanent', path: '/title-permanent-makeup/permanent/r1-permanent-center.svg', position: [85.95, -152.8, 0], color: 0xd4d09e },
  { name: 'm1-permanent', path: '/title-permanent-makeup/permanent/m1-permanent-center.svg', position: [94.95, -153.0, 0], color: 0xd4d09e },
  { name: 'a1-permanent', path: '/title-permanent-makeup/permanent/a1-permanent-center.svg', position: [106.42, -152.4, 0], color: 0xd4d09e },
  { name: 'n1-permanent', path: '/title-permanent-makeup/permanent/n1-permanent-center.svg', position: [113.10, -148.5, 0], color: 0xd4d09e },
  { name: 'e2-permanent', path: '/title-permanent-makeup/permanent/e2-permanent-center.svg', position: [122.23, -144.55, 0], color: 0xd4d09e },
  { name: 'n2-permanent', path: '/title-permanent-makeup/permanent/n2-permanent-center.svg', position: [129.52, -138.5, 0], color: 0xd4d09e },
  { name: 't1-permanent', path: '/title-permanent-makeup/permanent/t1-permanent-center.svg', position: [137.75, -131.8, 0], color: 0xd4d09e },
  
   { name: 'm1-makeup', path: '/title-permanent-makeup/makeup/m1-makeup-center.svg', position: [147.5, -119, 0], color:0xd4d09e },

  { name: 'a1-makeup', path: '/title-permanent-makeup/makeup/a1-makeup-center.svg', position: [154.5, -114, 0], color: 0xd4d09e },
  { name: 'k1-makeup', path: '/title-permanent-makeup/makeup/k1-makeup-center.svg', position: [157.5, -104, 0], color: 0xd4d09e },
 { name: 'e1-makeup', path: '/title-permanent-makeup/makeup/e1-makeup-center.svg', position: [159.5, -96, 0], color: 0xd4d09e },
 { name: 'u1-makeup', path: '/title-permanent-makeup/makeup/u1-makeup-center.svg', position: [160.35, -84.75, 0], color: 0xd4d09e },
{ name: 'p1-makeup', path: '/title-permanent-makeup/makeup/p1-makeup-center.svg', position: [160.5, -76, 0], color:0xd4d09e },


];

for (const el of elementos) {
  loadSVG(el.name, el.path, el.position, el.color, svgGroup);
}

const box = new THREE.Box3().setFromObject(svgGroup);

const center = new THREE.Vector3();
box.getCenter(center);
controls.target.copy(center);
svgGroup.position.sub(center); // Centrar el grupo de SVGs
// Ajustar la cámara para que encaje con el contenido
const size = box.getSize(new THREE.Vector3());
box.getSize(size);
const maxDim = Math.max(size.x, size.y, size.z);
const desiredSize = 300;
const scaleFactor = desiredSize / maxDim;


const fov = camera.fov * (Math.PI / 180); // Convertir a radianes
const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));

// 🪞 Plano reflectante tipo espejo
const geometry = new THREE.PlaneGeometry(800, 1200); // Tamaño del espejo
const reflector = new Reflector(geometry, {
  color: new THREE.Color(0x00aa00),   // Color base del reflejo
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
  clipBias: 0.003,
  recursion: 1
});

reflector.rotation.x = -Math.PI / 2; // plano horizontal
reflector.position.y = -250;         // distancia desde el centro
reflector.material.transparent = true;
reflector.material.opacity = 0.4;
reflector.material.metalness = 0.6;
reflector.material.roughness = 0.5;
//scene.add(reflector);


camera.updateProjectionMatrix();


controls.update();

// 🔁 LOOP DE RENDER
function animate() {
  requestAnimationFrame(animate);
  renderer.sortObjects = true;
  controls.update();
  composer.render();
}

// Cargar HDRI y aplicarlo como entorno + fondo (si querés)
rgbeLoader.load(studioHDR, (hdrTexture) => {
  hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    try {
      const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
      scene.environment = envMap;
      hdrTexture.dispose();
      pmremGenerator.dispose();
    } catch (error) {
      console.error("❌ Error procesando HDRI:", error);
    }
  },
  undefined,
  (err) => {
    console.error("❌ Fallo en la carga del HDRI:", err);
  }
);

animate();
// 🛠️ CONTROLES AVANZADOS


