export const site = {
  name: "Darío Jáuregui",
  role: "AI, Data & Automation Engineer",
  email: "dariojauregui4@gmail.com",
  linkedin: "https://www.linkedin.com/in/dariojauregui/",
  github: "https://github.com/DarioJauregui",
} as const;

export const withBase = (path = "/") => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}` || "/";
};
