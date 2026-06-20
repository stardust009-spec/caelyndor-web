# Audio-resúmenes de personaje (crónicas narradas)

MP3 generados externamente (NotebookLM) y subidos manualmente.

## Nomenclatura

```
[character-slug]-profile-summary.mp3
```

Usar el **slug real** del personaje (el de la URL `/personajes/<slug>`), no el nombre completo.

| Personaje | slug | archivo esperado |
|-----------|------|------------------|
| Yuki Arhess | `yuki` | `yuki-profile-summary.mp3` |
| Noctalypse | `noctalypse` | `noctalypse-profile-summary.mp3` |
| Rubí Kaelynn Vaer'Solyn | `rubi` | `rubi-profile-summary.mp3` |
| Lyzi | `lyzi` | `lyzi-profile-summary.mp3` |
| Levia Thanis | `levia-thanis` | `levia-thanis-profile-summary.mp3` |
| Halrik de Hyldran | `halrik` | `halrik-profile-summary.mp3` |

## Cómo activar el botón

1. Sube el MP3 a esta carpeta con el nombre de la tabla.
2. En `src/data/characters.ts`, en el personaje correspondiente, cambia
   `profileAudio.enabled` de `false` a `true`.
3. Commit + push. El botón "▶ Escuchar crónica" aparece en el hero del perfil.

El botón nunca se muestra mientras `enabled` sea `false`, así que no hay riesgo
de botones rotos si el MP3 todavía no está subido.
