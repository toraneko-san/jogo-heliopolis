const ball = document.querySelector(".ball");
const garden = document.querySelector(".garden");
const outputOrientation = document.querySelector(".output-orientation");
const outputMotion = document.querySelector(".output-motion");

let posX = 10;
let posY = 10;

const maxX = garden.clientWidth - ball.clientWidth / 2;
const maxY = garden.clientHeight - ball.clientHeight / 2;

function handleOrientation(event) {
  let x = event.beta; // In degree in the range [-180,180)
  let y = event.gamma; // In degree in the range [-90,90)

  outputOrientation.textContent = `beta: ${x}\n`;
  outputOrientation.textContent += `gamma: ${y}\n`;

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x > 90) {
    x = 90;
  }
  if (x < -90) {
    x = -90;
  }

  posX += x / 90;
  posY += y / 90;

  outputOrientation.textContent = `posX: ${posX}\n`;
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
