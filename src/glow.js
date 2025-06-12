import * as THREE from 'three';

function createGlow(mesh, scale = 0.98, color = 0xdfcb81, opacity = 0.15) {
  const glowMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    side: THREE.BackSide,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    castShadow:true,
    
    polygonOffset: true,
    polygonOffsetFactor: -10,
  });

  const glow = new THREE.Mesh(mesh.geometry.clone(), glowMat);
  glow.scale.copy(mesh.scale).multiplyScalar(scale);
  glow.position.copy(mesh.position);
  glow.rotation.copy(mesh.rotation);
  glow.renderOrder = 999;
  glow.name = mesh.name + '_glow';

  return glow;
}

export { createGlow };