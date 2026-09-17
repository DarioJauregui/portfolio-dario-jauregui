# Reglas del portfolio

## Dirección visual

- Estética editorial, técnica, industrial, minimalista y premium.
- Fondo blanco roto, texto casi negro y `#6D130E` como único acento principal.
- Tipografía fuerte, mucho espacio, líneas finas, números grandes y diagramas claros.
- Evitar gradientes, terminal/cyberpunk, glassmorphism, tarjetas redondeadas repetitivas, iconos decorativos y patrones SaaS genéricos.
- Diseñar móvil, tablet y escritorio. Respetar teclado, foco visible, contraste y `prefers-reduced-motion`.

## Arquitectura y contenido

- Astro estático, TypeScript estricto y Tailwind CSS; JavaScript cliente mínimo.
- Los hechos viven en `src/content/`, el perfil en `src/data/` y la interfaz en `src/i18n/`.
- Toda entrada debe superar el esquema de `src/content.config.ts` y contener ES/EN equivalentes.
- Featured: P001, P002, P003 y P007. Timeline: P004, P005, P006 y P009. Lab: P008 y L001.
- Para añadir un proyecto, crea una entrada JSON, completa ambos idiomas, asígnale orden y ejecuta las comprobaciones. No cambies componentes para introducir datos editoriales.

## Confidencialidad

- `Assets/` y especialmente `Assets/raw/` son fuente local de solo lectura y nunca se versionan.
- No publicar datos reales, credenciales, URLs o rutas internas, endpoints, nombres de equipos, identificadores operativos, artefactos de modelos ni infraestructura sensible.
- No publicar logotipos ni capturas corporativas sin autorización clara. Usar datos sintéticos y diagramas propios.
- P003 es un MVP interno y proyecto aplicado. P006 debe acreditar el desarrollo externo de formularios. P008 y P009 no tienen afirmaciones de homologación, certificación o despliegue de seguridad.
- Mantener `PUBLISHING_REVIEW.md` actualizado con cada recurso público.

## PDF y despliegue

- Web y PDF comparten la misma fuente de contenido.
- Las rutas de impresión son `/es/print/`, `/en/print/`, `/es/cv/` y `/en/cv/`.
- `npm run build:full` debe regenerar PDF y dejar `dist/` listo.
- GitHub Pages se despliega desde `main` mediante Actions. No añadir otro proveedor ni tokens personales.
- La URL y el `base` se controlan con `SITE_URL` y `BASE_PATH`; un futuro dominio añade además `public/CNAME`.

## Antes de terminar

Ejecutar, en este orden:

```bash
npm run format
npm run ci
```

Revisar visualmente ES/EN en móvil, tablet y escritorio, y todas las páginas de los cuatro PDF. Auditar el conjunto versionado y buscar secretos antes de cada publicación. No generar ni ejecutar binarios `.exe` del proyecto; utilizar scripts de Node o alternativas interpretadas cuando sea posible.
