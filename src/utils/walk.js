export default function walk(keyController) {
  let directionOffset = 0;
  if (keyController.keys["KeyW"] || keyController.keys["ArrowUp"]) {
    if (keyController.keys["KeyA"] || keyController.keys["ArrowLeft"]) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s + d
    } else if (keyController.keys["KeyD"] || keyController.keys["ArrowRight"]) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s + a
    } else {
      directionOffset = Math.PI;
    }
  } else if (keyController.keys["KeyS"] || keyController.keys["ArrowDown"]) {
    if (keyController.keys["KeyA"] || keyController.keys["ArrowLeft"]) {
      directionOffset = -Math.PI / 4; // w + d
    } else if (keyController.keys["KeyD"] || keyController.keys["ArrowRight"]) {
      directionOffset = Math.PI / 4; // w + a
    }
  } else if (keyController.keys["KeyA"] || keyController.keys["ArrowLeft"]) {
    directionOffset = -Math.PI / 2; // d
  } else if (keyController.keys["KeyD"] || keyController.keys["ArrowRight"]) {
    directionOffset = Math.PI / 2; // a
  }

  return directionOffset;
}
