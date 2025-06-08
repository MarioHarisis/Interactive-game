const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaFinal = document.getElementById("pantalla-final");
const botonEmpezar = document.getElementById("boton-empezar");
const videoContainer = document.getElementById("video-container");
const videoElement = document.getElementById("video");

const optionsContainer = document.getElementById("options");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");

const creditosImg = document.getElementById("creditos-img");

const niveles = {
  nivel1: {
    video: "videos/nivel1.mp4",
    opciones: [
      { texto: "Mirar el espejo", siguiente: "nivel2" },
      { texto: "Seguir la luz", siguiente: "gameover" },
    ],
  },
  nivel2: {
    video: "videos/nivel2.mp4",
    opciones: [
      { texto: "Romper archivo", siguiente: "nivel3" },
      { texto: "Sentarse frente a monitor", siguiente: "gameover" },
    ],
  },
  nivel3: {
    video: "videos/nivel3.mp4",
    opciones: [
      { texto: "Completar posturas", siguiente: "final" },
      { texto: "Volver por pasillo", siguiente: "gameover" },
    ],
  },
  final: {
    video: "videos/final.mp4",
    opciones: [],
  },
  gameover: {
    video: "videos/gameover.mp4",
    opciones: [],
  },
};

// Ocultar la TV al inicio
videoContainer.classList.add("hidden");

// Al hacer clic en "Empezar"
botonEmpezar.addEventListener("click", () => {
  pantallaInicio.classList.add("hidden");
  pantallaFinal.classList.add("hidden");
  videoContainer.classList.remove("hidden");
  if (creditosImg) creditosImg.style.display = "none";
  cargarNivel("nivel1");
});

// Cargar niveles
function cargarNivel(nombreNivel) {
  const nivel = niveles[nombreNivel];
  nivelActual = nombreNivel;

  pantallaInicio.classList.add("hidden");
  pantallaFinal.classList.add("hidden");
  videoContainer.classList.add("hidden");
  optionsContainer.classList.add("hidden");

  // Ocultar créditos por si venías del nivel anterior
  if (creditosImg) {
    creditosImg.style.display = "none";
    creditosImg.classList.remove("scroll-creditos");
  }

  // Game Over
  if (nombreNivel === "gameover") {
    videoContainer.classList.remove("hidden");
    videoElement.src = nivel.video;
    videoElement.play();

    videoElement.onended = () => {
      videoContainer.classList.add("hidden");
      pantallaInicio.classList.remove("hidden");
    };
    return;
  }

  // Niveles normales o final con video
  videoContainer.classList.remove("hidden");
  videoElement.src = nivel.video;
  videoElement.play();

  // Mostrar opciones (si hay) 4 segundos antes del final
  videoElement.ontimeupdate = () => {
    if (
      nivel.opciones.length > 0 &&
      videoElement.duration &&
      videoElement.currentTime >= videoElement.duration - 4
    ) {
      optionsContainer.classList.remove("hidden");
      option1.textContent = nivel.opciones[0].texto;
      option2.textContent = nivel.opciones[1].texto;

      option1.onclick = () => cargarNivel(nivel.opciones[0].siguiente);
      option2.onclick = () => cargarNivel(nivel.opciones[1].siguiente);

      videoElement.ontimeupdate = null; // Detener futuras llamadas
    }
  };

  // Si no hay opciones, volver al inicio al terminar
  videoElement.onended = () => {
    if (nivel.opciones.length === 0) {
      videoContainer.classList.add("hidden");
      pantallaInicio.classList.remove("hidden");
    }
  };
}

