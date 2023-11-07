export class Flag {
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

      this.modelMesh.position.x = -1.6;
      this.modelMesh.position.y = 1.1;
      this.modelMesh.position.z = 11.6;

      info.scene.add(this.modelMesh);
    });
  }
}
