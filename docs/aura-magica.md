# Sistema de Aura Mágica — cuentas, progreso y gamificación narrativa

Fase 1: autenticación, progreso de lectura sincronizado, rangos, test de Senda,
logros y Habilidad Única. Frontend de las pantallas del ritual y de la Prueba
del Aura Interna: pendiente (esta fase entrega lógica y rutas).

## Arquitectura

- **Postgres (Vercel Postgres) + Prisma 7** — fuente de verdad de identidad:
  usuarios, progreso, logros, Senda, HU. Esquema en `prisma/schema.prisma`,
  migración inicial en `prisma/migrations/0001_aura_magica_init/`.
- **Redis existente (Upstash/Vercel KV)** — sigue en lo suyo (contadores de
  views/likes/descargas) y ahora además respalda el rate limiting
  (`src/lib/server/rateLimit.ts`, con timeout explícito de 1,5 s y fallback en
  memoria). Nunca es fuente de verdad de identidad.
- **Auth.js v5** (`src/auth.ts`) — credenciales email+contraseña (bcrypt, 12
  rondas), sesión JWT. Preparado para sumar OAuth (Google) añadiendo el
  provider y sus env vars.
- **Contenido** — los relatos siguen viviendo en `src/data/stories.ts`; no hay
  tabla de relatos en BD. `StoryProgress.storySlug` se valida en servidor
  contra el contenido real (`src/lib/server/storyContent.ts`).

## Reglas de integridad (sección 10 del diseño)

- Toda condición de logro/rango se evalúa en servidor; el cliente solo envía
  `progress: 0-100`.
- Completado al alcanzar `highestProgress >= 95`, irreversible
  (guard `completedAt = null` en un `updateMany` condicional).
- Recompensa exactamente una vez: `completionRewardClaimed` como candado
  atómico; logros con unique `(userId, achievementId)` + `skipDuplicates`.
- Todo dentro de transacciones interactivas (`TX_OPTIONS`: maxWait 5 s,
  timeout 10 s); el pool de `pg` define `connectionTimeoutMillis`,
  `query_timeout` y `statement_timeout`.
- Rate limiting en todas las rutas de escritura; límite de tamaño de body en
  todas las rutas con body (`readJsonBody`).
- Módulos de datos sensibles marcados con `server-only`.

## Rutas API

| Ruta | Método | Qué hace |
|---|---|---|
| `/api/auth/register` | POST | Alta de cuenta (rate limit 5/10 min por IP) |
| `/api/auth/[...nextauth]` | GET/POST | Login/logout/sesión (Auth.js) |
| `/api/progress/:storyId` | POST | Actualiza progreso; el servidor decide el completado |
| `/api/user/profile` | GET | Rango, Senda, HU, logros, conteos |
| `/api/senda-test/status` | GET | Desbloqueo/estado del ritual + preguntas |
| `/api/senda-test/submit` | POST | `{respuestas}` o `{eleccionManual}` (una sola corrección) |
| `/api/hu/choose` | GET | Genera/devuelve las 3 opciones persistidas (OfertaHu) |
| `/api/hu/choose` | POST | `{habilidadId}`: elección única validada contra la oferta |
| `/api/achievements` | GET | Catálogo + estado del usuario (o solo catálogo sin sesión) |

Nota: el GET de `/api/hu/choose` no estaba en la lista original; se añadió
porque la oferta de 3 opciones debe persistirse y servirse desde el servidor
para que el POST pueda validarla.

## Variables de entorno

| Variable | Uso | Estado |
|---|---|---|
| `DATABASE_URL` | Conexión a Vercel Postgres (Prisma + seed + migrate) | **Nueva, requerida** |
| `AUTH_SECRET` | Firma de sesiones JWT de Auth.js (`npx auth secret` para generarla) | **Nueva, requerida** |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Redis REST (contadores existentes + rate limiting) | Existente, no estaba documentada |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Fallback Vercel KV de las dos anteriores | Existente, no estaba documentada |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | Existente |

Sin `DATABASE_URL` el build funciona (cliente perezoso), pero cualquier ruta
del sistema de Aura responderá 500. Sin Redis, el rate limiting degrada a
memoria por instancia.

## Puesta en marcha

```bash
npm install                 # corre prisma generate (postinstall)
npm run db:migrate          # prisma migrate deploy (requiere DATABASE_URL)
npm run db:seed             # sincroniza logros + catálogo inicial de HU
npm test                    # tests de lógica pura (rangos, scoring, condiciones)
```

## Metadata pendiente por relato (decisión editorial)

El tipo `Story` en `src/data/stories.ts` ganó cinco campos opcionales que la
lógica ya consume pero que **nadie ha asignado aún** en los 14 relatos:

- `countsTowardProgression?: boolean` — poner `false` en prólogos/fichas/anexos.
  Mientras falte, todo relato cuenta como canónico.
- `region?: "cindralith" | "glaciem" | "sylvalis"` — sin esto, los logros
  "Bajo el sol de Cindralith", "Corazón de hielo", "El bosque recuerda tu
  nombre" y "Cartógrafo de Caelyndor" no pueden dispararse (por diseño: la
  condición exige que exista al menos un relato con esa región).
- `arc?: string` — además hay que fijar `ARCO_NO_DEJASTE_A_NADIE` en
  `src/lib/server/achievementCatalog.ts` para "No dejaste a nadie atrás".
- `secret?: boolean` — "Tras el Velo".
- `nocturnal?: boolean` — "A la luz de la luna".

## Pendientes explícitos (fuera de esta fase)

- "Testigo silencioso": requiere definir el evento de cliente de escena
  oculta; su condición devuelve `false` hasta entonces.
- Catálogo de HU: sembradas 20 de 77; completar es trabajo editorial en
  `prisma/seed.ts` (`HU_SEED`).
- Frontend real del ritual de Senda y de la elección de HU.
- Integrar `ReadingProgress.tsx` con `POST /api/progress/:storyId` (throttle
  cliente cada ~5 % o pocos segundos).
- Panel de administración, social, moderación, notificaciones push (stubs no
  creados a propósito).
- Endurecer CSP a nonces/strict-dynamic.
