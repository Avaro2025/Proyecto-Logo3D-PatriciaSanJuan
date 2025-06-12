// backgroundSetup.js – Módulo de entorno visual HDRI/Skybox/Fondo
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'; // ✅ IMPORTACIÓN NECESARIA
import { PMREMGenerator } from 'three';
// ✅ Export correcto para evitar errores en importaciones
export function setupBackground(scene, modo = 'hdri'){
  const path = '/textures/';

  switch (modo) {
    case 'hdri': {
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load('/textures/hdri/aft_lounge_4k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
          const pmremGenerator = new PMREMGenerator(renderer);
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      });
      break;
    }

    case 'gradiente': {
      const loader = new THREE.TextureLoader();
      loader.load(`${path}gradient-gold.png`, (texture) => {
        scene.background = texture;
      });
      break;
    }

    default:
      scene.background = new THREE.Color(0x000000);
       // Asignar como entorno global
  scene.environment = envMap;
  scene.background = envMap;
  }
}