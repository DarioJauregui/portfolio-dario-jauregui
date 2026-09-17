# Reglas del portfolio

## Dirección visual

- Estética editorial, técnica, limpia y contemporánea; debe sentirse como el portfolio de una persona que construye productos reales, no como una web conceptual.
- Fondo blanco roto, texto casi negro y `#6D130E` como único acento principal.
- Manrope Variable autoalojada como familia principal e IBM Plex Mono solo para metadatos técnicos pequeños.
- Escalas moderadas, ritmo compacto, texto narrativo de 60-75 caracteres y diagramas funcionales fieles.
- El granate se reserva para enlaces, indicadores y detalles pequeños. No usar superficies oscuras o granates completas como recurso habitual.
- Evitar cifras gigantes, bloques con bordes, líneas constantes, alternancia artificial, etiquetas en mayúsculas, gradientes, terminal/cyberpunk, glassmorphism, iconos decorativos y patrones SaaS genéricos.
- Los proyectos destacados forman una cuadrícula editorial estable de dos columnas en escritorio y una en móvil; no alternar composiciones sin motivo.
- Diseñar móvil, tablet y escritorio. Respetar teclado, foco visible, contraste y `prefers-reduced-motion`.

## Arquitectura y contenido

- Astro estático, TypeScript estricto y Tailwind CSS; JavaScript cliente mínimo.
- Los hechos viven en `src/content/`, el perfil en `src/data/` y la interfaz en `src/i18n/`.
- Toda entrada debe superar el esquema de `src/content.config.ts` y contener ES/EN equivalentes.
- Featured: P001, P002, P003 y P004. Timeline: P005, P006, P007 y P008. Lab: P009 y P010.
- El índice general ordena los diez proyectos correlativamente de P001 a P010; cada fila enlaza a una única ancla estable en la portada.
- Para añadir un proyecto, crea una entrada JSON, completa ambos idiomas, asígnale orden y ejecuta las comprobaciones. No cambies componentes para introducir datos editoriales.
- Los case studies son artículos continuos y compactos: contexto, solución, funcionamiento, contribución, resultado e implementación técnica explicada en prosa. No recuperar las antiguas pantallas numeradas ni listas de palabras clave.
- La home mantiene este orden: hero, índice general, proyectos destacados, proyectos profesionales, Lab, sobre mí, contacto.

## Confidencialidad

- `Assets/` y especialmente `Assets/raw/` son fuente local de solo lectura y nunca se versionan.
- No publicar datos reales, credenciales, URLs o rutas internas, endpoints, nombres de equipos, identificadores operativos, artefactos de modelos ni infraestructura sensible.
- Las capturas autorizadas se publican únicamente como derivados completos y saneados en `public/media/`; nunca copiar originales de `Assets` al despliegue. Los rectángulos de ocultación se documentan en `scripts/sanitize-media.py`.
- Las restricciones editoriales y de confidencialidad permanecen en los datos y en `PUBLISHING_REVIEW.md`; nunca se muestran al visitante.
- No usar métricas inventadas o decorativas. Las cifras aprobadas aparecen con tamaño moderado y contexto, una sola vez por pieza.
- P003 es un MVP interno y proyecto aplicado. P005 debe acreditar el desarrollo externo de formularios. P008 y P009 no tienen afirmaciones de homologación, certificación o despliegue de seguridad.
- Mantener `PUBLISHING_REVIEW.md` actualizado con cada recurso público.

## PDF y despliegue

- Web y PDF comparten la misma fuente de contenido.
- Las rutas de impresión son `/es/print/` y `/en/print/`.
- `npm run build:full` debe regenerar PDF y dejar `dist/` listo.
- GitHub Pages se despliega desde `main` mediante Actions. No añadir otro proveedor ni tokens personales.
- La URL y el `base` se controlan con `SITE_URL` y `BASE_PATH`; al publicar mediante Actions no se añade `public/CNAME`.

## Antes de terminar

Ejecutar, en este orden:

```bash
npm run format
npm run ci
```

Revisar visualmente ES/EN en móvil, tablet y escritorio, y todas las páginas de los dos portfolios PDF. Auditar el conjunto versionado y buscar secretos antes de cada publicación. No generar ni ejecutar binarios `.exe` del proyecto; utilizar scripts de Node o alternativas interpretadas cuando sea posible.
