const courses = [
  { id: "bio", name: "Biología Celular y Genética", semester: 1, prereq: [], opens: ["anato", "micro"] },
  { id: "quim", name: "Química General y Orgánica", semester: 1, prereq: [], opens: ["bioq"] },
  { id: "intro", name: "Introducción a la Enfermería", semester: 1, prereq: [], opens: ["fund1"] },
  { id: "anato", name: "Anatomía", semester: 1, prereq: [], opens: ["fisio", "fund1"] },
  { id: "mate", name: "Matemática", semester: 1, prereq: [], opens: ["bioest"] },

  { id: "micro", name: "Microbiología y Parasitología", semester: 2, prereq: ["bio"], opens: ["adulto1"] },
  { id: "bioq", name: "Bioquímica", semester: 2, prereq: ["quim"], opens: ["fisio"] },
  { id: "fisio", name: "Fisiología", semester: 2, prereq: ["anato", "bioq"], opens: ["farma", "adulto1"] },
  { id: "fund1", name: "Fundamentos de Enfermería", semester: 2, prereq: ["intro", "anato"], opens: ["adulto1", "comu1"] },
  { id: "psico", name: "Psicología del Desarrollo", semester: 2, prereq: [], opens: ["saludmental"] },

  { id: "adulto1", name: "Enfermería en el Adulto I", semester: 3, prereq: ["fund1", "fisio", "micro"], opens: ["adulto2", "quiru"] },
  { id: "comu1", name: "Enfermería Comunitaria I", semester: 3, prereq: ["fund1"], opens: ["comu2"] },
  { id: "farma", name: "Farmacología", semester: 3, prereq: ["fisio"], opens: ["adulto2", "materno"] },
  { id: "bioest", name: "Bioestadística", semester: 3, prereq: ["mate"], opens: ["metodo"] },
  { id: "etica", name: "Ética y Bioética", semester: 3, prereq: [], opens: ["gestion"] },

  { id: "adulto2", name: "Enfermería en el Adulto II", semester: 4, prereq: ["adulto1", "farma"], opens: ["critico", "internado1"] },
  { id: "quiru", name: "Enfermería Médico Quirúrgica", semester: 4, prereq: ["adulto1"], opens: ["critico"] },
  { id: "comu2", name: "Enfermería Comunitaria II", semester: 4, prereq: ["comu1"], opens: ["saludfam"] },
  { id: "saludmental", name: "Salud Mental y Psiquiatría", semester: 4, prereq: ["psico"], opens: ["internado1"] },
  { id: "metodo", name: "Metodología de la Investigación", semester: 4, prereq: ["bioest"], opens: ["seminario"] },

  { id: "materno", name: "Enfermería Materno Infantil", semester: 5, prereq: ["farma", "adulto1"], opens: ["pediatria", "neonato"] },
  { id: "saludfam", name: "Salud Familiar y Comunitaria", semester: 5, prereq: ["comu2"], opens: ["aps"] },
  { id: "critico", name: "Enfermería en Paciente Crítico", semester: 5, prereq: ["adulto2", "quiru"], opens: ["urgencia"] },
  { id: "gestion", name: "Gestión y Administración en Salud", semester: 5, prereq: ["etica"], opens: ["liderazgo"] },
  { id: "electivo1", name: "Electivo de Formación Integral I", semester: 5, prereq: [], opens: ["electivo2"] },

  { id: "pediatria", name: "Enfermería Pediátrica", semester: 6, prereq: ["materno"], opens: ["internado2"] },
  { id: "neonato", name: "Neonatología", semester: 6, prereq: ["materno"], opens: ["internado2"] },
  { id: "aps", name: "Atención Primaria en Salud", semester: 6, prereq: ["saludfam"], opens: ["internado2"] },
  { id: "urgencia", name: "Urgencia y Desastres", semester: 6, prereq: ["critico"], opens: ["internado2"] },
  { id: "seminario", name: "Seminario de Investigación", semester: 6, prereq: ["metodo"], opens: ["grado"] },

  { id: "internado1", name: "Internado Intrahospitalario I", semester: 7, prereq: ["adulto2", "saludmental"], opens: ["internado3"] },
  { id: "liderazgo", name: "Liderazgo y Calidad", semester: 7, prereq: ["gestion"], opens: ["internado3"] },
  { id: "electivo2", name: "Electivo de Formación Integral II", semester: 7, prereq: ["electivo1"], opens: [] },
  { id: "saludpub", name: "Salud Pública", semester: 7, prereq: ["aps"], opens: ["internado4"] },
  { id: "grado", name: "Trabajo de Grado", semester: 7, prereq: ["seminario"], opens: ["titulo"] },

  { id: "internado2", name: "Internado Clínico Integrado", semester: 8, prereq: ["pediatria", "neonato", "aps", "urgencia"], opens: ["internado4"] },
  { id: "gerencia", name: "Gerencia del Cuidado", semester: 8, prereq: ["liderazgo"], opens: ["internado4"] },
  { id: "educa", name: "Educación en Salud", semester: 8, prereq: ["saludpub"], opens: ["titulo"] },
  { id: "electivo3", name: "Electivo de Formación Integral III", semester: 8, prereq: [], opens: [] },

  { id: "internado3", name: "Internado de Gestión y Comunidad", semester: 9, prereq: ["internado1", "liderazgo"], opens: ["titulo"] },
  { id: "internado4", name: "Internado Profesional", semester: 9, prereq: ["internado2", "gerencia", "saludpub"], opens: ["titulo"] },
  { id: "integrador", name: "Taller Integrador", semester: 9, prereq: ["grado"], opens: ["titulo"] },

  { id: "titulo", name: "Examen / Hito de Titulación", semester: 10, prereq: ["grado", "internado3", "internado4", "educa", "integrador"], opens: [] }
];

const approved = new Set(JSON.parse(localStorage.getItem("approvedCourses") || "[]"));

function isUnlocked(course) {
  return course.prereq.every(id => approved.has(id));
}

function getStatus(course) {
  if (approved.has(course.id)) return "approved";
  return isUnlocked(course) ? "available" : "locked";
}

function save() {
  localStorage.setItem("approvedCourses", JSON.stringify([...approved]));
}

function labelStatus(status) {
  if (status === "approved") return "Aprobado";
  if (status === "available") return "Disponible";
  return "Bloqueado";
}

function getCourseById(id) {
  return courses.find(c => c.id === id);
}

function createCourseCard(course) {
  const card = document.createElement("button");
  card.className = `course ${getStatus(course)}`;
  card.type = "button";
  card.innerHTML = `
    <span class="course-name">${course.name}</span>
    <span class="course-status">${labelStatus(getStatus(course))}</span>
  `;
  card.addEventListener("click", () => openModal(course));
  return card;
}

function renderGrid() {
  const grid = document.getElementById("grid");
  if (!grid) return;
  grid.innerHTML = "";

  for (let semester = 1; semester <= 10; semester++) {
    const column = document.createElement("section");
    column.className = "semester";

    const title = document.createElement("h2");
    title.textContent = `${semester}° Semestre`;
    column.appendChild(title);

    courses
      .filter(course => course.semester === semester)
      .forEach(course => column.appendChild(createCourseCard(course)));

    grid.appendChild(column);
  }

  updateProgress();
}

function updateProgress() {
  const total = courses.length;
  const done = approved.size;
  const percent = Math.round((done / total) * 100);

  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");

  if (progressText) progressText.textContent = `${done} de ${total} ramos aprobados (${percent}%)`;
  if (progressFill) progressFill.style.width = `${percent}%`;
}

function openModal(course) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const prereq = document.getElementById("modal-prereq");
  const opens = document.getElementById("modal-opens");
  const action = document.getElementById("modal-action");

  title.textContent = course.name;

  const prereqNames = course.prereq.length
    ? course.prereq.map(id => getCourseById(id)?.name || id)
    : ["No tiene"];

  const opensNames = course.opens.length
    ? course.opens.map(id => getCourseById(id)?.name || id)
    : ["No abre ramos directos"];

  prereq.innerHTML = prereqNames.map(name => `<li>${name}</li>`).join("");
  opens.innerHTML = opensNames.map(name => `<li>${name}</li>`).join("");

  action.textContent = approved.has(course.id) ? "Quitar como aprobado" : "Marcar como aprobado";
  action.onclick = () => toggleApproved(course.id);

  modal.showModal();
}

function toggleApproved(id) {
  if (approved.has(id)) {
    approved.delete(id);
  } else {
    approved.add(id);
  }
  save();
  document.getElementById("modal").close();
  renderGrid();
}

function resetProgress() {
  approved.clear();
  save();
  renderGrid();
}

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();

  const resetButton = document.getElementById("reset-progress");
  if (resetButton) resetButton.addEventListener("click", resetProgress);

  const closeButton = document.getElementById("modal-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      document.getElementById("modal").close();
    });
  }
});
