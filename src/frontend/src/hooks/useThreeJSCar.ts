import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface UseThreeJSCarOptions {
  autoRotate?: boolean;
  onHotspotClick?: (id: string) => void;
}

export function useThreeJSCar(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  options: UseThreeJSCarOptions = {},
) {
  const { autoRotate = true } = options;
  const cleanupRef = useRef<() => void>(() => {});
  const autoRotateRef = useRef(autoRotate);

  const stopAutoRotate = useCallback(() => {
    autoRotateRef.current = false;
  }, []);

  const startAutoRotate = useCallback(() => {
    autoRotateRef.current = true;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ── Scene ────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera ───────────────────────────────────────────────────────────
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.set(3.5, 1.8, 5.0);
    camera.lookAt(0, 0, 0);

    // ── Controls ─────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.autoRotate = autoRotateRef.current;
    controls.autoRotateSpeed = 0.8;

    // Reset auto-rotate on user interaction
    let idleTimer: ReturnType<typeof setTimeout>;
    const onUserInteraction = () => {
      controls.autoRotate = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (autoRotateRef.current) controls.autoRotate = true;
      }, 3000);
    };
    canvas.addEventListener("pointerdown", onUserInteraction);

    // ── Materials ────────────────────────────────────────────────────────
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1a0a2e),
      metalness: 0.6,
      roughness: 0.3,
      envMapIntensity: 1,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x00d4ff),
      metalness: 0.8,
      roughness: 0.15,
      emissive: new THREE.Color(0x00d4ff),
      emissiveIntensity: 0.25,
    });
    const purpleMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x7b3fff),
      metalness: 0.7,
      roughness: 0.2,
      emissive: new THREE.Color(0x5b2fdf),
      emissiveIntensity: 0.2,
    });
    const silverMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x9ba3af),
      metalness: 0.9,
      roughness: 0.1,
    });
    const tireMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x111111),
      metalness: 0.0,
      roughness: 0.9,
    });
    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x888ea8),
      metalness: 0.95,
      roughness: 0.05,
    });

    // ── Car group ────────────────────────────────────────────────────────
    const car = new THREE.Group();

    function addMesh(
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number,
      rx = 0,
      ry = 0,
      rz = 0,
      group: THREE.Group = car,
    ): THREE.Mesh {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      return mesh;
    }

    // ── Nose & monocoque ─────────────────────────────────────────────────
    // Main chassis body (long low box)
    addMesh(new THREE.BoxGeometry(3.2, 0.22, 0.58), bodyMat, 0, 0.18, 0);
    // Raised cockpit area
    addMesh(new THREE.BoxGeometry(0.9, 0.18, 0.52), bodyMat, 0.1, 0.37, 0);
    // Nose cone (tapers forward)
    const noseGeo = new THREE.CylinderGeometry(0.09, 0.2, 0.9, 6);
    addMesh(noseGeo, bodyMat, -1.75, 0.12, 0, 0, 0, Math.PI / 2);
    // Purple accent stripe top
    addMesh(new THREE.BoxGeometry(2.8, 0.04, 0.14), purpleMat, 0, 0.3, 0);
    // Cyan edge stripe
    addMesh(new THREE.BoxGeometry(3.0, 0.03, 0.3), accentMat, 0, 0.29, 0.21);
    addMesh(new THREE.BoxGeometry(3.0, 0.03, 0.3), accentMat, 0, 0.29, -0.21);

    // ── Sidepods ─────────────────────────────────────────────────────────
    addMesh(new THREE.BoxGeometry(1.2, 0.26, 0.32), bodyMat, 0.1, 0.13, 0.44);
    addMesh(new THREE.BoxGeometry(1.2, 0.26, 0.32), bodyMat, 0.1, 0.13, -0.44);
    // Sidepod accent lines
    addMesh(new THREE.BoxGeometry(1.1, 0.03, 0.28), accentMat, 0.1, 0.28, 0.44);
    addMesh(
      new THREE.BoxGeometry(1.1, 0.03, 0.28),
      accentMat,
      0.1,
      0.28,
      -0.44,
    );

    // ── Engine cover / halo ───────────────────────────────────────────────
    addMesh(new THREE.BoxGeometry(0.5, 0.32, 0.12), bodyMat, 0.55, 0.38, 0);
    // Halo bar
    addMesh(
      new THREE.TorusGeometry(0.28, 0.025, 8, 16, Math.PI),
      silverMat,
      0.18,
      0.56,
      0,
      0,
      0,
      0,
    );

    // ── Floor / undertray ─────────────────────────────────────────────────
    addMesh(new THREE.BoxGeometry(2.8, 0.045, 0.9), bodyMat, 0.1, 0.0, 0);

    // ── Front wing ───────────────────────────────────────────────────────
    // Main plane
    addMesh(new THREE.BoxGeometry(0.08, 0.035, 1.3), accentMat, -1.62, 0.04, 0);
    // End plates
    addMesh(new THREE.BoxGeometry(0.2, 0.2, 0.04), bodyMat, -1.65, 0.1, 0.64);
    addMesh(new THREE.BoxGeometry(0.2, 0.2, 0.04), bodyMat, -1.65, 0.1, -0.64);
    // Upper flap
    addMesh(new THREE.BoxGeometry(0.06, 0.025, 1.1), purpleMat, -1.58, 0.09, 0);
    // Cascade elements
    addMesh(
      new THREE.BoxGeometry(0.05, 0.02, 0.35),
      accentMat,
      -1.55,
      0.14,
      0.52,
    );
    addMesh(
      new THREE.BoxGeometry(0.05, 0.02, 0.35),
      accentMat,
      -1.55,
      0.14,
      -0.52,
    );

    // ── Rear wing ────────────────────────────────────────────────────────
    addMesh(new THREE.BoxGeometry(0.06, 0.04, 1.0), purpleMat, 1.55, 0.65, 0);
    addMesh(new THREE.BoxGeometry(0.06, 0.025, 0.9), accentMat, 1.52, 0.72, 0);
    // End plates
    addMesh(new THREE.BoxGeometry(0.28, 0.32, 0.04), bodyMat, 1.55, 0.58, 0.5);
    addMesh(new THREE.BoxGeometry(0.28, 0.32, 0.04), bodyMat, 1.55, 0.58, -0.5);
    // Support struts
    addMesh(new THREE.BoxGeometry(0.05, 0.45, 0.05), silverMat, 1.5, 0.42, 0.2);
    addMesh(
      new THREE.BoxGeometry(0.05, 0.45, 0.05),
      silverMat,
      1.5,
      0.42,
      -0.2,
    );

    // ── Rear diffuser ─────────────────────────────────────────────────────
    addMesh(new THREE.BoxGeometry(0.35, 0.14, 0.7), bodyMat, 1.48, 0.07, 0);

    // ── Wheels (4 corners) ───────────────────────────────────────────────
    const tireGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.22, 20);
    const rimGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.23, 12);
    const hubGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.25, 8);

    type WheelPos = [number, number, number];
    const wheelPositions: WheelPos[] = [
      [-1.3, 0, 0.52],
      [-1.3, 0, -0.52],
      [0.95, 0, 0.54],
      [0.95, 0, -0.54],
    ];
    for (const [wx, wy, wz] of wheelPositions) {
      const wg = new THREE.Group();
      wg.position.set(wx, wy, wz);
      car.add(wg);
      addMesh(tireGeo, tireMat, 0, 0, 0, Math.PI / 2, 0, 0, wg);
      addMesh(rimGeo, rimMat, 0, 0, 0, Math.PI / 2, 0, 0, wg);
      addMesh(hubGeo, silverMat, 0, 0, 0, Math.PI / 2, 0, 0, wg);
    }

    // ── Suspension wishbones ──────────────────────────────────────────────
    addMesh(
      new THREE.BoxGeometry(0.6, 0.025, 0.025),
      silverMat,
      -1.3,
      0.15,
      0.3,
    );
    addMesh(
      new THREE.BoxGeometry(0.6, 0.025, 0.025),
      silverMat,
      -1.3,
      0.15,
      -0.3,
    );
    addMesh(
      new THREE.BoxGeometry(0.6, 0.025, 0.025),
      silverMat,
      0.9,
      0.15,
      0.3,
    );
    addMesh(
      new THREE.BoxGeometry(0.6, 0.025, 0.025),
      silverMat,
      0.9,
      0.15,
      -0.3,
    );

    car.position.y = 0.28;
    scene.add(car);

    // ── Ground shadow plane ───────────────────────────────────────────────
    const groundGeo = new THREE.PlaneGeometry(10, 10);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── Lighting ─────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x1a0a2e, 0.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7b3fff, 1.0);
    fillLight.position.set(-4, 2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x00d4ff, 1.8);
    rimLight.position.set(0, -1, -5);
    scene.add(rimLight);

    const underLight = new THREE.PointLight(0x00d4ff, 1.5, 4);
    underLight.position.set(0, -0.1, 0);
    scene.add(underLight);

    // ── Resize handler ───────────────────────────────────────────────────
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);

    // ── Render loop ──────────────────────────────────────────────────────
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.autoRotate = autoRotateRef.current;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ──────────────────────────────────────────────────────────
    cleanupRef.current = () => {
      cancelAnimationFrame(animId);
      clearTimeout(idleTimer);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onUserInteraction);
      controls.dispose();
      renderer.dispose();
    };

    return () => {
      cleanupRef.current();
    };
  }, [canvasRef]);

  return { stopAutoRotate, startAutoRotate };
}
