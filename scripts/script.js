const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) jump();
  }
}

function jump() {
  isJumping = true;

  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      // Descendo
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1500;
  const randomTime = Math.random() * 6000;

  cactus.classList.add("cactus");
  cactus.style.left = cactusPosition + "px";
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    // Remove se fora da tela
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } // verifica se houve o contato com o dino
    else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
    }
    // Move para a esquerda
    else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

document.addEventListener("keyup", handleKeyUp);
createCactus();
