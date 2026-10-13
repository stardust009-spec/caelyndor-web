# Aura Mágica — Parte 4: EXP, marcos, quiz, libros físicos, foro y audiolibros

Diseño acordado con el autor el 13-oct-2026. Amplía el sistema de
`docs/aura-magica.md` (Partes 1–3, ya implementadas) sin romper lo existente.
Principio rector: **toda recompensa y todo desbloqueo se valida en servidor**,
y el foro es para conversar sobre Caelyndor, no para farmear experiencia.

## Tres medidores separados

| Medidor | Qué mide | Fuente |
|---|---|---|
| **Rango del Aura** | Relatos canónicos únicos completados | Ya existe (`ranks.ts`), no cambia |
| **Nivel** | EXP acumulada | Nuevo |
| **Colección del Cronista** | Medallas, marcos, libros registrados | Nuevo (las medallas ya existen como logros) |

Comprar libros no sube de nivel por sí solo más allá de su bonificación única:
el conocimiento se gana leyendo.

## Lectura completada (Fase 0)

Un relato cuenta como leído cuando se cumplen **juntas**:

1. `highestProgress >= 96` (antes 95).
2. Tiempo mínimo desde que el lector abrió el relato (primer progreso
   registrado): **30 % del tiempo estimado** (`readingMinutes`), con un piso
   de 30 s.
3. **Tramos realmente visitados**: al menos el 70 % de los párrafos del
   relato estuvieron visibles en pantalla un rato (no basta con pasar
   arrastrando la barra).

**Vía accesible:** si pasó el 100 % del tiempo estimado, no se exigen tramos.
Cubre lectores con tecnologías asistivas, a quien lee en dos dispositivos y a
quien lee en varias sesiones. Las cifras (30 %, 70 %, 100 %) son iniciales y se
revisan con datos reales; viven en `src/lib/server/readingValidation.ts`.

Límite honesto: los tramos los mide el navegador, así que frenan el salto
casual al final, no a alguien que fabrique peticiones a mano. El tiempo sí lo
mide el servidor. Para recompensas cosméticas es el equilibrio buscado.

Los completados anteriores a este cambio se respetan (el completado es
irreversible). Las relecturas siguen sin dar EXP.

## Ritual de Afinación y despertar del don (implementado, fase 0)

- `/cuenta/ritual` (`RitualAfinacion.tsx`): cristal facetado en SVG, 6 preguntas;
  cada respuesta lanza una estela de partículas al cristal y enciende un nodo
  de la **constelación personal** (posición única por pregunta + opción, eco
  del canon de las Constelaciones Aúricas). Lectura: la constelación gira en
  vórtice, el cristal la absorbe, tiembla y se agrieta; revelación con el
  sello de la Senda trazándose, la constelación renaciendo en su color y las
  dos Sendas cercanas en órbita. Incluye la corrección manual única.
- `/cuenta/despertar` (`DespertarDon.tsx`): tres destellos orbitan (las 3
  que oferta el servidor), dos se apagan y uno estalla; efecto por rareza
  (Común halo plateado, Poco común aurora, Épica rayos violeta + arcos
  eléctricos, Legendaria rayos prismáticos + sacudida + lluvia dorada).
- Identidad visual de las 10 Sendas (nombre, color, sello) en
  `src/data/sendas.ts`: propuesta visual, no canon; editable ahí.
- Motor de partículas propio en canvas (`src/components/aura/useParticulas.ts`),
  sin dependencias. Con "reducir movimiento" todo llega a su estado final sin
  animar.
- `/api/senda-test/status` ya no envía los pesos de las respuestas al
  navegador, y al volver devuelve la constelación del lector.
- El perfil enlaza al ritual cuando está disponible y muestra las Sendas por
  su nombre.

## EXP

Libro mayor de EXP: cada entrega lleva una **clave única por usuario**
(`lectura:<slug>`, `quiz:<slug>`, `libro:<edición>`…); reenviar una petición o
perder la conexión nunca duplica EXP. Mismo patrón de candado atómico que el
completado actual.

| Actividad | EXP inicial |
|---|---|
| Completar mini relato | +20 |
| Aprobar quiz | +40 |
| Primer libro registrado | +100 (una sola vez) |
| Releer | 0 |
| Cualquier actividad del foro | **0** |

**Curva de niveles: pendiente de calibrar** con el contenido real. Objetivo:
con lo publicado hoy (14 relatos + sus quiz) se llega como mucho al Piso 3;
los Pisos 4–5 se abren con contenido futuro ("la Torre aún se construye").
El piso alcanzado nunca baja aunque se recalibre la curva.

## Marcos de avatar

- Catálogo en código (como los logros) + tabla de marcos desbloqueados +
  marco equipado en el perfil. El servidor solo deja equipar marcos ganados.
- Arte: PNG/WebP cuadrado y transparente, un anillo superpuesto al avatar
  circular. Pequeños, pueden vivir en `public/` como los avatares.
- **7 marcos de progresión**: 1 / 5 / 10 / 25 / 50 / 100 / todos los relatos.
- **Un marco por grupo de quiz** (ej. aprobar los quiz de Sylvalis → marco de
  Sylvalis). **Una medalla por quiz.**
- Idea a futuro: marcos regionales que evolucionan al completar más
  historias de su región.

## Quiz de conocimiento (implementado, fase 2)

Diseño final acordado con el autor (13-oct-2026):

- **Tres tipos de pregunta**: explícita (lo que está escrito), implícita (lo
  que se deduce: motivos, consecuencias, pistas) y de conexión (cruza con
  otro relato o libro). Dificultad 1–3 dentro de cada tipo.
- **Cuestionario principal** de cada relato: 8 preguntas, 5 explícitas y
  3 implícitas, de menor a mayor dificultad. Se aprueba con **7**. Solo
  pregunta sobre ese relato: nadie necesita leer otra obra. +40 EXP.
- **Desafío de conexiones**: aparte, se abre al aprobar el principal, con
  advertencia de spoilers. Hasta 5 preguntas, 80 %. +60 EXP.
- Abandonar no penaliza: el intento abierto conserva preguntas y orden, y las
  respuestas se autoguardan. Reprobar: **7 días** y otra selección/orden.
  Las respuestas correctas nunca salen del servidor; al aprobar se muestra la
  revisión con explicaciones.
- **Eventos de fracaso** (`src/data/eventosQuiz.ts`): al reprobar interfiere un
  personaje. Los cuatro primeros fracasos de cada lector, en orden: Adagio
  (cuerda de violín), Aria (pétalo de rosa), Xirian (cuaderno), Rubí
  (Rubikick a la pizarra). Luego al azar sin repetir: Yuki, Lyzi y Rollito,
  Noctalypse, Fulgor, Lucky Luciano Griazniati y el Sucio Joe.
- **Banco** en `src/lib/server/quiz/banco/` (un archivo por relato). Cada
  pregunta: enunciado, 4 alternativas, correcta, explicación, fuente (obra,
  párrafo, cita), obras requeridas y etiquetas de spoiler. Una pregunta se
  activa sola cuando todas sus obras requeridas están publicadas: el banco
  puede escribirse desde los manuscritos antes de publicar.
- Meta del autor: banco inicial de ~200 (100 explícitas, 60 implícitas,
  40 conexiones), ampliable sin tocar el sistema.
- Avance del banco (130): La Gran Estafa 24+7+2, Zarqath 28+9,
  Protocolos del Corazón 41+14+4 (conexiones activas con Dragon's Kitchen,
  La Frase Maldita y El placer culpable de Lyzi), La empanada mágica 0+0+1
  (inactiva). Total: 93 explícitas, 30 implícitas, 7 conexiones. Un test
  verifica que cada cita aparezca textual en su párrafo.
- Fuentes: texto publicado en la web para principal; manuscritos
  (`Proyecto NX_03/Obra/Maquetado`) y bóveda Obsidian para conexiones. Nunca
  interpretaciones nuestras como canon; respetar los spoilers prohibidos.
- Pendiente: medalla por relato y marco por región (necesitan arte).

## Libros físicos: Biblioteca del Cronista

- Código único de un solo uso por ejemplar. **El código ya sabe su libro,
  edición e impresión**: cada lote se genera para esa combinación, el lector
  no elige. Así queda registrado "1.ª edición, 1.ª impresión" vs reimpresión.
- Soporte físico realista para tiradas de 50–100: tarjeta inserta o sticker
  raspable pegado a mano. Un script genera el lote en CSV para imprenta.
- En la BD se guarda solo el hash del código. Canje atómico (el primero gana).
  Límite de intentos fallidos por cuenta e IP.
- La colección es permanente en el perfil, con miniatura de portada.
- Admin puede liberar/transferir un código (libro regalado o de segunda mano).
- **Prerrequisito:** recuperación de contraseña por correo (hoy no existe).
- Debe estar listo antes de mandar a imprenta la primera tirada.

## Foro: La Torre de los Cronistas

### Vestíbulo de Bienvenida

Fuera de los pisos. Presentaciones, reglas, novedades del sitio, ayuda
técnica. **Sin conversaciones de trama.** Lectura pública sin cuenta;
publicar, comentar o reaccionar requiere sesión. No muestra datos privados de
perfiles. No depende de niveles, así que puede abrir antes que los pisos.

### Pisos por nivel

| Piso | Niveles | Nombre |
|---|---|---|
| 1 | 1–5 | Aprendices |
| 2 | 6–10 | Exploradores |
| 3 | 11–15 | Conocedores |
| 4 | 16–20 | Investigadores |
| 5 | 21–25 | Cronistas veteranos |

1. El piso se calcula del nivel; se guarda el **piso más alto alcanzado**.
2. Solo se publica y responde en el piso propio.
3. Pisos anteriores: **solo lectura, para siempre**. Se conservan autoría,
   historial y enlaces; no se puede responder ni en hilos propios.
4. Pisos superiores: totalmente ocultos, ni siquiera los títulos (el servidor
   no los devuelve).
5. Moderadores: acceso a todos los pisos, independiente de su nivel.

Notificación de ascenso: "¡Has ascendido al Piso N!" con el texto de la Torre.

Al inicio: foro general con etiquetas por obra; salas propias para las obras
más populares solo cuando haya actividad que las justifique.

### Etiquetas por obra y velo automático

Cada hilo lleva etiquetas de obra (relatos y libros). Para **relatos**, el
sistema sabe qué completó cada lector: un hilo etiquetado con un relato que
no has completado se te muestra velado automáticamente. Para **libros**, el
lector marca a mano qué libros ya leyó (registrar el código prueba compra, no
lectura).

### El Velo del Cronista

- Estética: **niebla del Velo** (no estática de TV). Niebla lenta violeta y
  azul nocturno con partículas luminosas; se dispersa al tocarla. Botón
  explícito "Levantar el Velo".
- Animación ligera; con "reducir movimiento" del dispositivo se ve quieta.
  Un lector de pantalla no lee el texto velado hasta revelarlo.
- Se puede velar un fragmento o el post entero ("contiene spoilers de: …").
- **Los títulos nunca llevan velo**, por eso no pueden contener spoilers
  (regla del foro, moderada).
- Notificaciones y vistas previas nunca muestran el cuerpo del mensaje.

### Moderación

- Reporte con motivo: spoiler sin velo, ofensivo, spam.
- El moderador aplica el velo con un clic, sin poder cambiar el texto, y
  queda en la auditoría (`AdminModerationLog`, acción nueva).
- Reincidencia → restricción `COMENTARIO_SILENCIADO` (ya existe).
- Rol nuevo **moderador**: todos los pisos, velar/ocultar/silenciar; sin acceso
  a correos, exportaciones ni al resto del panel admin. Mientras tanto,
  modera el autor.
- Primera versión: **solo texto** (sin imágenes, videos ni links).
- **Cero EXP por actividad social.** Se permiten insignias sociales sin EXP
  (ej. "Primera conversación"), revisadas contra abusos. Ojo de nombres: una
  insignia "Cronista veterano" chocaría con el Piso 5 "Cronistas veteranos".

## Audiolibros

Embed de YouTube (`youtube-nocookie.com`) con fachada: miniatura primero y el
reproductor se carga al hacer clic. Requiere abrir `frame-src` (y `img-src`
para `i.ytimg.com`) en la CSP de `next.config.ts`, que hoy bloquea iframes.
Con uno solo, va en la ficha del libro o relato; menú propio desde 2–3.

## Fases

| Fase | Contenido | Requiere del autor |
|---|---|---|
| 0 | Lectura 96 % + tiempo + tramos · pantalla del Ritual y de la HU · región/arco de los 14 relatos | Confirmar región/arco por relato |
| 1 | Libro mayor de EXP, niveles (curva calibrada), 7 marcos de progresión, perfil con marco · Vestíbulo con reportes, velo y moderación | Arte de 7 marcos |
| 2 | Quiz piloto (2–3 relatos), cooldown, medallas | Preguntas |
| 3 | Torre: pisos, etiquetas por obra, velo automático | — |
| 4 | Recuperación de contraseña + códigos de libro | Antes de imprimir Sizigia |
| — | Audiolibros | Cuando se quiera |
