import * as THREE from "three";

export class PrinceLight {
  constructor(info) {
    const ambientLight = new THREE.AmbientLight("#EEEEEE", 1);
    info.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("white", 0.2);
    const directionalLightOriginPosition = new THREE.Vector3(30, 10, 30);
    directionalLight.position.x = directionalLightOriginPosition.x;
    directionalLight.position.y = directionalLightOriginPosition.y;
    directionalLight.position.z = directionalLightOriginPosition.z;
    directionalLight.castShadow = true;

    // mapSize 세팅으로 그림자 퀄리티 설정
    directionalLight.shadow.mapSize = new THREE.Vector2(3000, 3000);
    // 그림자 범위
    directionalLight.shadow.camera.left = -60;
    directionalLight.shadow.camera.right = 60;
    directionalLight.shadow.camera.top = 60;
    directionalLight.shadow.camera.bottom = -60;
    info.scene.add(directionalLight);
  }
}
