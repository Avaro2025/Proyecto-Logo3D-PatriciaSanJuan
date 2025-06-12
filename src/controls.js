import { GUI } from 'dat.gui';

/**
 * Añade un panel GUI con controles de transformación, material y glow para cada objeto SVG.
 * @param {THREE.Object3D} object - El subgrupo del objeto SVG.
 * @param {THREE.Material} material - Material principal del mesh.
 * @param {THREE.Mesh} glow - Mesh del glow externo (opcional).
 */
export function setupControls(object, material, glow = null) {
  const gui = new GUI({ width: 310 });

  // 🌐 PARÁMETROS PRINCIPALES
  const params = {
    posX: object.position.x,
    posY: object.position.y,
    posZ: object.position.z,
    rotX: object.rotation.x,
    rotY: object.rotation.y,
    rotZ: object.rotation.z,
    scale: object.scale.x,

    metalness: material.metalness,
    roughness: material.roughness,
    color: material.color.getHex(),
    flatShading: material.flatShading,
    emissive: material.emissive ? material.emissive.getHex() : 0x000000,
    wireframe: material.wireframe ?? false,
    transparent: material.transparent ?? false,
    opacity: material.opacity ?? 1
  };

  const folderMain = gui.addFolder('🔹 Objeto Principal');

  folderMain.add(params, 'posX', -200, 200, 0.1).onChange(v => object.position.x = v);
  folderMain.add(params, 'posY', -200, 200, 0.1).onChange(v => object.position.y = v);
  folderMain.add(params, 'posZ', -200, 200, 0.1).onChange(v => object.position.z = v);

  folderMain.add(params, 'rotX', 0, Math.PI * 2, 0.01).onChange(v => object.rotation.x = v);
  folderMain.add(params, 'rotY', 0, Math.PI * 2, 0.01).onChange(v => object.rotation.y = v);
  folderMain.add(params, 'rotZ', 0, Math.PI * 2, 0.01).onChange(v => object.rotation.z = v);

  folderMain.add(params, 'scale', 0.05, 5, 0.01).onChange(v => object.scale.set(v, v, v));

  folderMain.add(params, 'metalness', 0, 1, 0.01).onChange(v => material.metalness = v);
  folderMain.add(params, 'roughness', 0, 1, 0.01).onChange(v => material.roughness = v);
  folderMain.addColor(params, 'color').onChange(v => material.color.set(v));
  folderMain.addColor(params, 'emissive').onChange(v => {
    if (material.emissive) material.emissive.set(v);
  });
  folderMain.add(params, 'wireframe').onChange(v => material.wireframe = v);
  folderMain.add(params, 'transparent').onChange(v => material.transparent = v);
  folderMain.add(params, 'opacity', 0, 1, 0.01).onChange(v => material.opacity = v);
  folderMain.add(params, 'flatShading').onChange(v => {
    material.flatShading = v;
    material.needsUpdate = true;
  });

  folderMain.open();

  // ✨ CONTROLES DEL GLOW (si existe)
  if (glow) {
    const glowParams = {
      glowPosX: glow.position.x,
      glowPosY: glow.position.y,
      glowPosZ: glow.position.z,
      glowScale: glow.scale.x,
      glowOpacity: glow.material.opacity,
      glowColor: glow.material.color.getHex(),
      glowWireframe: glow.material.wireframe ?? false,
      glowVisible: glow.visible
    };

    const folderGlow = gui.addFolder('🌟 Glow Externo');

    folderGlow.add(glowParams, 'glowPosX', -200, 200, 0.1).onChange(v => glow.position.x = v);
    folderGlow.add(glowParams, 'glowPosY', -200, 200, 0.1).onChange(v => glow.position.y = v);
    folderGlow.add(glowParams, 'glowPosZ', -200, 200, 0.1).onChange(v => glow.position.z = v);

    folderGlow.add(glowParams, 'glowScale', 0.01, 3, 0.01).onChange(v => glow.scale.set(v, v, v));
    folderGlow.add(glowParams, 'glowOpacity', 0, 1, 0.01).onChange(v => glow.material.opacity = v);
    folderGlow.addColor(glowParams, 'glowColor').onChange(v => glow.material.color.set(v));
    folderGlow.add(glowParams, 'glowWireframe').onChange(v => glow.material.wireframe = v);
    folderGlow.add(glowParams, 'glowVisible').onChange(v => glow.visible = v);

    folderGlow.open();
  }
}
