"use client";

import { useEffect, useRef } from "react";
import styles from "./ThreeMotionScene.module.css";

type SceneVariant = "hero" | "orbit" | "assistant";

export function ThreeMotionScene({ variant }: { variant: SceneVariant }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    let disposed = false;
    let visible = false;
    let pageVisible = !document.hidden;
    let motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let initializing = false;
    let renderer: import("three").WebGLRenderer | undefined;
    let scene: import("three").Scene | undefined;
    let camera: import("three").PerspectiveCamera | undefined;
    let root: import("three").Group | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let lastFrame = 0;
    const resources: Array<{ dispose: () => void }> = [];

    const renderFrame = (time = 0) => {
      if (!renderer || !scene || !camera || !root) return;
      if (motionAllowed && time - lastFrame < 30) return;
      lastFrame = time;
      const seconds = time * 0.001;
      root.rotation.y = seconds * 0.12;
      root.rotation.x = Math.sin(seconds * 0.22) * 0.08;
      root.children.forEach((child, index) => {
        if (child.userData.orbit) {
          child.rotation.z = seconds * (child.userData.speed as number);
          child.rotation.x = child.userData.tilt as number;
        }
        if (child.userData.float) child.position.y = Math.sin(seconds * 0.8 + index) * 0.035;
      });
      renderer.render(scene, camera);
    };

    const updateLoop = () => {
      if (!renderer) return;
      renderer.setAnimationLoop(visible && pageVisible && motionAllowed ? renderFrame : null);
      if (!motionAllowed || !visible || !pageVisible) renderFrame();
    };

    const initialize = async () => {
      if (initializing) return;
      initializing = true;
      try {
        const THREE = await import("three");
        if (disposed || !element) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
        camera.position.z = variant === "assistant" ? 3.5 : 5;
        root = new THREE.Group();
        scene.add(root);

        const makeRing = (radius: number, tilt: number, color: string, speed: number) => {
          const geometry = new THREE.TorusGeometry(radius, variant === "assistant" ? 0.012 : 0.008, 6, 112);
          const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: variant === "assistant" ? 0.55 : 0.32 });
          resources.push(geometry, material);
          const ring = new THREE.Mesh(geometry, material);
          ring.rotation.x = tilt;
          ring.userData.orbit = true;
          ring.userData.speed = speed;
          ring.userData.tilt = tilt;
          root?.add(ring);
        };

        if (variant === "assistant") {
          const coreGeometry = new THREE.IcosahedronGeometry(0.52, 2);
          const coreMaterial = new THREE.MeshBasicMaterial({ color: "#2875e3" });
          const shellMaterial = new THREE.MeshBasicMaterial({ color: "#b8d5ff", wireframe: true, transparent: true, opacity: 0.55 });
          resources.push(coreGeometry, coreMaterial, shellMaterial);
          const core = new THREE.Mesh(coreGeometry, coreMaterial);
          core.userData.float = true;
          root.add(core);
          const shell = new THREE.Mesh(coreGeometry, shellMaterial);
          shell.scale.setScalar(1.1);
          root.add(shell);
          makeRing(0.78, 0.95, "#ffffff", 0.36);
          makeRing(0.92, 0.42, "#9cc5ff", -0.24);
        } else {
          makeRing(variant === "hero" ? 1.45 : 1.24, 0.7, "#77aaf0", 0.15);
          makeRing(variant === "hero" ? 1.12 : 0.96, 1.2, "#a4c5f4", -0.2);
          if (variant === "orbit") makeRing(1.56, 0.18, "#c1d7f7", 0.1);

          const count = variant === "hero" ? 34 : 20;
          const positions = new Float32Array(count * 3);
          for (let i = 0; i < count; i++) {
            const angle = i * 2.399963;
            const radius = 1 + ((i * 37) % 100) / 75;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = Math.sin(angle) * radius;
            positions[i * 3 + 2] = ((i % 7) - 3) * 0.12;
          }
          const pointsGeometry = new THREE.BufferGeometry();
          pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
          const pointsMaterial = new THREE.PointsMaterial({ color: "#79a8e8", size: 0.025, transparent: true, opacity: 0.65, sizeAttenuation: true });
          resources.push(pointsGeometry, pointsMaterial);
          const points = new THREE.Points(pointsGeometry, pointsMaterial);
          points.userData.orbit = true;
          points.userData.speed = 0.035;
          points.userData.tilt = 0.1;
          root.add(points);
        }

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        element.appendChild(renderer.domElement);

        const resize = () => {
          const { width, height } = element.getBoundingClientRect();
          if (!renderer || !camera || width < 1 || height < 1) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderFrame();
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(element);
        resize();
        updateLoop();
      } catch {
        // The surrounding UI remains complete when WebGL is unavailable.
      } finally {
        initializing = false;
      }
    };

    intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !renderer) void initialize();
      updateLoop();
    }, { rootMargin: "100px" });
    intersectionObserver.observe(element);

    const visibilityChange = () => { pageVisible = !document.hidden; updateLoop(); };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionChange = () => { motionAllowed = !motionQuery.matches; updateLoop(); };
    document.addEventListener("visibilitychange", visibilityChange);
    motionQuery.addEventListener("change", motionChange);

    return () => {
      disposed = true;
      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      document.removeEventListener("visibilitychange", visibilityChange);
      motionQuery.removeEventListener("change", motionChange);
      renderer?.setAnimationLoop(null);
      resources.forEach(resource => resource.dispose());
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [variant]);

  return <div ref={host} className={`${styles.scene} ${styles[variant]}`} aria-hidden="true"><span className={styles.fallback}/></div>;
}
