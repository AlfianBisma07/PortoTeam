"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const Model = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const light = new THREE.PointLight(0xffffff, 100);
    light.position.set(0.8, 8, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    camera.position.set(0.8, 8, 1.0);
    // Set ukuran renderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Tambahkan renderer ke DOM
    renderer.setPixelRatio(window.devicePixelRatio);
    let mixer;
    let modelReady = false;
    const animationActions = [];
    let activeAction;
    let lastAction;

    // Atur posisi kamera
    camera.position.z = 5;
    const loader = new FBXLoader();
    loader.load("/3d model/full.fbx", (fbx) => {
      mixer = new THREE.AnimationMixer(fbx);
      var animationAction = mixer.clipAction(fbx.animations[0]);
      console.log(animationAction);
      animationActions.push(animationAction);
      // animationsFolder.add(animations, 'default');
      activeAction = animationActions[0];

      scene.add(fbx);
    });
    const animations = () => {
      setAction(animationActions[0]);
    };
    const setAction = (toAction) => {
      if (toAction !== activeAction) {
        lastAction = activeAction;
        activeAction = toAction;
        lastAction.stop();
        activeAction.reset();
        activeAction.play();
      }
    };
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    const clock = new THREE.Clock();
    // Fungsi animasi
    const animate = () => {
      requestAnimationFrame(animate);

      // Animasikan model atau lakukan perubahan lainnya
      if (modelReady) mixer.update(clock.getDelta());
      // Render scene
      renderer.render(scene, camera);
      stats.update();
    };

    // Mulai animasi
    animate();

    // Bersihkan saat komponen di-unmount
    return () => {
      renderer.dispose();
    };
  }, []);
  return <canvas ref={canvasRef} />;
};

export default Model;
