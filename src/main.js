/* main.js - Versión corregida y renderizable del logo 3D Patricia SanJuan */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { elements } from './config/elementsList.js';
import { loadSVG } from './loadSVG.js';
import { setupBackground } from './backgroundSetup.js';
import { applyPresetFromJSON } from './loadPreset.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { createCausticsShaderMaterial } from './shaders/causticsShader.js';

const timeUniform = { value: 0.0 };
const causticsMaterial = createCausticsShaderMaterial({timeUniform});


/* === MODULOS AUXILIARES === */
function getBackgroundColorFromElement(el) {
  const style = window.getComputedStyle(el);
  const rgb = style.backgroundColor.match(/\d+/g);
  if (!rgb) return { r: 255, g: 255, b: 255 };
  return {
    r: parseInt(rgb[0]),
    g: parseInt(rgb[1]),
    b: parseInt(rgb[2])
  };
}

function getLightingFromColor({ r, g, b }) {
  const brightness = (r + g + b) / 3;
  if (brightness < 70) return 'oscuro';
  if (brightness > 200) return 'neutro';
  return 'dorado';
}

/* === PRESETS DE ILUMINACIÓN === */
const lightingPresets = {
  neutro: {
    ambient: 0xffffff,
    dirColor: 0xfafafa,
    hemiTop: 0xf5f5f5,
    hemiBottom: 0xb0b0b0,
    intensity: 1.0
  },
  oscuro: {
    ambient: 0x111111,
    dirColor: 0x888888,
    hemiTop: 0x222222,
    hemiBottom: 0x000000,
    intensity: 1.4
  },
  dorado: {
    ambient: 0xfff3c2,
    dirColor: 0xffd700,
    hemiTop: 0xfff6da,
    hemiBottom: 0x9e6b00,
    intensity: 0.9
  }
};

function updateLightingScheme(presetName = 'neutro') {
  const preset = lightingPresets[presetName];
  if (!preset) {
    console.warn(`Lighting preset "${presetName}" no existe.`);
    return;
  }

  ambient.color.setHex(preset.ambient);
  dirLight.color.setHex(preset.dirColor);
  hemiLight.color.setHex(preset.hemiTop);
  hemiLight.groundColor.setHex(preset.hemiBottom);

  dirLight.intensity = preset.intensity;
  hemiLight.intensity = preset.intensity * 0.7;
  spotLight.intensity = preset.intensity * 1.2;
  backLight.intensity = preset.intensity * 0.6;
  fillLight.intensity = preset.intensity * 0.4;
  rimLight.intensity = preset.intensity * 0.5;
}
  window.updateLightingScheme = updateLightingScheme;
/* === ESCENA Y CÁMARA === */
const scene = new THREE.Scene();
setupBackground(scene);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(0, 0, 350);

/* === RENDERER === */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/* === CONTROLES === */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

/* === ILUMINACIÓN === */
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(200, 100, 300);
scene.add(dirLight);
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

// ✅ APLICAR ESQUEMA DE LUZ SEGÚN COLOR DE FONDO
const fondoColor = getBackgroundColorFromElement(document.body);
const preset = getLightingFromColor(fondoColor);
updateLightingScheme(preset);

/* === GRUPO SVG === */
const svgGroup = new THREE.Group();
scene.add(svgGroup);
elements.forEach(el => {
  const pos = el.position.toArray();
  loadSVG(el.name, el.path, pos, el.color, svgGroup);
});
// Duplicar el grupo del logo
const logoCausticsGroup = svgGroup.clone(true);
// Recorre todos los hijos y aplica el material caustics
logoCausticsGroup.traverse(child => {
  if (child.isMesh) {
    child.material = causticsMaterial;
    child.material.needsUpdate = true;
  }
});

// Opcional: escalar un poco el grupo caustics para que sobresalga como un glow exterior
logoCausticsGroup.scale.multiplyScalar(1.05);
logoCausticsGroup.position.copy(svgGroup.position); // Asegúrate de que coinciden

// Añadir el grupo caustics DETRÁS o en el mismo lugar que el logo principal
scene.add(logoCausticsGroup);
/* === POSTPROCESADO === */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.2, 0.1, 0.25);
composer.addPass(bloom);

/* === AJUSTE DE CÁMARA === */
const box = new THREE.Box3().setFromObject(svgGroup);
const center = new THREE.Vector3();
box.getCenter(center);
controls.target.copy(center);
svgGroup.position.sub(center);
const size = box.getSize(new THREE.Vector3());
const maxDim = Math.max(size.x, size.y, size.z);
const desiredSize = 300;
const scaleFactor = desiredSize / maxDim;






/* === LOOP DE ANIMACIÓN === */
function animate() {
  requestAnimationFrame(animate);
    timeUniform.value = performance.now() * 0.001;
  controls.update();
  composer.render();
}
animate();



/* === PRESETS SVG === */
window.addEventListener('load', () => {
  setTimeout(() => {
    applyPresetFromJSON('/set-vfinal-logo.json', svgGroup);
  }, 1200);
});
