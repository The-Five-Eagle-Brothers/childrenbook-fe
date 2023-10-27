import { AnimationMixer } from "three";
import {
  STANDARD_POSITION_X,
  STANDARD_POSITION_Y,
  STANDARD_POSITION_Z,
  STANDARD_SCALE,
} from "../const/LittlePrincePosition";

export class King {
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
      this.modelMesh.scale.set(STANDARD_SCALE, STANDARD_SCALE, STANDARD_SCALE);

      this.modelMesh.position.x = STANDARD_POSITION_X;
      this.modelMesh.position.y = STANDARD_POSITION_Y;
      this.modelMesh.position.z = STANDARD_POSITION_Z;

      info.scene.add(this.modelMesh);
      this.modelMesh.children[0].children[0].name = "king";
      console.log(this.modelMesh);
      info.meshes.push(this.modelMesh);

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].play();
    });
  }
}
