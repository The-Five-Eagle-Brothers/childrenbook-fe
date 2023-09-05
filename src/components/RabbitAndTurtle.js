import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Player } from "../class/Player";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Light } from "../lights/Light";
import { Road } from "../class/Road";
import { KeyController } from "../utils/KeyController";
import walkCheck from "../utils/walkCheck";
import walk from "../utils/walk";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { LoadingManager } from "three";
import loadingGif from "../assets/images/loading.GIF";
import { Turtle } from "../class/Turtle";
import { Tree } from "../class/Tree";
import { Map } from "../class/Map";
import { Rabbit } from "../class/Rabbit";
import gsap from "gsap";

export default function RabbitAndTurtle() {
  const sceneRef = useRef(null);
  const loadRef = useRef(null);
  const toastRef = useRef(false);

  const width = document.body.clientWidth;
  const height = document.body.clientHeight;

  const [loadBool, setLoadBool] = useState(false);
  const [toastBool, setToastBool] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const textArr = [
    "화면에 보이는 목표까지 이동해보세요",
    "참 잘했어요!",
    "너는 걸음이 그렇게 느려서 어떻게 사니?",
    "그렇게 자신있으면 나랑 달리기 시합할래?",
    "나랑 시합을? 진심이니? 그래! 내일 만나자",
  ];

  useEffect(() => {
    let angle = 0;
    let toastCount = 0;

    const rotateQuarternion = new THREE.Quaternion();
    const rotateAngle = new THREE.Vector3(0, 1, 0);
    const walkDirection = new THREE.Vector3();

    // Three.js scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("skyblue");
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // camera.lookAt(0, 0, 0);
    // camera.zoom = 2;
    camera.position.x = -12;
    camera.position.y = 1.3;
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    sceneRef.current.appendChild(renderer.domElement);

    // light
    const light = new Light({ scene });

    // objects
    // ---------
    const geometry = new THREE.SphereGeometry(1, 64, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.material.emissive = new THREE.Color(0x0000ff);
    sphere.material.emissiveIntensity = 2;

    // gltf onjects
    const MANAGER = new LoadingManager();

    MANAGER.onLoad = function () {
      scene.add(sphere);
      setLoadBool(true);
    };
    const gltfLoader = new GLTFLoader(MANAGER);

    sphere.position.x = -1.6;
    sphere.position.y = 1.1;
    sphere.position.z = 11.6;

    const player = new Turtle({
      scene,
      gltfLoader,
      modelSrc: "turtleWalk.glb",
    });

    const rabbit = new Rabbit({
      scene,
      gltfLoader,
      modelSrc: "rabWalk.glb",
    });

    const road = new Map({
      scene,
      gltfLoader,
      modelSrc: "map.glb",
    });

    const tree = new Tree({
      scene,
      gltfLoader,
      modelSrc: "tree.glb",
    });
    // Animation loop
    const clock = new THREE.Clock();
    const keyController = new KeyController();

    const animate = function () {
      const delta = clock.getDelta();
      requestAnimationFrame(animate);
      if (player.mixer) player.mixer.update(delta);

      if (player.modelMesh) {
        camera.lookAt(
          player.modelMesh.position.x,
          player.modelMesh.position.y,
          player.modelMesh.position.z - 4
        );
      }

      // 걷는 씬
      walkCheck(keyController, player);

      if (player.actions && player.modelMesh) {
        if (player.moving) {
          player.actions[0].play();

          angle = Math.atan2(
            camera.position.x - player.modelMesh.position.x,
            camera.position.z - player.modelMesh.position.z
          );

          let directionOffset = walk(keyController);
          // rotate model
          rotateQuarternion.setFromAxisAngle(
            rotateAngle,
            angle + directionOffset
          );
          player.modelMesh.quaternion.rotateTowards(rotateQuarternion, 0.2);

          // calculate direction
          camera.getWorldDirection(walkDirection);
          walkDirection.y = 0;
          walkDirection.normalize();
          walkDirection.applyAxisAngle(rotateAngle, directionOffset);

          // move model & camera
          const moveX = walkDirection.x * 0.03;
          const moveZ = walkDirection.z * 0.03;
          player.modelMesh.position.x -= moveX;
          player.modelMesh.position.z -= moveZ;

          console.log(player.modelMesh.position);

          camera.position.x -= moveX;
          camera.position.z -= moveZ;
        } else {
          player.actions[0].stop();
        }
      }

      // 위치 확인
      // x: -1.6382868093187486, y: 0, z: 11.558286809318236

      if (
        player.modelMesh &&
        Math.abs(player.modelMesh.position.x - sphere.position.x) < 3 &&
        Math.abs(player.modelMesh.position.z - sphere.position.z) < 3
      ) {
        scene.remove(sphere);
        if (toastCount === 0) {
          toastCount += 1;
          setToastBool(true);
          if (rabbit.modelMesh) {
            gsap.to(rabbit.modelMesh.position, { duration: 1, y: 0 });
          }
        }
      }

      if (
        player.modelMesh &&
        rabbit.modelMesh &&
        Math.abs(player.modelMesh.position.x - rabbit.modelMesh.position.x) <
          3 &&
        Math.abs(player.modelMesh.position.z - rabbit.modelMesh.position.z) < 3
      ) {
        if (toastCount === 1) {
          toastCount += 1;
          setTextIndex(textIndex + 1);
        }
      }
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    // return () => {
    //   sceneRef.current.removeChild(renderer.domElement);
    // };
  }, [sceneRef.current]);

  useEffect(() => {
    if (loadBool) loadRef.current.remove();
  }, [loadBool]);

  useEffect(() => {
    setTextIndex(1);
  }, [toastBool]);

  return (
    <>
      <div
        ref={loadRef}
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-80">
          <img src={loadingGif} alt="gif" loop="infinite" />
        </div>
      </div>
      <div ref={sceneRef}>
        {loadBool ? (
          <div
            className="text-3xl font-bold"
            style={{
              height: "60px",
              width: "100vw",
              overflow: "hidden",
              position: "absolute",
              bottom: 40,
              backgroundColor: "#FFFFFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              if (textIndex >= 2) {
                setTextIndex(textIndex + 1);
              }
            }}
          >
            {textArr[textIndex]}
          </div>
        ) : null}
      </div>
    </>
  );
}
