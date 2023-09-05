import { AnimationMixer } from "three";

export class Rabbit {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = false;
        }
      });

      this.modelMesh = glb.scene;

      this.modelMesh.position.x = -4;
      this.modelMesh.position.y = -10;
      this.modelMesh.position.z = 10;

      info.scene.add(this.modelMesh);

      // animation
      this.actions = [];

      console.log(glb.animations);

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
    });
  }
}
