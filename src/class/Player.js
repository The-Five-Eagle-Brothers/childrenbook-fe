import { AnimationMixer } from "three";
import * as THREE from "three";

export class Player {
  constructor(info) {
    this.moving = false;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
        if (child.type === "SkinnedMesh") {
          child.frustumCulled = false;
        }
      });

      this.modelMesh = glb.scene;

      this.modelMesh.lookAt(0, 0, 10);

      this.modelMesh.children[0].children[0].children[0].material.depthTest = true;
      this.modelMesh.children[0].children[0].children[0].material.roughness = 0.8;
      this.modelMesh.children[0].children[0].children[0].material.transparent = true;
      this.modelMesh.children[0].children[0].children[1].material.transparent = true;
      this.modelMesh.rotation.y = Math.PI / 2;
      this.modelMesh.position.z = 1;
      this.modelMesh.name = "model";
      info.scene.add(this.modelMesh);

      // animation
      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
      this.actions[0].setLoop(THREE.LoopOnce);
      this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      this.actions[2] = this.mixer.clipAction(glb.animations[2]);

      this.actions[2].play();
    });
  }
}
