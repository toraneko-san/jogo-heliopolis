const tabuleiro = document.querySelector(".tabuleiro");
const jogador = document.querySelector(".jogador");
const fogOfWar = document.querySelector(".fog-of-war");
const outputOrientation = document.querySelector(".output-orientation");
const outputMotion = document.querySelector(".output-motion");

let [posX, posY] = [10, 10];

const [minX, maxX] = [0, tabuleiro.clientWidth - jogador.clientWidth];
const [minY, maxY] = [0, tabuleiro.clientWidth - jogador.clientWidth];

function handleOrientation(event) {
  let x = event.beta; // In degree in the range [-180,180)
  let y = event.gamma; // In degree in the range [-90,90)

  outputOrientation.textContent = `beta: ${x}\n`;
  outputOrientation.textContent += `gamma: ${y}\n`;

  // constrain x value to the range [-30, 30]
  if (x > 30) {
    x = 30;
  } else if (x < -30) {
    x = -30;
  }

  // constrain y value to the range [-15, 15]
  if (y > 15) {
    y = 15;
  } else if (y < -15) {
    y = -15;
  }

  if (posX >= minX && posX <= maxX) {
    posX += (x / 30) * 3;
  }
  if (posY >= minY && posY <= maxY) {
    posY += (y / 15) * 3;
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
  jogador.style.left = `${posY}px`; // rotating device around the y axis moves the jogador horizontally
  jogador.style.top = `${posX}px`; // rotating device around the x axis moves the ball vertically
  fogOfWar.style.background = `radial-gradient(circle at ${posY}px ${posX}px, transparent 100px, rgba(0, 0, 0) 150px)`;
}

const { userAgent } = navigator.userAgent;

if (/android/i.test(userAgent)) {
  window.addEventListener("deviceorientation", handleOrientation);
}

document.querySelector(".orientation").addEventListener("click", () => {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission().then((permissionState) => {
      if (permissionState === "granted") {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    });
  } else {
    alert("Não foi possível acessar os sensores de movimento");
  }
});

const lugares = [];

document.querySelector(".lugar1").addEventListener("click", () => {
  if (lugares.length == 0) {
    lugares.push(0);
  }
});

document.querySelector(".lugar2").addEventListener("click", () => {
  if (lugares.length == 1) {
    lugares.push(1);
    alert("venceu!!");
  }
});
