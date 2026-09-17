# Portfolio de Darío Jáuregui

Portfolio profesional bilingüe de Darío Jáuregui, AI, Data & Automation Engineer. Presenta cuatro case studies, una timeline de sistemas profesionales, un laboratorio de prototipos y versiones PDF reproducibles.

## Stack

- Astro estático con TypeScript estricto.
- Tailwind CSS 4 mediante el plugin oficial de Vite.
- Content Collections con esquemas Zod para validar proyectos y traducciones.
- Playwright para pruebas de navegación y generación PDF A4.
- GitHub Actions y GitHub Pages.

## Desarrollo

Requiere Node.js 24 o posterior.

```bash
npm ci
npm run dev
```

Comandos habituales:

```bash
npm run check       # TypeScript, Astro y contenido
npm run lint        # Formato reproducible y comprobaciones
npm run test        # Paridad, jerarquía y reglas editoriales
npm run build       # Web estática
npm run build:full  # Web + cuatro PDF + artefacto final
npm run ci          # Validación completa, enlaces y navegación
```

`npm run pdf` necesita un `dist/` reciente; `npm run build:full` gestiona el ciclo completo.

## Contenido

- `src/content/projects/`: proyectos destacados y timeline profesional.
- `src/content/lab/`: prototipos y proyecto educativo.
- `src/content.config.ts`: esquema obligatorio compartido.
- `src/i18n/`: textos de interfaz ES/EN.
- `src/data/`: perfil, experiencia, enlaces y configuración editorial.

Para añadir un proyecto, duplica una entrada JSON de la colección adecuada, completa ES y EN, conserva un `code` único y ejecuta `npm run check` y `npm run test`. Los componentes no deben contener hechos de proyecto.

## PDF

Las rutas `/es/print/`, `/en/print/`, `/es/cv/` y `/en/cv/` usan las mismas fuentes estructuradas que la web. `scripts/generate-pdf.mjs` genera:

- `dario-jauregui-portfolio-es.pdf`
- `dario-jauregui-portfolio-en.pdf`
- `dario-jauregui-cv-es.pdf`
- `dario-jauregui-cv-en.pdf`

Los archivos se crean en `public/downloads/` y se incorporan a `dist/` en el segundo build de `npm run build:full`.

## CI/CD y GitHub Pages

`ci.yml` valida pull requests y permite ejecución manual. `deploy.yml` ejecuta la validación completa y publica `dist/` al actualizar `main` o mediante `workflow_dispatch`. Solo usa `GITHUB_TOKEN` con permisos mínimos; no requiere secretos personales.

La configuración de Astro centraliza `site` y `base`. En GitHub Pages usa la ruta del repositorio; las variables de Actions `SITE_URL` y `BASE_PATH` permiten pasar a un dominio propio sin modificar la configuración.

## Dominio propio

Cuando exista un dominio:

1. Configura el dominio en **Settings → Pages → Custom domain**.
2. Para un subdominio `www`, crea un CNAME hacia `dariojauregui.github.io`.
3. Para un dominio raíz, crea los registros A/AAAA que GitHub indique en ese momento y verifícalos en su documentación oficial.
4. En **Settings → Secrets and variables → Actions → Variables**, crea `SITE_URL=https://tu-dominio` y `BASE_PATH=/`.
5. Vuelve a ejecutar el workflow **Deploy to GitHub Pages**.
6. Cuando GitHub complete el certificado, activa **Enforce HTTPS** en **Settings → Pages**.

Este repositorio publica con un workflow de GitHub Actions: GitHub ignora y no requiere un archivo `CNAME` dentro del artefacto desplegado.

No se configura DNS antes de elegir y comprar el dominio.

## Material que nunca se publica

`Assets/`, `Assets/raw/`, briefs, CV fuente, capturas originales, datos reales, credenciales, `.env`, artefactos de modelos, rutas internas, temporales y documentos editables quedan fuera de Git. Las decisiones de publicación se registran en `PUBLISHING_REVIEW.md`.

Este repositorio se publica sin licencia de código abierto.
