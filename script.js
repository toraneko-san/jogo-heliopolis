const ball = document.querySelector(".ball");
const garden = document.querySelector(".garden");
const outputOrientation = document.querySelector(".output-orientation");
const outputMotion = document.querySelector(".output-motion");

let [posX, posY] = [10, 10];

const [minX, maxX] = [0, garden.clientWidth - ball.clientWidth];
const [minY, maxY] = [0, garden.clientWidth - ball.clientWidth];

function handleOrientation(event) {
  let x = event.beta; // In degree in the range [-180,180)
  let y = event.gamma; // In degree in the range [-90,90)

  outputOrientation.textContent = `beta: ${x}\n`;
  outputOrientation.textContent += `gamma: ${y}\n`;

  // constrain x and y value to the range [-45, 45]
  if (x > 45) {
    x = 45;
  } else if (x < -45) {
    x = -45;
  } 

  if (y > 45) {
    y = 45;
  } else if (y < -45) {
    y = -45;
  } 

  if (posX >= minX && posX <= maxX) {
    posX += x / 45 * 2;
  }
  if (posY >= minY && posY <= maxY) {
    posY += y / 45 * 2;
  }

  if (posX < minX) {
    posX = minX;
  } else if (posX > maxX) {
    posX = maxX;
  }

  if (posY < minY) {
    posY = minY;
  } else if (posY > maxY) {
    posY = maxY;
  }

  outputOrientation.textContent += `maxX: ${maxX}\n`;
  outputOrientation.textContent += `maxY: ${maxY}\n`;
  outputOrientation.textContent += `posX: ${posX}\n`;
  outputOrientation.textContent += `posY: ${posY}\n`;

  // It centers the positioning point to the center of the ball
  ball.style.left = `${posY}px`; // rotating device around the y axis moves the ball horizontally
  ball.style.top = `${posX}px`; // rotating device around the x axis moves the ball vertically
}

document.querySelector(".orientation").addEventListener("click", () => {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission().then((permissionState) => {
      if (permissionState === "granted") {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    });
  }
});
