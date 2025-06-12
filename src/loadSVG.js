// loadSVG.js – Versión corregida y optimizada
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { materialPresets } from './materials.js';


import { setupControls } from './controls-advanced.js';
import { createGlow } from './glow.js';
const loader = new SVGLoader();

export function loadSVG(name, path, position, color, group) {
  console.log(`📂 Cargando: "${name}" desde ${path}`);

  loader.load(path, (data) => {
    const subGroup = new THREE.Group();
    const material =  materialPresets.oro;
material.color.set('#dfcb81'); // rosa fuerte
material.transparent = false;
    data.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach((shape) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 2,
          bevelEnabled: true,
          bevelThickness: 9.25,
          bevelSize: 1.15,
           blending: THREE.AdditiveBlending,
          castShadow:true,
          receiveShadow:true,
          polygonOffset:true,
          bevelSegments: 220,
          curveSegments: 30
        });

        // 🟡 MESH PRINCIPAL
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;
        mesh.scale.set(0.5, -0.5, 0.5);
        mesh.position.set(...position);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // 🔥 GLOW
     const glow = createGlow(mesh); // o con parámetros: c
      
     
        // ✏️ STROKE / OUTLINE
        const strokeMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0xdfcb79),
          side: THREE.BackSide,
          transparent: true,
          opacity: 0.12,
          blending: THREE.AdditiveBlending,
            bevelEnabled: true,
          bevelThickness: 9.25,
          bevelSize: 1.15,
       
          castShadow:true,
          receiveShadow:true,
          polygonOffset:true,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -5
        });

        const stroke = new THREE.Mesh(geometry.clone(), strokeMat);
        stroke.scale.set(
          mesh.scale.x * 1.01,
          mesh.scale.y * 1.01,
          mesh.scale.z * 1.01
        );
        stroke.position.copy(mesh.position);
        stroke.rotation.copy(mesh.rotation);
        stroke.renderOrder = 998;

        material.userData.strokeMesh = stroke;


        // Añadir al subgrupo
        subGroup.add(mesh, glow, stroke);
       setupControls(subGroup, material, glow, name); // ❌ glowMesh no existe

      });
    });

    group.add(subGroup);
  });
}

