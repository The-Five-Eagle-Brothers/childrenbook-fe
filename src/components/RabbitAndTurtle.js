import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Player } from "../class/Player";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Light } from "../lights/Light";
import { Road } from "../class/Road";
import { KeyController } from "../utils/KeyController";
import walkCheck from "../utils/walkCheck";
import walk from "../utils/walk";

import { LoadingManager } from "three";
import loadingGif from "../assets/images/loading.GIF";
import { Turtle } from "../class/Turtle";

export default function RabbitAndTurtle() {
  const sceneRef = useRef(null);
  const loadRef = useRef(null);

  const [loadBool, setLoadBool] = useState(false);

  useEffect(() => {
    let angle = 0;
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

    camera.lookAt(0, 0, 0);
    camera.position.x = -12;
    camera.position.y = 1.8;
    camera.position.z = -24;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    sceneRef.current.appendChild(renderer.domElement);

    // light
    const light = new Light({ scene });

    // objects
    // ---------
    // gltf onjects
    const MANAGER = new LoadingManager();

    MANAGER.onLoad = function () {
      setLoadBool(true);
    };
    const gltfLoader = new GLTFLoader(MANAGER);

    const player = new Turtle({
      scene,
      gltfLoader,
      modelSrc: "turtleWalk.glb",
    });

    const road = new Road({
      scene,
      gltfLoader,
      modelSrc: "map.glb",
    });

    // Animation loop
    const clock = new THREE.Clock();
    const keyController = new KeyController();

    const animate = function () {
      const delta = clock.getDelta();
      requestAnimationFrame(animate);
      if (player.mixer) player.mixer.update(delta);

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
          const moveX = walkDirection.x * 0.01;
          const moveZ = walkDirection.z * 0.01;
          player.modelMesh.position.x -= moveX;
          player.modelMesh.position.z -= moveZ;

          camera.position.x -= moveX;
          camera.position.z -= moveZ;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

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
      <div ref={sceneRef} />
    </>
  );
}
