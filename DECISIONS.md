# Registro breve de decisiones

- **Raíz del proyecto:** se usa el directorio actual porque solo contenía materiales de este encargo.
- **Contenido:** JSON por proyecto y dos colecciones Astro con esquema compartido; permite validar ES/EN sin duplicar componentes.
- **Interactividad:** HTML nativo (`details`, enlaces y selector persistente) y CSS; no se añade framework cliente.
- **Navegación:** un índice editorial de diez filas numeradas correlativamente de P001 a P010 usa anclas HTML nativas; no se añaden filtros, modales, estado cliente ni páginas secundarias.
- **Visuales:** dos derivados WebP completos y saneados aportan evidencia real a P001 y P002; el pixelado se limita a rectángulos documentados y P003/P004 conservan sus diagramas.
- **Iconografía:** las direcciones se representan con chevrones geométricos en CSS, sin caracteres emoji ni dependencias de iconos.
- **Perfil:** “Sobre mí” es una presentación editorial breve; la web no reproduce trayectoria, formación ni descargas personales.
- **PDF:** Playwright imprime rutas A4 dedicadas y un servidor estático Node sin dependencias adicionales.
- **Hosting:** solo GitHub Pages, como exige el brief. La configuración centralizada mantiene preparada la migración a dominio propio.
