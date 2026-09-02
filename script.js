const projects = [
  {
    id: "gshock",
    title: "G-SHOCK 1992",
    visual: "SHOCK",
    category: "exhibition",
    categoryLabel: "Exhibition & Branding",
    year: "2026",
    accent: "#d9ff58",
    description:
      "G-SHOCK의 강인한 브랜드 이미지를 실내 스트리트 놀이터라는 콘셉트로 재해석한 전시 브랜딩 프로젝트.",
    role: "Concept · Brand Identity · Exhibition Graphic · Goods",
    tools: "Illustrator · Photoshop · Blender",
    tags: ["Exhibition", "Street", "Graphic", "Goods"],
  },
  {
    id: "mui",
    title: "Mui",
    visual: "MUI",
    category: "uxui",
    categoryLabel: "UX/UI App Design",
    year: "2026",
    accent: "#b8f2d2",
    description:
      "대인관계에서 발생하는 갈등을 분석하고 사용자에게 적절한 대화 방법과 해결책을 제안하는 감정 기반 커뮤니케이션 앱.",
    role: "UX Research · UI Design · Prototyping",
    tools: "Figma · Illustrator",
    tags: ["UX/UI", "Communication", "Emotion", "Mobile App"],
  },
  {
    id: "atelier",
    title: "접시 위의 아틀리에",
    visual: "PLATE",
    category: "editorial",
    categoryLabel: "Editorial Design",
    year: "2026",
    accent: "#ffad68",
    description:
      "음식의 색과 배열, 질감을 하나의 예술 작품처럼 바라보고 시각적으로 기록한 푸드 스타일링 편집 디자인 프로젝트.",
    role: "Art Direction · Editorial · Photography Direction",
    tools: "InDesign · Photoshop · Illustrator",
    tags: ["Editorial", "Food", "Color", "Layout"],
  },
  {
    id: "flower-market",
    title: "양재꽃시장 MI",
    visual: "BLOOM",
    category: "branding",
    categoryLabel: "Brand Identity",
    year: "2026",
    accent: "#ff9ec8",
    description:
      "도시와 꽃이 공존하는 양재꽃시장의 이미지를 현대적이고 친근한 시각 언어로 표현한 브랜드 아이덴티티 프로젝트.",
    role: "Brand Strategy · Identity · Application Design",
    tools: "Illustrator · Photoshop",
    tags: ["Branding", "Flower", "Local", "Identity"],
  },
];

const grid = document.querySelector("#project-grid");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const dialog = document.querySelector("#project-dialog");
const closeButton = dialog.querySelector(".dialog-close");
let lastFocusedCard = null;

function projectCard(project, index) {
  return `
    <button
      class="project-card"
      type="button"
      data-project-id="${project.id}"
      aria-label="${project.title} 프로젝트 상세 보기"
    >
      <span class="project-visual" style="--accent: ${project.accent}" aria-hidden="true">
        <span class="visual-word">${project.visual}</span>
      </span>
      <span class="project-body">
        <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="project-content">
          <span class="project-category">${project.categoryLabel} · ${project.year}</span>
          <span class="project-title">${project.title}</span>
          <span class="project-description">${project.description}</span>
          <span class="project-link">View Project</span>
        </span>
      </span>
    </button>
  `;
}

function renderProjects(filter = "all") {
  const filteredProjects =
    filter === "all" ? projects : projects.filter((project) => project.category === filter);

  grid.innerHTML = filteredProjects.map(projectCard).join("");
  grid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openDialog(card.dataset.projectId, card));
  });
}

function openDialog(projectId, trigger) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  lastFocusedCard = trigger;
  dialog.querySelector("#dialog-visual").style.setProperty("--accent", project.accent);
  dialog.querySelector("#dialog-visual").innerHTML = `<span class="visual-word">${project.visual}</span>`;
  dialog.querySelector("#dialog-meta").textContent = `${project.categoryLabel} · ${project.year}`;
  dialog.querySelector("#dialog-title").textContent = project.title;
  dialog.querySelector("#dialog-description").textContent = project.description;
  dialog.querySelector("#dialog-role").textContent = project.role;
  dialog.querySelector("#dialog-tools").textContent = project.tools;
  dialog.querySelector("#dialog-tags").innerHTML = project.tags
    .map((tag) => `<span class="dialog-tag">${tag}</span>`)
    .join("");
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
  lastFocusedCard?.focus();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });
    renderProjects(button.dataset.filter);
  });
});

closeButton.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});

renderProjects();
