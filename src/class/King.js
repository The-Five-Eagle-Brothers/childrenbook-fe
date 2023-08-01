import { AnimationMixer } from "three";

export class King {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.modelMesh = glb.scene;
      this.modelMesh.scale.set(0.43, 0.43, 0.43);
      this.modelMesh.rotation.x = Math.PI / 10;

      this.modelMesh.position.x = 3;
      this.modelMesh.position.y = 4;
      this.modelMesh.position.z = -3;

      info.scene.add(this.modelMesh);

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].play();
    });
  }
}
