export class Map {
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
      this.modelMesh.scale.set(4, 4, 4);
      this.modelMesh.rotation.y = Math.PI / 2;
      this.modelMesh.position.x = -5.5;
      // this.modelMesh.position.z = 0.5;
      // this.modelMesh.position.y = -0.5;

      info.scene.add(this.modelMesh);
    });
  }
}
