// Despiece 3D del hero. Mejora progresiva: el hero muestra una imagen fija y este módulo
// se carga después, solo en equipos capaces. Three.js llega por CDN con versión fija.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/+esm';
import { RoundedBoxGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/RoundedBoxGeometry.js/+esm';
import { RoomEnvironment } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/environments/RoomEnvironment.js/+esm';

let T; // texturas, se crean en mount()
// Unidades: 1 = 1 cm. Frente del equipo hacia +Z.
const W = 7.15, H = 14.67, R = 1.12;
const LENS = [[2.35, 6.1], [2.35, 4.4], [.75, 5.25]], FLASH = [.75, 6.35], LIDAR = [.75, 4.15], CAM = [1.55, 5.25];

// ---- utilidades de geometría ----
let seed = 7;
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
const rand = (a, b) => a + rnd() * (b - a);
const rad = d => d * Math.PI / 180;
const geo = {};

function rrect(w, h, r, x = 0, y = 0) {
  const s = new THREE.Shape(), a = x - w / 2, b = y - h / 2, P = Math.PI;
  s.moveTo(a + r, b); s.lineTo(a + w - r, b); s.absarc(a + w - r, b + r, r, -P / 2, 0);
  s.lineTo(a + w, b + h - r); s.absarc(a + w - r, b + h - r, r, 0, P / 2);
  s.lineTo(a + r, b + h); s.absarc(a + r, b + h - r, r, P / 2, P);
  s.lineTo(a, b + r); s.absarc(a + r, b + r, r, P, P * 1.5);
  return s;
}
const circle = (x, y, r) => { const p = new THREE.Path(); p.absarc(x, y, r, 0, Math.PI * 2, true); return p; };
const ring = (outer, inner) => { outer.holes.push(inner); return outer; };

function slab(shape, depth, mat, z = 0, bevel = .015) { // placa extruida centrada en z
  const g = new THREE.ExtrudeGeometry(shape, { depth: Math.max(depth - 2 * bevel, .001), bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 14 });
  g.translate(0, 0, -(depth / 2 - bevel));
  const m = new THREE.Mesh(g, mat); m.position.z = z; return m;
}
function face(shape, mat, z = 0) { // cara plana con UV 0..1 sobre su caja
  const g = new THREE.ShapeGeometry(shape, 14); g.computeBoundingBox();
  const b = g.boundingBox, p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) - b.min.x) / (b.max.x - b.min.x), (p.getY(i) - b.min.y) / (b.max.y - b.min.y));
  const m = new THREE.Mesh(g, mat); m.position.z = z; return m;
}
function box(w, h, d, mat, x = 0, y = 0, z = 0, r = 0) {
  const g = geo[[w, h, d, r]] ??= r ? new RoundedBoxGeometry(w, h, d, 2, r) : new THREE.BoxGeometry(w, h, d);
  const m = new THREE.Mesh(g, mat); m.position.set(x, y, z); return m;
}
function cyl(r, h, mat, x = 0, y = 0, z = 0) { // eje en Z
  const g = geo['c' + [r, h]] ??= new THREE.CylinderGeometry(r, r, h, 40).rotateX(Math.PI / 2);
  const m = new THREE.Mesh(g, mat); m.position.set(x, y, z); return m;
}
function inst(g, mat, list, colors) { // instancing: [x,y,z,rotZ]
  const im = new THREE.InstancedMesh(g, mat, list.length), d = new THREE.Object3D();
  list.forEach(([x, y, z = 0, rz = 0], i) => {
    d.position.set(x, y, z); d.rotation.set(0, 0, rz); d.updateMatrix(); im.setMatrixAt(i, d.matrix);
    if (colors) im.setColorAt(i, new THREE.Color(colors[i]));
  });
  return im;
}
const screw = (m, x, y, z, r = .09) => [cyl(r, .05, m('steel'), x, y, z), box(r * 1.3, .025, .01, m('black'), x, y, z + .026), box(.025, r * 1.3, .01, m('black'), x, y, z + .026)];
const flexStrip = (m, w, h, x, y, z) => slab(rrect(w, h, Math.min(w, h) * .2, x, y), .03, m('flex'), z, 0);
const sticker = (m, w, h, x, y, z) => box(w, h, .006, m('qr'), x, y, z);                       // etiqueta con código
const disc = r => { const s = new THREE.Shape(); s.absarc(0, 0, r, 0, Math.PI * 2); return s; };
const cable = (mat, pts, r = .035) => new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p))), pts.length * 14, r, 6), mat); // coaxial
const cowl = (m, w, h, x, y, z) => [slab(rrect(w, h, .06, x, y), .03, m('steel'), z, .008),   // chapa que traba un conector
  ...screw(m, x, y + h / 2 - .12, z + .02, .06), ...screw(m, x, y - h / 2 + .12, z + .02, .06)];

// ---- texturas procedurales (canvas) ----
function tex(w, h, draw, { srgb = true, repeat } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}
function makeTextures(accent) {
  const t = {};
  t.brush = tex(256, 256, (c, w, h) => { // rugosidad cepillada
    c.fillStyle = '#b4b4b4'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 1400; i++) { const v = rnd() < .5 ? 255 : 0; c.fillStyle = `rgba(${v},${v},${v},.07)`; c.fillRect(rand(-40, w), rand(0, h), rand(20, 160), 1); }
  }, { srgb: false, repeat: [1, 1] });
  t.screen = tex(512, 1086, (c, w, h) => {
    c.fillStyle = '#020309'; c.fillRect(0, 0, w, h);
    const blob = (x, y, r, col, a) => { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); c.globalAlpha = a; c.fillStyle = g; c.fillRect(0, 0, w, h); };
    blob(w * .15, h * .2, w * 1.1, accent, .95); blob(w * .95, h * .72, w * .9, accent, .6); blob(w * .5, h * .5, w * .5, '#ffffff', .12);
    c.globalAlpha = .5; c.strokeStyle = '#fff'; c.lineWidth = 60; c.filter = 'blur(40px)';
    c.beginPath(); c.moveTo(-50, h * .62); c.bezierCurveTo(w * .4, h * .38, w * .6, h * .8, w + 50, h * .5); c.stroke();
    c.filter = 'none'; c.globalAlpha = 1; c.fillStyle = '#fff'; c.textAlign = 'center';
    c.font = '300 150px system-ui,sans-serif'; c.fillText('10:30', w / 2, h * .27);
    c.font = '500 30px system-ui,sans-serif'; c.globalAlpha = .85; c.fillText('Team Celular', w / 2, h * .14);
    c.globalAlpha = .28; [[70, h - 110], [w - 70, h - 110]].forEach(([x, y]) => { c.beginPath(); c.arc(x, y, 38, 0, 7); c.fill(); });
    c.globalAlpha = .9; c.fillRect(w / 2 - 80, h - 30, 160, 7);
  });
  t.pcb = tex(384, 1494, (c, w, h) => {
    c.fillStyle = '#072a1e'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) { c.fillStyle = 'rgba(22,96,64,.3)'; c.fillRect(rand(0, w), rand(0, h), rand(20, 90), rand(20, 90)); }
    c.lineCap = c.lineJoin = 'round';
    for (let i = 0; i < 300; i++) { // pistas con codos a 45°
      c.strokeStyle = `rgba(70,${rand(150, 190) | 0},125,${rand(.25, .6)})`; c.lineWidth = rand(1, 2.6);
      let x = rand(0, w), y = rand(0, h); c.beginPath(); c.moveTo(x, y);
      for (let s = 0; s < 4; s++) { const a = (rnd() * 8 | 0) * Math.PI / 4, L = rand(10, 90); x += Math.cos(a) * L; y += Math.sin(a) * L; c.lineTo(x, y); }
      c.stroke();
    }
    for (let i = 0; i < 380; i++) { const x = rand(0, w), y = rand(0, h); c.fillStyle = '#c9a23f'; c.beginPath(); c.arc(x, y, 2.3, 0, 7); c.fill(); c.fillStyle = '#06140e'; c.beginPath(); c.arc(x, y, .9, 0, 7); c.fill(); }
    for (let i = 0; i < 60; i++) { const x = rand(0, w), y = rand(0, h), n = rand(3, 10) | 0, v = rnd() < .5; c.fillStyle = '#d2ab45'; for (let k = 0; k < n; k++) c.fillRect(x + (v ? 0 : k * 6), y + (v ? k * 6 : 0), v ? 9 : 3.5, v ? 3.5 : 9); }
    c.fillStyle = 'rgba(235,240,235,.75)'; c.font = '7px monospace';
    for (let i = 0; i < 110; i++) c.fillText('RCULQ'[rnd() * 5 | 0] + (rnd() * 900 | 0), rand(0, w), rand(0, h));
  }, { repeat: [1 / 2.75, 1 / 10.7] });
  t.pcb.offset.set(3.2 / 2.75, 3.8 / 10.7);
  t.chip = tex(256, 256, (c, w) => {
    c.fillStyle = '#131416'; c.fillRect(0, 0, w, w);
    for (let i = 0; i < 2500; i++) { c.fillStyle = `rgba(255,255,255,${rnd() * .035})`; c.fillRect(rand(0, w), rand(0, w), 2, 2); }
    c.fillStyle = '#8b8e94'; c.font = '600 30px monospace'; c.fillText('TC8 PRO', 30, 92);
    c.font = '20px monospace'; c.fillText('339S00812', 30, 128); c.fillText('2646 KX4', 30, 156); c.fillText('F7PNX2', 30, 184);
    c.beginPath(); c.arc(34, 222, 8, 0, 7); c.fill();
  });
  t.batt = tex(444, 800, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#222327'); g.addColorStop(1, '#17181b'); c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = '#e9e9ec'; c.font = '600 26px system-ui,sans-serif'; c.fillText('Batería recargable', 34, 86);
    c.font = '400 20px system-ui,sans-serif'; c.fillText('Polímero de iones de litio', 34, 116);
    c.font = '600 34px system-ui,sans-serif'; c.fillText('3274 mAh', 34, 190);
    c.font = '400 20px system-ui,sans-serif'; c.fillText('3,83 V ⎓  12,54 Wh', 34, 222); c.fillText('Modelo TC-616-00512', 34, 250);
    c.fillStyle = 'rgba(233,233,236,.45)'; for (let i = 0; i < 9; i++) c.fillRect(34, 300 + i * 13, rand(180, 370), 4);
    c.strokeStyle = '#e9e9ec'; c.lineWidth = 3; // íconos de advertencia
    [[60, 480], [130, 480], [200, 480]].forEach(([x, y], i) => { c.beginPath(); if (i === 1) { c.moveTo(x, y - 24); c.lineTo(x + 26, y + 22); c.lineTo(x - 26, y + 22); c.closePath(); } else c.arc(x, y, 24, 0, 7); c.stroke(); c.beginPath(); c.moveTo(x - 12, y + (i ? 10 : -12)); c.lineTo(x + 12, y + (i ? 10 : 12)); c.stroke(); });
    c.fillStyle = '#f2f2f4'; c.fillRect(34, 560, 376, 190); c.fillStyle = '#111';
    for (let y = 0; y < 14; y++) for (let x = 0; x < 14; x++) if (rnd() < .5 || !x || y === 13) c.fillRect(52 + x * 9, 580 + y * 9, 9, 9); // data matrix
    for (let x = 200; x < 392;) { const bw = rand(1, 5); c.fillRect(x, 580, bw, 90); x += bw + rand(1, 5); }
    c.font = '15px monospace'; c.fillText('F5D2646KX4TC0AB', 200, 700); c.fillText('616-00512 · Li-ion', 200, 724);
  });
  t.grid = tex(128, 128, (c, w) => { // malla táctil (ITO) en rombos
    c.fillStyle = 'rgba(200,225,255,.05)'; c.fillRect(0, 0, w, w); c.strokeStyle = 'rgba(190,220,255,.5)'; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(0, 0); c.lineTo(w, w); c.moveTo(w, 0); c.lineTo(0, w); c.moveTo(0, 0); c.lineTo(w, 0); c.moveTo(0, 0); c.lineTo(0, w); c.stroke();
  }, { repeat: [22, 46] });
  t.flex = tex(64, 64, (c, w) => { c.fillStyle = '#a05f1c'; c.fillRect(0, 0, w, w); for (let x = 3; x < w; x += 6) { c.fillStyle = x % 12 ? '#c98a3a' : '#7c4712'; c.fillRect(x, 0, 2, w); } }, { repeat: [4, 4] });
  t.conn = tex(256, 64, (c, w, h) => {
    c.fillStyle = '#0c0c0e'; c.fillRect(0, 0, w, h); c.fillStyle = '#1d1e21'; c.fillRect(22, 18, w - 44, h - 36);
    c.fillStyle = '#d9a941'; for (let x = 26; x < w - 28; x += 7) { c.fillRect(x, 3, 3.5, 13); c.fillRect(x, h - 16, 3.5, 13); }
    c.fillStyle = '#9da0a6'; c.fillRect(0, 0, 16, h); c.fillRect(w - 16, 0, 16, h);
  });
  t.mesh = tex(64, 64, (c, w) => { c.fillStyle = '#8f9298'; c.fillRect(0, 0, w, w); c.fillStyle = '#0a0a0b'; for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) { c.beginPath(); c.arc(x * 16 + (y % 2 ? 12 : 4), y * 16 + 8, 5, 0, 7); c.fill(); } }, { repeat: [9, 5] });
  t.qr = tex(128, 64, (c, w, h) => {
    c.fillStyle = '#eeeef0'; c.fillRect(0, 0, w, h); c.fillStyle = '#111';
    for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) if (rnd() < .5 || !x || y === 9) c.fillRect(6 + x * 5, 7 + y * 5, 5, 5);
    for (let i = 0; i < 4; i++) c.fillRect(64, 10 + i * 12, rand(30, 56), 5);
  });
  return t;
}

// ---- materiales PBR: cada pieza recibe instancias propias (permite atenuar por pieza) ----
const MATS = {
  glass: () => new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: .16, roughness: .03, clearcoat: 1, envMapIntensity: 1.8, depthWrite: false }),
  cover: () => new THREE.MeshPhysicalMaterial({ color: 0x8090b0, transparent: true, opacity: .28, roughness: .02, clearcoat: 1, envMapIntensity: 2, depthWrite: false }),
  black: () => new THREE.MeshStandardMaterial({ color: 0x040405, roughness: .25, metalness: .2 }),
  dark: () => new THREE.MeshStandardMaterial({ color: 0x16171a, roughness: .55, metalness: .3 }),
  plastic: () => new THREE.MeshStandardMaterial({ color: 0x1d1e22, roughness: .7 }),
  alu: () => new THREE.MeshStandardMaterial({ color: 0xc8cad0, metalness: 1, roughness: .42, roughnessMap: T.brush }),
  aluDark: () => new THREE.MeshStandardMaterial({ color: 0x6a6d73, metalness: 1, roughness: .45 }),
  steel: () => new THREE.MeshStandardMaterial({ color: 0xb4b7bd, metalness: 1, roughness: .62, roughnessMap: T.brush, bumpMap: T.brush, bumpScale: .35 }),
  steelDark: () => new THREE.MeshStandardMaterial({ color: 0x5b5e64, metalness: 1, roughness: .6, roughnessMap: T.brush }),
  gold: () => new THREE.MeshStandardMaterial({ color: 0xe0a93f, metalness: 1, roughness: .28 }),
  copper: () => new THREE.MeshStandardMaterial({ color: 0xd07a3c, metalness: 1, roughness: .3 }),
  flex: () => new THREE.MeshStandardMaterial({ map: T.flex, metalness: .35, roughness: .45 }),
  conn: () => new THREE.MeshStandardMaterial({ map: T.conn, metalness: .4, roughness: .45 }),
  pcb: () => new THREE.MeshStandardMaterial({ map: T.pcb, bumpMap: T.pcb, bumpScale: 1.5, roughness: .5, metalness: .25 }),
  pcbPlain: () => new THREE.MeshStandardMaterial({ color: 0x0f4a33, roughness: .55, metalness: .2 }),
  chip: () => new THREE.MeshStandardMaterial({ map: T.chip, roughness: .45, metalness: .1 }),
  smd: () => new THREE.MeshStandardMaterial({ roughness: .5, metalness: .25 }),
  foil: () => new THREE.MeshStandardMaterial({ color: 0x1b1c1f, metalness: .75, roughness: .36 }),
  label: () => new THREE.MeshStandardMaterial({ map: T.batt, roughness: .6, metalness: .15 }),
  tape: () => new THREE.MeshStandardMaterial({ color: 0xdedfe2, roughness: .85 }),
  qr: () => new THREE.MeshStandardMaterial({ map: T.qr, roughness: .7 }),
  graphite: () => new THREE.MeshStandardMaterial({ color: 0x0d0d10, roughness: .42, metalness: .65 }),
  foam: () => new THREE.MeshStandardMaterial({ color: 0x08080a, roughness: 1 }),
  screen: () => new THREE.MeshBasicMaterial({ map: T.screen, toneMapped: false }),
  touch: () => new THREE.MeshStandardMaterial({ map: T.grid, transparent: true, depthWrite: false, side: THREE.DoubleSide, roughness: .15, metalness: .4 }),
  mesh: () => new THREE.MeshStandardMaterial({ map: T.mesh, metalness: .8, roughness: .5 }),
  lens: () => new THREE.MeshPhysicalMaterial({ color: 0x05060a, roughness: .02, metalness: .2, clearcoat: 1, iridescence: 1, iridescenceIOR: 1.9, envMapIntensity: 2.2 }),
  led: () => new THREE.MeshStandardMaterial({ color: 0xfff1c2, emissive: 0xffd978, emissiveIntensity: .35, roughness: .4 }),
  film: () => new THREE.MeshStandardMaterial({ color: 0x2a1d10, transparent: true, opacity: .55, roughness: .4, side: THREE.DoubleSide, depthWrite: false }),
  magnet: () => new THREE.MeshStandardMaterial({ color: 0x3b3d42, metalness: 1, roughness: .55 }),
  backGlass: () => new THREE.MeshPhysicalMaterial({ color: 0x596070, roughness: .42, metalness: .15, clearcoat: .5, clearcoatRoughness: .35 }),
  backGloss: () => new THREE.MeshPhysicalMaterial({ color: 0x444a57, roughness: .08, metalness: .15, clearcoat: 1 }),
};

// ---- Piezas: una función por pieza. m('nombre') entrega el material de esa pieza ----
function buildGlass(m) {
  const g = new THREE.Group();
  g.add(face(ring(rrect(W - .1, H - .1, R - .05), rrect(W - .56, H - .56, R - .28)), m('black'), -.04)); // bisel
  g.add(slab(rrect(2.05, .6, .3, 0, 6.45), .02, m('black'), -.04, 0));                                  // isla de sensores
  g.add(box(1.0, .05, .02, m('dark'), 0, 7.13, -.04));                                                   // auricular
  g.add(slab(rrect(W - .1, H - .1, R - .05), .07, m('glass'), 0, .02));
  return g;
}

function buildOled(m) {
  const g = new THREE.Group(), s = () => rrect(W - .52, H - .52, R - .26);
  g.add(slab(s(), .06, m('black'), 0, .01), face(s(), m('screen'), .032));
  g.add(face(rrect(W - .9, H - .9, R - .4), m('steelDark'), -.032).rotateY(Math.PI));                    // respaldo metálico
  const fx = new THREE.Group();                                                                          // flex: sale por debajo al desarmar
  fx.add(flexStrip(m, 1.5, 1.9, 1.3, -6.5, -.06), box(.95, .26, .07, m('conn'), 1.3, -7.15, -.03), box(.5, .16, .05, m('chip'), 1.3, -6.5, -.03));
  fx.add(inst(new THREE.BoxGeometry(.09, .045, .03), m('smd'), [...Array(10)].map((_, i) => [.75 + i % 5 * .28, -6.15 - (i / 5 | 0) * .14, -.03]), Array(10).fill(0xb9a27c)));
  g.add(fx); g.userData.update = l => fx.position.y = -l * 1.05;
  return g;
}

function buildDigitizer(m) {
  const g = new THREE.Group();
  g.add(face(rrect(W - .52, H - .52, R - .26), m('touch'), 0));
  g.add(slab(ring(rrect(W - .5, H - .5, R - .25), rrect(W - .62, H - .62, R - .31)), .025, m('steel'), 0, 0));
  const y = 6.45, z = -.1;                                                                               // módulo de sensores frontales
  g.add(slab(rrect(2.4, .66, .14, 0, y), .1, m('steel'), z), slab(rrect(2.2, .5, .1, 0, y), .02, m('steelDark'), z + .06, 0));
  g.add(cyl(.22, .2, m('black'), .68, y, z + .08), cyl(.15, .03, m('lens'), .68, y, z + .19), cyl(.08, .032, m('black'), .68, y, z + .19)); // selfie
  g.add(cyl(.17, .16, m('black'), -.72, y, z + .08), cyl(.11, .03, m('lens'), -.72, y, z + .165));                                        // cámara IR
  g.add(cyl(.1, .14, m('dark'), -.22, y, z + .08), box(.2, .2, .12, m('black'), .16, y, z + .08, .03));                                   // emisor IR + proximidad
  g.add(box(1.2, .2, .14, m('steel'), 0, 7.0, z, .04), box(1.0, .1, .02, m('mesh'), 0, 7.0, z + .075));                                   // auricular
  g.add(flexStrip(m, .55, 1.5, -.3, 5.5, z - .04), box(.6, .22, .07, m('conn'), -.3, 4.75, z - .01));
  g.add(...screw(m, -1.05, y, z + .06, .07), ...screw(m, 1.05, y, z + .06, .07));
  return g;
}

function buildFrame(m) {
  const g = new THREE.Group(), hw = W / 2, hh = H / 2;
  g.add(slab(ring(rrect(W, H, R), rrect(W - .36, H - .36, R - .18)), .74, m('alu'), 0, .04));
  g.add(slab(ring(rrect(W - .34, H - .34, R - .17), rrect(W - .74, H - .74, R - .37)), .08, m('aluDark'), .1, 0)); // cama de la pantalla
  const band = m('plastic');                                                                             // bandas de antena
  [[-2.4, hh - .09], [2.4, hh - .09], [-2.4, -hh + .09], [2.4, -hh + .09]].forEach(([x, y]) => g.add(box(.1, .22, .765, band, x, y)));
  [[-hw + .09, 5.7], [hw - .09, 5.7], [-hw + .09, -5.7], [hw - .09, -5.7]].forEach(([x, y]) => g.add(box(.22, .1, .765, band, x, y)));
  [[-hw - .03, 4.7, .5], [-hw - .03, 3.5, .95], [-hw - .03, 2.35, .95], [hw + .03, 3.0, 1.6]].forEach(([x, y, h]) => g.add(box(.12, h, .28, m('alu'), x, y, 0, .05))); // botones
  g.add(box(.02, 1.5, .32, m('aluDark'), hw + .002, -.6), cyl(.035, .03, m('black'), hw + .01, -.05, 0).rotateY(Math.PI / 2));                // bandeja SIM
  g.add(box(.9, .03, .28, m('black'), 0, -hh - .001, 0, .012));                                          // boca USB-C
  g.add(inst(new THREE.CylinderGeometry(.05, .05, .03, 12), m('black'), [...Array(10)].map((_, i) => [(i < 5 ? -1 : 1) * (1.05 + i % 5 * .24), -hh - .001, 0])));
  g.add(inst(new THREE.CylinderGeometry(.06, .06, .03, 12), m('steel'), [[-.66, -hh - .002, 0], [.66, -hh - .002, 0]]));
  const boss = [];                                                                                       // torretas de tornillos
  for (let i = 0; i < 6; i++) boss.push([-hw + .42, -5.6 + i * 2.24, 0], [hw - .42, -5.6 + i * 2.24, 0]);
  [-1.8, 0, 1.8].forEach(x => boss.push([x, hh - .42, 0], [x, -hh + .42, 0]));
  g.add(inst(new THREE.CylinderGeometry(.11, .13, .3, 16).rotateX(Math.PI / 2), m('aluDark'), boss), inst(new THREE.CylinderGeometry(.05, .05, .31, 10).rotateX(Math.PI / 2), m('black'), boss));
  // interior del chasis: refuerzos de esquina, flex de botones, antenas, jaula SIM y juntas
  [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([a, b]) => g.add(slab(rrect(.95, .5, .12, a * 2.72, b * 6.78), .06, m('steelDark'), -.2), ...screw(m, a * 2.9, b * 6.78, -.16, .07)));
  g.add(flexStrip(m, .13, 4.3, -3.27, 3.3, .02), flexStrip(m, .13, 2.4, 3.27, 3.0, .02), flexStrip(m, 4.0, .13, 0, 7.0, .02));
  [[-3.26, 4.7, .5], [-3.26, 3.5, .8], [-3.26, 2.35, .8], [3.26, 3.0, 1.3]].forEach(([x, y, h]) => g.add(box(.2, h, .22, m('steel'), x, y, -.05, .04), ...screw(m, x, y + h / 2 + .12, .0, .05)));
  g.add(box(.5, 1.6, .2, m('steel'), 3.1, -.6, -.1, .04), box(.3, 1.3, .012, m('black'), 3.1, -.6, .003));
  [-1.7, 1.7].forEach(x => g.add(box(1.5, .18, .3, m('foam'), x, -7.02, 0, .04)));
  return g;
}

function buildBattery(m) {
  const g = new THREE.Group(); g.position.set(.9, -.7, 0);
  g.add(slab(rrect(4.5, 7.8, .28), .34, m('foil'), 0, .06), face(rrect(4.1, 7.4, .16), m('label'), .172));
  g.add(box(4.3, .14, .3, m('dark'), 0, 3.86, 0, .05));                                                  // pliegue superior
  [-1.5, 0, 1.5].forEach(x => g.add(slab(rrect(.75, 1.2, .1, x, -4.2), .02, m('tape'), -.18, 0)));        // tiras adhesivas
  g.add(box(1.8, .36, .1, m('pcbPlain'), -1.1, 4.05, -.05), box(.5, .2, .06, m('chip'), -1.5, 4.05, .03), box(.3, .16, .05, m('chip'), -.8, 4.05, .03)); // BMS
  g.add(inst(new THREE.BoxGeometry(.16, .1, .02), m('gold'), [-.35, -.15, .05, .25].map(x => [x - .3, 4.05, .011])));
  g.add(flexStrip(m, .7, 1.1, -2.3, 4.3, -.04), box(.75, .26, .08, m('conn'), -2.3, 4.85, 0));
  g.add(slab(ring(rrect(4.3, 7.6, .2), rrect(4.22, 7.52, .17)), .012, m('dark'), .176, 0));              // costura del pouch
  g.add(sticker(m, .9, .45, 1.35, -3.35, .178), slab(rrect(.9, .4, .06, -2.3, 4.85), .03, m('steel'), .06, .008), ...screw(m, -2.62, 4.85, .08, .06), ...screw(m, -1.98, 4.85, .08, .06));
  return g;
}

function buildLogicBoard(m) {
  const g = new THREE.Group(), top = .05;
  const s = new THREE.Shape(), holes = [[-3, -3.6], [-1.8, 3.35], [-.65, 6.7], [-3, 6.7]];
  [[-3.2, -3.8], [-1.6, -3.8], [-1.6, 3.6], [-.45, 3.6], [-.45, 6.9], [-3.2, 6.9]].forEach(([x, y], i) => i ? s.lineTo(x, y) : s.moveTo(x, y));
  holes.forEach(([x, y]) => s.holes.push(circle(x, y, .09)));
  g.add(slab(s, .1, [m('pcb'), m('pcbPlain')], 0, 0));
  const comps = [ // x, y, ancho, alto, espesor, material
    [-2.55, 6.1, 1.0, 1.15, .17, 'steel'], [-1.03, 6.1, .92, 1.1, .17, 'steel'], [-1.03, 4.7, .9, 1.25, .15, 'steel'],
    [-2.55, 4.8, .8, .8, .09, 'chip'], [-2.55, 3.25, 1.05, 1.5, .18, 'steel'], [-2.55, 1.35, 1.0, 1.0, .1, 'chip'],
    [-2.55, -.35, .85, 1.2, .09, 'chip'], [-2.82, -1.7, .42, .42, .08, 'chip'], [-2.27, -1.7, .42, .42, .08, 'chip'],
    [-2.55, -2.85, 1.0, .9, .15, 'steel'], [-1.83, 2.3, .26, .9, .09, 'conn'], [-1.83, .5, .26, .9, .09, 'conn'],
    [-1.83, -1.3, .26, .9, .09, 'conn'], [-1.83, -2.9, .26, .7, .09, 'conn'],
  ];
  comps.forEach(([x, y, w, h, d, k]) => {
    const z = top + d / 2;
    if (k === 'conn') { const c = box(h, w, d, m(k), x, y, z); c.rotation.z = Math.PI / 2; g.add(c); return; }
    g.add(box(w, h, d, m(k), x, y, z, k === 'steel' ? .03 : 0));
    if (k === 'steel') g.add(box(w - .16, h - .16, .012, m('steelDark'), x, y, top + d + .004));         // tapa estampada del blindaje
    else g.add(box(w + .1, h + .1, .02, m('black'), x, y, top + .01));                                   // underfill
  });
  g.add(box(.7, .9, .012, m('dark'), -2.55, 3.25, top + .19));                                           // pad térmico
  const inL = (x, y) => (x > -3.1 && x < -1.7 && y > -3.7 && y < 6.8) || (x >= -1.7 && x < -.55 && y > 3.7 && y < 6.8);
  const smd = [], cols = [], pal = [0xb9a27c, 0x8a6b47, 0x1a1a1c, 0xc9c2b0, 0xb9a27c];
  for (let n = 0; smd.length < 220 && n < 5000; n++) {                                                   // SMD instanciados en los huecos libres
    const x = rand(-3.15, -.5), y = rand(-3.75, 6.85);
    if (!inL(x, y) || comps.some(([cx, cy, w, h]) => Math.abs(x - cx) < w / 2 + .1 && Math.abs(y - cy) < h / 2 + .1)) continue;
    smd.push([x, y, top + .018, rnd() < .5 ? 0 : Math.PI / 2]); cols.push(pal[rnd() * pal.length | 0]);
  }
  g.add(inst(new THREE.BoxGeometry(.09, .045, .036), m('smd'), smd, cols));
  holes.forEach(([x, y]) => g.add(cyl(.14, .1, m('gold'), x, y, top + .05), ...screw(m, x, y, top + .12, .1)));
  g.add(box(1.0, 1.4, .14, m('steel'), -2.55, 2.4, -.12, .03), box(.9, .9, .12, m('steel'), -1.03, 5.4, -.11, .03), box(.8, 1.0, .09, m('chip'), -2.55, -1.2, -.095));
  // detalle tipo teardown: grafito sobre blindajes, cowlings, coaxiales, clips y etiqueta
  g.add(box(.82, .96, .008, m('graphite'), -2.55, 6.1, top + .18), box(.72, 1.05, .008, m('graphite'), -1.03, 4.7, top + .16));
  [2.3, -1.3].forEach(y => g.add(...cowl(m, .4, 1.06, -1.83, y, top + .115)));
  const zc = top + .045, route = dx => [[-.8, 6.78, zc], [-2.0, 6.84 - dx, zc], [-3.0 - dx, 6.5, zc], [-3.1 - dx / 2, 2, zc], [-3.1 - dx / 2, -2, zc], [-2.85, -3.62 + dx, zc]];
  g.add(cable(m('black'), route(0)), cable(m('tape'), route(.07)));
  g.add(inst(new THREE.CylinderGeometry(.07, .07, .09, 14).rotateX(Math.PI / 2), m('gold'), [[-.8, 6.78, zc], [-2.85, -3.62, zc], [-2.85, -3.55, zc]]));
  g.add(inst(new THREE.BoxGeometry(.13, .08, .07), m('gold'), [[-.75, 3.74, top + .035], [-1.05, 3.74, top + .035], [-1.35, 3.74, top + .035], [-2.2, -3.68, top + .035], [-2.5, -3.68, top + .035]]));
  g.add(sticker(m, .6, .3, -2.55, -2.85, top + .16));
  return g;
}

function buildTapticSpeaker(m) {
  const g = new THREE.Group();
  const t = new THREE.Group(); t.position.set(-1.85, -5.75, 0);                                          // motor háptico
  t.add(box(2.5, 1.05, .34, m('steel'), 0, 0, 0, .07), box(2.15, .72, .014, m('steelDark'), 0, 0, .172));
  [-.6, 0, .6].forEach(x => t.add(box(.04, .6, .012, m('steel'), x, 0, .18)));
  [-1.42, 1.42].forEach(x => t.add(slab(rrect(.42, .5, .12, x, .2), .06, m('steel'), -.1), ...screw(m, x, .2, -.05, .1)));
  t.add(flexStrip(m, .6, .5, .6, .72, .1), inst(new THREE.BoxGeometry(.1, .2, .02), m('gold'), [.45, .6, .75].map(x => [x, .75, .125])));
  const s = new THREE.Group(); s.position.set(1.75, -5.7, 0);                                            // parlante
  const body = new THREE.Shape(); [[-1.45, -.85], [1.2, -.85], [1.45, -.55], [1.45, .85], [-1.1, .85], [-1.45, .5]].forEach(([x, y], i) => i ? body.lineTo(x, y) : body.moveTo(x, y));
  s.add(slab(body, .36, m('plastic'), 0, .03), slab(rrect(1.9, 1.1, .12, .05, .05), .03, m('steel'), .19), face(rrect(1.6, .8, .08, .05, .05), m('mesh'), .212));
  s.add(box(1.1, .32, .3, m('plastic'), -.2, -1.0, 0, .05), box(1.0, .06, .22, m('black'), -.2, -1.17, 0));
  s.add(inst(new THREE.BoxGeometry(.12, .26, .04), m('gold'), [[-1.15, .15, .2], [-.95, .15, .2]]), ...screw(m, 1.2, .62, .2, .1), ...screw(m, -1.2, -.6, .2, .1));
  t.add(sticker(m, .5, .25, .55, -.2, .182)); s.add(sticker(m, .45, .22, .9, -.55, .21));
  g.add(t, s);
  return g;
}

function buildChargePort(m) {
  const g = new THREE.Group(), y = -6.85;
  g.add(box(1.0, .62, .3, m('steel'), 0, y, 0, .12), box(.86, .05, .2, m('black'), 0, y - .3, 0, .02), box(.7, .3, .012, m('steelDark'), 0, y + .05, .152));
  [-.78, .78].forEach(x => g.add(slab(rrect(.4, .4, .1, x, y + .1), .05, m('steel'), -.1), ...screw(m, x, y + .1, -.06, .1)));
  g.add(flexStrip(m, 6.0, .3, 0, -6.35, -.05), flexStrip(m, .5, 1.5, -2.6, -5.75, -.05), flexStrip(m, .7, 2.0, 1.2, -5.5, -.05));
  g.add(box(.9, .3, .08, m('conn'), 1.2, -4.55, -.01), box(.3, .22, .05, m('chip'), -1.0, -6.35, -.01), box(.22, .22, .05, m('chip'), 2.0, -6.35, -.01));
  [-2.3, 2.5].forEach(x => g.add(box(.34, .24, .11, m('steel'), x, -6.7, 0, .03), cyl(.04, .02, m('black'), x, -6.7, .056)));  // micrófonos
  g.add(inst(new THREE.BoxGeometry(.09, .045, .03), m('smd'), [...Array(14)].map((_, i) => [-2.0 + i * .28 + (i > 6 ? .9 : 0), -6.35, -.02]), Array(14).fill(0xb9a27c)));
  return g;
}

function buildCameras(m) {
  const g = new THREE.Group();
  const br = rrect(3.45, 3.45, .5, ...CAM); LENS.forEach(([x, y]) => br.holes.push(circle(x, y, .66)));
  g.add(slab(br, .05, m('steel'), -.22, 0));                                                             // soporte
  LENS.forEach(([x, y], i) => {
    g.add(box(1.45, 1.45, .42, m('steel'), x, y, 0, .08), box(1.15, 1.15, .014, m('dark'), x, y, .212));   // sensor + blindaje
    g.add(flexStrip(m, .5, 1.3, x - .3, y - (i < 2 ? 0 : 1.2), .225), box(.55, .2, .06, m('conn'), x - .3, y - (i < 2 ? .7 : 1.9), .25));
  });
  const L = LENS.map(([x, y]) => [x, y, 0]), C = (r, h) => new THREE.CylinderGeometry(r, r, h, 48).rotateX(Math.PI / 2);
  const at = (geom, mat, z) => { const im = inst(geom, mat, L); im.position.z = z; return im; };
  g.add(at(C(.6, .36), m('black'), -.39), at(new THREE.TorusGeometry(.6, .035, 10, 48), m('steel'), -.57));      // barriles (instanciados)
  g.add(at(C(.52, .02), m('lens'), -.575), at(new THREE.TorusGeometry(.34, .03, 8, 40), m('dark'), -.585), at(C(.17, .024), m('black'), -.578));
  g.add(box(.6, .6, .06, m('pcbPlain'), ...FLASH, -.1), cyl(.21, .1, m('led'), ...FLASH, -.18), cyl(.25, .06, m('tape'), ...FLASH, -.15)); // flash
  g.add(box(.6, .8, .3, m('black'), ...LIDAR, -.05, .05), cyl(.1, .02, m('lens'), LIDAR[0], LIDAR[1] + .18, -.205), cyl(.1, .02, m('lens'), LIDAR[0], LIDAR[1] - .18, -.205)); // LiDAR
  g.add(flexStrip(m, .4, 1.0, FLASH[0] - .55, FLASH[1], .0).rotateZ(0), ...screw(m, CAM[0] - 1.5, CAM[1] + 1.5, -.19, .08), ...screw(m, CAM[0] + 1.5, CAM[1] - 1.5, -.19, .08));
  const ois = []; LENS.forEach(([x, y]) => ois.push([x, y + .75, 0, 0], [x, y - .75, 0, 0], [x + .75, y, 0, Math.PI / 2], [x - .75, y, 0, Math.PI / 2]));
  g.add(inst(new THREE.BoxGeometry(.62, .06, .3), m('copper'), ois));                                    // bobinas del estabilizador
  LENS.forEach(([x, y]) => g.add(sticker(m, .5, .25, x + .2, y + .32, .222)));
  return g;
}

function buildCoil(m) {
  const g = new THREE.Group(); g.position.set(0, -.3, 0);
  class Spiral extends THREE.Curve {
    getPoint(t, o = new THREE.Vector3()) { const a = t * 13 * Math.PI * 2, r = 1.05 + 1.15 * t; return o.set(Math.cos(a) * r, Math.sin(a) * r, 0); }
  }
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new Spiral(), 1500, .036, 6), m('copper')));               // espiral real, una sola malla
  g.add(face(ring(rrect(6.0, 6.7, .6), rrect(.01, .01, .004)), m('film'), -.03));                        // film portador
  g.add(slab(ring(rrect(5.8, 6.5, .55), rrect(5.68, 6.38, .5)), .012, m('copper'), -.01, 0));            // antena NFC
  const mags = []; for (let i = 0; i < 32; i++) { const a = i / 32 * Math.PI * 2; if (Math.abs(a - Math.PI * 1.5) > .28) mags.push([Math.cos(a) * 2.72, Math.sin(a) * 2.72, 0, a + Math.PI / 2]); }
  g.add(inst(new THREE.BoxGeometry(.46, .32, .07), m('magnet'), mags), box(.3, .9, .07, m('magnet'), 0, -3.75, 0, .03)); // anillo magnético
  g.add(box(.07, 1.3, .02, m('copper'), -.08, -2.85, .0), box(.07, 2.3, .02, m('copper'), .08, -2.2, .04), box(.6, .22, .07, m('conn'), 0, -3.25, .03));
  g.add(slab(ring(disc(2.32), circle(0, 0, .95)), .02, m('graphite'), -.05, 0));                          // blindaje de ferrita
  return g;
}

function buildBack(m) {
  const g = new THREE.Group();
  const holes = sh => { LENS.forEach(([x, y]) => sh.holes.push(circle(x, y, .7))); sh.holes.push(circle(...FLASH, .22), circle(...LIDAR, .2)); return sh; };
  g.add(slab(holes(rrect(W - .1, H - .1, R - .05)), .09, m('backGlass'), 0, .03));
  g.add(slab(holes(rrect(3.7, 3.7, .95, ...CAM)), .14, m('backGloss'), -.1, .04));                        // meseta de cámaras
  const L = LENS.map(([x, y]) => [x, y, 0]);
  const rings = inst(new THREE.TorusGeometry(.73, .07, 12, 56), m('alu'), L); rings.position.z = -.19;
  const covers = inst(new THREE.CylinderGeometry(.7, .7, .03, 48).rotateX(Math.PI / 2), m('cover'), L); covers.position.z = -.18;
  g.add(rings, covers, cyl(.22, .03, m('cover'), ...FLASH, -.16), cyl(.2, .03, m('black'), ...LIDAR, -.16), cyl(.04, .02, m('black'), CAM[0] - .8, CAM[1] - .55, -.175));
  g.add(slab(ring(rrect(W - .5, H - .5, R - .25), rrect(W - .64, H - .64, R - .32)), .02, m('dark'), .055, 0)); // adhesivo perimetral
  // cara interna: lámina de grafito, refuerzo de cámaras, torretas, flex del flash y chapa de antena
  g.add(slab(rrect(5.7, 8.8, .35, 0, -1.7), .01, m('graphite'), .052, 0), slab(holes(rrect(3.95, 3.95, .7, ...CAM)), .05, m('steel'), .075, .01));
  const posts = []; for (let i = 0; i < 5; i++) posts.push([-3.05, -6 + i * 2.6, .1], [3.05, -6 + i * 2.6 - (i > 3 ? 1.4 : 0), .1]);
  g.add(inst(new THREE.CylinderGeometry(.1, .12, .12, 14).rotateX(Math.PI / 2), m('gold'), posts));
  g.add(flexStrip(m, .3, 3.3, -.7, 5.0, .062), box(.5, .2, .06, m('conn'), -.7, 3.3, .085), slab(rrect(5.6, .55, .12, 0, -6.72), .03, m('steelDark'), .068, .008));
  [-3.08, 3.08].forEach(x => g.add(box(.2, 4.6, .03, m('foam'), x, -2.5, .065)));
  g.add(sticker(m, .9, .45, -1.9, -5.9, .062));
  return g;
}

// ---- Config: el orden del array es el orden de adelante hacia atrás ----
// explodeZ / offset [x,y] / anchor [x,y] en cm · rotation [x,y,z] en grados · baseZ: posición ensamblada · color: solo fallback SVG
const EXPLODE = 1.2;    // multiplicador global de distancia
const STAGGER = .35;    // desfase entre piezas
const TILT = [9, -40]; // inclinación de cámara [x,y] en explosión máxima
const FOV = 26;
const PARTS = [
  { name: 'glass',   label: 'Vidrio frontal',           dato: 'Templado, con isla de sensores', build: buildGlass,         explodeZ: 9.5,  baseZ: .36,  offset: [0, 0],    rotation: [0, 0, 0],   anchor: [3.4, 6.9],   color: '#3a3d44' },
  { name: 'oled',    label: 'Panel OLED',               dato: '6,1" · 120 Hz',                  build: buildOled,          explodeZ: 7.6,  baseZ: .29,  offset: [0, .1],   rotation: [0, 0, 0],   anchor: [3.3, 4.0],   color: '#1766f2' },
  { name: 'digi',    label: 'Táctil y sensor facial',   dato: 'Digitizer + cámara selfie',      build: buildDigitizer,     explodeZ: 5.7,  baseZ: .24,  offset: [0, -.1],  rotation: [0, 0, 0],   anchor: [1.0, 6.45],  color: '#56606e' },
  { name: 'frame',   label: 'Marco de aluminio',        dato: 'Volumen, encendido y switch',    build: buildFrame,         explodeZ: 3.6,  baseZ: 0,    offset: [0, 0],    rotation: [0, 0, 0],   anchor: [3.57, 1.5],  color: '#a9abb1' },
  { name: 'battery', label: 'Batería',                  dato: '3274 mAh',                       build: buildBattery,       explodeZ: 1.8,  baseZ: 0,    offset: [.5, -.3], rotation: [2, 0, -2],  anchor: [3.1, -.5],   color: '#222327' },
  { name: 'logic',   label: 'Placa lógica',             dato: 'Procesador, memoria y carga',    build: buildLogicBoard,    explodeZ: 0,    baseZ: -.05, offset: [-.6, .4], rotation: [-2, 0, 2],  anchor: [-1.7, 2.6],  color: '#0c3a29' },
  { name: 'taptic',  label: 'Motor háptico y parlante', dato: 'Vibración y audio',              build: buildTapticSpeaker, explodeZ: -1.8, baseZ: -.02, offset: [.3, -.5], rotation: [3, 0, 1],   anchor: [2.9, -5.4],  color: '#55575d' },
  { name: 'port',    label: 'Puerto de carga',          dato: 'USB-C + micrófonos',             build: buildChargePort,    explodeZ: -3.6, baseZ: 0,    offset: [-.2, -.7], rotation: [4, 0, 0],  anchor: [.5, -6.85],  color: '#b9bbc1' },
  { name: 'cameras', label: 'Cámaras traseras',         dato: '3 lentes, flash y LiDAR',        build: buildCameras,       explodeZ: -5.6, baseZ: -.1,  offset: [.3, .4],  rotation: [-3, 0, -2], anchor: [2.35, 5.5],  color: '#141416' },
  { name: 'coil',    label: 'Bobina inalámbrica',       dato: 'Carga de 15 W',                  build: buildCoil,          explodeZ: -7.6, baseZ: -.27, offset: [0, -.2],  rotation: [0, 0, 0],   anchor: [2.3, -1.6],  color: '#c47d3a' },
  { name: 'back',    label: 'Tapa trasera',             dato: 'Vidrio mate',                    build: buildBack,          explodeZ: -9.5, baseZ: -.36, offset: [0, 0],    rotation: [0, 0, 0],   anchor: [3.5, -3.2],  color: '#2a2d34' },
];

// ---- Motor: despiece fijo con órbita suave, parallax y hover ----
let ACC;
const AWAKE_MS = 12000; // sin interacción, el giro se detiene y deja de usar GPU

/**
 * Monta el despiece 3D en un canvas. Devuelve una función que libera todo.
 * La pose inicial coincide con la imagen fija del hero, así el reemplazo no salta.
 */
export function mount(canvas, { accent = '#1766f2', poster = false, onReady } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: poster });
  renderer.setPixelRatio(Math.min(devicePixelRatio, poster ? 2 : 1.5));
  renderer.setClearColor(0x000000, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = poster || innerWidth >= 1024; // sombras entre capas solo en escritorio
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  ACC = new THREE.Color(accent);
  T = makeTextures(accent);

  const camera = new THREE.PerspectiveCamera(FOV, 1, .5, 400);
  const key = new THREE.DirectionalLight(0xfff6ea, 3.2); key.position.set(9, 14, 26);
  key.castShadow = true; key.shadow.mapSize.set(poster ? 2048 : 1024, poster ? 2048 : 1024); key.shadow.bias = -.0004; key.shadow.normalBias = .03; key.shadow.radius = 5;
  Object.assign(key.shadow.camera, { left: -17, right: 17, top: 17, bottom: -17, near: 1, far: 90 });
  const rim = new THREE.DirectionalLight(ACC, 5); rim.position.set(-8, 3, -10);
  const rim2 = new THREE.DirectionalLight(0xffffff, 1.6); rim2.position.set(9, -2, -8);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(90, 60), new THREE.ShadowMaterial({ opacity: .4 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -8.32; floor.receiveShadow = true; floor.raycast = () => {};
  const rig = new THREE.Group();
  scene.add(key, rim, rim2, floor, rig, new THREE.HemisphereLight(0xdfe8ff, 0x08080a, .55));

  const zs = PARTS.map(p => p.explodeZ), ZR = (Math.max(...zs) - Math.min(...zs)) * EXPLODE;
  const parts = PARTS.map(p => {
    const cache = {}, group = p.build(n => cache[n] ??= MATS[n]()), node = new THREE.Group();
    node.add(group); rig.add(node);
    node.position.set(p.offset[0], p.offset[1], p.baseZ + p.explodeZ * EXPLODE);
    node.rotation.set(rad(p.rotation[0]), rad(p.rotation[1]), rad(p.rotation[2]));
    group.userData.update?.(1);
    const mats = new Set();
    group.traverse(o => {
      if (!o.material) return;
      const list = [].concat(o.material);
      list.forEach(x => mats.add(x));
      if (o.isMesh && !list[0].transparent) o.castShadow = o.receiveShadow = true;
    });
    mats.forEach(x => x.userData = { c: x.color.clone(), e: x.envMapIntensity, em: x.emissive?.clone() });
    const part = { mats, dim: 1, dimT: 1, hl: 0, hlT: 0 };
    node.userData.part = part;
    return part;
  });

  let dist = 60, w = 0, h = 0;
  function layout() {
    w = canvas.clientWidth; h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.setViewOffset(w, h, -.07 * w, .065 * h, w, h); // las capas cercanas se agrandan por perspectiva: recentra el conjunto
    const th = 2 * Math.tan(rad(FOV / 2)), yaw = Math.abs(rad(TILT[1]));
    dist = Math.max((H + 3) / th, (W * Math.cos(yaw) + ZR * Math.sin(yaw)) / (th * camera.aspect)) / .7;
  }

  let mx = 0, my = 0, sx = 0, sy = 0, visible = true, raf = 0, pointer = null, clock = 0, prev = 0, last = 0, awakeUntil = 0, fastUntil = 0, done = false;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), tmp = new THREE.Color();
  const canHover = matchMedia('(hover:hover)').matches;

  function pick() { // hover: resalta una pieza y atenúa el resto
    let o = null;
    if (pointer.x != null) {
      const r = canvas.getBoundingClientRect();
      ndc.set((pointer.x - r.left) / r.width * 2 - 1, -(pointer.y - r.top) / r.height * 2 + 1);
      ray.setFromCamera(ndc, camera);
      o = ray.intersectObject(rig, true)[0]?.object;
      while (o && !o.userData.part) o = o.parent;
    }
    const hover = o ? o.userData.part : null;
    pointer = null;
    parts.forEach(p => { p.dimT = hover && p !== hover ? .3 : 1; p.hlT = p === hover ? 1 : 0; });
  }

  function render(now) {
    clock += Math.min(now - (prev || now), 100); prev = now; // reloj propio: al reanudar no salta
    const t = clock / 1000, idle = poster ? 0 : 1;
    sx += (mx - sx) * .06; sy += (my - sy) * .06;
    rig.rotation.set(rad(TILT[0]) + idle * (Math.sin(t * .37) * .03 + sy * .08), rad(TILT[1]) + idle * (Math.sin(t * .45) * .1 + sx * .14), 0);
    camera.position.set(0, dist * .05, dist); camera.lookAt(0, 0, 0);
    parts.forEach(p => {
      if (Math.abs(p.dimT - p.dim) < .002 && Math.abs(p.hlT - p.hl) < .002) return;
      p.dim += (p.dimT - p.dim) * .14; p.hl += (p.hlT - p.hl) * .14;
      p.mats.forEach(x => {
        x.color.copy(x.userData.c).multiplyScalar(p.dim);
        if (x.userData.e != null) x.envMapIntensity = x.userData.e * p.dim;
        if (x.userData.em) x.emissive.copy(x.userData.em).add(tmp.copy(ACC).multiplyScalar(p.hl * .22));
      });
    });
    renderer.render(scene, camera);
    if (pointer && canHover) pick();
    if (!done) { done = true; onReady?.(); }
  }

  function tick(now) {
    raf = 0;
    awakeUntil ||= now + AWAKE_MS;
    if (now < fastUntil || now - last >= 32) { last = now; render(now); } // 30 fps en reposo, 60 con el puntero encima
    if (visible && !poster && now < awakeUntil) raf = requestAnimationFrame(tick); // pausa fuera de viewport o sin interacción
  }
  const kick = () => { awakeUntil = 0; if (!raf) raf = requestAnimationFrame(tick); };

  const onMove = ev => { mx = ev.clientX / innerWidth * 2 - 1; my = ev.clientY / innerHeight * 2 - 1; };
  const onOver = ev => { pointer = { x: ev.clientX, y: ev.clientY }; fastUntil = performance.now() + 1500; kick(); };
  const onLeave = () => { pointer = {}; };
  const ro = new ResizeObserver(() => { layout(); kick(); });
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; kick(); });
  addEventListener('pointermove', onMove, { passive: true });
  canvas.addEventListener('pointermove', onOver, { passive: true });
  canvas.addEventListener('pointerleave', onLeave);
  ro.observe(canvas); io.observe(canvas);
  layout(); kick();

  return () => {
    cancelAnimationFrame(raf); visible = false;
    ro.disconnect(); io.disconnect();
    removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointermove', onOver);
    canvas.removeEventListener('pointerleave', onLeave);
    scene.traverse(o => { o.geometry?.dispose(); [].concat(o.material || []).forEach(x => x.dispose()); });
    Object.values(T).forEach(x => x.dispose());
    pmrem.dispose(); renderer.dispose();
  };
}
