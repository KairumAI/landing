import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

// Decorative perspective and signals. These paths never encode observed data.
export function createHomeDepth(canvas: HTMLCanvasElement, kind: string) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  const scene = new Scene();
  const camera = new OrthographicCamera(-6, 6, 3.4, -3.4, 0.1, 30);
  camera.position.set(0, 0, 10);
  const group = new Group();
  scene.add(group);
  const dark = kind === "answer" || kind === "archive";
  const lineMaterial = new MeshBasicMaterial({
    color: new Color(dark ? 0xffc400 : 0x9b7500),
    transparent: true,
    opacity: 0.65,
  });
  const signalMaterial = new MeshBasicMaterial({
    color: new Color(dark ? 0xffdc56 : 0x9b7500),
    transparent: true,
  });
  const curves: CatmullRomCurve3[] = [];
  const meshes: Mesh[] = [];
  const count = kind === "traffic" ? 2 : kind === "archive" ? 4 : 3;
  for (let i = 0; i < count; i++) {
    const y = kind === "traffic" ? 0.85 - i * 2.4 : -1.3 + i * 0.75;
    const curve = new CatmullRomCurve3([
      new Vector3(-4.8, y - 0.35, -1),
      new Vector3(-1.7, y + 0.5, 0.4 + i * 0.14),
      new Vector3(1.1, y + (kind === "traffic" ? 0 : 0.45), 0.8),
      new Vector3(4.5, y, -0.5),
    ]);
    curves.push(curve);
    const rail = new Mesh(
      new TubeGeometry(curve, 60, dark ? 0.009 : 0.006, 5, false),
      lineMaterial,
    );
    group.add(rail);
    meshes.push(rail);
    const signal = new Mesh(new SphereGeometry(0.045, 12, 8), signalMaterial);
    group.add(signal);
    meshes.push(signal);
  }
  const positions: number[] = [];
  for (let i = 0; i < 160; i++) {
    const angle = i * 0.27;
    const radius = 1.5 + (i % 9) * 0.26;
    positions.push(
      Math.cos(angle) * radius * 1.5,
      Math.sin(angle) * radius * 0.55 - 0.5,
      Math.sin(i * 0.46) * 0.9 - 1,
    );
  }
  const pointGeometry = new BufferGeometry();
  pointGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(positions, 3),
  );
  const pointMaterial = new PointsMaterial({
    color: dark ? 0xffdc56 : 0x9b7500,
    size: 0.025,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
  });
  const field = new Points(pointGeometry, pointMaterial);
  group.add(field);
  let last = 1;
  let lastAmbient = 0;
  let disposed = false;
  function render(progress = last, ambient = lastAmbient) {
    if (disposed) return;
    last = progress;
    lastAmbient = ambient;
    group.rotation.y =
      -0.22 + progress * 0.26 + Math.sin(ambient * Math.PI * 2) * 0.06;
    group.rotation.x = 0.1 * (1 - progress);
    for (let i = 0; i < count; i++) {
      const signal = meshes[i * 2 + 1];
      signal.position.copy(
        curves[i].getPoint(
          progress >= 1
            ? (ambient + i * 0.27) % 1
            : Math.min(1, Math.max(0, progress * 1.1 - i * 0.035)),
        ),
      );
      signal.scale.setScalar(
        progress >= 1
          ? 0.2 + Math.sin(Math.PI * ((ambient + i * 0.27) % 1)) * 1.2
          : 1.5,
      );
    }
    lineMaterial.opacity =
      progress >= 1 ? 0.32 : 0.18 + Math.sin(Math.PI * progress) * 0.5;
    field.rotation.z = progress * 0.08 + Math.sin(ambient * Math.PI * 2) * 0.07;
    renderer.render(scene, camera);
  }
  function resize() {
    if (disposed) return;
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    const ratio = width / height;
    camera.left = -3.4 * ratio;
    camera.right = 3.4 * ratio;
    camera.updateProjectionMatrix();
    render();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  return {
    render,
    dispose() {
      if (disposed) return;
      disposed = true;
      observer.disconnect();
      meshes.forEach((mesh) => mesh.geometry.dispose());
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineMaterial.dispose();
      signalMaterial.dispose();
      renderer.clear();
      renderer.dispose();
    },
  };
}
