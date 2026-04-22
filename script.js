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

function getCourseById(id) {
  return courses.find(course => course.id === id);
}

function isAvailable(course) {
  return course.prereq.every(req => approved.has(req));
}

function getStatus(course) {
  if (approved.has(course.id)) return "passed";
  if (isAvailable(course)) return "available";
  return "blocked";
}

function saveProgress() {
  localStorage.setItem("approvedCourses", JSON.stringify([...approved]));
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (let semester = 1; semester <= 10; semester++) {
    const semesterCourses = courses.filter(course => course.semester === semester);

    const section = document.createElement("section");
    section.className = "semester";

    const title = document.createElement("h3");
    title.textContent = `${semester}° Semestre`;
    section.appendChild(title);

    semesterCourses.forEach(course => {
      const button = document.createElement("button");
      const status = getStatus(course);
      button.className = `course ${status}`;
      button.innerHTML = `
        ${course.name}
        <small>${status === "passed" ? "Aprobado" : status === "available" ? "Disponible" : "Bloqueado"}</small>
      `;
      button.addEventListener("click", () => showCourse(course.id));
      section.appendChild(button);
    });

    grid.appendChild(section);
  }
}

function showCourse(courseId) {
  const course = getCourseById(courseId);
  const panel = document.getElementById("panel");

  const prereqNames = course.prereq.length
    ? course.prereq.map(id => getCourseById(id)?.name || id)
    : [];

  const opensNames = course.opens.length
    ? course.opens.map(id => getCourseById(id)?.name || id)
    : [];

  const isPassed = approved.has(course.id);

  panel.classList.remove("empty");
  panel.innerHTML = `
    <h2>${course.name}</h2>
    <p><strong>Semestre:</strong> ${course.semester}°</p>
    <p><strong>Estado:</strong> ${
      isPassed ? "Aprobado" : isAvailable(course) ? "Disponible" : "Bloqueado"
    }</p>

    <p><strong>Prerrequisitos:</strong></p>
    <div>
      ${
        prereqNames.length
          ? prereqNames.map(name => `<span class="tag">${name}</span>`).join("")
          : '<span class="muted">No tiene</span>'
      }
    </div>

    <p><strong>Ramos que desbloquea:</strong></p>
    <div>
      ${
        opensNames.length
          ? opensNames.map(name => `<span class="tag">${name}</span>`).join("")
          : '<span class="muted">No desbloquea ramos directos</span>'
      }
    </div>

    <div class="controls">
      <button class="${isPassed ? "unpass" : "pass"}" id="togglePass">
        ${isPassed ? "Quitar aprobado" : "Marcar como aprobado"}
      </button>
    </div>
  `;

  document.getElementById("togglePass").addEventListener("click", () => {
    if (approved.has(course.id)) {
      approved.delete(course.id);
    } else {
      approved.add(course.id);
    }
    saveProgress();
    renderGrid();
    showCourse(course.id);
  });
}

function resetProgress() {
  approved.clear();
  saveProgress();
  renderGrid();

  const panel = document.getElementById("panel");
  panel.className = "panel empty";
  panel.innerHTML = `
    <h2>Selecciona un ramo</h2>
    <p>Aquí verás sus detalles.</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderGrid();

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetProgress);
  }
});
