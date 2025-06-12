
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

// Iluminación refinada
const lights = [
  [0xf8efda, 1.5, [1, 2, 1]],
  [0xffeec0, 1.0, [-2, -1, 2]],
  [0xffffff, 0.3, [0, 0, 2]],
  [0xd6d0b3, 1.4, [0, 0, -2]],
];
lights.forEach(([color, intensity, pos]) => {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...pos);
  scene.add(light);
});
scene.add(new THREE.AmbientLight(0xd6d0b3, 1.15));

// Grupo general
const group = new THREE.Group();
scene.add(group);

// Cargador
const loader = new SVGLoader();

// Crear material degradado desde canvas
function createGradientMaterial(colorStops) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, size);
  colorStops.forEach(([stop, color]) => gradient.addColorStop(stop, color));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.65,
    roughness: 0.2,
    side: THREE.DoubleSide,
    transparent: true
  });
}

// Añadir halo glow desde geometría y añadirlo al subgrupo
function addGlow(geometry, subGroup, color = 0xfff8d9, scale = 1.03, opacity = 0.3) {
  const glowMaterial = new THREE.MeshBasicMaterial({
    color,
    side: THREE.BackSide,
    transparent: true,
    opacity: opacity,
    depthWrite: false
  });
  const glowMesh = new THREE.Mesh(geometry.clone(), glowMaterial);
  glowMesh.scale.set(scale, scale, scale);
  subGroup.add(glowMesh);
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
        subGroup.add(mesh);

        // Añadir glow y outline sutil
        addGlow(geometry, subGroup, 0xfff5cc, 1.04, 0.35);

        const outlineMaterial = new THREE.MeshBasicMaterial({
          color: 0xffd700,
          side: THREE.BackSide
        });
        const outline = new THREE.Mesh(geometry.clone(), outlineMaterial);
        outline.scale.set(0.502, -0.502, 0.502);
        subGroup.add(outline);
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

function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
