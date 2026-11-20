import * as THREE from 'three';

/**
 * A MIDREX plant with hot transport to the melt shop, laid out after the classic
 * "Hot Transport, MIDREX Style" arrangement: charge hopper and upper seal leg on top of
 * the reduction furnace, top gas duct down to the top gas scrubber, the product discharge
 * chute (PDC) feeding the EAF feed bin by screw feeder, a bypass feed leg to the quench
 * tank, and the EAF feed leg charging hot DRI straight into the electric arc furnace.
 * The gas reformer sits behind, feeding reducing gas to the bustle ring.
 * Camera and lighting follow a list of "shots" blended by a 0..1 progress value,
 * which GSAP ScrollTrigger drives.
 */

export type Shot = {
  pos: [number, number, number];
  look: [number, number, number];
  /** 0 = cold ore colours, 1 = molten discharge */
  heat: number;
  /** highlighted zone: 0 charging, 1 reformer, 2 reduction, 3 discharge, -1 none */
  zone: number;
};

const C = {
  ore: new THREE.Color('#7f8f99'),
  amber: new THREE.Color('#ffb703'),
  orange: new THREE.Color('#fb8500'),
  molten: new THREE.Color('#ffd569'),
  steel: new THREE.Color('#2a4656'),
  gas: new THREE.Color('#39bcdc'),
  line: new THREE.Color('#219ebc'),
  sky: new THREE.Color('#8ecae6'),
  bg: new THREE.Color('#01131c'),
};

type Profile = [number, number][];
const radiusAt = (p: Profile, y: number) => {
  if (y <= p[0][1]) return p[0][0];
  for (let i = 1; i < p.length; i++) {
    const [r0, y0] = p[i - 1], [r1, y1] = p[i];
    if (y <= y1) return r0 + ((y - y0) / Math.max(1e-6, y1 - y0)) * (r1 - r0);
  }
  return p[p.length - 1][0];
};

// Reduction furnace, measured up from the bottom of its discharge cone
const FB = 12;
const FURNACE: Profile = [[0.32, 0], [0.45, 0.5], [0.95, 1.5], [1.6, 2.6], [1.6, 9.4], [1.75, 9.7], [1.75, 10.1], [1.05, 10.8], [0.45, 11.4]];
const furnaceR = (y: number) => radiusAt(FURNACE, y - FB);
const FURNACE_TOP = FB + 11.4;
const PELLET_TOP = FB + 10.6;
const PELLET_BOTTOM = FB + 0.35;
const BUSTLE_Y = FB + 5.5;

const HOPPER_Y = 27.2;
const HOPPER: Profile = [[0.25, 0], [1.3, 1.3], [1.3, 3.1], [0.95, 3.5], [0.95, 3.6]];
const SEAL_LEG: Profile = [[0.26, 0], [0.26, HOPPER_Y - FURNACE_TOP]];
const PDC: Profile = [[0.22, 0], [0.32, 0.4], [0.32, 1.4], [0.26, 1.9], [0.24, 2.4]];
const PDC_Y = FB - 2.4;
const BIN: Profile = [[0.28, 0], [1.15, 1.1], [1.15, 2.9], [0.75, 3.2]];
const BIN_POS = new THREE.Vector3(1.3, 5.7, 0);
const SCRUBBER: Profile = [[0.3, 0], [1.45, 1.9], [1.45, 5.8], [1.0, 6.4], [0.45, 6.8]];
const SCRUB_POS = new THREE.Vector3(-4.4, 3.6, 0);
const LADLE: Profile = [[0.05, 0], [0.62, 0], [0.82, 1.25], [0.9, 1.35]];
const EAF_POS = new THREE.Vector3(5.2, 0, 0.2);
const REFORMER_POS = new THREE.Vector3(10, 0, -6);

const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** A stream of pellets moving along a curve (charge leg, hot transport). */
type Stream = { mesh: THREE.InstancedMesh; curve: THREE.CatmullRomCurve3; t: Float32Array; jitter: Float32Array; speed: number; hot: boolean };
/** Gas particles moving along a curve (top gas, reformer duct). */
type Flow = { points: THREE.Points; curve: THREE.CatmullRomCurve3; t: Float32Array; speed: number };

export class FurnaceScene {
  ok = false;
  private renderer?: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(38, 1, 0.1, 260);
  private last = 0;
  private elapsed = 0;
  private raf = 0;
  private running = false;
  private shots: Shot[] = [];
  private progress = 0;
  private target = { pos: new THREE.Vector3(), look: new THREE.Vector3(), heat: 0, zone: -1 };
  private current = { pos: new THREE.Vector3(16, 18, 22), look: new THREE.Vector3(0, 13, 0), heat: 0 };
  private zoneLevel = [0, 0, 0, 0];
  private disposables: { dispose: () => void }[] = [];

  private pellets!: THREE.InstancedMesh;
  private pelletData!: Float32Array; // x, y, z, speed, angle, radiusFactor
  private gas!: THREE.Points;
  private gasData!: Float32Array; // angle, radiusFactor, speed, y
  private streams: Stream[] = [];
  private flows: Flow[] = [];
  private zoneMats: THREE.MeshBasicMaterial[] = [];
  private reformerTubes!: THREE.MeshStandardMaterial;
  private bustle!: THREE.MeshStandardMaterial;
  private eafLight!: THREE.PointLight;
  private pdcLight!: THREE.PointLight;
  private eafGlow!: THREE.Sprite;
  private ladleMelt!: THREE.MeshBasicMaterial;
  private labels: { mat: THREE.SpriteMaterial; zone: number }[] = [];
  private dummy = new THREE.Object3D();
  private tmpColor = new THREE.Color();
  private tmpV = new THREE.Vector3();

  constructor(private canvas: HTMLCanvasElement, private opts: { quality: 'high' | 'low'; still?: boolean }) {
    try {
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: opts.quality === 'high', alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    this.ok = true;
    const r = this.renderer;
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.quality === 'high' ? 1.75 : 1.25));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.15;
    this.scene.fog = new THREE.FogExp2(C.bg, 0.016);
    this.build();
  }

  private track<T extends { dispose: () => void }>(o: T): T {
    this.disposables.push(o);
    return o;
  }

  /** Translucent x-ray shell with blueprint edges, from a lathe profile. */
  private vessel(profile: Profile, pos: THREE.Vector3, shellMat: THREE.Material, edgeMat: THREE.Material) {
    const g = new THREE.Group();
    g.position.copy(pos);
    const pts = profile.map(([r, y]) => new THREE.Vector2(r, y));
    g.add(new THREE.Mesh(this.track(new THREE.LatheGeometry(pts, 40)), shellMat));
    g.add(new THREE.LineSegments(this.track(new THREE.EdgesGeometry(this.track(new THREE.LatheGeometry(pts, 14)), 1)), edgeMat));
    this.scene.add(g);
    return g;
  }

  private pipe(points: THREE.Vector3[], radius: number, mat: THREE.Material) {
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    this.scene.add(new THREE.Mesh(this.track(new THREE.TubeGeometry(curve, 64, radius, 10, false)), mat));
    return curve;
  }

  /** Small blueprint-style label, like the call-outs on the reference drawing. */
  private label(text: string, pos: THREE.Vector3, zone: number, align: 'left' | 'right' = 'left') {
    const font = '600 30px "IBM Plex Mono", ui-monospace, monospace';
    const c = document.createElement('canvas');
    const g = c.getContext('2d')!;
    g.font = font;
    const w = Math.ceil(g.measureText(text.toUpperCase()).width) + 44;
    c.width = w; c.height = 48;
    g.font = font;
    g.fillStyle = '#ffb703';
    g.fillRect(align === 'left' ? 2 : w - 24, 20, 22, 3);
    g.fillStyle = '#d2eaf5';
    g.textBaseline = 'middle';
    g.fillText(text.toUpperCase(), align === 'left' ? 32 : 6, 24);
    const tex = this.track(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = this.track(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.5, depthWrite: false, fog: false }));
    const s = new THREE.Sprite(mat);
    const h = 0.42;
    s.scale.set((w / 48) * h, h, 1);
    s.center.set(align === 'left' ? 0 : 1, 0.5);
    s.position.copy(pos);
    this.scene.add(s);
    this.labels.push({ mat, zone });
  }

  private stream(curve: THREE.CatmullRomCurve3, n: number, speed: number, hot: boolean, size: number) {
    const geo = this.track(new THREE.IcosahedronGeometry(size, 0));
    const mat = this.track(new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }));
    const mesh = new THREE.InstancedMesh(geo, mat, n);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const t = new Float32Array(n).map(() => Math.random());
    const jitter = new Float32Array(n * 3).map(() => (Math.random() - 0.5) * 0.2);
    for (let i = 0; i < n; i++) mesh.setColorAt(i, hot ? C.orange : C.ore);
    this.scene.add(mesh);
    this.streams.push({ mesh, curve, t, jitter, speed, hot });
  }

  private flow(curve: THREE.CatmullRomCurve3, n: number, speed: number, color: THREE.Color, size: number, sprite: THREE.Texture) {
    const geo = this.track(new THREE.BufferGeometry());
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    const points = new THREE.Points(geo, this.track(new THREE.PointsMaterial({
      color, size, map: sprite, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false,
    })));
    this.scene.add(points);
    this.flows.push({ points, curve, t: new Float32Array(n).map(() => Math.random()), speed });
  }

  private build() {
    const s = this.scene;
    const low = this.opts.quality === 'low';
    const sprite = this.track(glowTexture());

    s.add(new THREE.AmbientLight(C.sky, 0.55));
    const key = new THREE.DirectionalLight('#ffffff', 1.3);
    key.position.set(12, 30, 16);
    s.add(key);
    const rim = new THREE.DirectionalLight(C.gas, 1.1);
    rim.position.set(-14, 10, -10);
    s.add(rim);
    this.eafLight = new THREE.PointLight(C.orange, 30, 16, 1.6);
    this.eafLight.position.copy(EAF_POS).add(v3(0, 1.6, 0));
    s.add(this.eafLight);
    this.pdcLight = new THREE.PointLight(C.orange, 6, 9, 1.6);
    this.pdcLight.position.set(0, 11, 0.6);
    s.add(this.pdcLight);

    // Ground: dark disc with a faint engineering grid
    const ground = new THREE.Mesh(this.track(new THREE.CircleGeometry(70, 64)), this.track(new THREE.MeshStandardMaterial({ color: '#011c2a', roughness: 0.95, metalness: 0.1 })));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    s.add(ground);
    const grid = new THREE.GridHelper(90, 90, C.line, C.line);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.12;
    s.add(grid);
    this.track(grid.geometry);
    this.track(grid.material as THREE.Material);

    // Shared materials
    const shell = this.track(new THREE.MeshStandardMaterial({ color: C.steel, metalness: 0.6, roughness: 0.35, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }));
    const edge = this.track(new THREE.LineBasicMaterial({ color: C.line, transparent: true, opacity: 0.55 }));
    const steel = this.track(new THREE.MeshStandardMaterial({ color: '#3d5f71', metalness: 0.8, roughness: 0.3 }));
    const dark = this.track(new THREE.MeshStandardMaterial({ color: '#0e3346', metalness: 0.5, roughness: 0.6 }));
    const glass = this.track(new THREE.MeshStandardMaterial({ color: '#3d5f71', metalness: 0.6, roughness: 0.3, transparent: true, opacity: 0.35, depthWrite: false }));

    // Charge hopper, upper seal leg, reduction furnace
    this.vessel(HOPPER, v3(0, HOPPER_Y, 0), shell, edge);
    this.vessel(SEAL_LEG, v3(0, FURNACE_TOP, 0), shell, edge);
    this.vessel(FURNACE, v3(0, FB, 0), shell, edge);
    for (const y of [FB + 2.6, FB + 3.8, FB + 6.9, FB + 9.4, FB + 10.1]) {
      const hoop = new THREE.Mesh(this.track(new THREE.TorusGeometry(furnaceR(y) + 0.04, 0.05, 8, 64)), steel);
      hoop.rotation.x = Math.PI / 2;
      hoop.position.y = y;
      s.add(hoop);
    }
    // Bustle ring, where the reducing gas enters
    this.bustle = this.track(new THREE.MeshStandardMaterial({ color: '#3d5f71', metalness: 0.7, roughness: 0.35, emissive: C.orange, emissiveIntensity: 0.15 }));
    const bustle = new THREE.Mesh(this.track(new THREE.TorusGeometry(1.95, 0.22, 16, 64)), this.bustle);
    bustle.rotation.x = Math.PI / 2;
    bustle.position.y = BUSTLE_Y;
    s.add(bustle);
    // Burden feeders around the lower cone
    const feederGeo = this.track(new THREE.BoxGeometry(0.42, 0.26, 0.26));
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const r = furnaceR(FB + 1.9) + 0.2;
      const f = new THREE.Mesh(feederGeo, steel);
      f.position.set(Math.cos(a) * r, FB + 1.9, Math.sin(a) * r);
      f.rotation.y = -a;
      s.add(f);
    }

    // Product discharge chute and the hot transport chain
    this.vessel(PDC, v3(0, PDC_Y, 0), shell, edge);
    const screw1 = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.22, 0.22, 1.5, 14)), steel);
    screw1.rotation.z = Math.PI / 2;
    screw1.position.set(0.65, PDC_Y - 0.25, 0);
    s.add(screw1);
    this.vessel(BIN, BIN_POS, shell, edge);
    const screw2 = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.2, 0.2, 1.3, 14)), steel);
    screw2.rotation.z = Math.PI / 2;
    screw2.position.set(1.95, BIN_POS.y - 0.25, 0);
    s.add(screw2);
    this.pipe([v3(2.5, 5.3, 0), v3(3.6, 4.1, 0.05), v3(4.7, 2.9, 0.15), v3(5.1, 2.35, 0.2)], 0.15, glass); // EAF feed leg
    const bypass = this.pipe([v3(0.15, 10.3, 0.15), v3(-1.6, 8.2, 1.2), v3(-4.6, 4.6, 2.2), v3(-6.9, 1.4, 2.4)], 0.15, steel); // bypass feed leg
    const quench = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.75, 0.75, 1.2, 24)), dark);
    quench.position.set(-7.3, 0.6, 2.4);
    s.add(quench);

    // Hot DRI path, used for the stream and the discharge highlight
    const hotCurve = new THREE.CatmullRomCurve3([
      v3(0, FB - 0.1, 0), v3(0, 10.4, 0), v3(0, PDC_Y - 0.05, 0), v3(0.6, PDC_Y - 0.25, 0), v3(1.25, PDC_Y - 0.5, 0),
      v3(1.3, 8.4, 0), v3(1.3, 6.6, 0), v3(1.3, 5.9, 0), v3(1.8, 5.45, 0), v3(2.5, 5.3, 0),
      v3(3.6, 4.1, 0.05), v3(4.7, 2.9, 0.15), v3(5.15, 2.0, 0.2),
    ], false, 'centripetal');
    const hotTube = new THREE.Mesh(
      this.track(new THREE.TubeGeometry(hotCurve, 160, 0.3, 10, false)),
      this.track(new THREE.MeshBasicMaterial({ color: C.orange, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })),
    );
    s.add(hotTube);

    // Top gas duct down to the top gas scrubber
    const topGas = this.pipe([v3(-0.95, FB + 10.9, 0), v3(-2.2, FB + 11.9, 0), v3(-3.7, FB + 11.6, 0), v3(-4.4, FB + 10, 0), v3(-4.4, 14, 0), v3(-4.4, SCRUB_POS.y + 6.9, 0)], 0.32, steel);
    this.vessel(SCRUBBER, SCRUB_POS, shell, edge);

    // Electric arc furnace with electrodes, slag car, ladle and charge bucket
    const eaf = new THREE.Group();
    eaf.position.copy(EAF_POS);
    const plinth = new THREE.Mesh(this.track(new THREE.BoxGeometry(3.8, 0.5, 3.8)), dark);
    plinth.position.y = 0.25;
    eaf.add(plinth);
    const eafShell = new THREE.Mesh(this.track(new THREE.CylinderGeometry(1.5, 1.4, 1.3, 40, 1, true)), shell);
    eafShell.position.y = 1.15;
    eaf.add(eafShell);
    const eafEdges = new THREE.LineSegments(this.track(new THREE.EdgesGeometry(this.track(new THREE.CylinderGeometry(1.5, 1.4, 1.3, 16, 1, true)))), edge);
    eafEdges.position.y = 1.15;
    eaf.add(eafEdges);
    const roof = new THREE.Mesh(this.track(new THREE.SphereGeometry(1.55, 32, 10, 0, Math.PI * 2, 0, Math.PI / 3.4)), glass);
    roof.position.y = 1.35;
    eaf.add(roof);
    const electrodeGeo = this.track(new THREE.CylinderGeometry(0.13, 0.13, 3.4, 12));
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 0.4;
      const e = new THREE.Mesh(electrodeGeo, steel);
      e.position.set(Math.cos(a) * 0.5, 3.6, Math.sin(a) * 0.5);
      eaf.add(e);
      const arm = new THREE.Mesh(this.track(new THREE.BoxGeometry(2.2, 0.16, 0.16)), dark);
      arm.position.set(Math.cos(a) * 0.5 + 1.0, 4.9 - i * 0.28, Math.sin(a) * 0.5);
      eaf.add(arm);
    }
    const mast = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.16, 0.16, 5.2, 12)), steel);
    mast.position.set(2.1, 2.6, 0);
    eaf.add(mast);
    this.eafGlow = new THREE.Sprite(this.track(new THREE.SpriteMaterial({ map: sprite, color: C.orange, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending })));
    this.eafGlow.scale.set(3.6, 3.0, 1);
    this.eafGlow.position.y = 1.2;
    eaf.add(this.eafGlow);
    s.add(eaf);

    const ladle = this.vessel(LADLE, v3(8.7, 0, 1.2), shell, edge);
    this.ladleMelt = this.track(new THREE.MeshBasicMaterial({ color: C.molten, toneMapped: false, transparent: true, opacity: 0.85 }));
    const melt = new THREE.Mesh(this.track(new THREE.CircleGeometry(0.82, 32)), this.ladleMelt);
    melt.rotation.x = -Math.PI / 2;
    melt.position.y = 1.2;
    ladle.add(melt);

    const slag = new THREE.Group();
    slag.position.set(2.6, 0, 2.5);
    const cart = new THREE.Mesh(this.track(new THREE.BoxGeometry(1.3, 0.35, 0.85)), dark);
    cart.position.y = 0.4;
    slag.add(cart);
    const wheel = this.track(new THREE.CylinderGeometry(0.16, 0.16, 0.1, 12));
    for (const [x, z] of [[-0.45, 0.45], [0.45, 0.45], [-0.45, -0.45], [0.45, -0.45]]) {
      const w = new THREE.Mesh(wheel, steel);
      w.rotation.x = Math.PI / 2;
      w.position.set(x, 0.16, z);
      slag.add(w);
    }
    const pot = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.42, 0.3, 0.5, 20)), steel);
    pot.position.y = 0.82;
    slag.add(pot);
    s.add(slag);

    // Overhead crane with the charge bucket, behind the melt shop
    const girder = new THREE.Mesh(this.track(new THREE.BoxGeometry(8, 0.38, 0.38)), dark);
    girder.position.set(7.4, 9.4, -1.8);
    s.add(girder);
    for (const x of [3.6, 11.2]) {
      const col = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.12, 0.12, 9.4, 10)), steel);
      col.position.set(x, 4.7, -1.8);
      s.add(col);
    }
    const bucket = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.7, 0.55, 1.1, 24)), glass);
    bucket.position.set(8.8, 6.1, -1.8);
    s.add(bucket);
    const cableGeo = this.track(new THREE.BufferGeometry().setFromPoints([v3(8.5, 9.2, -1.8), v3(8.55, 6.66, -1.8), v3(9.1, 9.2, -1.8), v3(9.05, 6.66, -1.8)]));
    s.add(new THREE.LineSegments(cableGeo, edge));

    // Gas reformer behind the plant
    const reformer = new THREE.Group();
    reformer.position.copy(REFORMER_POS);
    const box = new THREE.Mesh(this.track(new THREE.BoxGeometry(3.6, 3.2, 2.4)), this.track(new THREE.MeshStandardMaterial({ color: C.steel, metalness: 0.5, roughness: 0.5, transparent: true, opacity: 0.28, depthWrite: false })));
    box.position.y = 1.6;
    reformer.add(box);
    const boxEdges = new THREE.LineSegments(this.track(new THREE.EdgesGeometry(box.geometry)), edge);
    boxEdges.position.copy(box.position);
    reformer.add(boxEdges);
    this.reformerTubes = this.track(new THREE.MeshStandardMaterial({ color: '#2a1606', emissive: C.orange, emissiveIntensity: 0.25, metalness: 0.3, roughness: 0.5, toneMapped: false }));
    const tubeGeo = this.track(new THREE.CylinderGeometry(0.07, 0.07, 2.8, 8));
    for (let i = 0; i < 7; i++) for (let j = 0; j < 3; j++) {
      const t = new THREE.Mesh(tubeGeo, this.reformerTubes);
      t.position.set(-1.35 + i * 0.45, 1.6, -0.6 + j * 0.6);
      reformer.add(t);
    }
    const stack = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.22, 0.3, 5, 16)), steel);
    stack.position.set(1.3, 5.6, 0.6);
    reformer.add(stack);
    s.add(reformer);
    const reformerDuct = this.pipe([v3(REFORMER_POS.x - 1.8, 2.4, REFORMER_POS.z), v3(6.6, 9, -4.6), v3(3.8, 16, -1.4), v3(2.15, BUSTLE_Y, 0)], 0.16, steel);

    // Steel tower around the furnace, PDC and feed bin
    const pts: number[] = [];
    const H = 31, w = 2.6;
    const corners = [[-w, -w], [w, -w], [w, w], [-w, w]];
    for (const [x, z] of corners) pts.push(x, 0, z, x, H, z);
    for (let y = 1.55; y <= H; y += 1.55) {
      for (let i = 0; i < 4; i++) {
        const [x0, z0] = corners[i], [x1, z1] = corners[(i + 1) % 4];
        pts.push(x0, y, z0, x1, y, z1, x0, y, z0, x1, Math.min(H, y + 1.55), z1);
      }
    }
    const frameGeo = this.track(new THREE.BufferGeometry());
    frameGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    s.add(new THREE.LineSegments(frameGeo, this.track(new THREE.LineBasicMaterial({ color: C.sky, transparent: true, opacity: 0.14 }))));
    const platMat = this.track(new THREE.MeshStandardMaterial({ color: '#0e3346', metalness: 0.5, roughness: 0.6, transparent: true, opacity: 0.5, depthWrite: false }));
    for (const y of [9.0, FB + 1.9, FB + 5.0, FB + 8.4, FURNACE_TOP + 0.2, HOPPER_Y - 0.4]) {
      const inner = y > FB && y < FURNACE_TOP ? furnaceR(y) + 0.3 : 0.6;
      const p = new THREE.Mesh(this.track(new THREE.RingGeometry(inner, w * 1.25, 4, 1)), platMat);
      p.rotation.x = -Math.PI / 2;
      p.rotation.z = Math.PI / 4;
      p.position.y = y;
      s.add(p);
    }

    // Zone highlights: charging (hopper + seal leg), reformer via its tubes, reduction bed, hot transport path
    const sleeve = (r0: number, r1: number, y0: number, y1: number, color: THREE.Color) => {
      const mat = this.track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
      const m = new THREE.Mesh(this.track(new THREE.CylinderGeometry(r1, r0, y1 - y0, 48, 1, true)), mat);
      m.position.y = (y0 + y1) / 2;
      s.add(m);
      return mat;
    };
    this.zoneMats = [
      sleeve(1.4, 1.4, HOPPER_Y + 0.6, HOPPER_Y + 3.4, C.sky),
      sleeve(0, 0, 0, 0.01, C.gas),
      sleeve(furnaceR(FB + 3.9) + 0.08, furnaceR(FB + 8.3) + 0.08, FB + 3.9, FB + 8.3, C.amber),
      hotTube.material as THREE.MeshBasicMaterial,
    ];

    // Pellets sinking through the reduction furnace
    const N = low ? 650 : 1500;
    this.pellets = new THREE.InstancedMesh(this.track(new THREE.IcosahedronGeometry(0.075, 0)), this.track(new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false })), N);
    this.pellets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.pelletData = new Float32Array(N * 6);
    for (let i = 0; i < N; i++) {
      const y = PELLET_BOTTOM + Math.random() * (PELLET_TOP - PELLET_BOTTOM);
      this.pelletData.set([0, y, 0, 0.35 + Math.random() * 0.35, Math.random() * Math.PI * 2, Math.sqrt(Math.random()) * 0.9], i * 6);
      this.pellets.setColorAt(i, C.ore);
    }
    s.add(this.pellets);

    // Cold pellets falling from the hopper through the seal leg; hot DRI down the transport chain
    this.stream(new THREE.CatmullRomCurve3([v3(0, HOPPER_Y + 2.8, 0), v3(0, HOPPER_Y + 0.4, 0), v3(0, FURNACE_TOP, 0), v3(0, PELLET_TOP + 0.3, 0)]), low ? 60 : 140, 0.22, false, 0.07);
    this.stream(hotCurve, low ? 110 : 260, 0.12, true, 0.075);

    // Reducing gas rising through the bed
    const G = low ? 260 : 600;
    const gasGeo = this.track(new THREE.BufferGeometry());
    gasGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(G * 3), 3));
    this.gasData = new Float32Array(G * 4);
    for (let i = 0; i < G; i++) this.gasData.set([Math.random() * Math.PI * 2, Math.sqrt(Math.random()) * 0.95, 0.8 + Math.random() * 0.9, BUSTLE_Y + Math.random() * (PELLET_TOP - BUSTLE_Y)], i * 4);
    this.gas = new THREE.Points(gasGeo, this.track(new THREE.PointsMaterial({ color: C.gas, size: 0.22, map: sprite, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })));
    s.add(this.gas);

    this.flow(reformerDuct, low ? 50 : 120, 0.22, C.amber, 0.28, sprite);
    this.flow(topGas, low ? 40 : 90, 0.16, C.gas, 0.3, sprite);
    this.flow(bypass, low ? 12 : 26, 0.1, C.orange, 0.22, sprite);

    // Call-outs, as on the reference drawing
    this.label('Charge hopper', v3(1.7, HOPPER_Y + 2.4, 0), 0);
    this.label('Upper seal leg', v3(0.7, FURNACE_TOP + 1.9, 0), 0);
    this.label('Reduction furnace', v3(2.2, FB + 8.2, 0), 2);
    this.label('Bustle ring', v3(2.5, BUSTLE_Y - 0.1, 0), 2);
    this.label('Top gas duct', v3(-4.9, FB + 12.2, 0), -1, 'right');
    this.label('Top gas scrubber', v3(-6.1, SCRUB_POS.y + 7.4, 0), -1, 'right');
    this.label('Gas reformer', v3(REFORMER_POS.x + 1.9, 3.7, REFORMER_POS.z - 1.4), 1);
    this.label('PDC', v3(0.55, FB - 0.9, 0.3), 3);
    this.label('EAF feed bin', v3(2.6, BIN_POS.y + 2.3, 0), 3);
    this.label('Bypass to quench tank', v3(-7.4, 1.9, 2.4), 3);
    this.label('EAF feed leg', v3(3.2, 3.5, 0.3), 3, 'right');
    this.label('EAF', v3(3.75, 2.1, 1.6), 3, 'right');
    this.label('Ladle', v3(9.7, 1.4, 1.2), 3);
    this.label('Charge bucket', v3(9.7, 6.1, -1.8), -1);
    this.label('Slag car', v3(3.4, 1.0, 2.5), -1);
  }

  setShots(shots: Shot[]) {
    this.shots = shots;
    this.setProgress(this.progress, true);
  }

  /** p in 0..1 across the shot list. */
  setProgress(p: number, snap = false) {
    this.progress = Math.min(1, Math.max(0, p));
    if (!this.shots.length) return;
    const f = this.progress * (this.shots.length - 1);
    const i = Math.min(this.shots.length - 2, Math.floor(f));
    const a = this.shots[Math.max(0, i)], b = this.shots[Math.min(this.shots.length - 1, i + 1)];
    const t = this.shots.length === 1 ? 0 : f - i;
    const e = t * t * (3 - 2 * t);
    this.target.pos.set(...a.pos).lerp(new THREE.Vector3(...b.pos), e);
    this.target.look.set(...a.look).lerp(new THREE.Vector3(...b.look), e);
    this.target.heat = a.heat + (b.heat - a.heat) * e;
    this.target.zone = t < 0.5 ? a.zone : b.zone;
    if (snap) {
      this.current.pos.copy(this.target.pos);
      this.current.look.copy(this.target.look);
      this.current.heat = this.target.heat;
      this.zoneLevel = this.zoneLevel.map((_, k) => (k === this.target.zone ? 1 : 0));
    }
    if (!this.running) this.renderFrame(0);
  }

  resize() {
    if (!this.renderer) return;
    const w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    // keep the tower in frame on tall, narrow screens
    this.camera.fov = w / h < 0.8 ? 52 : 38;
    this.camera.updateProjectionMatrix();
    if (!this.running) this.renderFrame(0);
  }

  start() {
    if (!this.ok || this.running || this.opts.still) return;
    this.running = true;
    this.last = performance.now();
    const loop = (now: number) => {
      if (!this.running) return;
      const dt = Math.min(0.05, Math.max(0, (now - this.last) / 1000)); // rAF time can trail performance.now() on the first frame
      this.last = now;
      this.elapsed += dt;
      this.renderFrame(dt);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private renderFrame(dt: number) {
    if (!this.renderer) return;
    const time = this.elapsed;
    const k = dt ? 1 - Math.pow(0.0025, dt) : 1;
    const speedMul = this.opts.still ? 0 : 1;

    // Camera eases toward the scroll target with a slow idle drift
    this.current.pos.lerp(this.target.pos, k);
    this.current.look.lerp(this.target.look, k);
    this.current.heat += (this.target.heat - this.current.heat) * k;
    const drift = this.opts.still ? 0 : 0.35;
    this.camera.position.set(
      this.current.pos.x + Math.sin(time * 0.25) * drift,
      this.current.pos.y + Math.sin(time * 0.31) * drift * 0.4,
      this.current.pos.z + Math.cos(time * 0.22) * drift,
    );
    this.camera.lookAt(this.current.look);

    // Zone highlights and labels
    for (let z = 0; z < 4; z++) {
      const want = this.target.zone === z ? 1 : 0;
      this.zoneLevel[z] += (want - this.zoneLevel[z]) * (dt ? Math.min(1, dt * 4) : 1);
    }
    const pulse = 0.75 + Math.sin(time * 3) * 0.25;
    this.zoneMats[0].opacity = this.zoneLevel[0] * 0.18 * pulse;
    this.zoneMats[2].opacity = this.zoneLevel[2] * 0.2 * pulse;
    this.zoneMats[3].opacity = this.zoneLevel[3] * 0.22 * pulse;
    this.reformerTubes.emissiveIntensity = 0.25 + this.zoneLevel[1] * 1.6 * pulse;
    this.bustle.emissiveIntensity = 0.1 + (this.zoneLevel[1] + this.zoneLevel[2]) * 0.45 * pulse;
    for (const l of this.labels) l.mat.opacity = l.zone >= 0 ? 0.42 + this.zoneLevel[l.zone] * 0.58 : 0.42;

    const heat = this.current.heat;
    const flicker = this.opts.still ? 1 : 0.85 + Math.sin(time * 23) * 0.08 + Math.sin(time * 37) * 0.07;
    this.eafLight.intensity = (6 + heat * 18 + this.zoneLevel[3] * 14) * flicker;
    this.pdcLight.intensity = 2 + heat * 6;
    (this.eafGlow.material as THREE.SpriteMaterial).opacity = (0.25 + heat * 0.55 + this.zoneLevel[3] * 0.2) * flicker;
    this.ladleMelt.opacity = 0.55 + heat * 0.4;

    // Pellets sink through the furnace and heat up as they pass the reduction zone
    const d = this.pelletData, n = this.pellets.count;
    for (let i = 0; i < n; i++) {
      const o = i * 6;
      let y = d[o + 1] - d[o + 3] * dt * speedMul;
      if (y < PELLET_BOTTOM) {
        y = PELLET_TOP;
        d[o + 4] = Math.random() * Math.PI * 2;
        d[o + 5] = Math.sqrt(Math.random()) * 0.9;
      }
      d[o + 1] = y;
      const r = furnaceR(y) * d[o + 5] * 0.92;
      const ang = d[o + 4] + y * 0.05;
      this.dummy.position.set(Math.cos(ang) * r, y, Math.sin(ang) * r);
      this.dummy.rotation.set(y * 2 + i, y + i * 0.3, 0);
      this.dummy.updateMatrix();
      this.pellets.setMatrixAt(i, this.dummy.matrix);
      const depth = (PELLET_TOP - y) / (PELLET_TOP - PELLET_BOTTOM);
      const h = Math.min(1, Math.max(0, (depth - 0.35) * 1.8)) * (0.35 + heat * 0.65);
      if (h < 0.5) this.tmpColor.copy(C.ore).lerp(C.orange, h * 2);
      else this.tmpColor.copy(C.orange).lerp(C.molten, (h - 0.5) * 2);
      this.pellets.setColorAt(i, this.tmpColor);
    }
    this.pellets.instanceMatrix.needsUpdate = true;
    if (this.pellets.instanceColor) this.pellets.instanceColor.needsUpdate = true;

    // Pellet streams along the charge leg and the hot transport chain
    for (const st of this.streams) {
      const cnt = st.mesh.count;
      for (let i = 0; i < cnt; i++) {
        st.t[i] = (((st.t[i] + dt * st.speed * speedMul) % 1) + 1) % 1;
        st.curve.getPointAt(st.t[i], this.tmpV);
        this.dummy.position.set(this.tmpV.x + st.jitter[i * 3], this.tmpV.y + st.jitter[i * 3 + 1], this.tmpV.z + st.jitter[i * 3 + 2]);
        this.dummy.rotation.set(st.t[i] * 20 + i, i, 0);
        this.dummy.updateMatrix();
        st.mesh.setMatrixAt(i, this.dummy.matrix);
        if (st.hot) {
          // glowing hot DRI, brighter with the scene's heat
          this.tmpColor.copy(C.orange).lerp(C.molten, Math.min(1, 0.25 + heat * 0.75));
          st.mesh.setColorAt(i, this.tmpColor);
        }
      }
      st.mesh.instanceMatrix.needsUpdate = true;
      if (st.hot && st.mesh.instanceColor) st.mesh.instanceColor.needsUpdate = true;
    }

    // Gas rises from the bustle ring
    const gp = this.gas.geometry.attributes.position as THREE.BufferAttribute;
    const g = this.gasData;
    for (let i = 0; i < gp.count; i++) {
      const o = i * 4;
      let y = g[o + 3] + g[o + 2] * dt * speedMul;
      if (y > PELLET_TOP + 0.6) y = BUSTLE_Y;
      g[o + 3] = y;
      g[o] += dt * 0.4;
      const r = furnaceR(Math.min(y, FB + 11)) * g[o + 1];
      gp.setXYZ(i, Math.cos(g[o]) * r, y, Math.sin(g[o]) * r);
    }
    gp.needsUpdate = true;
    (this.gas.material as THREE.PointsMaterial).opacity = 0.3 + (this.zoneLevel[2] + this.zoneLevel[1]) * 0.45;

    // Gas through the reformer duct and top gas duct, hot fines down the bypass leg
    this.flows.forEach((fl, idx) => {
      const p = fl.points.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) {
        fl.t[i] = (((fl.t[i] + dt * fl.speed * speedMul) % 1) + 1) % 1; // keep within 0–1 so getPointAt never reads past the curve
        fl.curve.getPointAt(fl.t[i], this.tmpV);
        p.setXYZ(i, this.tmpV.x, this.tmpV.y, this.tmpV.z);
      }
      p.needsUpdate = true;
      const m = fl.points.material as THREE.PointsMaterial;
      m.opacity = idx === 0 ? 0.3 + this.zoneLevel[1] * 0.6 : idx === 1 ? 0.25 + this.zoneLevel[2] * 0.35 : 0.2 + this.zoneLevel[3] * 0.4;
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.stop();
    this.disposables.forEach(d => d.dispose());
    this.pellets?.dispose();
    this.streams.forEach(s => s.mesh.dispose());
    this.renderer?.dispose();
  }
}
