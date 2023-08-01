export default function walkCheck(keyController, player) {
  if (keyController.keys["KeyW"] || keyController.keys["ArrowUp"]) {
    player.moving = true;
  } else if (keyController.keys["KeyS"] || keyController.keys["ArrowDown"]) {
    player.moving = true;
  } else if (keyController.keys["KeyA"] || keyController.keys["ArrowLeft"]) {
    player.moving = true;
  } else if (keyController.keys["KeyD"] || keyController.keys["ArrowRight"]) {
    player.moving = true;
  } else {
    player.moving = false;
  }
}
