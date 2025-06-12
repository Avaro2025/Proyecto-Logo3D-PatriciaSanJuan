// src/materials.js
// Sistema modular de materiales físicos avanzados para el logo de Patricia SanJuan
// ----------------------------------------------------------------------------------

import * as THREE from 'three';

/**
 * Crea un material PBR con texturas cargadas desde /textures
 * Ideal para oro, mármol, metal o piel texturizada.
 *
 * Las texturas deben tener el patrón:
 * - name_basecolor.jpg
 * - name_normal.jpg
 * - name_roughness.jpg
 * - name_metallic.jpg
 *
 * @param {string} name - prefijo del set de texturas (ej. "oro")
 * @param {Object} options - parámetros extra opcionales de afinado
 * @returns {THREE.MeshPhysicalMaterial}
 */
export function createPBRMaterialSet(name = 'oro', options = {}) {
  const textureLoader = new THREE.TextureLoader();

  const baseColor = textureLoader.load(`/textures/${name}_basecolor.jpg`);
  const normalMap = textureLoader.load(`/textures/${name}_normal.jpg`);
  const roughnessMap = textureLoader.load(`/textures/${name}_roughness.jpg`);
  const metalnessMap = textureLoader.load(`/textures/${name}_metallic.jpg`);

  const mat = new THREE.MeshPhysicalMaterial({
    map: baseColor,
    normalMap,
    roughnessMap,
    metalnessMap,
    metalness: options.metalness ?? 0.85,
    roughness: options.roughness ?? 0.3,
    clearcoat: options.clearcoat ?? 0.55,
    reflectivity: options.reflectivity ?? 0.7,
    ior: options.ior ?? 1.5,
    transmission: options.transmission ?? 0.45,
    thickness: options.thickness ?? 2.0,
    transparent: true,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide
  });

  return mat;
}

/**
 * Crea un material PBR plano sin texturas
 * Útil para debugging o cuando no se desea dependencia de mapas
 *
 * @param {string} color - color hexadecimal o nombre CSS
 * @param {Object} options - parámetros físicos opcionales
 * @returns {THREE.MeshPhysicalMaterial}
 */
export function createSimplePBR(color = '#f3e8ce', options = {}) {
  return new THREE.MeshPhysicalMaterial({
 color: new THREE.Color(color), // o el que venga de options
  metalness: 0.80,
  roughness: 0.35,
  clearcoat: 0.5,
  clearcoatRoughness: 0.7,
  reflectivity: 0.7,
  ior: 1.6,
  transmission: 0.6,  // si quieres más efecto cristal
  thickness: 1.5,
  envMapIntensity: 1.5,
  side: THREE.DoubleSide,
  transparent: true,

  });
}

/**
 * 🎨 Presets predefinidos para cambiar materiales fácilmente desde GUI o lógica
 * Compacto, dentro del mismo archivo para no dispersar la modularización
 */
export const materialPresets = {
  // Sin textura
  oro: createSimplePBR('#FFD700'),           // Dorado cálido
  oroOscuro: createSimplePBR('#D4AF37'),     // Oro viejo
  plata: createSimplePBR('#C0C0C0'),         // Plateado neutro
  rubi: createSimplePBR('#AA1F3A'),          // Rojo piedra preciosa
  perla: createSimplePBR('#F8F0E3'),         // Blanco rosado tenue
  azabache: createSimplePBR('#111111'),      // Negro pulido brillante

  // Con textura (requiere archivos en /textures con patrón indicado)
  oroTexturizado: createPBRMaterialSet('oro'),
  plataTexturizada: createPBRMaterialSet('plata'),
  marmolBlanco: createPBRMaterialSet('marmol')
};
