// controls-advanced.js – Versión 2.4
// Fecha: 8 de junio de 2025 – 19:10h
// 🧠 Controlador visual completo: Transformaciones, Materiales PBR, Glow, Stroke/Outline real, sin pérdida de propiedades previas. Mejoras visuales, comportamiento y sincronía de escalas para Glow y Stroke.

import * as dat from 'dat.gui';

const gui = new dat.GUI({ width: 380 });
const meshFolders = {};

const grupoLogoPrincipal = gui.addFolder('🔘 LOGO PRINCIPAL');
const grupoAnillo = grupoLogoPrincipal.addFolder('⭘ Anillo');
const grupoSimboloS = grupoLogoPrincipal.addFolder('🌀 Símbolo S');
const grupoSimboloP = grupoLogoPrincipal.addFolder('🌀 Símbolo P');

const grupoTexto = gui.addFolder('✍️ TÍTULO CIRCULAR');

const grupoPermanent = grupoTexto.addFolder('📌 PERMANENT');
const grupoMakeup = grupoTexto.addFolder('💄 MAKEUP');



grupoPermanent.domElement.classList.add('permanent-folder');
grupoMakeup.domElement.classList.add('makeup-folder');
grupoLogoPrincipal.domElement.classList.add('grupoLogoPrincipal');
grupoAnillo.domElement.classList.add('grupoAnillo');

export function setupControls(group, material, glowMesh, name) {
  const folder = gui.addFolder(name);
  meshFolders[name] = folder;

 // 🎨 COLOR BASE
  if (material?.color?.getHexString) {
    const colorFolder = folder.addFolder('🎨 Color Base');
    const colorParams = { color: `#${material.color.getHexString()}` };
    colorFolder.addColor(colorParams, 'color').onChange((v) => material.color.set(v));
  }

  // ✴️ TRANSFORMACIONES
  const transformFolder = folder.addFolder('✴️ Transformaciones');
  transformFolder.add(group.position, 'x', -500, 500).step(0.5).name('Posición X');
  transformFolder.add(group.position, 'y', -500, 500).step(0.5).name('Posición Y');
  transformFolder.add(group.position, 'z', -500, 500).step(0.5).name('Posición Z');
  transformFolder.add(group.rotation, 'x', -Math.PI, Math.PI).step(0.01).name('Rotación X');
  transformFolder.add(group.rotation, 'y', -Math.PI, Math.PI).step(0.01).name('Rotación Y');
  transformFolder.add(group.rotation, 'z', -Math.PI, Math.PI).step(0.01).name('Rotación Z');
  transformFolder.add(group.scale, 'x', 0.01, 5.0).step(0.01).name('Escala X');
  transformFolder.add(group.scale, 'y', 0.01, 5.0).step(0.01).name('Escala Y');
  transformFolder.add(group.scale, 'z', 0.01, 5.0).step(0.01).name('Escala Z');

  // 💡 PARÁMETROS PBR COMPLETOS
  const pbrFolder = folder.addFolder('💡 Material PBR');
  if (material) {
    pbrFolder.add(material, 'metalness', 0, 1).step(0.01);
    pbrFolder.add(material, 'roughness', 0, 1).step(0.01);
    pbrFolder.add(material, 'clearcoat', 0, 1).step(0.01);
    pbrFolder.add(material, 'clearcoatRoughness', 0, 1).step(0.01);
    pbrFolder.add(material, 'reflectivity', 0, 1).step(0.01);
    pbrFolder.add(material, 'ior', 1, 2.5).step(0.01);
    pbrFolder.add(material, 'thickness', 0, 10).step(0.1);
    pbrFolder.add(material, 'transmission', 0, 1).step(0.01);
    pbrFolder.add(material, 'attenuationDistance', 0, 50).step(0.1);
    const attColor = { color: `#${material.attenuationColor?.getHexString?.() ?? 'ffffff'}` };
    pbrFolder.addColor(attColor, 'color').name('🔆 Atenuación Color').onChange((v) => {
      material.attenuationColor?.set?.(v);
    });
  }

  // 🌟 GLOW – Escala sincronizada automáticamente con mesh
  if (glowMesh?.material?.color) {
    const glowFolder = folder.addFolder('🌟 Glow');
    const glowParams = {
      color: `#${glowMesh.material.color.getHexString?.() ?? 'dfcb81'}`,
      opacity: glowMesh.material.opacity ?? 0.15,
      offsetX: glowMesh.position.x - group.position.x,
  offsetY: glowMesh.position.y - group.position.y,
  offsetZ: glowMesh.position.z - group.position.z,
      rotX: glowMesh.rotation.x,
      rotY: glowMesh.rotation.y,
      rotZ: glowMesh.rotation.z
    };

const rememberedParams = [];
gui.remember(glowParams); // 🧠 Persistencia automática
if (typeof window !== 'undefined') {
  window.clearGlowSettings = () => {
    localStorage.clear();
    location.reload();
  };
  console.log('🧼 Usa `clearGlowSettings()` en consola para resetear ajustes guardados.');
}

    glowFolder.addColor(glowParams, 'color').onChange(v => glowMesh.material.color.set(v));
    glowFolder.add(glowParams, 'opacity', 0, 1).step(0.01).onChange(v => glowMesh.material.opacity = v);
    glowFolder.add(glowParams, 'offsetX', -200, 200).step(0.1).onChange(v => glowMesh.position.x = group.position.x + v);
    glowFolder.add(glowParams, 'offsetY', -200, 200).step(0.1).onChange(v => glowMesh.position.y = group.position.y + v);
    glowFolder.add(glowParams, 'offsetZ', -200, 200).step(0.1).onChange(v => glowMesh.position.z = group.position.z + v);
    glowFolder.add(glowParams, 'rotX', -Math.PI, Math.PI).step(0.01).onChange(v => glowMesh.rotation.x = v);
    glowFolder.add(glowParams, 'rotY', -Math.PI, Math.PI).step(0.01).onChange(v => glowMesh.rotation.y = v);
    glowFolder.add(glowParams, 'rotZ', -Math.PI, Math.PI).step(0.01).onChange(v => glowMesh.rotation.z = v);
  }

  // ✏️ STROKE / OUTLINE
  if (material.userData && material.userData.strokeMesh) {
    const strokeFolder = folder.addFolder('✏️ Stroke / Outline');
    const stroke = material.userData.strokeMesh;
    const strokeParams = {
      strokeWidth: stroke.scale.x / group.scale.x,
      strokeColor: `#${stroke.material.color.getHexString?.() ?? 'dddddd'}`,
      strokeOpacity: stroke.material.opacity ?? 0.15,


    };
    strokeFolder.add(strokeParams, 'strokeWidth',' strokeColor', 'strokeOpacity',0.01, 5).step(0.01).onChange((v) => {
      stroke.scale.setScalar(v * group.scale.x);
    });
  }

  folder.open();
}


