import { assetImage } from "@/data/assets";

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
  tracklist: AlbumTrack[];
};

export const musicAlbums: MusicAlbum[] = [
  {
    slug: "carolina-telarana-de-cristal",
    title: "Carolina Varthalion — Telaraña de Cristal",
    artist: "Carolina Varthalion",
    status: "Disponible",
    heroImage: assetImage("carolinav_portada_album_hero.png"),
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
    slug: "album-en-preparacion-i",
    title: "Álbum en preparación I",
    artist: "Crónicas de Caelyndor",
    status: "Próximamente",
    tracklist: []
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
