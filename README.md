# untaldouglas.info — Sitio personal

Sitio estático moderno (React + Vite + Framer Motion) con blog en Markdown, listo para GitHub Pages.

## Estructura

```
├── src/
│   ├── App.jsx        # Secciones y routing por hash
│   ├── Blog.jsx       # Lista de posts y vista de artículo
│   ├── content.js     # TODO el texto del sitio (ES/EN) — edita aquí
│   └── styles.css     # Sistema de diseño (paleta petróleo + cobre)
├── public/posts/      # Tu blog vive aquí
│   ├── index.json     # Índice de publicaciones
│   └── *.md           # Una publicación = un archivo Markdown
└── .github/workflows/deploy.yml  # Despliegue automático a Pages
```

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Publicar un post (sin tocar código)

1. Crea `public/posts/mi-post.md` con el contenido en Markdown.
2. Agrega una entrada al inicio de `public/posts/index.json`:

```json
{
  "slug": "mi-post",
  "title": "Título del post",
  "date": "2026-07-01",
  "lang": "es",
  "summary": "Resumen de una o dos líneas que aparece en la lista.",
  "file": "mi-post.md"
}
```

3. `git add . && git commit -m "post: mi-post" && git push` — el workflow publica solo.

## Desplegar en GitHub Pages (una sola vez)

**Opción A — sitio de usuario (recomendada): `https://untaldouglas.github.io`**
1. Crea el repositorio `untaldouglas.github.io` y sube este proyecto a la rama `main`.
2. En el repo: Settings → Pages → Source: **GitHub Actions**.
3. Cada push a `main` construye y publica automáticamente.

**Opción B — repositorio de proyecto: `https://untaldouglas.github.io/<repo>/`**
Igual que A; `base: './'` en `vite.config.js` ya lo hace compatible sin cambios.

**Dominio propio (untaldouglas.info)**
1. En Settings → Pages → Custom domain escribe `untaldouglas.info` (crea el archivo CNAME).
2. En tu proveedor DNS: registro `A` del apex a las IPs de GitHub Pages y `CNAME` de `www` a `untaldouglas.github.io`. Activa "Enforce HTTPS".
3. Conserva el contenido histórico de Blogger exportándolo antes de cambiar el DNS.

## Editar contenido del sitio

Todo el texto (ES y EN) está en `src/content.js`: hero, proyectos, servicios, trayectoria y contacto. Las líneas del "agent log" animado del hero están al final del mismo archivo (`termLines`).

## Accesibilidad y rendimiento

Respeta `prefers-reduced-motion` (las animaciones se desactivan), foco visible de teclado, responsive hasta móvil, y ~100 kB gzip de JS.
