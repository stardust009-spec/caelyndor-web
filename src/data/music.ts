import { musicAsset } from "@/data/assets";
import { musicCovers } from "@/data/musicCovers";

export type MusicCategory = "personaje" | "region" | "arco" | "duo" | "especial";

export type MusicTrack = {
  id: string;
  title: string;
  subtitle?: string;
  fileName: string;
  src: string;
  category: MusicCategory;
  related?: string[];
  mood?: string;
  accent?: string;
  coverImage?: string;
};

function track(trackData: Omit<MusicTrack, "src" | "coverImage">): MusicTrack {
  return {
    ...trackData,
    src: musicAsset(trackData.fileName),
    coverImage: musicCovers[trackData.id]
  };
}

export const musicTracks: MusicTrack[] = [
  track({
    id: "rubi-mi-placer-culpable",
    title: "Rubí — Mi Placer Culpable",
    subtitle: "Tema de personaje",
    fileName: "Rubí — Mi Placer Culpable.mp3",
    category: "personaje",
    related: ["Rubí"],
    mood: "Brasa / deseo",
    accent: "rgba(200, 75, 75, 0.34)"
  }),
  track({
    id: "lyzi-lirios-para-una-sombra",
    title: "Lyzi — Lirios para una Sombra",
    subtitle: "Tema de personaje",
    fileName: "Lyzi — Lirios para una Sombra.mp3",
    category: "personaje",
    related: ["Lyzi"],
    mood: "Lirios / sombra",
    accent: "rgba(167, 122, 255, 0.34)"
  }),
  track({
    id: "lyzi-corre-al-primer-perfume",
    title: "Lyzi — Corre al Primer Perfume",
    subtitle: "Tema de personaje",
    fileName: "Lyzi — Corre al Primer Perfume.mp3",
    category: "personaje",
    related: ["Lyzi"],
    mood: "Perfume / huida",
    accent: "rgba(167, 122, 255, 0.34)"
  }),
  track({
    id: "aria-ventoleve-tac-el-compas-que-perdi",
    title: "Aria Ventoleve — Tac (El Compás Que Perdí)",
    subtitle: "Tema de personaje",
    fileName: "Aria Ventoleve — Tac (El Compás Que Perdí).mp3",
    category: "personaje",
    related: ["Aria Ventoleve"],
    mood: "Compás / fractura",
    accent: "rgba(205, 185, 140, 0.34)"
  }),
  track({
    id: "aria-ventoleve-no-mucho",
    title: "Aria Ventoleve — No Mucho",
    subtitle: "Tema de personaje",
    fileName: "Aria Ventoleve — No Mucho.mp3",
    category: "personaje",
    related: ["Aria Ventoleve"],
    mood: "Vals oscuro / teatro",
    accent: "rgba(205, 185, 140, 0.34)"
  }),
  track({
    id: "aria-ventoleve-corazon-de-titeres",
    title: "Aria Ventoleve — Corazón de Títeres",
    subtitle: "Tema de personaje",
    fileName: "Aria Ventoleve — Corazón de Títeres.mp3",
    category: "personaje",
    related: ["Aria Ventoleve"],
    mood: "Títeres / tragedia",
    accent: "rgba(205, 185, 140, 0.34)"
  }),
  track({
    id: "adagio-ventoleve-bendito-y-maldito",
    title: "Adagio Ventoleve — Bendito y Maldito",
    subtitle: "Tema de personaje",
    fileName: "Adagio Ventoleve — Bendito y Maldito.mp3",
    category: "personaje",
    related: ["Adagio Ventoleve"],
    mood: "Bendición / condena",
    accent: "rgba(170, 190, 210, 0.34)"
  }),
  track({
    id: "adagio-ventoleve-letra-chica-con-disrupcion",
    title: "Adagio Ventoleve — Letra Chica con disrupción",
    subtitle: "Tema de personaje",
    fileName: "Adagio Ventoleve — Letra Chica con disrupción.mp3",
    category: "personaje",
    related: ["Adagio Ventoleve"],
    mood: "Contrato / disrupción",
    accent: "rgba(170, 190, 210, 0.34)"
  }),
  track({
    id: "carolina-varthalion-no-hagas-mi-pose",
    title: "Carolina Varthalion — No Hagas Mi Pose",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — No Hagas Mi Pose.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Jazz / Electro-Swing",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-gigante-de-buen-corazon",
    title: "Carolina Varthalion — Gigante de Buen Corazón",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — Gigante de Buen Corazon.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Jazz / Electro-Swing",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-luna-escarcha-no-duerme",
    title: "Carolina Varthalion — Luna-Escarcha No Duerme",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — Luna-Escarcha No Duerme.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Jazz / Electro-Swing",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-no-me-van-a-callar",
    title: "Carolina Varthalion — No Me Van a Callar",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — No Me Van a Callar.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Electro-Swing / Big Band Jazz",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-el-guion-de-la-arana-remix",
    title: "Carolina Varthalion — El guion de la araña (Remix)",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — El guion de la araña Remix.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Electro-Swing / Big Band Jazz",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-el-espejo",
    title: "Carolina Varthalion — El Espejo",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — El Espejo.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Electro-Swing / Big Band Jazz",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-objecion-su-senoria",
    title: "Carolina Varthalion — Objeción, Su Señoría",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — Objecion Su Senoria.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Electro-Swing / Big Band Jazz",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-cristal-mortal",
    title: "Carolina Varthalion — Cristal Mortal",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — Cristal Mortal.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Electro-Swing / Big Band Jazz",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-por-que-aplauden",
    title: "Carolina Varthalion — ¿Por qué aplauden?",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — Por qué aplauden.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Noir / Diva / Cabaret / Electro-Swing / Big Band Jazz",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "carolina-varthalion-el-diamante-del-sol-negro-mirame",
    title: "Carolina Varthalion — El Diamante del Sol Negro — Mírame",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — El Diamante del Sol Negro — Mirame.mp3",
    category: "personaje",
    related: ["Carolina Varthalion", "Sol Negro"],
    mood: "Electro-Swing / Noir / Big Band Jazz / Diva / Sol Negro",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "valdemar-nocturne-es-dificil-ser-yo",
    title: "Valdemar Nocturne — Es difícil ser yo",
    subtitle: "Tema de personaje",
    fileName: "Valdemar Nocturne — Es dificil ser yo.mp3",
    category: "personaje",
    related: ["Valdemar"],
    mood: "Nocturno / íntimo",
    accent: "rgba(125, 105, 170, 0.34)"
  }),
  track({
    id: "sethriss-y-para-que",
    title: "Sethriss — Y para que",
    subtitle: "Tema de personaje",
    fileName: "Sethriss — Y para que.mp3",
    category: "personaje",
    related: ["Sethriss"],
    mood: "Sombrío / herido",
    accent: "rgba(120, 95, 145, 0.34)"
  }),
  track({
    id: "alistair-valerius-el-nombre-todavia-mio",
    title: "Alistair Valerius — El nombre todavía mío",
    subtitle: "Tema de personaje",
    fileName: "Alistair Valerius — El nombre todavia mio.mp3",
    category: "personaje",
    related: ["Alistair Valerius"],
    mood: "Dogma / redención",
    accent: "rgba(210, 190, 170, 0.34)"
  }),
  track({
    id: "rubi-el-caldero-y-la-lluvia-tibia",
    title: "Rubí — El caldero y la lluvia tibia",
    subtitle: "Tema de personaje",
    fileName: "Rubi — El caldero y la lluvia tibia.mp3",
    category: "personaje",
    related: ["Rubí"],
    mood: "Brasa / ternura",
    accent: "rgba(200, 75, 75, 0.34)"
  }),
  track({
    id: "nayara-regina-glaciei",
    title: "Nayara — Regina Glaciei",
    subtitle: "Tema de personaje",
    fileName: "Nayara — Regina Glaciei.mp3",
    category: "personaje",
    related: ["Nayara"],
    mood: "Regio / glacial",
    accent: "rgba(159, 207, 213, 0.34)"
  }),
  track({
    id: "sylvalis-la-flauta-rota-del-bosque",
    title: "Sylvalis — La flauta rota del bosque",
    subtitle: "Archivo regional",
    fileName: "Sylvalis — La flauta rota del bosque.mp3",
    category: "region",
    related: ["Sylvalis"],
    mood: "Bosque / ruina",
    accent: "rgba(126, 174, 138, 0.34)"
  }),
  track({
    id: "cindralith-cuando-la-arena-muerde",
    title: "Cindralith — Cuando la arena muerde",
    subtitle: "Archivo regional",
    fileName: "Cindralith — Cuando la arena muerde.mp3",
    category: "region",
    related: ["Cindralith"],
    mood: "Arena / fuego",
    accent: "rgba(210, 120, 90, 0.34)"
  }),
  track({
    id: "caelyndor-prologo-del-vacio",
    title: "Caelyndor — Prólogo del vacío",
    subtitle: "Tema de arco",
    fileName: "Caelyndor — Prólogo del vacío.mp3",
    category: "arco",
    related: ["Caelyndor"],
    mood: "Abismo / umbral",
    accent: "rgba(154, 125, 255, 0.34)"
  }),
  track({
    id: "rubi-rubizilla-el-juicio-de-cindralith",
    title: "Rubí — Rubizilla — El juicio de Cindralith",
    subtitle: "Especial",
    fileName: "Rubí — Rubizilla — El juicio de Cindralith.mp3",
    category: "especial",
    related: ["Rubí", "Cindralith"],
    mood: "Colosal / ritual",
    accent: "rgba(220, 70, 45, 0.34)"
  }),
  track({
    id: "lyzi-lyzi-sentai-llamado-astral",
    title: "Lyzi — Lyzi Sentai — Llamado astral",
    subtitle: "Especial",
    fileName: "Lyzi — Lyzi Sentai — Llamado astral.mp3",
    category: "especial",
    related: ["Lyzi"],
    mood: "Astral / llamado",
    accent: "rgba(167, 122, 255, 0.34)"
  }),
  track({
    id: "sylvalis-sacred-language-of-sylvalis",
    title: "Sylvalis — Sacred Language of Sylvalis",
    subtitle: "Archivo regional",
    fileName: "Sylvalis — Sacred Language of Sylvalis.mp3",
    category: "region",
    related: ["Sylvalis"],
    mood: "Sagrado / coral",
    accent: "rgba(139, 198, 223, 0.34)"
  }),
  track({
    id: "rubi-rubikick",
    title: "Rubí — Rubikick",
    subtitle: "Tema de personaje",
    fileName: "Rubi — Rubikick.mp3",
    category: "personaje",
    related: ["Rubí"],
    mood: "Impulso / brasa",
    accent: "rgba(200, 75, 75, 0.34)"
  }),
  track({
    id: "yuki-arhess-yukis-reign",
    title: "Yuki Arhess — Yukis Reign",
    subtitle: "Tema de personaje",
    fileName: "Yuki Arhess — Yukis Reign.mp3",
    category: "personaje",
    related: ["Yuki Arhess"],
    mood: "Corona / hielo",
    accent: "rgba(139, 198, 223, 0.34)"
  }),
  track({
    id: "noctalypse-tema-principal",
    title: "Noctalypse — Tema principal",
    subtitle: "Tema de personaje",
    fileName: "Noctalypse — Tema principal.mp3",
    category: "personaje",
    related: ["Noctalypse"],
    mood: "Eclipse / abismo",
    accent: "rgba(123, 92, 168, 0.34)"
  }),
  track({
    id: "rubi-yuki-ignis-et-glacies-ruina-auri-fase-2",
    title: "Rubí & Yuki — Ignis et Glacies — Ruina Auri (Fase 2)",
    subtitle: "Dúo / arco",
    fileName: "Rubi & Yuki — Ignis et Glacies — Ruina Auri (Fase 2).mp3",
    category: "duo",
    related: ["Rubí", "Yuki", "Ruina Auri"],
    mood: "Fuego / hielo",
    accent: "rgba(170, 145, 190, 0.34)"
  }),
  track({
    id: "caelyndor-the-corrupted-sanctuary",
    title: "Caelyndor — The Corrupted Sanctuary",
    subtitle: "Tema de arco",
    fileName: "Caelyndor — The Corrupted Sanctuary.mp3",
    category: "arco",
    related: ["Caelyndor"],
    mood: "Sagrario / corrupción",
    accent: "rgba(90, 70, 115, 0.34)"
  }),
  track({
    id: "lyzi-noctalypse-lago-sin-luna",
    title: "Lyzi & Noctalypse — Lago sin Luna",
    subtitle: "Dúo",
    fileName: "Lyzi & Noctalypse — Lago sin luna.mp3",
    category: "duo",
    related: ["Lyzi", "Noctalypse"],
    mood: "Lunar / abisal",
    accent: "rgba(126, 98, 220, 0.34)"
  }),
  track({
    id: "seralynn-faelan-el-vals-de-los-vareth",
    title: "Seralynn & Faelan — El vals de los Vareth",
    subtitle: "Dúo",
    fileName: "Seralynn & Faelan — El vals de los Vareth.mp3",
    category: "duo",
    related: ["Seralynn", "Faelan"],
    mood: "Bosque / vals",
    accent: "rgba(127, 174, 138, 0.34)"
  }),
  track({
    id: "jurakthalon-predador-lyrzal",
    title: "JurakThalon — Predador LyrZal",
    subtitle: "Especial",
    fileName: "JurakThalon — Predador LyrZal.mp3",
    category: "especial",
    related: ["JurakThalon", "LyrZal"],
    mood: "Predador / salvaje",
    accent: "rgba(184, 74, 61, 0.34)"
  }),
  track({
    id: "carolina-varthalion-el-guion-de-la-arana",
    title: "Carolina Varthalion — El guion de la araña",
    subtitle: "Tema de personaje",
    fileName: "Carolina Varthalion — El guion de la araña.mp3",
    category: "personaje",
    related: ["Carolina Varthalion"],
    mood: "Escena / percepción",
    accent: "rgba(235, 210, 170, 0.34)"
  }),
  track({
    id: "aelrhyssa-liraethar-el-eco-de-la-corona",
    title: "Aelrhyssa — Lirae’thar — El eco de la corona",
    subtitle: "Tema de personaje",
    fileName: "Aelrhyssa — Lirae’thar — El eco de la corona.mp3",
    category: "personaje",
    related: ["Aelrhyssa", "Lirae’thar"],
    mood: "Corona / custodia",
    accent: "rgba(210, 120, 90, 0.34)"
  }),
  track({
    id: "eryndhel-retentio-mali",
    title: "Eryndhel — Retentio Mali",
    subtitle: "Tema de personaje",
    fileName: "Eryndhel — Retentio Mali.mp3",
    category: "personaje",
    related: ["Eryndhel"],
    mood: "Retención / sombra",
    accent: "rgba(145, 120, 170, 0.34)"
  }),
  track({
    id: "kaen-varthalion-banquete-de-ceniza",
    title: "Kaen Varthalion — Banquete de ceniza",
    subtitle: "Tema de arco",
    fileName: "Kaen Varthalion — Banquete de ceniza.mp3",
    category: "arco",
    related: ["Kaen Varthalion", "Sol Negro"],
    mood: "Ceniza / trono",
    accent: "rgba(170, 65, 45, 0.34)"
  }),
  track({
    id: "adagio-ventoleve-el-poema-de-bragi",
    title: "Adagio Ventoleve — El poema de Bragi",
    subtitle: "Tema de personaje",
    fileName: "Adagio Ventoleve — El poema de Bragi.mp3",
    category: "personaje",
    related: ["Adagio Ventoleve"],
    mood: "Poema / viento",
    accent: "rgba(170, 190, 210, 0.34)"
  }),
  track({
    id: "noctalypse-eclipse",
    title: "Noctalypse — Eclipse",
    subtitle: "Tema de personaje",
    fileName: "Noctalypse — Eclipse.mp3",
    category: "personaje",
    related: ["Noctalypse"],
    mood: "Eclipse / ruptura",
    accent: "rgba(123, 92, 168, 0.34)"
  }),
  track({
    id: "lyzi-ecos-de-sylvalis",
    title: "Lyzi — Ecos de Sylvalis",
    subtitle: "Tema de personaje",
    fileName: "Lyzi — Ecos de Sylvalis.mp3",
    category: "personaje",
    related: ["Lyzi", "Sylvalis"],
    mood: "Eco / astral",
    accent: "rgba(167, 122, 255, 0.34)"
  }),
  track({
    id: "yuki-arhess-mirame-en-silencio",
    title: "Yuki Arhess — Mírame en silencio",
    subtitle: "Tema de personaje",
    fileName: "Yuki Arhess — Mirame en silencio.mp3",
    category: "personaje",
    related: ["Yuki Arhess"],
    mood: "Silencio / hielo",
    accent: "rgba(139, 198, 223, 0.34)"
  }),
  track({
    id: "rubi-atrapame-si-puedes",
    title: "Rubí — Atrápame si puedes",
    subtitle: "Tema de personaje",
    fileName: "Rubi — Atrápame si puedes.mp3",
    category: "personaje",
    related: ["Rubí"],
    mood: "Juego / brasa",
    accent: "rgba(200, 75, 75, 0.34)"
  }),
  track({
    id: "aria-ventoleve-ballet-sin-vida",
    title: "Aria Ventoleve — Ballet sin vida",
    subtitle: "Tema de personaje",
    fileName: "Aria Ventoleve — Ballet sin vida.mp3",
    category: "personaje",
    related: ["Aria Ventoleve"],
    mood: "Ballet / presagio",
    accent: "rgba(205, 185, 140, 0.34)"
  }),
  track({
    id: "caelyndor-fomo-geologico",
    title: "Caelyndor — FOMO Geológico",
    subtitle: "Tema de arco",
    fileName: "Caelyndor — FOMO Geológico.mp3",
    category: "arco",
    related: ["Caelyndor"],
    mood: "Feria / vértigo",
    accent: "rgba(225, 175, 105, 0.34)"
  }),
  track({
    id: "caelyndor-un-veinte-para-volver-a-reir",
    title: "Caelyndor — Un Veinte para Volver a Reír",
    subtitle: "Tema de arco",
    fileName: "Caelyndor — Un Veinte para Volver a Reír.mp3",
    category: "arco",
    related: ["Caelyndor"],
    mood: "Feria / risa",
    accent: "rgba(225, 175, 105, 0.34)"
  }),
  track({
    id: "caelyndor-ovejas-pop-corn-y-polvos-sospechosos",
    title: "Caelyndor — Ovejas Pop-Corn y Polvos Sospechosos",
    subtitle: "Tema de arco",
    fileName: "Caelyndor — Ovejas Pop-Corn y Polvos Sospechosos.mp3",
    category: "arco",
    related: ["Caelyndor"],
    mood: "Feria / travesura",
    accent: "rgba(225, 175, 105, 0.34)"
  }),
  track({
    id: "caelyndor-gran-feria-gran",
    title: "Caelyndor — Gran Feria Gran",
    subtitle: "Tema de arco",
    fileName: "Caelyndor — Gran Feria Gran.mp3",
    category: "arco",
    related: ["Caelyndor"],
    mood: "Feria / pregón",
    accent: "rgba(225, 175, 105, 0.34)"
  }),
  track({
    id: "caelyndor-el-folleto-bajo-la-ceniza",
    title: "Caelyndor — El Folleto Bajo la Ceniza",
    subtitle: "Tema de arco",
    fileName: "Caelyndor — El Folleto Bajo la Ceniza.mp3",
    category: "arco",
    related: ["Caelyndor"],
    mood: "Feria / ceniza",
    accent: "rgba(225, 175, 105, 0.34)"
  }),
  track({
    id: "caelyndor-el-ultimo-baculo-del-lich-lord",
    title: "Caelyndor — El Último Báculo del Lich Lord",
    subtitle: "Tema de arco",
    fileName: "Caelyndor — El Último Báculo del Lich Lord.mp3",
    category: "arco",
    related: ["Caelyndor"],
    mood: "Feria / conjuro",
    accent: "rgba(225, 175, 105, 0.34)"
  }),
  track({
    id: "adagio-ventoleve-marcha-nupcial-la-hermana-que-perdi",
    title: "Adagio Ventoleve — Marcha Nupcial; La hermana que perdí",
    subtitle: "Tema de personaje",
    fileName: "Adagio Ventoleve — Marcha Nupcial; La hermana que perdí.mp3",
    category: "personaje",
    related: ["Adagio Ventoleve"],
    mood: "Nupcial / duelo",
    accent: "rgba(170, 190, 210, 0.34)"
  })
];
