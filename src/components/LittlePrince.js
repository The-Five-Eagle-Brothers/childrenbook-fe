import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Player } from "../class/Player";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Road } from "../class/Road";
import { KeyController } from "../utils/KeyController";
import walkCheck from "../utils/walkCheck";
import walk from "../utils/walk";
import { King } from "../class/King";
import { Joker } from "../class/Joker";
import { Salary } from "../class/Salary";
import { LightModel } from "../class/LightModel";
import { LoadingManager } from "three";
import loadingGif from "../assets/images/loading.GIF";
import { PrinceLight } from "../lights/PrinceLight";
import SaveModal from "./atoms/SaveModal";

export default function LittlePrince() {
  const sceneRef = useRef(null);
  const loadRef = useRef(null);

  const [loadBool, setLoadBool] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let angle = 0;
    const rotateQuarternion = new THREE.Quaternion();
    const rotateAngle = new THREE.Vector3(0, 1, 0);
    const walkDirection = new THREE.Vector3();

    // Raycasting
    let mouse = new THREE.Vector2();
    let isPressed = false; // 마우스를 누르고 있는 상태
    const meshes = []; // 마우스 체크 대상들이 들어 있는 배열
    const raycaster = new THREE.Raycaster();

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.lookAt(0, 0, 0);
    camera.position.y = 1.8;
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    sceneRef.current.appendChild(renderer.domElement);

    // light
    new PrinceLight({ scene });

    // objects
    // ---------------------------------------------------------------
    // gltf onjects
    const MANAGER = new LoadingManager();

    MANAGER.onLoad = function () {
      setLoadBool(true);
    };
    const gltfLoader = new GLTFLoader(MANAGER);

    const player = new Player({
      scene,
      gltfLoader,
      modelSrc: "fastfast.glb",
    });

    new Road({
      scene,
      gltfLoader,
      modelSrc: "road.glb",
    });

    const king = new King({
      scene,
      gltfLoader,
      meshes,
      modelSrc: "king.glb",
    });

    const joker = new Joker({
      scene,
      gltfLoader,
      meshes,
      modelSrc: "jokerSizeup.glb",
    });

    const salary = new Salary({
      scene,
      gltfLoader,
      meshes,
      modelSrc: "salary.glb",
    });

    const lightModel = new LightModel({
      scene,
      gltfLoader,
      meshes,
      modelSrc: "lightSizeup.glb",
    });

    // object(2) - star
    const positions = new Float32Array(3000);
    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < 3000; i++) {
      positions[i] = (Math.random() - 0.5) * 400;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffffff,
    });
    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Mouse Related
    // 마우스 좌표를 three.js에 맞게 변환
    function calculateMousePosition(e) {
      mouse.x = (e.clientX / sceneRef.current.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY / sceneRef.current.clientHeight) * 2 - 1);
    }

    function checkIntersects() {
      const intersects = raycaster.intersectObjects(meshes);

      for (const item of intersects) {
        // console.log(item);
        if (item.object.name.includes("king")) {
          console.log("king");
          break;
        }
      }
    }

    // 변환된 마우스 좌표를 이용해 래이캐스팅
    function raycasting() {
      raycaster.setFromCamera(mouse, camera);
      checkIntersects();
    }

    // 마우스 이벤트
    sceneRef.current.addEventListener("mousedown", (e) => {
      isPressed = true;
      calculateMousePosition(e);
    });
    sceneRef.current.addEventListener("mouseup", () => {
      isPressed = false;
    });

    sceneRef.current.addEventListener("mousemove", (e) => {
      if (isPressed) {
        calculateMousePosition(e);
      }
    });

    // 터치 이벤트
    sceneRef.current.addEventListener("touchstart", (e) => {
      isPressed = true;
      calculateMousePosition(e.touches[0]);
    });
    sceneRef.current.addEventListener("touchend", () => {
      isPressed = false;
    });
    sceneRef.current.addEventListener("touchmove", (e) => {
      if (isPressed) {
        calculateMousePosition(e.touches[0]);
      }
    });

    // Animation loop
    const clock = new THREE.Clock();
    const keyController = new KeyController();

    const animate = function () {
      const delta = clock.getDelta();
      renderer.setAnimationLoop(animate);
      if (player.mixer) player.mixer.update(delta);
      if (king.mixer) king.mixer.update(delta);
      if (joker.mixer) joker.mixer.update(delta);
      if (salary.mixer) salary.mixer.update(delta);
      if (lightModel.mixer) lightModel.mixer.update(delta);

      walkCheck(keyController, player);

      if (player.actions && player.modelMesh) {
        if (player.moving) {
          console.log("moving");
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
          const moveX = walkDirection.x * 0.02;
          const moveZ = walkDirection.z * 0.02;
          player.modelMesh.position.x -= moveX;
          player.modelMesh.position.z -= moveZ;

          camera.position.x -= moveX;
          camera.position.z -= moveZ;

          player.actions[2].stop();
          player.actions[1].play();
        } else {
          player.actions[2].play();
          player.actions[1].stop();

          // 캐릭터가 멈춰있고 클릭이 있을 때 확인
          if (isPressed) {
            raycasting();
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // resize
    window.addEventListener("resize", onResize);

    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    // Clean up on unmount
    // return () => {
    //   sceneRef.current.removeChild(renderer.domElement);
    // };
  }, []);

  useEffect(() => {
    if (loadBool) loadRef.current.remove();
  }, [loadBool]);

  return (
    <>
      <div>
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
      </div>

      <div>
        <div ref={sceneRef}>
          <div
            className="h-[64px] w-[44px] absolute top-6 right-6 bg-[url('/src/assets/images/exit.png')] bg-cover"
            onClick={() => {
              setModal(true);
            }}
          ></div>
          {modal && (
            <SaveModal
              setModal={setModal}
              taleBookName={"어린왕자"}
              status={"princeRoad"}
            ></SaveModal>
          )}
        </div>
      </div>
    </>
  );
}
