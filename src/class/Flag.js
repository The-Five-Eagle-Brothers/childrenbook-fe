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
      console.log(this.modelMesh);
      this.modelMesh.scale.set(50, 50, 50);

      this.modelMesh.position.x = -1.6;
      this.modelMesh.position.z = 11.6;

      this.modelMesh.rotateY(Math.PI / 2);

      info.scene.add(this.modelMesh);
    });
  }
}
