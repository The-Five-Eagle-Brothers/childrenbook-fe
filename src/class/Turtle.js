import { AnimationMixer } from "three";

export class Turtle {
  constructor(info) {
    this.moving = false;

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

      // this.modelMesh.lookAt(1, 0, 25);
      // this.modelMesh.rotation.y = (Math.PI / 5) * 4;
      this.modelMesh.position.x = -12;
      // this.modelMesh.position.y = -0.2;
      this.modelMesh.position.z = 38;
      this.modelMesh.name = "model";
      info.scene.add(this.modelMesh);

      this.modelMesh.lookAt(-12, 0, -100);
      // animation
      this.actions = [];

      console.log(glb.animations);

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
    });
  }
}
