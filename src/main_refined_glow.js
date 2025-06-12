
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Cámara
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 200);

// Render
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iluminación múltiple
scene.add(new THREE.DirectionalLight(0xf8efda, 1.5).position.set(1, 2, 1));
scene.add(new THREE.DirectionalLight(0xffeec0, 0.8).position.set(-2, -1, 1));
scene.add(new THREE.DirectionalLight(0xffffff, 0.3).position.set(0, 0, 1));
scene.add(new THREE.AmbientLight(0xd6d0b3, 1.25));

// Grupo
const group = new THREE.Group();
scene.add(group);

// Cargador
const loader = new SVGLoader();

// Crear material con degradado complejo y simulación de reflejo
function createGradientMaterial(colorStops) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, size);

  // Añadir múltiples puntos de color
  colorStops.forEach(([stop, color]) => gradient.addColorStop(stop, color));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.7,
    roughness: 0.2,
    transparent: true,
    side: THREE.DoubleSide
  });
}

// Añadir capa de brillo externo animado tipo glow
function addGlow(mesh, color = 0xfff8d9, scale = 1.07, intensity = 0.4) {
  const glowMaterial = new THREE.MeshBasicMaterial({
    color,
    side: THREE.BackSide,
    transparent: true,
    opacity: intensity
  });
  const glowMesh = mesh.clone();
  glowMesh.material = glowMaterial;
  glowMesh.scale.multiplyScalar(scale);
  mesh.add(glowMesh);
}

function loadSVG(name, path, position, gradientColors) {
  loader.load(path, (data) => {
    const paths = data.paths;
    const material = createGradientMaterial(gradientColors);
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
        addGlow(mesh); // Añadir resplandor
        subGroup.add(mesh);

        // Añadir outline dorado
        const outlineMaterial = new THREE.MeshBasicMaterial({
          color: 0xffd700,
          side: THREE.BackSide
        });
        const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
        outlineMesh.scale.set(0.505, -0.505, 0.505);
        subGroup.add(outlineMesh);
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

loadSVG("anillo", "/anillo-final.svg", [0, 0, 0], [
  [0, '#c6bb94'],
  [0.5, '#fdf9e2'],
  [1, '#d1c29a']
]);

loadSVG("p", "/p.svg", [72.65, -45.1857, 0], [
  [0, '#f3e8ce'],
  [0.5, '#ffffff'],
  [1, '#e4dac0']
]);

loadSVG("s", "/s.svg", [33.42, -60.85, 0], [
  [0, '#f3e8ce'],
  [0.5, '#ffffff'],
  [1, '#e4dac0']
]);

// Animación
function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
