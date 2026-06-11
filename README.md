# CAELYNDOR

Esqueleto oficial para un portal narrativo de dark fantasy editorial construido con Next.js, App Router, TypeScript y CSS puro.

## Instalación

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000`.

## Build

```bash
npm run build
```

## Estructura

- `src/app`: rutas principales del sitio.
- `src/components`: componentes reutilizables de layout, cards, timeline, galería, música y estado editorial.
- `src/data`: datos placeholder editables para personajes, libros, cronología, música, galería y libro actual.
- `src/styles/globals.css`: identidad visual, variables CSS, responsive, estados focus y animación del Velo rasgado.
- `public/images`: placeholders locales para personajes, libros, galería y detalles.
- `public/music`: carpeta preparada para archivos de audio reales.
- `public/icons`: carpeta preparada para iconos o símbolos futuros.

## Dónde editar contenido

- Personajes: `src/data/characters.ts`
- Libros: `src/data/books.ts`
- Cronología: `src/data/timeline.ts`
- Música: `src/data/music.ts`
- Arte: `src/data/gallery.ts`
- Estado del nuevo libro: `src/data/currentBook.ts`

## Rutas incluidas

- `/`
- `/personajes`
- `/personajes/[slug]`
- `/libros`
- `/cronologia`
- `/musica`
- `/arte`
- `/nuevo-libro`
- `/archivo`
- `/archivo/[section]`

## Notas visuales

El hero de inicio incluye la animación CSS “Velo rasgado”, hecha solo con pseudo-elementos, gradientes, blur, opacidad, mezcla de capas, partículas sutiles y keyframes lentos. También respeta `prefers-reduced-motion`.

## Próximos pasos sugeridos

1. Sustituir placeholders SVG por arte final en `public/images`.
2. Agregar pistas reales en `public/music` y actualizar `src/data/music.ts`.
3. Definir canon visual por personaje y ampliar galerías.
4. Crear páginas internas reales para mundo, reinos, bestiario, sistema mágico, glosario y documentos.
5. Añadir un lightbox liviano para `/arte` cuando haya suficientes imágenes finales.
