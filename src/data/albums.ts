import { assetImage, videoAsset } from "@/data/assets";

export type AlbumTrack = {
  number: number;
  title: string;
  description: string;
  linkedTrackId?: string;
  linkedTrackTitle?: string;
  lyrics?: string;
};

export type MusicAlbum = {
  slug: string;
  title: string;
  artist: string;
  status?: string;
  description?: string;
  heroImage?: string;
  heroVideoMp4?: string;
  heroVideoWebm?: string;
  /** Encuadre del hero al recortar (object-fit cover). "left" ancla a la izquierda
   *  para no cortar arte de ese lado; por defecto va centrado. */
  heroFocus?: "left" | "center";
  tracklist: AlbumTrack[];
};

export const musicAlbums: MusicAlbum[] = [
  {
    slug: "carolina-telarana-de-cristal",
    title: "Carolina Varthalion — Telaraña de Cristal",
    artist: "Carolina Varthalion",
    status: "Disponible",
    heroImage: assetImage("carolinav_portada_album_hero.png"),
    heroVideoWebm: videoAsset("carolinav_portada_album_hero.webm"),
    heroVideoMp4: videoAsset("carolinav_portada_album_hero.mp4"),
    description:
      "Diva noir, jazz venenoso, diamante, teatro, juicio, espejo y red. El primer álbum escénico de Carolina Varthalion dentro del Archivo Sonoro de Caelyndor.",
    tracklist: [
      {
        number: 1,
        title: "Carolina Varthalion — El Diamante del Sol Negro — Mírame",
        description: "Apertura identitaria. Carolina entra al escenario y reclama la mirada.",
        linkedTrackId: "carolina-varthalion-el-diamante-del-sol-negro-mirame",
        lyrics: `Shh...
La luz está perfecta.
El público respira.
Y si todos me miran...
entonces ya estoy ganando.

Tacón sobre mármol, perfume en el aire,
sonrisa de seda, mirada que arde.
No entro en la sala, cariño, aparezco,
y antes de cantar ya domino el reflejo.

Guantes largos, copa fría,
mi abanico marca la melodía.
Dicen que brillo, dicen que encanto,
no ven el filo debajo del canto.

Una joya bien tallada
también puede cortar.
Si mi araña se ilumina,
¿fue verdad o fue actuar?

Mírame, mírame,
bajo el Sol Negro voy a bailar.
Ámame, témeme,
a veces es lo mismo al final.

Mírame, mírame,
diamante vivo sobre el salón.
No confundas mi brillo, cariño,
con fragilidad de corazón.

Click, clack, swing!
La diva ya llegó.
Click, clack, ring!
Tu pulso se quebró.

Click, clack, swing!
No intentes escapar.
Si todos me miran,
ya empecé a ganar.

Canto una pena con voz de terciopelo,
lloro si quiero, sonrío si debo.
La verdad necesita vestuario,
y yo la visto con oro y escenario.

Puedo ser dulce, puedo ser dama,
puedo ser fuego bajo la cama.
Pero cuidado con tanta cercanía,
mi portaligas guarda cortesía.

El foco cae, la sombra espera,
mi nombre tiembla en la escalera.
Una actriz sabe mentir,
pero también sabe herir.

Mírame, mírame,
bajo el Sol Negro voy a bailar.
Ámame, témeme,
a veces es lo mismo al final.

Mírame, mírame,
diamante vivo sobre el salón.
No confundas mi brillo, cariño,
con fragilidad de corazón.

¿Quieres saber si fue real?
¿Si mi voz tembló por ti?
¿Si esta lágrima al caer
nació de mí?

Ven más cerca...
solo un poco más.
La función no ha terminado,
y aún no sabes mi finaaaaaaaal!

Mírame, mírame,
la noche entera me va a nombrar.
Ámame, témeme,
mi risa aprende a disparar.

Mírame, mírame,
diamante, araña, bendición.
No confundas mi brillo, cariño,
con fragilidad de corazón.

Aplaudan.
Aunque no sepan
si sobrevivieron al acto...
o si acaban de enamorarse.`
      },
      {
        number: 2,
        title: "Carolina Varthalion — Cristal Mortal",
        description: "Swing venenoso. Brillo, jazz, seducción y filo.",
        linkedTrackId: "carolina-varthalion-cristal-mortal",
        lyrics: `Ay, cariño...
no toques el cristal
si no quieres sangrar.

Tacón contra el suelo,
la noche empezó.
El foco me besa,
la sala calló.

Perfume en el aire,
diamante en la piel.
Si brillo demasiado,
no preguntes por qué.

Mi abanico dice sí,
mi sonrisa dice no.
Si la araña se ilumina,
decide tú si fui yo.

Cristal mortal,
brillo que corta al mirar.
Cristal mortal,
dulce veneno al cantar.

Bésame mal,
ríndete antes del final.
Cristal mortal,
yo no me rompo,
te voy a quebrar.

Click, clack, swing!
Tacón y cristal.
Click, clack, ring!
Brillo fatal.

Click, clack, swing!
No mires atrás.
Si todos me miran,
ya empecé a ganar.

Pa-ra-pá, pa-ra-pá, la-ra-lá,
ta-ra-rá, ta-ra-rá, tra-la-lá.
Ay, ay, ay... qué dulce el puñal,
pa-ra-pá, pa-ra-pá, cristal mortal.

Ta-ca-tá, ta-ca-tá, tacón y cristal,
la-ra-lá, la-ra-lá, brillo fatal.
Pa-ra-pá, pa-ra-pá, mírame bien,
ja, ja, ja... caíste también.

Canto una pena con voz de terciopelo,
lloro si quiero, sonrío si debo.
La verdad necesita vestuario,
y yo la visto con oro y escenario.

Dicen “Carolina, qué cruel tu función”,
pero nadie suelta su invitación.
Si duele bonito, lo llaman arte,
si sangra con ritmo, piden otra parte.

Ven más cerca,
no tengas temor.
El cristal es frío,
pero guarda calor.

Mi voz te acaricia,
mi risa es metal.
Una joya bien tallada
también puede hacer mal.

Cristal mortal,
brillo que corta al mirar.
Cristal mortal,
dulce veneno al cantar.

Bésame mal,
ríndete antes del final.
Cristal mortal,
yo no me rompo,
te voy a quebrar.

¿Quieres saber
si mi emoción fue real?
¿Si tembló mi voz
o fue teatral?

Mira mi araña brillar...
mira la sala girar...
si no sabes dónde termina la escena,
ya no vas a escapar.

Pa-ra-pá...
la copa va a caer.
Ta-ra-rá...
te vas a convencer.

Pa-ra-pá...
mi nombre va a quemar.
Cristal mortal...
cristal mortal...

Cristal mortal,
brillo que corta al mirar.
Cristal mortal,
nadie me puede tocar.

Bésame mal,
ríndete antes del final.
Cristal mortal,
yo no me rompo,
te voy a quebrar.

Cristal mortaaaaaaal!

Gracias, cariño.
Ahora revisa tus manos.`
      },
      {
        number: 3,
        title: "Carolina Varthalion — El Espejo",
        description: "Capa cultural. Medios, signos, relato, identidad y manipulación.",
        linkedTrackId: "carolina-varthalion-el-espejo",
        lyrics: `No necesito que creas en mí, cariño.
Solo necesito darte
las palabras correctas.

Tinta fresca en la mañana,
oro negro en el papel.
Una frase bien vestida
puede arrodillar la piel.

Hoy tu signo te aconseja
no mirar hacia atrás.
Mañana dirá que ames
lo que debes aceptar.

La ciudad bebe obediencia
en tacitas de cristal.
Si lo llama “destino”,
nadie pregunta quién lo escribió mal.

No vendo mentiras,
qué vulgar sería.
Vendo espejos limpios
con luz dirigida.

Si te nombro despacio,
te vas a encontrar.
Si te doy un lenguaje,
me vas a comprar.

Quien controla el espejo,
controla la voz.
Quien viste el deseo,
le pone razón.

Quien marca los signos,
ordena el dolor.
Y si todos lo cantan,
ya cambió la cultura,
mi amor.

Dime quién soy.
Dime qué fui.
Dime qué debo sentir.

Fatumis escribe,
Nexalis cerró.
Exitalis te grita
y nadie pidió perdón.

Aenigmaris sonríe,
te parte en mitad.
Y la culpa se esconde
detrás de una señal.

La gente no busca datos
cuando tiembla el salón.
Busca una brújula dulce,
una excusa con bendición.

Y yo, desde mi palco,
con diamante y control,
hago que el miedo parezca
una columna de opinión.

No digas “propaganda”,
suena poco elegante.
Di “tendencia nueva”,
di “lectura importante”.

No digas “cadena”,
di “identidad”.
Y verás cómo todos
se atan por voluntad.

Quien controla el espejo,
controla la voz.
Quien viste el deseo,
le pone razón.

Quien marca los signos,
ordena el dolor.
Y si todos lo cantan,
ya cambió la cultura,
mi amor.

Pa-ra-pá, pa-ra-pá, tinta y cristal,
ta-ra-rá, ta-ra-rá, signo fatal.
Ay, ay, ay, qué dulce opinar,
pa-ra-pá, pa-ra-pá, te voy a nombrar.

No necesito decirte
qué debes creer.
Eso lo hacen los torpes
que quieren vencer.

Yo prefiero enseñarte
dónde debes mirar.
Después llamas “destino”
a lo que yo puse a brillar.

Una palabra,
una sección.
Una portada,
una canción.

Una costumbre,
una ciudad.
Una mentira
vestida de verdad.

Quien controla el espejo,
controla la voz.
Quien viste el deseo,
le pone razón.

Quien marca los signos,
ordena el dolor.
Y si todos lo cantan,
ya cambió la cultura,
mi amor.

Ya cambió la cultuuuuura, mi amor!

No te preocupes.
La idea fue tuya.
Yo solo encendí la lámpara.`
      },
      {
        number: 4,
        title: "Carolina Varthalion — No Hagas Mi Pose",
        description: "Humor fraternal con Asha’al. Rompe solemnidad y humaniza la red.",
        linkedTrackId: "carolina-varthalion-no-hagas-mi-pose",
        lyrics: `Dicen que cuando Asha’al entra,
la lámpara no parpadea...
se disculpa.

Obsidiana bajo seda,
paso leve, pulso fiel.
Nadie escucha su llegada,
nadie olvida lo que fue.

Dagas finas, ojos quietos,
juramento sin temblar.
Mano oculta de la muerte,
sombra hecha voluntad.

No pide aplausos,
no busca el salón.
No necesita escenario
para cortar la respiración.

Pero una noche quiso probar
mi forma de dominar:
un giro de cadera,
una sonrisa fatal...

No, Asha’al!
No hagas mi pose!
¡Vas a asustar a los invitados!

Ese era el objetivo.

¡No de esa forma!

La postura no es eficiente.

Porque no es combate, cariño.
Es amenaza decorativa.

No hagas mi pose,
te va a doler.
Tú no eres seda,
tú eres pared.

No hagas mi pose,
mi sombra mortal.
Cuando tú sonríes,
alguien empieza a confesar.

Carolina gira y todos suspiran,
Asha’al mira y todos se retiran.
Una usa brillo, perfume y cristal,
la otra pregunta dónde está el puñal.

Yo digo “sonríe”,
ella dice “¿por qué?”.
Yo digo “coquetea”,
ella cuenta hasta tres.

Levanta la mano,
demasiado formal:
“¿la seducción requiere
contacto visual?”

Ay, Asha’al.
Ay, qué literal.
Ay, Asha’al.
Qué miedo mortal.

No necesitas luces,
ni aprender a brillar.
Hay sombras pequeñas
que saben mandar.

Yo tomo la sala,
tú tomas el final.
Yo dejo perfume,
tú dejas señal.

No hagas mi pose,
te va a doler.
Tú no eres seda,
tú eres pared.

No hagas mi pose,
mi sombra mortal.
Cuando tú sonríes,
alguien empieza a confesar.

Escucha, pequeña sombra,
no tienes que imitar
la forma en que mis joyas
dominan el lugar.

Yo visto la mentira,
tú cortas la respiración.
Yo domino el foco,
tú el último rincón.

Si intentas ser diamante,
te puedes romper.
Pero como obsidiana,
nadie te puede ver.

Sombra.
Filo.
Paso.
Piel.

Daga.
Risa.
Leal.
Cruel.

Y por favor...
no dobles la espalda así.

Anotado.
La seducción causa lesiones.

No hagas mi pose,
te va a doler.
Tú no eres seda,
tú eres pared.

No hagas mi pose,
mi sombra mortal.
Cuando tú sonríes,
alguien empieza a confesar.

No hagas mi pose,
no busques mi luz.
Tú eres la esquina
donde tiembla la cruz.

No hagas mi pose,
obsidiana fiel.
Si el mundo no te ve venir,
entonces haces bien.

¡Entonces haces bieeeeeen!

Perfecto, Asha’al.
Ahora sí...
asusta con elegancia.

Preferiría asustar con eficacia.`
      },
      {
        number: 5,
        title: "Carolina Varthalion — Gigante de Buen Corazón",
        description: "Ternura fraternal para Valther. Calor, humor y dignidad.",
        linkedTrackId: "carolina-varthalion-gigante-de-buen-corazon",
        lyrics: `Valther, cariño...
la próxima vez que entres a una sala,
avisa primero.
La puerta todavía tiembla.

Entra Valther y cambia el clima,
dos pasos y cruje la tarima.
La gente se aparta, se empieza a asustar,
como si un cuerno los fuera a saludar.

Músculo, cicatriz, mirada formal,
dicen “qué miedo”, “qué bestia”, “qué animal”.
Pero yo que lo he visto cuidando el mantel,
sé que trata una copa como flor de papel.

¡Valther!
¡Valther!
¡Cuidado al pasar!
¡Valther!
¡Valther!
¡La silla va a llorar!

Dicen que pareces guerra,
dicen que pareces prisión,
pero nadie mira la tierra
que te crece en el corazón.

Cuernos y corazón,
fuerza con pan en la mesa.
Cuernos y corazón,
risa que espanta tristezas.

Te juzgan por la cicatriz,
por el músculo y la voz.
Pero si el mundo te llama monstruo,
yo te llamo hermano,
y eso vale por dos.

Tiene brazos de torre, cuello de muralla,
pero pregunta bajito si alguien ya comió.
Parece que viene a romper la batalla,
y acaba sirviendo sopa con concentración.

Kaen lo provoca, Asha’al se ríe,
Arvenn finge que no escuchó.
Y Valther, muy serio, levanta la mano:
“¿la mesa era cara?”
Sí, Valther. Sí lo era, amor.

Ay, qué gigante.
Ay, qué formal.
Ay, qué ternura
tan monumental.

Dicen que das miedo,
y puede que sí.
Pero hay gente pequeña
más cruel que tú allí.

Porque bajo esos cuernos,
bajo tanto metal,
hay tierra fértil
donde algo puede sanar.

Cuernos y corazón,
fuerza con pan en la mesa.
Cuernos y corazón,
risa que espanta tristezas.

Te juzgan por la cicatriz,
por el músculo y la voz.
Pero si el mundo te llama monstruo,
yo te llamo hermano,
y eso vale por dos.

Valther, escucha,
no bajes la cabeza.
Que el mundo confunde
tamaño con violencia.

Tú no eres la sombra
que inventan al pasar.
Eres la mano enorme
que aprende a cuidar.

Y si alguien se burla
de tu forma al andar,
que venga conmigo...
le enseño a aplaudir
con dignidad.

Cuerno.
Risa.
Mesa.
Pan.

Fuerza.
Tierra.
Firme.
Leal.

¡Valther!
¡Valther!
¡Firme al caminar!
¡Valther!
¡Valther!
¡No rompas el bar!

Cuernos y corazón,
fuerza con pan en la mesa.
Cuernos y corazón,
risa que espanta tristezas.

Te juzgan por la cicatriz,
por el músculo y la voz.
Pero si el mundo te llama monstruo,
yo te llamo hermano,
yo te llamo bien.

¡Yo te llamo bieeeeeen!

Y ahora ven acá, gigante.
Pero despacio.
La última vez tu abrazo
casi me cambia de apellido.`
      },
      {
        number: 6,
        title: "Carolina Varthalion — Objeción, Su Señoría",
        description: "Comedia teatral de escena. Caos judicial y control de daños con glamour.",
        linkedTrackId: "carolina-varthalion-objecion-su-senoria",
        lyrics: `¡Orden!
¡Orden en la corte!
Ciudadano Kaen Varthalion...
ya ha oído los cargos.
¿Cómo se declara?

Inocente.
Alcohol: sí.
Drogas: cero.
Lo demás... discutible.

¡Oh-oh-oh!
¡Oh-oh-oh!
¡Por todos los santos!
¡Oh-oh-oh!

¡ORDEN!
¡ORDEN EN LA CORTE!

Su señoría, con respeto,
antes de dictar sentencia,
permítame vestir la culpa
con un poco de decencia.

Mi cliente está cansado,
confundido y mal sentado,
con el juicio en una mano
y el desastre en el pasado.

No lo tome literalmente,
no lo escuche sin defensa,
cuando habla sin permiso
nos aumenta la condena.

Tiene ceniza en los modales,
vino muerto en la memoria,
y una forma muy absurda
de empeorar su propia historia.

Mire mi gesto,
mire mi voz,
mire el expediente,
no mire el horror.

Si él abre la boca,
yo pierdo el control.
Si dice otra frase...
nos manda al panteón.

¡Objeción, su señoría!
No lo escuche todavía.
Mi cliente no coopera,
pero sigue siendo mío hoy día.

¡Objeción, su señoría!
La verdad no ayuda hoy día.
Si responde, nos condena;
si se calla, todavía.

¡Objeción, objeción!
Con permiso y cortesía.
Este juicio necesita
menos Kaen...
y más Carolina.

¡Orden! ¡Orden!
¡Pa-pa-pam!
¡Orden! ¡Orden!
¡Pa-pa-pam!

Si dices una palabra más...
te cobro honorarios triple.

Preparé cada sonrisa,
cada ángulo y cada pausa,
cada brillo de diamante
para maquillar la causa.

Pero el juez no mira nada,
la justicia hoy fue literal;
tanto escote estratégico
se perdió en el tribunal.

Y aun así, queridos míos,
yo no vine a fracasar:
si el mundo se está quemando,
lo voy a hacer rimar.

Porque un escenario es trono,
una corte es un salón,
y una buena diva sabe
convertir miedo en ovación.

Tampoco es un lugar muy divertido,
si le soy sincero.

Ja-ja-ja...
Shh, shh, shh...
Ja-ja-ja...
¡Orden, por favor!

¡Este tribunal no es una taberna!

Estamos completamente de acuerdo,
su señoría.

No mire el humo,
no mire el brazo,
no mire las marcas
sobre el estrado.

Mire mi pluma,
mire mi honor,
mire qué lindo
suena un error.

¡Objeción, su señoría!
No lo escuche todavía.
Mi cliente no coopera,
pero sigue siendo mío hoy día.

¡Objeción, su señoría!
La verdad no ayuda hoy día.
Si responde, nos condena;
si se calla, todavía.

¡Objeción, objeción!
Con perfume y valentía.
Este juicio necesita
menos Kaen...
y más Carolina.

Nota técnica:
el acusado sigue respirando
porque la abogada lo necesita vivo para cobrar.

Asha’al...
eso no va en acta.

Su señoría,
la ley es sagrada,
pero incluso la ley
necesita ser cantada.

Si la culpa entra desnuda,
la sala se va a asustar.
Yo le pongo guantes blancos
y la enseño a caminar.

No pregunte si es inocente,
pregunte si conviene gritar.
Hay verdades que en una corte
nadie debería escuchar.

Uno, dos,
respire la corte.
Tres, cuatro,
nadie se corte.

Cinco, seis,
sonría el jurado.
Siete, ocho...
Kaen, cállate sentado.

¿No era eso lo que tenía que decir?

¡OOOOOOH!

¡ORDEN!
¡ORDEN!
¡ORDEN EN LA CORTE!

¡Objeción, su señoría!
No lo escuche todavía.
Mi cliente es un desastre,
pero el desastre tiene guía.

¡Objeción, su señoría!
La verdad no ayuda hoy día.
Si lo absuelven, sobrevivo;
si lo escuchan, tragedia.

¡Objeción, objeción!
Con diamante y cortesía.
Si esta corte sigue viva,
denle gracias...
a Carolina.

¡Objecióóóóóóóóón!

Gracias, su señoría.
La defensa solicita...
un vaso de vino,
cinco minutos de silencio,
y que mi cliente no vuelva a respirar sin autorización.`
      },
      {
        number: 7,
        title: "Carolina Varthalion — Luna-Escarcha No Duerme",
        description: "Noir trágico de Arvenn. Luna-Escarcha, Eirlys y la herida que no descansa.",
        linkedTrackId: "carolina-varthalion-luna-escarcha-no-duerme",
        lyrics: `Arvenn...
no todas las joyas brillan.
Algunas tienen nombre.
Algunas...
respiran.

Te vi sentado
entre zafiros y alcohol,
con tantos anillos
temblando sin voz.

La sala reía,
la música ardió,
pero bajo tu traje
la luna lloró.

No era codicia,
no era poder.
Era una puerta
que no pudiste romper.

Luna-Escarcha,
un nombre al caer,
y un amor encerrado
sin poder volver.

Eirlys no duerme,
lo sabes también.
Su voz golpea
por dentro de tu piel.

Tú bebes silencio,
sonríes de pie,
pero Luna-Escarcha
te mira otra vez.

Luna-Escarcha no duerme,
la luna no sabe llorar.
Tu amor sigue preso
donde nadie lo puede escuchar.

Luna-Escarcha no duerme,
tú tampoco sabes descansar.
Si el mundo la hizo joya,
lo vas a hacer sangrar.

Te quitaron hijos,
te dieron prisión.
Te dejaron vivo
como ejecución.

Qué fino castigo,
qué cruel majestad:
dejarte la memoria
vestida de claridad.

Solkán puso el hielo,
la corte calló,
y el amor de tu vida
en adorno quedó.

Pero yo vi tus ojos
cuando nadie miró:
no era viejo rencor,
era un corazón.

No escondas la herida
detrás del metal.
Una joya perfecta
también puede matar.

Si tiemblan tus manos,
si vuelve el dolor,
no pidas perdón
por seguir siendo amor.

Luna-Escarcha no duerme,
la luna no sabe llorar.
Tu amor sigue preso
donde nadie lo puede escuchar.

Luna-Escarcha no duerme,
tú tampoco sabes descansar.
Si el mundo la hizo joya,
lo vas a hacer sangrar.

Mírame, Arvenn.
Yo conozco el cristal.
Sé cuándo una belleza
aprendió a ser fatal.

A mí me hicieron brillo,
a ti te hicieron mirar
cómo el amor de tu vida
se volvía altar.

Pero una joya no es tumba
si alguien recuerda su voz.
Y un hombre que ama así
no está vencido por Dios.

Luna...
escarcha...
nombre...
dolor...

Eirlys...
silencio...
cristal...
amor...

No duerme.
No muere.
No calla.
No cede.

Luna-Escarcha no duerme,
la luna aprendió a cortar.
Tu amor sigue preso,
pero aún te puede llamar.

Luna-Escarcha no duerme,
y tú no vas a descansar.
Si el mundo la hizo joya,
lo vas a hacer sangrar.

Lo vas a hacer sangraaaaaaar...

Guárdala cerca, Arvenn.
No como tesoro.
Como promesa.`
      },
      {
        number: 8,
        title: "Carolina Varthalion — No Me Van a Callar",
        description: "Corazón emocional del álbum. Carolina deja de narrar a otros y se corona a sí misma.",
        linkedTrackId: "carolina-varthalion-no-me-van-a-callar",
        lyrics: `Dijeron que bajara la voz.
Qué ternura.
Como si mi voz
les perteneciera.

Nací entre piedra,
seda y obligación,
con un apellido
pesando en la voz.

Mi madre decía:
“no muestres dolor”,
y yo sonreía
sin pedir perdón.

La casa era grande,
pero el aire no.
Tanta puerta abierta
y ninguna era yo.

Me fui con mis guantes,
mi nombre y mi piel,
buscando una vida
que no oliera a deber.

No cerré la herida,
la volví canción.
No quemé la jaula,
le cambié el color.

Y bajo las luces,
con miedo al temblar,
aprendí despacio
que podía mandar.

No me van a callar,
no me van a quebrar.
Me quisieron de seda en silencio,
pero la seda también sabe cortar.

No me van a callar,
no me van a bajar.
Si me quieren de rodillas, cariño,
van a tener que aprender a caer.

En cortes lejanas
mi nombre brilló,
y el mundo aplaudía
sin saber qué costó.

Pero siempre hay ratas
debajo del salón,
mordiendo la alfombra
donde pasa mi voz.

“Canta más suave”,
“sonríe mejor”,
“quédate bonita”,
“no hables de control”.

Creyeron que el foco
me iba a domesticar.
Pobres criaturas...
no saben mirar.

Yo no soy adorno,
ni premio, ni altar.
No soy la muñeca
que pueden comprar.

Si pisan mi nombre
para verme sangrar,
les canto la herida
hasta hacerlos bailar.

No me van a callar,
no me van a quebrar.
Me quisieron de seda en silencio,
pero la seda también sabe cortar.

No me van a callar,
no me van a bajar.
Si me quieren de rodillas, cariño,
van a tener que aprender a caer.

Madre...
quizá me escuches
desde algún rincón.

Madre...
quizá me escuches
desde algún rincón.

Me diste un nombre
con peso y dolor.
Me diste una corona
antes de mi voz.

Desde niña
me coronaron Carolina:
mujer fuerte,
mujer libre.

Eso soy yo.

Seda...
sangre...
brillo...
verdad...

Risa...
lágrima...
nombre...
voluntad...

Mujer fuerte.
Mujer libre.
Eso soy yo.
Eso soy yo.

No me van a callar,
no me van a quebrar.
Me quisieron de seda en silencio,
pero la seda también sabe cortar.

No me van a callar,
no me van a borrar.
Soy Carolina Varthalion,
mujer fuerte,
mujer libre,
y mi voz no pide lugar.

¡Eso soy yooooooo!`
      },
      {
        number: 9,
        title: "Carolina Varthalion — ¿Por Qué Aplauden?",
        description: "Clímax oscuro. El público ya no puede fingir inocencia.",
        linkedTrackId: "carolina-varthalion-por-que-aplauden",
        lyrics: `Silencio.
No bajen las manos todavía.
Quiero verlas temblar.

A-plau-dan.
A-plau-dan.
A-plau-dan.
A-plau-dan.

Qué bella su risa detrás del cristal,
qué limpia la culpa si suena musical.
Vieron la llama besar la ciudad,
y aun así pidieron otro final.

Seda en la herida, oro en la voz,
les di una tragedia vestida de sol.
Si duele bonito, lo llaman función,
si canta la sangre, le dan ovación.

Palmas arriba,
sonrían mejor.
El miedo se afina
si marca el tambor.

¿Por qué aplauden?
¿Por qué aplauden?
Si el humo aún respira
debajo del telón.

¿Por qué aplauden?
¿Por qué aplauden?
Si cada luz que brilla
también muestra la prisión.

A-plau-dan.
A-plau-dan.
A-plau-dan.
A-plau-dan.

Les di exilio con pasos de baile,
les di incendio con guantes de encaje.
Les di ceniza, destino y puñal,
y ustedes pidieron champagne al final.

Qué dulce es mirar desde un palco seguro,
qué fácil llorar si no cae su muro.
Pero el cristal no detiene el calor,
solo retrasa el olor del terror.

Pa-ra-pá, pa-ra-pá, la-ra-lá,
ta-ra-rá, ta-ra-rá, tra-la-lá.
Ay, ay, ay... qué dulce el puñal,
pa-ra-pá, pa-ra-pá, final fatal.

Ta-ca-tá, ta-ca-tá, tacón y cristal,
la-ra-lá, la-ra-lá, brillo mortal.
Pa-ra-pá, pa-ra-pá, mírame bien,
ja, ja, ja... caíste también.

Miren al centro.
Miren quién llegó.
¿Creyeron que era parte del acto?

No, cariño.
El acto los alcanzó.

Aplaudieron la máscara,
aplaudieron mi voz,
aplaudieron el filo
porque iba con oro.

Aplaudieron la herida,
la jaula, el ardor...
y ahora se preguntan
por qué tiembla el coro.

¿Por qué aplauden?
¿Por qué aplauden?
Si el fuego ya camina
por debajo del salón.

¿Por qué aplauden?
¿Por qué aplauden?
Cuando esto deje de ser ficción.

A-plau-dan.
A-plau-dan.
A-plau-dan.
A-plau-dan.

Un escenario también puede ser trono,
una sonrisa también puede matar.
Si todos me miran, cariño,
entonces ya empecé a ganar.

¿Por qué aplauden?
¿Por qué aplauden?
No queda frontera
entre obra y verdad.

¿Por qué aplauden?
¿Por qué aplauden?
El cristal se rompe
si aprende a cantar.

¿Por qué aplaudeeeeeeeen?

Ahora sí.
Pueden aplaudir.`
      },
      {
        number: 10,
        title: "Carolina Varthalion — El Guion de la Araña (Remix)",
        description: "Cierre/bonus. La red vuelve con ritmo, como última reverencia venenosa.",
        linkedTrackId: "carolina-varthalion-el-guion-de-la-arana-remix",
        lyrics: `¿Realmente creen que tienen opción?
¡A sus puestos!

Tacones de plata sobre el frío mármol,
ella no corta el tronco, corrompe el árbol.
Viste de seda, exhala el veneno,
CAROLINA es la dueña de todo el terreno.
No necesita acero ni magia de fuego,
¡ella domina las reglas del juego!

En el Teatro de Cristal se dicta la historia,
ella decide quién merece la gloria.
Si Kaen es el trueno que rompe la calma,
CAROLINA es el eco que atrapa tu alma.
Usa la tinta, manipula el mito,
¡lo que ella escribe se vuelve bendito!

La verdad es un lienzo que ella dibuja,
no importa la herida si el ojo se estruja.
Mira Solis baila bajo su dedo,
¡construyendo un imperio basado en el miedo!

¡SOY CAROLINA, LA ARAÑA DE ORO!
TEJO MENTIRAS, GUARDO TESOROS.

ARQUITECTA DEL MAL, ¡DESTINO ES FINAL!
BAJO EL SOL NEGRO MI VOZ ES EL GUION,
¡YO DOY A LA MUERTE UNA JUSTIFICACIÓN!

¿Crees que eres libre? Qué dulce ironía,
tus ojos solo ven mi coreografía.
Un solo gesto y el mundo se inclina,
¡soy la estratega, soy la heroína!
No soy la espada...
soy la mano que la guía.

¡SOY CAROLINA, LA ARAÑA DE ORO!
TEJO MENTIRAS, GUARDO TESOROS.
¡EN MI TEATRO EL DESTINO ES FINAL!

Y recuerden...
si lo vieron en el cristal...
¡es porque yo hice que fuera REAL!`
      }
    ]
  },
  {
    slug: "aria-adagio-ventoleve-jaula-y-rosas",
    title: "Aria & Adagio Ventoleve — Jaula y Rosas",
    artist: "Aria & Adagio Ventoleve",
    status: "Disponible",
    heroImage: videoAsset("aria_ventoleve_jaula_y_rosas_album_hero.png"),
    heroVideoMp4: videoAsset("aria_ventoleve_jaula_y_rosas_album_hero.mp4"),
    description:
      "Una vitrina de cámara, jaula, rosa, compás y herida para Aria y Adagio Ventoleve dentro del Archivo Sonoro de Caelyndor.",
    tracklist: [
      {
        number: 1,
        title: "Aria Ventoleve — Tac (El Compás Que Perdí)",
        description: "Compás roto, pulso perdido y escena mecánica.",
        linkedTrackId: "aria-ventoleve-tac-el-compas-que-perdi"
      },
      {
        number: 2,
        title: "Aria Ventoleve — Ballet sin vida",
        description: "Ballet final de Aria, quietud y vida suspendida.",
        linkedTrackId: "aria-ventoleve-ballet-sin-vida"
      },
      {
        number: 3,
        title: "Aria Ventoleve — No Mucho",
        description: "Número íntimo de Aria, contenido y filo bajo la voz.",
        linkedTrackId: "aria-ventoleve-no-mucho"
      },
      {
        number: 4,
        title: "Aria Ventoleve — Corazón de Títeres",
        description: "Títeres, corazón y cuerda emocional.",
        linkedTrackId: "aria-ventoleve-corazon-de-titeres"
      },
      {
        number: 5,
        title: "Adagio Ventoleve — El poema de Bragi",
        description: "Apertura poética de Adagio, viento y memoria.",
        linkedTrackId: "adagio-ventoleve-el-poema-de-bragi"
      },
      {
        number: 6,
        title: "Adagio Ventoleve — Bendito y Maldito",
        description: "Bendición y condena en una misma pieza.",
        linkedTrackId: "adagio-ventoleve-bendito-y-maldito"
      },
      {
        number: 7,
        title: "Adagio Ventoleve — Letra Chica con disrupción",
        description: "Contrato, letra pequeña y disrupción.",
        linkedTrackId: "adagio-ventoleve-letra-chica-con-disrupcion"
      },
      {
        number: 8,
        title: "Adagio Ventoleve — Marcha Nupcial; La hermana que perdí",
        description: "Marcha nupcial vuelta duelo por la hermana perdida.",
        linkedTrackId: "adagio-ventoleve-marcha-nupcial-la-hermana-que-perdi"
      }
    ]
  },
  {
    slug: "aelwyn-solrenhal-juramentos-de-escarcha-y-sol",
    title: "Aelwyn Solrenhal — Juramentos de Escarcha y Sol",
    artist: "Aelwyn Solrenhal",
    status: "Disponible",
    heroFocus: "left",
    heroImage: videoAsset("Juramentos_de_Es_carcha_y_Sol.webp"),
    heroVideoMp4: videoAsset("Juramentos_de_Es_carcha_y_Sol_20seg.mp4"),
    heroVideoWebm: videoAsset("Juramentos_de_Es_carcha_y_Sol_20seg.webm"),
    description:
      "Juramento en marcha, escarcha en la mirada, duelo bajo el sol y la sangre dorada del enemigo. El álbum de Aelwyn Solrenhal dentro del Archivo Sonoro de Caelyndor.",
    tracklist: [
      {
        number: 1,
        title: "Aelwyn Solrenhal — La Espina Dorada",
        description: "Preludio: la presentación de Aelwyn, la espina dorada.",
        linkedTrackId: "aelwyn-solrenhal-la-espina-dorada",
        lyrics: `Bajo mármol y sol,
guardé mi nombre en silencio.
Una cinta roja ardía
donde termina mi trenza.
La carta junto al alma,
la espada quieta en mi mano,
un caballo de luz fría
respirando en el umbral.

Artanis quedó atrás,
sus templos siguen ardiendo.
La ceniza de una hermana
me llamó bajo el hielo.
Tysha dejó dos sillas,
un jardín bajo otro cielo.
Yo llegué tarde a su risa,
pero alcancé su verdad.

Si el mundo borra los nombres,
yo los cargo en la piel.
Si mi filo duerme en sombra,
mi mano sigue de pie.

Soy la Espina Dorada,
mi fulgor sabe sangrar.
Juramento en la garganta,
sol herido al cabalgar.
Entre nieve, hierro y sombras,
mi voto vuelve a brillar.
Quien aún tenga un nombre
no caerá al olvido jamás.

Eclissio...
Eclissio...

Eclissio nunca se dobla,
me mira y elige el rumbo.
Con ojos de noche antigua
y un sol pequeño al centro.
La bandera blanca tiembla,
pero mi pulso no se rinde.
Vengo sin reino en la espalda,
vengo a cumplir lo que siento.

Madre de luz velada,
padre perdido en barro,
cada ausencia me acompaña
como una vela sin sombra.

Soy la Espina Dorada,
mi fulgor sabe sangrar.
Juramento en la garganta,
sol herido al cabalgar.
Entre nieve, hierro y sombras,
mi voto vuelve a brillar.
Quien aún tenga un nombre
no caerá al olvido jamás.

Mi espada no siempre canta.
Mi fe también se cansó.
Pero vi niños en la nieve
y el mundo me respondió.
No pedí permiso al miedo.
No consulté la frontera.
Puse el cuerpo ante la muerte
y la luz cruzó mi herida.

Halrik, guarda la puerta.
Yuki, mira el invierno.
Tysha, mira mis pasos.
Elyria, deja una estrella.
Davoren, si aún queda algo,
bajo la noche enterrada,
verás que tu hija camina
sin cadenas en el alma.

Soy la Espina Dorada,
mi fulgor sabe sangrar.
Juramento en la garganta,
sol herido al cabalgar.
Entre nieve, hierro y sombras,
mi voto vuelve a brillar.
Quien aún tenga un nombre
no caerá al olvido jamás.

La luz que protege,
la luz que recuerda,
la luz que se queda
cuando el altar se quiebra.

Mi voto no duerme.
Mi herida recuerda.
Mi espada espera.
Yo sigo aquí.`
      },
      {
        number: 2,
        title: "Aelwyn Solrenhal — Donde los Juramentos Cabalgan Solos",
        description: "Cap. I — la carta, el viaje y la llegada a Glaciem.",
        linkedTrackId: "aelwyn-solrenhal-donde-los-juramentos-cabalgan-solos",
        lyrics: `Antes de que la fe se quiebre,
hubo una carta sin sello...

Una carta sin sello me alcanzó,
cinta roja deshilachada.
Tysha, hermana de mi voto,
callada bajo la escarcha.

No lloré cuando lo supe,
doblé mi capa en silencio.
El broche de mi madre sube
y quema donde no hay consuelo.

Si el mundo cierra los templos,
yo abro el camino a pie.
Si mi hermana duerme en hielo,
yo cabalgo tras su fe.

Cabalgo sola hasta el confín,
donde el juramento no descansa.
Eclissio, guíame hasta el fin,
donde la nieve aún la alcanza.
No busco gloria ni perdón,
solo traerla aunque sea ceniza.
Quien lleva luz en el corazón
no la abandona a la deriva.

Eclissio...
Eclissio...

Un campo roto, un cielo ámbar,
un caballo sin huellas ni dueño.
No me eligió por obediencia,
me eligió porque aún tenía sueño.

Tocó mi mano y no fue pelo,
fue memoria más antigua que yo.
"No sabe de órdenes, solo de anhelo,"
dijo Tysha, y el viento respondió.

Catorce años, cordones torcidos,
una trenza que no supe hacer.
Tysha reía, siempre a mi lado,
"pareces estatua que olvidó caer."

Eclissio me juzgaba en la sombra,
Tysha decía que era su humor.
Dos hermanas sin sangre ni nombre,
solo un lazo más fuerte que el dolor.

Crucé el mármol, crucé el trigo dorado,
llegué al blanco que no tiene fin.
Bandera sin rendirme he alzado,
no vengo a herir, vengo hasta aquí.

Un soldado de Glaciem me recibe,
sopa tibia, un establo, verdad.
"Vengo como hermana, no paladín,"
le dije, y él bajó la guardia ya.

Halrik, guardián de escarcha y calma,
me diste tregua sin pedir nada.
Esa noche encontré en mi alma
que el hielo también guarda un hogar.

Cabalgo sola hasta el confín,
donde el juramento no descansa.
Eclissio, guíame hasta el fin,
donde la nieve aún la alcanza.
No busco gloria ni perdón,
solo traerla aunque sea ceniza.
Quien lleva luz en el corazón
no la abandona a la deriva.

Esta noche no hay templo ni trono,
solo un fuego y un pan compartido.
Puede que el hielo no sea mi hogar,
pero esta tregua no ha sido en vano.

Sigo el camino que ella dejó.
Sigo su nombre bajo mi pecho.
Eclissio, descansa esta noche...
mañana seguimos el trayecto.`
      },
      {
        number: 3,
        title: "Aelwyn Solrenhal — Miradas de Escarcha y Luz",
        description: "Cap. I, más adelante — la masacre y la intervención de Yuki.",
        linkedTrackId: "aelwyn-solrenhal-miradas-de-escarcha-y-luz",
        lyrics: `Me dijeron que el hielo no ama,
que esta tierra solo sabe helar.
Pero vi faroles en la escarcha
y honrar no es lo mismo que temblar.

Miel congelada en un cuenco humilde,
una anciana que no pide nada.
Aquí nadie cierra la puerta,
aunque el sol brille en mi coraza dorada.

No es un reino sin alma,
es un reino que sabe esperar.
Glaciem no me quita la calma,
me enseña otra forma de amar.

Pero antes que cante el gallo,
las trompetas rompen el cielo.
Una aldea, más allá del muro,
donde Mythra no pide duelo.

"¡No te involucres!" gritaron,
pero mi voto no sabe de espera.
Eclissio ya estaba esperando,
antes que sonara la primera.

Orejas cortadas sobre la nieve,
risas sin nombre, sin ley, sin razón.
Una niña grita, nadie la libre,
hasta que mi espada halló su misión.

¡Soy la Espina Dorada en la escarcha!
Mi juramento no pide permiso.
Ocho cayeron bajo mi guardia,
ninguno cayó por capricho.
No soy castigo, soy memoria,
lo que Mythra quiso borrar.
Aunque el cielo no cuente esta historia,
mi espada la va a relatar.

El aire cambió, el fuego se apaga,
una reina camina sin prisa.
Sus dedos escriben la escarcha,
"ya basta" fue toda su voz.

Dos mujeres, un mismo peso,
diferentes en forma y en frío.
Una mirada bastó por respeto,
sin palabras selló el desafío.

No hubo aplauso ni gloria en la nieve,
solo un gesto que dijo "lo sé".
Glaciem, hoy entendí lo que se debe:
el deber también sabe querer.`
      },
      {
        number: 4,
        title: "Khaal'Zar Omunyek — Sangre Dorada",
        description: "Cap. II — el origen de Khaal'Zar en la arena y su desprecio por los gemelos.",
        linkedTrackId: "khaalzar-omunyek-sangre-dorada",
        lyrics: `No nací con la mano cerrada...
la cerré a golpes.

Arena, sudor, un dios de carne,
lo miré caer sin que cantara.
No fue duelo, fue sentencia,
mi filo ni siquiera cantó.

Sangre dorada en mis manos,
trofeo que nadie se atrevió a tocar.
Esclavo ayer, hoy soy destino,
lo que el mundo no supo domar.

Dos gemelos en un trono hueco,
uno brilla, el otro observa.
Ni uno sangró por lo que tiene,
yo sangré por cada palabra.

¡TODO!
Cada paso, cada voz, cada mito.
¡TODO!
Lo que el poder no pide permiso. No importa cuna, no importa nombre, solo importa lo que puedas tomar.
¡TODO!
Yo no ruego, yo no imploro. Vine a cobrar.

Dravhal confía, Dravhal se equivoca,
la lealtad es solo otra arma.
Ante el trono clavé la lanza
en la espalda que confió en mi calma.

"Vi oportunidad" fue mi sentencia,
no hay traición donde no hay lealtad jurada.
El Senado gritó justicia,
yo solo escuché mi propia entrada.

Poder sin voluntad es solo
una vela en catedral vacía.
Yo no vine a rogar limosna,
vine a encender mi propio día.

¡TODO!
Cada paso, cada voz, cada mito.
¡TODO!
Lo que el poder no pide permiso. No importa cuna, no importa nombre, solo importa lo que puedas tomar.
¡TODO!
Yo no ruego, yo no imploro. Vine a cobrar.

Soy mérito.
Soy resultado.
Soy lo que pasa...
cuando el poder no pide nada.

Comandante Supremo del Ala Oriental...
Y esto... apenas comienza.

¡TODOoooooOoOoO!`
      },
      {
        number: 5,
        title: "Aurex Primus & Virellius Nox — Gemelos del Brillo Contradicho",
        description: "Cap. II — la presentación formal de los gemelos en el trono.",
        linkedTrackId: "aurex-virellius-gemelos-del-brillo-contradicho",
        lyrics: `Aurex Primus... Virellius Nox...
gemelos del brillo contradicho...

Nací con el puño cerrado al mundo,
lo abrieron, y había polvo de oro.
Dijeron: "el futuro nos mira con luz,"
yo solo supe: nadie compite con mi trono.

Yo no lloré. No gemí. Solo abrí los ojos...
un médico cayó de rodillas ante mí...
una sacerdotisa dijo mi nombre... y murió...

el futuro no me teme...
simplemente, bosteza...

¡Gemelos del brillo contradicho!
Sol coronado, luna invertida.
Uno arde hacia afuera sin descanso,
el otro juzga en la sombra, en silencio.
¡Gemelos del brillo contradicho!
Un solo trono...
dos formas de reinar.

Rujo hacia afuera, proyecto mi fuego,
cada palabra mía incendia el templo.
No hay secreto que sobreviva a mi luz,
soy el sol que ningún eclipse doblega.

Yo condeno en privado, en la oscuridad...
mi silencio pesa más que tu tormenta...

donde tú destruyes,
yo simplemente decido...

y lo que decido...
ya no tiene apelación.

Hermano...
a veces pienso que naciste
solo para recordarme
lo que no soy...

...y yo pienso que tú naciste
para que el mundo nunca olvide
lo que temer...

¡Gemelos del brillo contradicho!
¡Sol coronado, luna invertida!
Uno arde hacia afuera sin descanso,
el otro juzga en la sombra, en silencio.

¡Gemelos!
¡Gemelos!

¡Un solo trono!

Dos formas...

¡De reinar!

Hasta el sol más grande se apaga...
hasta la luna más fría se eclipsa...

que Mythra recuerde...

...que reinamos juntos.`
      },
      {
        number: 6,
        title: "Temari Calabruña — La Vocera del Huerto",
        description: "Cap. III — Temari se presenta.",
        linkedTrackId: "temari-calabruna-la-vocera-del-huerto",
        lyrics: `Buenos días, disculpe el temblor,
soy Temari Calabruña, con honor.
Me dicen la Vocera del Huerto,
no por fama, sino por cariño cierto.

Vengo de Qaebrog'thar, sin hogar fijo,
hablo con las verduras, se los digo.
Las cebollas saben del clima,
y una betarraga me gritó desde arriba.

Diecisiete años, una colita de estación,
miedo a los puerros, no sé la razón.
No soy buena para el silencio...
pero soy buena escuchando.

¡Pregúntale a las verduras!
Ellas siempre saben más.
Yo solo repito lo que susurran
cuando nadie más las va a escuchar.
No tengo carretón ni casa,
pero tengo un huerto en el corazón.
¡Pregúntale a las verduras!
Yo soy su única voz.

Las zanahorias hablan de más,
le dijeron que Eclissio tiene una muela partida.
Por eso el aliento a pantano y sal...
¡No es mi culpa, es la verdad florida!

Y entonces ella rió por primera vez...
desde que el nombre de su hermana dolía.
"Temari... juro por la luz,
que nunca dejaré de protegerte, pase lo que pase."

El caballo se alzó como testigo,
la tierra tembló bajo el juramento.
Y yo, que solo hablo con lo que crece,
sentí que también eché raíces.

¡Pregúntale a las verduras!
Ellas siempre saben más.
Yo solo repito lo que susurran
cuando nadie más las va a escuchar.
No tengo carretón ni casa,
pero tengo un huerto en el corazón.
¡Pregúntale a las verduras!
Yo soy su única voz.

Una ofrenda, una semilla, un pan sin corteza,
una estatua pequeña marca la certeza.
Salto de Raíz, así se llama el don...
Vamos a Mythra... solo síganme a mí.`
      },
      {
        number: 7,
        title: "Odrim Vaelkoren & Lira Eserine — Solo Eran Huevos",
        description: "Cap. V — la leyenda del Desayuno del Fin del Mundo.",
        linkedTrackId: "odrim-lira-solo-eran-huevos",
        lyrics: `Pedí una cosa. Solo una.
"Lira. Solo. Huevos." Fueron mis palabras.
Ella abrió el refrigerador interdimensional...
y lo que salió no tenía nombre en ningún idioma.

¡Pero encontré un ingrediente raro!
¡Nadie dijo que no podía improvisar!
La sartén empezó a vibrar, a juzgarme...
¡y yo solo quería desayunar!

Lira... solo... eran... huevos.
¡Pero fue hermoso, profe, fue un logro!
Convocaste un Senado de Sartenes.
¡Con derecho a voto, no fue improvisado!

La yema, ofendida, abrió un portal a Umbrenya.
La mantequilla exigió representación legal.
Y cuando quise recuperar mi cocina...
tú ya estabas en la camilla de un hospital.

¡Y tres meses después, funcionó!
El globo llegó hasta las nubes más altas...
¡hasta que ardió como una estrella nueva!

Hermoso. Sí. Hasta que ardió.

No pensamiento lineal, te dije mil veces...
¡El caos también es una forma de ciencia!
Ella improvisa. Él calcula.
Ninguno de los dos ha ganado nunca.

Lira... solo... eran... huevos.
¡Y aun así, aprendiste algo nuevo!
Aprendí... a esconder la sartén buena.
¡Aprendiste a quererme, aunque sea un problema!

...Solo eran huevos.
Y aun así, profe... nunca me dejó de enseñar.`
      },
      {
        number: 8,
        title: "Aelwyn Solrenhal — Duelo contra el Sol",
        description: "Cap. VI-VII — el duelo amañado bajo el sol del imperio.",
        linkedTrackId: "aelwyn-solrenhal-duelo-contra-el-sol",
        lyrics: `El suelo tiembla antes que él golpee.
El aire arde antes que él respire.

Un astro furioso cruza la arena,
mediodía cayendo sobre mi frente.
Alzo el escudo, la cadena,
lo que Tysha me dejó de valiente.

No elegí esta guerra, la cargué,
el chantaje de Khaal atado a mi espalda.
Cada golpe que resisto, lo pagué
antes de que empezara esta batalla.

No tiemblo por el trueno,
tiemblo por lo que sé y no puedo hablar.
Mi voto es mi veneno,
mi voto es lo único que me hace estar.

¡Mi voto me sostiene!
Aunque el sol me queme entera.
No caigo aunque me abandone
todo, menos la promesa.
Golpe a golpe, hueso a hueso,
sigo en pie, aunque no debiera.
¡Mi voto me sostiene!
Aunque el cielo se me muera.

Tres golpes, tres pilares rotos,
sangre y cobre en la garganta.
Rodilla, codo, palma... y de nuevo,
el cuerpo aprende lo que el alma aguanta.

Una gota en su frente... no brilla,
es opaca, es fría, es imposible.
Khaal, la copa, el gesto, la orilla...
Ya lo sé: el Sol muere invisible.

No tiemblo por su espada,
tiemblo por la verdad que cargo sola.
Mi voto no dice nada,
pero cada golpe que aguanto, la inmola.

¡REX! ¡REX! ¡REX!
A-EL-WYN... A-EL-WYN...

¡Mi voto me sostiene!
Aunque el sol me queme entera.
No caigo aunque me abandone
todo, menos la promesa.
Golpe a golpe, hueso a hueso,
sigo en pie, aunque no debiera.
¡Mi voto me sostiene!
Aunque el cielo se me muera.

Un paso... otro... y las rodillas ceden.
El mundo gira, el cráter me recibe.
Sola en el centro de lo que se rompió,
de pie, aunque nadie me lo pida.`
      },
      {
        number: 9,
        title: "Syleth, la diosa de la razón — Vuelve",
        description: "Cap. VII, justo después — El Rapto y el rescate de Syleth.",
        linkedTrackId: "syleth-vuelve",
        lyrics: `No siento... no siento. Deduzco.
Pero algo en ti rompe la fórmula.

Mil futuros caen sobre tu mente,
un solo hombre no puede ser todos.
Vi la daga, vi el instante,
vi el error antes que fuera tuyo.

Yo no siento, yo deduzco,
soy la lógica que ordena el mundo entero.
Pero desde que te conduzco,
hay una variable que no resuelvo.

¡Vuelve!
La ecuación está desbalanceada.
¡Vuelve!
Antes que pierdas lo que amabas.
Corto el aire, cruzo el vacío,
mis pies no queman lo que pisan.
¡Vuelve!
No dejaré que la locura te decida.

Camino descalza sobre la arena,
la sangre no toca lo que soy.
El caos se ordena cuando llego,
solo vine a buscarte hoy.

Toco tu sien con dos dedos pálidos,
"la fiebre del futuro no se doma en público."
Tu laurel tiembla, tus ojos se apagan,
te sujeto con fuerza que no es mi cuerpo.

Te he visto morir mil veces,
en mil versiones de este mismo día.
Y aún así, cada vez que apareces,
elijo salvarte... aunque la lógica lo desafía.

¡Vuelve!
La ecuación está desbalanceada.
¡Vuelve!
Antes que pierdas lo que amabas.
Corto el aire, cruzo el vacío,
mis pies no queman lo que pisan.
¡Vuelve!
No dejaré que la locura te decida.

Constantemente imposible...
así te nombré la primera vez.
El portal se cierra como un ojo
que ya ha visto lo que necesitaba ver.`
      }
    ]
  },
  {
    slug: "album-en-preparacion-ii",
    title: "Álbum en preparación II",
    artist: "Crónicas de Caelyndor",
    status: "Próximamente",
    tracklist: []
  },
  {
    slug: "album-en-preparacion-iii",
    title: "Álbum en preparación III",
    artist: "Crónicas de Caelyndor",
    status: "Próximamente",
    tracklist: []
  }
];
