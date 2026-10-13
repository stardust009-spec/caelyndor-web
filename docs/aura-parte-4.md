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

## Quiz de conocimiento

- Se desbloquea al completar el relato; es opcional.
- Pantalla previa con **advertencia de conexiones** ("este relato está
  conectado con X, Z y fragmentos de Y"), reglas y la opción "Hacerlo
  después". Las conexiones salen de un campo por relato que después alimenta
  la Constelación de relatos.
- **Abrir y abandonar no penaliza.** Las respuestas parciales se guardan y se
  continúa después. El intento abierto conserva **las mismas preguntas**
  hasta que se entrega (abandonar no sirve para sortear preguntas nuevas).
- **Cooldown de 7 días** solo al entregar y reprobar. Se guarda en servidor.
- 5 preguntas al azar de un banco de 8–10 por relato; se aprueba con 4 de 5
  (80 %). Al reprobar solo se muestra el puntaje, no cuáles fallaron.
- Las respuestas correctas nunca llegan al navegador.
- Aprobar: medalla del quiz + EXP, una sola vez.
- **Quiz narrativos: sin compra obligatoria.** Quien leyó un ejemplar prestado
  o digital puede demostrar lo que sabe. **Desafíos de colección**: exclusivos
  de quien registró el ejemplar (insignias y cosméticos extra, sin bloquear la
  progresión principal). Preguntas con spoilers de libros llevan advertencia
  explícita; nunca preguntas sobre libros no publicados.
- Piloto con 2–3 relatos (el costo real es escribir las preguntas).

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
