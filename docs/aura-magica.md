# Sistema de Aura Mágica — cuentas, progreso y gamificación narrativa

Parte 1: autenticación, progreso de lectura sincronizado, rangos, test de
Senda, logros y Habilidad Única. Parte 2: perfil (`/cuenta`), avatar de
catálogo cerrado, moderación de alias, sesiones y tema. Parte 3: cuenta de
administrador (`/admin`) con 2FA, auditoría y moderación activa.

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
| `/api/hu/reveal` | POST | Revela la HU: el servidor sortea 3 al azar de las 77, sortea una y la asigna |
| `/api/achievements` | GET | Catálogo + estado del usuario (o solo catálogo sin sesión) |

Nota (corrección del 31-jul-2026): la HU **no la elige el usuario**. El
endpoint original `/api/hu/choose` fue reemplazado por `/api/hu/reveal`, que
no recibe nada del cliente: sortea 3 opciones, las persiste en `OfertaHu`
(trazabilidad de qué ofreció el sistema), sortea una y la asigna en el mismo
request. Reintentar devuelve siempre la misma HU.

Nota (2ª corrección, 31-jul-2026): el sorteo de la oferta se hace sobre el
catálogo **completo** de 77, con dos reglas que conviene no confundir:

- **Senda: no interviene.** La HU se despierta sin atarse a ningún elemento;
  quien tenga afinidad Llama tiene exactamente las mismas probabilidades que
  quien tenga afinidad Aire. Se eliminó el mapeo Senda → pool de candidatas.
  `sendasAfines` sobrevive solo como metadata de lore. La función
  `calcularHUCompatibles` se renombró a `sortearOfertaHU` por eso.
- **Rareza: sí interviene** (`RARITY_WEIGHT` = 8/4/2/1 para
  Común/Poco Común/Épica/Legendaria), porque el tratado (Sección IV) exige
  que las Legendarias sean "extremadamente raras". Un sorteo uniforme las
  volvería tan frecuentes como una Común. Medido sobre 50.000 revelaciones:
  Común 76,0 % · Poco Común 18,2 % · Épica 4,6 % · **Legendaria 1,2 %**
  (≈ 1 de cada 83 lectores). No "simplificar" esto a uniforme: ya se probó
  y se revirtió a propósito.

El gate `no_senda` de `/api/hu/reveal` se mantiene como requisito narrativo
(haber completado el Ritual), no mecánico.

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

## Parte 2 — perfil, avatar, alias, sesiones, tema (31-jul-2026)

- **Sesiones (desviación declarada)**: el provider Credentials de Auth.js v5
  no soporta database sessions; se implementó un híbrido — el JWT lleva `sid`
  y cada login crea una fila `AppSession`; `currentAuthContext()` valida esa
  fila en cada request, por lo que revocar (`revokedAt`) invalida de inmediato
  en servidor. Cumple listar/revocar/invalidación inmediata de la sección 5.
- **PlayerNameModerator** (`src/lib/nameModeration/` + listas editables en
  `src/data/nameFilters/*.ts` — `.ts` y no `.js` porque el proyecto tiene
  `allowJs: false`): normalización NFKD + leetspeak + separadores +
  repetición + homóglifos acotados; 5 niveles de coincidencia; allowlist
  prioritaria; el nivel de subcadena exige señales de evasión (Penélope pasa).
- Datos personales opcionales y privados por diseño; la edad se deriva de
  `fechaNacimiento`. Avatar solo de catálogo cerrado (12 sembrados, default
  `rubi-chibi`; imágenes reales pendientes en `/images/avatars/`).
- Tema Rubí/Noct/Sistema: persistido en `UserProfile.themePreference` +
  `localStorage` para visitantes; paleta Rubí base en `globals.css`
  (`[data-theme="rubi"]`), ajuste fino editorial pendiente.
- 3 logros latentes (`AchievementPlaceholder`) — decorativos, fuera de la
  barra de progreso real.

## Parte 3 — cuenta de administrador (31-jul-2026)

- `role` en User (default USER). Único mecanismo de asignación:
  `npx tsx scripts/assign-admin.ts <email>` (manual) o el panel de la BD.
  Ningún endpoint puede escribirlo.
- Doble capa: `esAdminAutorizado()` (`src/lib/adminAccess.ts`) = rol ADMIN
  **y** email en `ADMIN_EMAIL_ALLOWLIST`. Toda verificación admin pasa por
  esa función; nunca se chequea `role === 'admin'` aislado.
- 2FA TOTP obligatorio (otplib): setup/verify en `/admin`; la verificación se
  marca por sesión (`AppSession.adminVerifiedAt`) con ventana de 4 h — más
  corta que la sesión general. El secreto TOTP se guarda en la BD (rotarlo:
  intervención manual).
- Middleware (`src/middleware.ts`) protege `/admin/*` y `/api/admin/*`
  verificando el JWT firmado + claim de rol (barrera exterior, Edge); cada
  handler y página repite la verificación completa contra BD (barrera
  interior). Intentos no autorizados con sesión quedan en `AdminAccessLog`.
- Auditoría: `AdminAccessLog` (view_profile / view_user_list /
  unauthorized_attempt; se registra CADA apertura de detalle) y
  `AdminModerationLog` (aplicar/levantar restricciones). Solo escritura.
- Moderación activa: `UserRestriction` con tres tipos independientes.
  `accion_silenciada` bloquea progreso/senda/HU/avatar/alias/perfil vía
  `assertNoRestriccion()`; `comentario_silenciado` queda preparado (no hay
  comentarios aún); `ban_completo` revoca todas las sesiones en la misma
  transacción y el login se rechaza con mensaje genérico. El admin no puede
  restringirse a sí mismo. Expiración lazy por request (sin cron; decisión
  declarada). Nunca se borran filas: `active=false` + liftedBy/liftedAt.
- Tests: capas de autorización y vigencia son módulos puros testeados
  (`tests/admin-access.test.ts`, `tests/restrictions.test.ts`); los flujos
  HTTP completos (403 en /admin, ban revoca sesión) comparten esa misma
  lógica vía `requireAdminApi`/`currentAuthContext` — la aserción integral
  end-to-end contra la base real queda como verificación manual.

## Pendientes explícitos (fuera de esta fase)

- "Testigo silencioso": requiere definir el evento de cliente de escena
  oculta; su condición devuelve `false` hasta entonces.
- Frontend real del ritual de Senda y de la pantalla de revelación de HU.
- Endurecer CSP a nonces/strict-dynamic.

## Hecho después de la entrega inicial (31-jul-2026)

- Migración + seed aplicados a la base real (Neon vía Vercel Postgres);
  migraciones usan la conexión sin pooler (`DATABASE_URL_UNPOOLED`).
- Catálogo completo de 77 HU sembrado desde el documento canónico
  ("Habilidades Únicas: El Don Innato"): 42 Comunes, 20 Poco Comunes,
  10 Épicas, 5 Legendarias. Las `sendasAfines` no están en el documento:
  se asignaron temáticamente y son metadata editable en `prisma/seed.ts`
  (ya no intervienen en el sorteo; ver 2ª corrección arriba).
- `ReadingProgress.tsx` sincroniza con `POST /api/progress/:storyId`
  (cada ≥5 % o 10 s, con `sendBeacon` al salir; 401 apaga el envío para
  visitantes sin sesión).
