import * as THREE from 'three';

export const elements = [
  { name: 'anillo', path: '/anillo-center.svg', position: new THREE.Vector3(0, 0, 0), color: 0xffd700 },
  { name: 'p', path: '/p-center.svg', position: new THREE.Vector3(72.65, -45.18, 0), color: 0xd4d09e },
  { name: 's', path: '/s-center.svg', position: new THREE.Vector3(32.12, -61.85, 0), color: 0xd4d09e },

  // Letras "PERMANENT"
  { name: 'p1-permanent', path: '/title-permanent-makeup/permanent/p1-permanent-center.svg', position: new THREE.Vector3(67.77, -150.5, 0), color: 0xd4d09e },
  { name: 'e1-permanent', path: '/title-permanent-makeup/permanent/e1-permanent-center.svg', position: new THREE.Vector3(77.22, -152.2, 0), color: 0xd4d09e },
  { name: 'r1-permanent', path: '/title-permanent-makeup/permanent/r1-permanent-center.svg', position: new THREE.Vector3(85.95, -152.8, 0), color: 0xd4d09e },
  { name: 'm1-permanent', path: '/title-permanent-makeup/permanent/m1-permanent-center.svg', position: new THREE.Vector3(94.95, -153.0, 0), color: 0xd4d09e },
  { name: 'a1-permanent', path: '/title-permanent-makeup/permanent/a1-permanent-center.svg', position: new THREE.Vector3(106.42, -152.4, 0), color: 0xd4d09e },
  { name: 'n1-permanent', path: '/title-permanent-makeup/permanent/n1-permanent-center.svg', position: new THREE.Vector3(113.10, -148.5, 0), color: 0xd4d09e },
  { name: 'e2-permanent', path: '/title-permanent-makeup/permanent/e2-permanent-center.svg', position: new THREE.Vector3(122.23, -144.55, 0), color: 0xd4d09e },
  { name: 'n2-permanent', path: '/title-permanent-makeup/permanent/n2-permanent-center.svg', position: new THREE.Vector3(129.52, -138.5, 0), color: 0xd4d09e },
  { name: 't1-permanent', path: '/title-permanent-makeup/permanent/t1-permanent-center.svg', position: new THREE.Vector3(137.75, -131.8, 0), color: 0xd4d09e },

  // Letras "MAKEUP"
  { name: 'm1-makeup', path: '/title-permanent-makeup/makeup/m1-makeup-center.svg', position: new THREE.Vector3(147.5, -119, 0), color: 0xd4d09e },
  { name: 'a1-makeup', path: '/title-permanent-makeup/makeup/a1-makeup-center.svg', position: new THREE.Vector3(154.5, -114, 0), color: 0xd4d09e },
  { name: 'k1-makeup', path: '/title-permanent-makeup/makeup/k1-makeup-center.svg', position: new THREE.Vector3(157.5, -104, 0), color: 0xd4d09e },
  { name: 'e1-makeup', path: '/title-permanent-makeup/makeup/e1-makeup-center.svg', position: new THREE.Vector3(159.5, -96, 0), color: 0xd4d09e },
  { name: 'u1-makeup', path: '/title-permanent-makeup/makeup/u1-makeup-center.svg', position: new THREE.Vector3(160.35, -84.75, 0), color: 0xd4d09e },
  { name: 'p1-makeup', path: '/title-permanent-makeup/makeup/p1-makeup-center.svg', position: new THREE.Vector3(160.5, -76, 0), color: 0xd4d09e },
];


export const elementsListPatriciaSanJuan = [
  // ==== "PATRICIA" ====
  {
    name: "p1-patricia",
    path: "/title-patricia-sanjuan/patricia/p1-patricia.svg",
    position: new THREE.Vector3(-653.5925, 446.7249, 0), color: 0xd4d09e,
    width: 83.6143,
    height: 102.9043,
    materialPreset: "default-gold",    // Puedes cambiar por cada letra si quieres un brillo distinto
    glowPreset: "sutil"
  },
  {
    name: "a1-patricia",
    path: "/title-patricia-sanjuan/patricia/a1-patricia.svg",
    position: new THREE.Vector3(-551.1314, 458.3016, 0), color: 0xd4d09e,
    width: 84.8325,
    height: 81.2031,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "t1-patricia",
    path: "/title-patricia-sanjuan/patricia/t1-patricia.svg",
    position: new THREE.Vector3(-451.5757, 461.6517, 0), color: 0xd4d09e,
    width: 74.2446,
    height: 80.5029,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "r1-patricia",
    path: "/title-patricia-sanjuan/patricia/r1-patricia.svg",
    position: new THREE.Vector3(-350.502, 458.9193, 0), color: 0xd4d09e,
    width: 69.4099,
    height: 80.3264,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "i1-patricia", // WARNING: Verifica si corresponde a "i2-patricia.svg" o falta un svg con nombre correcto
    path: "/title-patricia-sanjuan/patricia/i2-patricia.svg",
    position: new THREE.Vector3(-274.6328, 459.3386, 0), color: 0xd4d09e,
    width: 11.4204,
    height: 79.6914,
    materialPreset: "default-gold",
    glowPreset: "sutil",
    note: "Confirmar naming SVG y posición."
  },
  {
    name: "c1-patricia",
    path: "/title-patricia-sanjuan/patricia/c1-patricia.svg",
    position: new THREE.Vector3(-107.2754, 464.201, 0), color: 0xd4d09e, // WARNING: Verifica que esta coordenada sea la correcta (revisar duplicidad con "i")
    width: 74.2446, // ¿Coincide con t1?
    height: 80.5029,
    materialPreset: "default-gold",
    glowPreset: "sutil",
    note: "Verificar si las coords están bien. Puede haber duplicidad con i."
  },
  {
    name: "i2-patricia",
    path: "/title-patricia-sanjuan/patricia/i2-patricia.svg",
    position: new THREE.Vector3(-107.2754, 464.201, 0), color: 0xd4d09e, // WARNING: Posible error, igual que c1, revisar
    width: 11.4204,
    height: 79.6914,
    materialPreset: "default-gold",
    glowPreset: "sutil",
    note: "Ver naming, posición y si hay que separar de 'i1'."
  },
  {
    name: "a2-patricia",
    path: "/title-patricia-sanjuan/patricia/a2-patricia.svg",
    position: new THREE.Vector3(25.9741, 462.7845, 0), color: 0xd4d09e,
    width: 84.1255,
    height: 80.5264,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },

  // ==== "SANJUAN" ====
  {
    name: "s1-sanjuan",
    path: "/title-patricia-sanjuan/sanjuan/s1-sanjuan.svg",
    position: new THREE.Vector3(136.6567, 454.5687, 0), color: 0xd4d09e,
    width: 86.46,
    height: 101.09,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "a1-sanjuan",
    path: "/title-patricia-sanjuan/sanjuan/a1-sanjuan.svg",
    position: new THREE.Vector3(246.0905, 460.7006, 0), color: 0xd4d09e,
    width: 81.9072,
    height: 78.4033,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "n1-sanjuan",
    path: "/title-patricia-sanjuan/sanjuan/n1-sanjuan.svg",
    position: new THREE.Vector3(362.1274, 459.9789, 0), color: 0xd4d09e,
    width: 76.1372,
    height: 79.8037,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "j1-sanjuan",
    path: "/title-patricia-sanjuan/sanjuan/j1-sanjuan.svg",
    position: new THREE.Vector3(447.22, 463.23, 0), color: 0xd4d09e,
    width: 64.23,
    height: 125.65,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "u1-sanjuan",
    path: "/title-patricia-sanjuan/sanjuan/u1-sanjuan.svg",
    position: new THREE.Vector3(545.7112, 464.163, 0), color: 0xd4d09e,
    width: 77.4453,
    height: 81.0703,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "a2-sanjuan",
    path: "/title-patricia-sanjuan/sanjuan/a2-sanjuan.svg",
    position: new THREE.Vector3(653.1975, 459.2269, 0), color: 0xd4d09e,
    width: 82.6387,
    height: 79.1035,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  },
  {
    name: "n2-sanjuan",
    path: "/title-patricia-sanjuan/sanjuan/n2-sanjuan.svg",
    position:  new THREE.Vector3(761.9067, 458.0004, 0), color: 0xd4d09e,

    width: 76.1372,
    height: 79.8037,
    materialPreset: "default-gold",
    glowPreset: "sutil"
  }
]