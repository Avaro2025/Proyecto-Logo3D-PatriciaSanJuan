import * as THREE from 'three';

/**
 * Aplica presets desde JSON por matching de nombre de subgrupo
 * @param {string} url - Ruta al .json
 * @param {THREE.Group} svgGroup - Contenedor principal con subgrupos
 */
export async function applyPresetFromJSON(url, svgGroup) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const presetData = data.remembered?.[data.preset];

    if (!presetData) {
      console.warn(`⚠️ No se encontró preset válido en ${url}`);
      return;
    }

    svgGroup.children.forEach((subGroup) => {
      const name = subGroup.name || subGroup.children[0]?.name;
      if (!name || !(name in presetData)) return;

      const conf = presetData[name];

      const mesh = subGroup.children.find(c => c.isMesh && c.material?.isMeshPhysicalMaterial);

      if (mesh?.material) {
        const mat = mesh.material;

        if (conf.color) mat.color.set(conf.color);
        if ('opacity' in conf) mat.opacity = conf.opacity;
        if ('metalness' in conf) mat.metalness = conf.metalness;
        if ('roughness' in conf) mat.roughness = conf.roughness;
        if ('clearcoat' in conf) mat.clearcoat = conf.clearcoat;
        if ('clearcoatRoughness' in conf) mat.clearcoatRoughness = conf.clearcoatRoughness;
        if ('reflectivity' in conf) mat.reflectivity = conf.reflectivity;
        if ('ior' in conf) mat.ior = conf.ior;
        if ('thickness' in conf) mat.thickness = conf.thickness;
        if ('transmission' in conf) mat.transmission = conf.transmission;
        if ('attenuationDistance' in conf) mat.attenuationDistance = conf.attenuationDistance;

        mat.needsUpdate = true;
      }
    });

    console.log(`✅ Preset "${data.preset}" aplicado correctamente`);
  } catch (err) {
    console.error(`❌ Error al aplicar preset desde ${url}:`, err);
  }
}