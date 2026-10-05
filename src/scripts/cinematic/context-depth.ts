import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

// A decorative field only. The source and finding remain semantic HTML above it.
export function createContextDepth(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, 0.1, 30);
  camera.position.set(0, 0, 9);
  const positions: number[] = [];
  for (let x = -15; x <= 15; x++) {
    for (let y = -9; y <= 9; y++) {
      positions.push(
        x * 0.26,
        y * 0.26,
        Math.sin(x * 0.26) * Math.cos(y * 0.3) * 0.55,
      );
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const material = new PointsMaterial({
    color: 0x9b7500,
    size: 0.028,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const field = new Points(geometry, material);
  scene.add(field);
  let progress = 1;
  let disposed = false;
  function render(value = progress) {
    if (disposed) return;
    progress = value;
    field.rotation.y = -0.22 * (1 - value);
    field.rotation.x = 0.14 * (1 - value);
    field.position.z = -0.7 * (1 - value);
    renderer.render(scene, camera);
  }
  function resize() {
    if (disposed) return;
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    render();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  return {
    render,
    dispose() {
      disposed = true;
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
