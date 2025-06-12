
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Cámara
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 200);

// Renderizador
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iluminación avanzada
const directionalLight1 = new THREE.DirectionalLight(0xf8efda, 1.5);
directionalLight1.position.set(1, 2, 1);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffeec0, 0.8);
directionalLight2.position.set(-2, -1, 1);
scene.add(directionalLight2);

const ambient = new THREE.AmbientLight(0xd6d0b3, 1.25);
scene.add(ambient);

// Grupo principal
const group = new THREE.Group();
scene.add(group);

// Cargador
const loader = new SVGLoader();

// Función para simular degradado en materiales
function createGradientMaterial(baseColor, highlightColor) {
  const texture = new THREE.CanvasTexture(generateGradientTexture(baseColor, highlightColor));
  texture.needsUpdate = true;
  return new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.5,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
}

// Generador de textura tipo degradado vertical
function generateGradientTexture(baseColor, highlightColor) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = size;
  const context = canvas.getContext('2d');

  const gradient = context.createLinearGradient(0, 0, 0, size);
  gradient.addColorStop(0, baseColor);
  gradient.addColorStop(1, highlightColor);

  context.fillStyle = gradient;
  context.fillRect(0, 0, 1, size);

  return canvas;
}

// Cargar SVG
function loadSVG(name, path, position, color1, color2) {
  loader.load(path, (data) => {
    const paths = data.paths;
    const material = createGradientMaterial(color1, color2);
    const subGroup = new THREE.Group();

    paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 7,
          bevelEnabled: true,
          bevelThickness: 1.25,
          bevelSize: 1.25,
          bevelOffset: 0.0,
          bevelSegments: 10
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.5, -0.5, 0.5);
        subGroup.add(mesh);
      });
    });

    subGroup.position.set(...position);
    group.add(subGroup);

    loaded++;
    if (loaded === 3) {
      const box = new THREE.Box3().setFromObject(group);
      const center = new THREE.Vector3();
      box.getCenter(center);
      group.position.sub(center);
      animate();
    }
  });
}

let loaded = 0;

// SVG con degradados personalizados y coordenadas corregidas
loadSVG("anillo", "/anillo-final.svg", [0, 0, 0], '#bfb890', '#fdf9e2');
loadSVG("p", "/p.svg", [72.65, -45.1857, 0], '#f3e8ce', '#ffffff');
loadSVG("s", "/s.svg", [33.42, -60.85, 0], '#f3e8ce', '#ffffff');

// Animación
function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
