export class Tree {
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

      this.modelMesh.lookAt(0, 0, 10);
      this.modelMesh.scale.set(10, 10, 10);
      this.modelMesh.rotation.y = (Math.PI / 5) * 4;
      this.modelMesh.position.x = -20;
      this.modelMesh.position.y = -0.2;
      this.modelMesh.position.z = -35;
      this.modelMesh.name = "tree";
      info.scene.add(this.modelMesh);
    });
  }
}
