
const resultsData = [
  {
    image: "assets/ResultadosImagen.png",
    alt: "Persona usando un dispensador Tork en un baño",
    html: "<strong>42%</strong> de ahorro<br>con sistema de<br>toallas Tork Matic<br>v/s sistema<br>tradicional"
  },
  {
    image: "assets/modulo5.2.png",
    alt: "Otro resultado del reto Tork",
    html: "En los baños,<br>logramos reducir<br>un <strong>40%</strong> el<br>consumo de papel<br>higiénico (con<br>SmartOne®) en<br>comparación con<br>un rollo tradicional"
  },
  {
    image: "assets/modulo5.3.png",
    alt: "Tercer resultado del reto Tork",
    html: "<strong>51%</strong> de ahorro<br>con Tork Elevation<br>jabón en espuma<br>v/s sistema<br>tradicional"
  }
];

let currentIndex = 0;

const card = document.getElementById("resultsCard");
const image = document.getElementById("resultsImage");
const content = document.getElementById("resultsContent");
const prevBtn = document.querySelector(".results-control:not(.results-control--next)");
const nextBtn = document.querySelector(".results-control--next");

function updateCard(newIndex) {
  card.classList.add("results-card--fading");

  setTimeout(() => {
    currentIndex = newIndex;
    const data = resultsData[currentIndex];

    image.src = data.image;
    image.alt = data.alt;
    content.querySelector("p").innerHTML = data.html;

    card.classList.remove("results-card--fading");
  }, 250); 
}

function goNext() {
  const newIndex = (currentIndex + 1) % resultsData.length;
  updateCard(newIndex);
}

function goPrev() {
  const newIndex = (currentIndex - 1 + resultsData.length) % resultsData.length;
  updateCard(newIndex);
}

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

const innovationsGrid = document.querySelector(".innovations-grid");
const innovationsPrevBtn = document.querySelector(".innovations-control:not(.innovations-control--next)");
const innovationsNextBtn = document.querySelector(".innovations-control--next");

const CARD_WIDTH = 384;
const GAP = 24;
const SCROLL_AMOUNT = CARD_WIDTH + GAP;

innovationsNextBtn.addEventListener("click", () => {
  innovationsGrid.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
});

innovationsPrevBtn.addEventListener("click", () => {
  innovationsGrid.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
});

const growthCtaBtn = document.getElementById("growthCtaBtn");
const growthOverlay = document.getElementById("growthOverlay");
const growthModalClose = document.getElementById("growthModalClose");
const growthForm = document.getElementById("growthForm");
const growthFormState = document.getElementById("growthFormState");
const growthThanksState = document.getElementById("growthThanksState");

growthCtaBtn.addEventListener("click", (e) => {
  e.preventDefault();
  growthOverlay.hidden = false;
});

growthModalClose.addEventListener("click", () => {
  growthOverlay.hidden = true;
});

growthForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fields = {
    nombre: document.getElementById("fieldNombre"),
    apellido: document.getElementById("fieldApellido"),
    celular: document.getElementById("fieldCelular"),
    email: document.getElementById("fieldEmail")
  };

  const errors = {
    nombre: document.getElementById("errorNombre"),
    apellido: document.getElementById("errorApellido"),
    celular: document.getElementById("errorCelular"),
    email: document.getElementById("errorEmail")
  };
  const habeasData = document.getElementById("fieldHabeasData");

  let isValid = true;

  ["nombre", "apellido", "celular"].forEach((key) => {
    if (fields[key].value.trim() === "") {
      fields[key].classList.add("is-invalid");
      errors[key].textContent = "Este campo es obligatorio";
      isValid = false;
    } else {
      fields[key].classList.remove("is-invalid");
      errors[key].textContent = "";
    }
  });

  const phonePattern = /^[0-9]+$/;
if (!phonePattern.test(fields.celular.value.trim())) {
  fields.celular.classList.add("is-invalid");
  errors.celular.textContent = fields.celular.value.trim() === "" 
    ? "Este campo es obligatorio" 
    : "Solo se permiten números";
  isValid = false;
} else {
  fields.celular.classList.remove("is-invalid");
  errors.celular.textContent = "";
}

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(fields.email.value.trim())) {
    fields.email.classList.add("is-invalid");
    errors.email.textContent = "Ingresa un correo válido";
    isValid = false;
  } else {
    fields.email.classList.remove("is-invalid");
    errors.email.textContent = "";
  }

  if (!habeasData.checked) {
    isValid = false;
    habeasData.parentElement.style.color = "#D64545";
  } else {
    habeasData.parentElement.style.color = "";
  }

  if (!isValid) return;

  growthOverlay.hidden = true;

  growthFormState.hidden = true;
  growthThanksState.hidden = false;
});