export const ui = {
  es: {
    nav: { work: "Proyectos", profile: "Sobre mí", contact: "Contacto" },
    eyebrow: "AI, datos y automatización",
    location: "Málaga, España",
    statement:
      "Diseño productos de datos, automatización e inteligencia artificial para resolver problemas operativos reales y llevar las soluciones desde la definición hasta producción.",
    viewWork: "Ver proyectos",
    selected: "Proyectos destacados",
    timeline: "Otros proyectos",
    lab: "Lab y prototipos",
    profile: "Sobre mí",
    contact: "Contacto",
    readCase: "Ver proyecto",
    architecture: "Arquitectura",
    technologies: "Tecnologías",
    back: "Volver a proyectos",
    allWork: "Otros proyectos",
    present: "Actualidad",
    downloadCv: "Currículum completo · PDF ↗",
    downloadPortfolio: "Portfolio PDF",
    printView: "Vista de impresión",
    profileLead:
      "Software, datos y sistemas físicos para construir soluciones completas y mantenibles.",
    contactLead:
      "Disponible para conversar sobre datos, automatización, IA aplicada y productos técnicos.",
    problem: "Problema",
    system: "Sistema",
    contribution: "Mi aportación",
    impact: "Impacto",
  },
  en: {
    nav: { work: "Projects", profile: "About", contact: "Contact" },
    eyebrow: "AI, data and automation",
    location: "Málaga, Spain",
    statement:
      "I design data, automation and artificial intelligence products to solve real operational problems and take solutions from definition into production.",
    viewWork: "View projects",
    selected: "Featured projects",
    timeline: "Other projects",
    lab: "Lab and prototypes",
    profile: "About me",
    contact: "Contact",
    readCase: "View project",
    architecture: "Architecture",
    technologies: "Technologies",
    back: "Back to projects",
    allWork: "Other projects",
    present: "Present",
    downloadCv: "Full résumé · PDF ↗",
    downloadPortfolio: "Portfolio PDF",
    printView: "Print view",
    profileLead:
      "Software, data and physical systems brought together into complete, maintainable solutions.",
    contactLead:
      "Open to conversations about data, automation, applied AI and technical products.",
    problem: "Problem",
    system: "System",
    contribution: "My contribution",
    impact: "Impact",
  },
} as const;

export type Locale = keyof typeof ui;
