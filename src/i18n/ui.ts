export const ui = {
  es: {
    nav: { work: "Proyectos", profile: "Perfil", contact: "Contacto" },
    eyebrow: "Ingeniería aplicada · Málaga",
    statement:
      "Construyo sistemas prácticos de datos, automatización e IA, desde la definición del problema hasta producción.",
    viewWork: "Ver trabajo seleccionado",
    selected: "Trabajo seleccionado",
    timeline: "Otros sistemas profesionales",
    lab: "Lab y prototipos",
    profile: "Perfil y experiencia",
    contact: "Contacto y descargas",
    readCase: "Abrir case study",
    architecture: "Arquitectura",
    technologies: "Tecnologías",
    confidentiality: "Límites de publicación",
    back: "Volver al trabajo seleccionado",
    allWork: "Archivo de proyectos",
    present: "Actualidad",
    downloadCv: "Descargar CV",
    downloadPortfolio: "Portfolio PDF",
    printView: "Vista de impresión",
    profileLead:
      "Ingeniería práctica para sistemas que deben funcionar, explicarse y evolucionar.",
    contactLead:
      "Disponible para conversar sobre datos, automatización, IA aplicada y productos técnicos.",
    problem: "Problema",
    system: "Sistema",
    contribution: "Mi aportación",
    impact: "Impacto",
  },
  en: {
    nav: { work: "Work", profile: "Profile", contact: "Contact" },
    eyebrow: "Applied engineering · Málaga",
    statement:
      "I build practical data, automation and AI systems, from problem definition through production.",
    viewWork: "View selected work",
    selected: "Selected work",
    timeline: "Other professional systems",
    lab: "Lab and prototypes",
    profile: "Profile and experience",
    contact: "Contact and downloads",
    readCase: "Open case study",
    architecture: "Architecture",
    technologies: "Technologies",
    confidentiality: "Publication boundaries",
    back: "Back to selected work",
    allWork: "Project archive",
    present: "Present",
    downloadCv: "Download CV",
    downloadPortfolio: "Portfolio PDF",
    printView: "Print view",
    profileLead:
      "Practical engineering for systems that need to work, be understood and evolve.",
    contactLead:
      "Open to conversations about data, automation, applied AI and technical products.",
    problem: "Problem",
    system: "System",
    contribution: "My contribution",
    impact: "Impact",
  },
} as const;

export type Locale = keyof typeof ui;
