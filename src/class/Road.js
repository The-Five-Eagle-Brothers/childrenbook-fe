export class Road {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          // child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.modelMesh = glb.scene;
      this.modelMesh.scale.set(35, 35, 35);
      this.modelMesh.position.x = 15;
      this.modelMesh.position.z = 1;
      this.modelMesh.position.y = -0.5;

      info.scene.add(this.modelMesh);
    });
  }
}
