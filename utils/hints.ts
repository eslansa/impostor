// Sistema de generación de pistas inteligentes para el impostor

import { CATEGORIES_CONFIG } from '@/constants/categories';
import { CategoryKey } from '@/types/game';

// Definir pistas específicas para diferentes categorías y características de palabras
const HINT_GENERATORS: {
  [key in CategoryKey]: (word: string) => string[];
} = {
  comida: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();
    
    // Pistas basadas en características de la comida
    if (lowerWord.includes('arroz') || lowerWord.includes('congri') || lowerWord.includes('moros')) {
      hints.push('Contiene arroz');
    }
    if (lowerWord.includes('pollo') || lowerWord.includes('pollo')) {
      hints.push('Hecho con pollo');
    }
    if (lowerWord.includes('cerdo') || lowerWord.includes('lechon') || lowerWord.includes('puerco')) {
      hints.push('Hecho con cerdo');
    }
    if (lowerWord.includes('frito') || lowerWord.includes('frita')) {
      hints.push('Se cocina frito');
    }
    if (lowerWord.includes('dulce') || lowerWord.includes('flan') || lowerWord.includes('pastel') || lowerWord.includes('tres leches')) {
      hints.push('Es un postre');
    }
    if (lowerWord.includes('bebida') || lowerWord.includes('ron') || lowerWord.includes('cerveza') || lowerWord.includes('mojito') || lowerWord.includes('daiquiri')) {
      hints.push('Es una bebida');
    }
    if (lowerWord.includes('sopa') || lowerWord.includes('caldo')) {
      hints.push('Es una sopa');
    }
    if (lowerWord.includes('croqueta') || lowerWord.includes('empanada') || lowerWord.includes('tamal')) {
      hints.push('Es un aperitivo');
    }
    if (lowerWord.includes('pan') || lowerWord.includes('sandwich') || lowerWord.includes('medianoche')) {
      hints.push('Es un bocadillo');
    }
    if (lowerWord.includes('pescado') || lowerWord.includes('camarones') || lowerWord.includes('langosta') || lowerWord.includes('cangrejo')) {
      hints.push('Es marisco o pescado');
    }
    
    // Pistas generales por defecto
    if (hints.length === 0) {
      hints.push('Es un plato cubano');
      hints.push('Se come en Cuba');
      if (lowerWord.length > 10) {
        hints.push('Nombre compuesto');
      }
    }
    
    return hints;
  },
  
  lugares: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();
    
    // Identificar ciudades principales
    const ciudades = ['habana', 'santiago', 'trinidad', 'holguin', 'camaguey', 'cienfuegos', 'pinar', 'matanzas', 'varadero', 'baracoa', 'bayamo', 'manzanillo'];
    if (ciudades.some(ciudad => lowerWord.includes(ciudad))) {
      hints.push('Es una ciudad cubana');
    }
    
    // Barrios de La Habana
    const barrios = ['vedado', 'miramar', 'cerro', 'centro habana', 'marianao', 'playa', 'guanabacoa', 'regla', 'alamar'];
    if (barrios.some(barrio => lowerWord.includes(barrio))) {
      hints.push('Es un barrio de La Habana');
    }
    
    // Lugares turísticos
    if (lowerWord.includes('cayo') || lowerWord.includes('varadero') || lowerWord.includes('tropicana') || lowerWord.includes('capitolio') || lowerWord.includes('morro')) {
      hints.push('Es un lugar turístico');
    }
    
    // Lugares culturales
    if (lowerWord.includes('teatro') || lowerWord.includes('museo') || lowerWord.includes('plaza') || lowerWord.includes('parque')) {
      hints.push('Es un lugar cultural');
    }
    
    // Lugares gastronómicos
    if (lowerWord.includes('coppelia') || lowerWord.includes('floridita') || lowerWord.includes('bodeguita')) {
      hints.push('Es un lugar para comer');
    }
    
    if (hints.length === 0) {
      hints.push('Es un lugar de Cuba');
    }
    
    return hints;
  },
  
  influencers: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();
    
    // Artistas musicales
    if (lowerWord.includes('el ') || lowerWord.includes('la ') || lowerWord.includes('los ') || lowerWord.includes('las ')) {
      if (lowerWord.includes('zona') || lowerWord.includes('orishas') || lowerWord.includes('van van') || lowerWord.includes('banda') || lowerWord.includes('charanga')) {
        hints.push('Es un artista o grupo musical');
      } else {
        hints.push('Es una figura pública cubana');
      }
    }
    
    // Identificar si es músico específico
    const musicos = ['gente de zona', 'celia cruz', 'gloria estefan', 'pitbull', 'silvio rodriguez', 'pablo milanes'];
    if (musicos.some(musico => lowerWord.includes(musico.toLowerCase()))) {
      hints.push('Es un artista musical reconocido');
    }
    
    // Actores/actrices
    if (lowerWord.includes('william levy') || lowerWord.includes('ana de armas') || lowerWord.includes('daisy fuentes')) {
      hints.push('Es actor o actriz');
    }
    
    // Figuras públicas/influencers
    if (lowerWord.includes('otaola') || lowerWord.includes('pánfilo') || lowerWord.includes('luis manuel')) {
      hints.push('Es una figura pública');
    }
    
    if (hints.length === 0) {
      hints.push('Es una persona cubana reconocida');
    }
    
    return hints;
  },
  
  jerga: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();
    
    // Saludos
    if (lowerWord === 'asere' || lowerWord === 'acere' || lowerWord === 'socio' || lowerWord === 'consorte') {
      hints.push('Es una forma de saludo');
    }
    
    // Adjetivos
    if (lowerWord === 'tremendo' || lowerWord === 'candela' || lowerWord === 'duro' || lowerWord === 'guapo') {
      hints.push('Es un adjetivo');
    }
    
    // Verbos
    if (lowerWord === 'resolver' || lowerWord === 'luchar' || lowerWord === 'inventar' || lowerWord === 'coger' || lowerWord === 'botar') {
      hints.push('Es un verbo');
    }
    
    // Sustantivos relacionados con transporte
    if (lowerWord.includes('guagua') || lowerWord.includes('almendron') || lowerWord.includes('botero')) {
      hints.push('Relacionado con transporte');
    }
    
    // Sustantivos relacionados con comida/bebida
    if (lowerWord === 'jama' || lowerWord === 'guarapo' || lowerWord === 'timba') {
      hints.push('Relacionado con comida o bebida');
    }
    
    // Ropa/objetos personales
    if (lowerWord === 'chancleta' || lowerWord === 'tenis' || lowerWord === 'chopin' || lowerWord === 'guayabera') {
      hints.push('Es algo que se usa o se viste');
    }
    
    // Expresiones vulgares
    if (lowerWord === 'pinga' || lowerWord === 'comemierda' || lowerWord === 'singao') {
      hints.push('Es una expresión coloquial fuerte');
    }
    
    if (hints.length === 0) {
      hints.push('Es una palabra de jerga cubana');
    }
    
    return hints;
  },
  
  cosas: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();
    
    // Música y danza
    if (lowerWord.includes('salsa') || lowerWord.includes('son') || lowerWord.includes('rumba') || lowerWord.includes('timba') || lowerWord.includes('reggaeton') || lowerWord.includes('casino')) {
      hints.push('Es un género musical o danza');
    }
    
    // Instrumentos
    if (lowerWord.includes('bongo') || lowerWord.includes('tumbadora') || lowerWord.includes('güiro') || lowerWord.includes('maracas') || lowerWord.includes('trompeta') || lowerWord.includes('clave') || lowerWord.includes('batá')) {
      hints.push('Es un instrumento musical');
    }
    
    // Ropa/vestimenta
    if (lowerWord.includes('guayabera') || lowerWord.includes('sombrero') || lowerWord.includes('bermuda') || lowerWord.includes('chancleta') || lowerWord.includes('gorra') || lowerWord.includes('visera')) {
      hints.push('Es una prenda de vestir');
    }
    
    // Objetos de cocina
    if (lowerWord.includes('caldero') || lowerWord.includes('sarten') || lowerWord.includes('cuchillo') || lowerWord.includes('tenedor') || lowerWord.includes('cuchara') || lowerWord.includes('plato')) {
      hints.push('Se usa en la cocina');
    }
    
    // Religión/santería
    if (lowerWord.includes('santeria') || lowerWord.includes('oricha') || lowerWord.includes('changó') || lowerWord.includes('yemayá') || lowerWord.includes('ochún') || lowerWord.includes('babalawo')) {
      hints.push('Relacionado con religión o creencias');
    }
    
    // Tecnología
    if (lowerWord.includes('celular') || lowerWord.includes('computadora') || lowerWord.includes('television') || lowerWord.includes('radio') || lowerWord.includes('laptop') || lowerWord.includes('tablet')) {
      hints.push('Es un dispositivo electrónico');
    }
    
    // Objetos cotidianos
    if (lowerWord.includes('bicicleta') || lowerWord.includes('domino') || lowerWord.includes('pelota')) {
      hints.push('Es un objeto común');
    }
    
    // Pista por defecto si no se encontró nada específico
    if (hints.length === 0) {
      hints.push('Es algo típicamente cubano');
    }
    
    return hints;
  },
  
  deportes: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();
    
    // Deportistas
    if (lowerWord.includes('stevenson') || lowerWord.includes('savón') || lowerWord.includes('sotomayor') || lowerWord.includes('pedroso')) {
      hints.push('Es un deportista cubano famoso');
    }
    
    // Boxeo
    if (lowerWord === 'boxeo' || lowerWord.includes('gamboa') || lowerWord.includes('rigondeaux') || lowerWord.includes('lara')) {
      hints.push('Relacionado con boxeo');
    }
    
    // Béisbol
    if (lowerWord === 'beisbol' || lowerWord === 'industriales' || lowerWord.includes('serie nacional') || lowerWord.includes('estadio latinoamericano')) {
      hints.push('Relacionado con béisbol');
    }
    
    // Atletismo
    if (lowerWord === 'atletismo' || lowerWord.includes('sotomayor') || lowerWord.includes('moreno') || lowerWord.includes('salto')) {
      hints.push('Relacionado con atletismo');
    }
    
    // Equipos de béisbol
    if (lowerWord === 'industriales' || lowerWord === 'santiago' || lowerWord === 'villa clara' || lowerWord === 'pinar del rio') {
      hints.push('Es un equipo de béisbol cubano');
    }
    
    // Eventos deportivos
    if (lowerWord.includes('juegos') || lowerWord.includes('olimpicos') || lowerWord.includes('panamericanos') || lowerWord.includes('serie del caribe')) {
      hints.push('Es un evento deportivo');
    }
    
    if (hints.length === 0) {
      hints.push('Es algo relacionado con deportes cubanos');
    }
    
    return hints;
  },
  
  historia: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();
    
    // Personajes históricos
    if (lowerWord.includes('marti') || lowerWord.includes('maceo') || lowerWord.includes('gomez') || lowerWord.includes('cespedes')) {
      hints.push('Es un personaje histórico cubano');
    }
    
    // Figuras de la revolución
    if (lowerWord.includes('castro') || lowerWord.includes('guevara') || lowerWord.includes('cienfuegos')) {
      hints.push('Es una figura de la revolución cubana');
    }
    
    // Escritores
    if (lowerWord.includes('guillen') || lowerWord.includes('carpentier') || lowerWord.includes('lezama') || lowerWord.includes('pinera')) {
      hints.push('Es un escritor cubano');
    }
    
    // Eventos históricos
    if (lowerWord.includes('guerra') || lowerWord.includes('batalla') || lowerWord.includes('revolucion') || lowerWord.includes('asalto')) {
      hints.push('Es un evento histórico cubano');
    }
    
    // Monumentos
    if (lowerWord.includes('monumento') || lowerWord.includes('memorial') || lowerWord.includes('castillo') || lowerWord.includes('fortaleza')) {
      hints.push('Es un monumento o lugar histórico');
    }
    
    // Lugares históricos
    if (lowerWord.includes('plaza') || lowerWord.includes('capitolio') || lowerWord.includes('cementerio') || lowerWord.includes('universidad')) {
      hints.push('Es un lugar histórico de Cuba');
    }
    
    if (hints.length === 0) {
      hints.push('Es algo de la historia cubana');
    }
    
    return hints;
  },
  
  tradiciones: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();
    
    // Festividades
    if (lowerWord.includes('carnaval') || lowerWord.includes('parrandas') || lowerWord.includes('festival')) {
      hints.push('Es una festividad cubana');
    }
    
    // Celebraciones familiares
    if (lowerWord.includes('quinceañera') || lowerWord.includes('bautizo') || lowerWord.includes('casamiento')) {
      hints.push('Es una celebración familiar');
    }
    
    // Fechas importantes
    if (lowerWord.includes('día') || lowerWord.includes('nochebuena') || lowerWord.includes('año nuevo')) {
      hints.push('Es una fecha de celebración');
    }
    
    // Música y danza tradicional
    if (lowerWord.includes('toque') || lowerWord.includes('tambor') || lowerWord.includes('bembé') || lowerWord.includes('comparsa')) {
      hints.push('Relacionado con música o danza tradicional');
    }
    
    // Bailes
    if (lowerWord.includes('casino') || lowerWord.includes('danzon') || lowerWord.includes('bolero') || lowerWord.includes('guateque')) {
      hints.push('Es un baile o evento musical tradicional');
    }
    
    // Símbolos nacionales
    if (lowerWord.includes('bandera') || lowerWord.includes('escudo') || lowerWord.includes('himno') || lowerWord.includes('estrella solitaria')) {
      hints.push('Es un símbolo nacional cubano');
    }
    
    // Flora y fauna simbólica
    if (lowerWord.includes('palma') || lowerWord.includes('tocororo') || lowerWord.includes('mariposa')) {
      hints.push('Es un símbolo natural de Cuba');
    }
    
    if (hints.length === 0) {
      hints.push('Es una tradición cubana');
    }
    
    return hints;
  },
  
  naturaleza: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Animales
    if (lowerWord.includes('tocororo') || lowerWord.includes('jutia') || lowerWord.includes('cocodrilo') || lowerWord.includes('manati')) {
      hints.push('Es un animal cubano');
    }

    // Aves
    if (lowerWord.includes('zunzuncito') || lowerWord.includes('colibri') || lowerWord.includes('sinsonte') || lowerWord.includes('totí')) {
      hints.push('Es un ave cubana');
    }

    // Plantas
    if (lowerWord.includes('palma') || lowerWord.includes('ceiba') || lowerWord.includes('mamey') || lowerWord.includes('guanabana')) {
      hints.push('Es una planta cubana');
    }

    // Frutas
    if (lowerWord.includes('mango') || lowerWord.includes('piña') || lowerWord.includes('coco') || lowerWord.includes('mamey')) {
      hints.push('Es una fruta tropical');
    }

    // Cultivos
    if (lowerWord.includes('tabaco') || lowerWord.includes('cafe') || lowerWord.includes('caña') || lowerWord.includes('arroz')) {
      hints.push('Es un cultivo cubano');
    }

    // Lugares naturales
    if (lowerWord.includes('sierra') || lowerWord.includes('valle') || lowerWord.includes('pico') || lowerWord.includes('cueva')) {
      hints.push('Es un lugar natural de Cuba');
    }

    // Playas y cayos
    if (lowerWord.includes('playa') || lowerWord.includes('cayo') || lowerWord.includes('archipielago')) {
      hints.push('Es un lugar costero de Cuba');
    }

    // Reservas y parques
    if (lowerWord.includes('reserva') || lowerWord.includes('parque') || lowerWord.includes('biosfera') || lowerWord.includes('jardin botanico')) {
      hints.push('Es un área protegida o parque natural');
    }

    if (hints.length === 0) {
      hints.push('Es algo de la naturaleza cubana');
    }

    return hints;
  },

  malas_palabras: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Insultos comunes
    if (lowerWord === 'comemierda' || lowerWord === 'singao' || lowerWord === 'cabron' || lowerWord === 'mamaguevo' || lowerWord === 'pendejo' || lowerWord.includes('hijo de puta') || lowerWord.includes('puta')) {
      hints.push('Es un insulto común en Cuba');
    }

    // Palabras relacionadas con "pinga"
    if (lowerWord.includes('pinga') || lowerWord === 'pingón' || lowerWord === 'pinguita' || lowerWord === 'pingazo' || lowerWord === 'pingaza') {
      hints.push('Palabra relacionada con anatomía masculina (vulgar)');
      hints.push('Muy usada en el vocabulario callejero cubano');
    }

    // Expresiones con "singao/singar"
    if (lowerWord.includes('sing') || lowerWord === 'singar' || lowerWord === 'singarse' || lowerWord === 'singón' || lowerWord === 'singuero' || lowerWord === 'singadera') {
      hints.push('Expresión vulgar muy común en Cuba');
      hints.push('Relacionada con actos sexuales');
    }

    // Expresiones con "cagar/mierda"
    if (lowerWord.includes('cagar') || lowerWord.includes('mierda') || lowerWord.includes('cago')) {
      hints.push('Expresión escatológica');
      hints.push('Usada para expresar enojo o disgusto');
    }

    // Verbos vulgares
    if (lowerWord === 'joder' || lowerWord === 'joderse' || lowerWord === 'templar' || lowerWord === 'templarse' || lowerWord === 'chingar' || lowerWord === 'chinarse' || lowerWord === 'tirar' || lowerWord === 'tirarse') {
      hints.push('Es un verbo vulgar cubano');
    }

    // Anatomía vulgar - términos femeninos
    if (lowerWord === 'toto' || lowerWord === 'crica' || lowerWord === 'chocha' || lowerWord === 'coño' || lowerWord === 'panocha' || lowerWord === 'ñema' || lowerWord === 'bollito') {
      hints.push('Término vulgar para anatomía femenina');
      hints.push('Palabra considerada muy obscena');
    }

    // Anatomía vulgar - términos masculinos
    if (lowerWord === 'rabo' || lowerWord === 'güevo' || lowerWord === 'guevos' || lowerWord === 'cojones' || lowerWord === 'bicho' || lowerWord === 'verga') {
      hints.push('Término vulgar para anatomía masculina');
      hints.push('Palabra usada en conversaciones informales');
    }

    // Anatomía vulgar - términos generales del cuerpo
    if (lowerWord === 'tetas' || lowerWord === 'tetona' || lowerWord === 'culo' || lowerWord === 'culona' || lowerWord === 'nalgas' || lowerWord === 'nalgona') {
      hints.push('Término vulgar para partes del cuerpo');
      hints.push('Palabra considerada obscena');
    }

    // Insultos relacionados con "lamber/chupar"
    if (lowerWord.includes('lam') || lowerWord.includes('chup') || lowerWord === 'lambeculo' || lowerWord === 'chupamedias' || lowerWord === 'lambón') {
      hints.push('Insulto que implica servilismo');
      hints.push('Se usa para alguien que adula mucho');
    }

    // Expresiones largas de maldición
    if (lowerWord.includes('me cago') || lowerWord.includes('vete pa') || lowerWord.includes('vete al') || lowerWord.includes('que te parta')) {
      hints.push('Es una expresión de maldición cubana');
      hints.push('Frase completa muy vulgar');
    }

    // Palabras relacionadas con "coño"
    if (lowerWord.includes('coño') || lowerWord === 'coñazo') {
      hints.push('Expresión muy común en Cuba');
      hints.push('Se usa como interjección o insulto');
    }

    // Estados/adjetivos vulgares
    if (lowerWord === 'empingado' || lowerWord === 'papeado' || lowerWord === 'tragado' || lowerWord === 'jodido') {
      hints.push('Adjetivo vulgar cubano');
      hints.push('Describe un estado o condición');
    }

    // Comportamientos negativos
    if (lowerWord === 'mariconería' || lowerWord === 'boberias' || lowerWord === 'chusmeria' || lowerWord === 'jodedera') {
      hints.push('Término despectivo para un comportamiento');
      hints.push('Palabra ofensiva usada en Cuba');
    }

    // Insultos fuertes compuestos
    if (lowerWord.includes('cara de') || lowerWord.includes('pedazo de') || lowerWord.includes('de mierda')) {
      hints.push('Insulto compuesto muy ofensivo');
      hints.push('Combinación de palabras vulgares');
    }

    // Otros insultos específicos
    if (lowerWord === 'malparido' || lowerWord === 'desgraciado' || lowerWord === 'malnacido' || lowerWord === 'comecandela') {
      hints.push('Insulto fuerte cubano');
      hints.push('Palabra muy ofensiva');
    }

    // Verbos relacionados con excreción
    if (lowerWord === 'mear' || lowerWord === 'mearse') {
      hints.push('Verbo vulgar de función corporal');
    }

    // Acciones vulgares con objetos/personas
    if (lowerWord.includes('fletar') || lowerWord.includes('tumbar') || lowerWord.includes('botar pa')) {
      hints.push('Verbo de acción despectiva');
      hints.push('Expresión para deshacerse de alguien');
    }

    // Pistas generales si no se encontró nada específico
    if (hints.length === 0) {
      hints.push('Es una mala palabra cubana');
      hints.push('Expresión vulgar o grosera');
      hints.push('No apta para menores');
    }

    return hints;
  },

  dichos_refranes: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Refranes populares clásicos
    if (lowerWord.includes('padrino') || lowerWord.includes('camarón') || lowerWord.includes('tamal') || lowerWord.includes('perro que ladra') || lowerWord.includes('pájaro en mano') || lowerWord.includes('caballo regalado')) {
      hints.push('Es un refrán popular');
      hints.push('Dicho tradicional cubano');
    }

    // Dichos con "estar"
    if (lowerWord.startsWith('estar ')) {
      hints.push('Es un dicho que describe un estado');
      hints.push('Expresión coloquial con "estar"');
    }

    // Frases sobre dinero o pobreza
    if (lowerWord.includes('kilo') || lowerWord.includes('chele') || lowerWord.includes('caerse muerto') || lowerWord.includes('pelado') || lowerWord.includes('duro') || lowerWord.includes('arrancado')) {
      hints.push('Expresión relacionada con dinero o pobreza');
      hints.push('Habla sobre dificultades económicas');
    }

    // Frases sobre la situación
    if (lowerWord.includes('la cosa está') || lowerWord.includes('no pasa nada') || lowerWord.includes('todo está bien')) {
      hints.push('Frase hecha sobre la situación actual');
      hints.push('Expresión común en conversaciones');
    }

    // Saludos y preguntas comunes
    if (lowerWord.includes('qué bolá') || lowerWord.includes('qué vuelta') || lowerWord.includes('qué fue')) {
      hints.push('Es un saludo o pregunta informal');
      hints.push('Expresión muy común entre cubanos');
    }

    // Expresiones de ánimo
    if (lowerWord.includes('dale') || lowerWord.includes('sigue') || lowerWord.includes('pa delante') || lowerWord.includes('pa lante')) {
      hints.push('Expresión de ánimo o motivación');
      hints.push('Frase para dar aliento');
    }

    // Acciones o verbos en frases
    if (lowerWord.includes('meter') || lowerWord.includes('hacer') || lowerWord.includes('caer') || lowerWord.includes('ponerse') || lowerWord.includes('coger')) {
      hints.push('Frase con verbo de acción');
      hints.push('Expresión sobre hacer algo');
    }

    if (hints.length === 0) {
      hints.push('Es un dicho o refrán cubano');
      hints.push('Expresión popular de Cuba');
    }

    return hints;
  },

  escuelas: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Universidades
    if (lowerWord.includes('universidad') || lowerWord === 'cujae' || lowerWord === 'ispjae' || lowerWord === 'uci' || lowerWord.includes('superior')) {
      hints.push('Es una universidad cubana');
      hints.push('Institución de educación superior');
    }

    // Escuelas vocacionales famosas
    if (lowerWord.includes('lenin') || lowerWord.includes('ipvce') || lowerWord.includes('che guevara') || lowerWord.includes('camilo cienfuegos')) {
      hints.push('Es una escuela vocacional');
      hints.push('Centro educativo preuniversitario');
    }

    // Siglas de instituciones
    if (lowerWord === 'isa' || lowerWord === 'ena' || lowerWord === 'eide' || lowerWord === 'espa' || lowerWord === 'esbec' || lowerWord === 'ipuec') {
      hints.push('Siglas de institución educativa');
      hints.push('Abreviatura de escuela o instituto');
    }

    // Nombres de próceres
    if (lowerWord.includes('jose marti') || lowerWord.includes('antonio maceo') || lowerWord.includes('ignacio agramonte') || lowerWord.includes('frank pais') || lowerWord.includes('julio antonio mella')) {
      hints.push('Escuela con nombre de prócer cubano');
      hints.push('Lleva el nombre de un héroe nacional');
    }

    // Tipos de escuelas
    if (lowerWord.includes('politecnico') || lowerWord.includes('tecnologico') || lowerWord === 'pre' || lowerWord.includes('secundaria') || lowerWord.includes('primaria')) {
      hints.push('Tipo de escuela o nivel educativo');
      hints.push('Centro de enseñanza');
    }

    // Escuelas de arte
    if (lowerWord.includes('arte') || lowerWord.includes('conservatorio') || lowerWord.includes('musica') || lowerWord.includes('ballet')) {
      hints.push('Escuela especializada en arte');
      hints.push('Centro de formación artística');
    }

    // Escuelas deportivas
    if (lowerWord.includes('deportiva') || lowerWord === 'eide') {
      hints.push('Escuela de deporte');
      hints.push('Centro de entrenamiento deportivo');
    }

    if (hints.length === 0) {
      hints.push('Es una escuela o universidad cubana');
      hints.push('Institución educativa de Cuba');
    }

    return hints;
  },

  economia: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Monedas
    if (lowerWord === 'dolar' || lowerWord === 'mlc' || lowerWord === 'cup' || lowerWord === 'cuc' || lowerWord.includes('peso')) {
      hints.push('Es una moneda o divisa');
      hints.push('Relacionado con dinero en Cuba');
    }

    // Apagones y problemas eléctricos
    if (lowerWord.includes('apagon') || lowerWord.includes('blackout') || lowerWord.includes('corte') || lowerWord.includes('luz') || lowerWord.includes('corriente')) {
      hints.push('Problema eléctrico común');
      hints.push('Relacionado con falta de electricidad');
    }

    // Problemas de agua
    if (lowerWord.includes('agua') || lowerWord.includes('salidero') || lowerWord.includes('rotura') || lowerWord.includes('fuga')) {
      hints.push('Problema con el agua');
      hints.push('Dificultad con el suministro de agua');
    }

    // Colas y filas
    if (lowerWord === 'cola' || lowerWord === 'fila' || lowerWord.includes('hacer cola') || lowerWord.includes('hacer fila')) {
      hints.push('Relacionado con esperar en fila');
      hints.push('Actividad común en Cuba');
    }

    // Escasez
    if (lowerWord.includes('escasez') || lowerWord.includes('falta de') || lowerWord.includes('desabastecimiento') || lowerWord.includes('carencia')) {
      hints.push('Problema de escasez');
      hints.push('Falta de productos');
    }

    // Periodo especial y crisis
    if (lowerWord.includes('periodo especial') || lowerWord.includes('crisis') || lowerWord.includes('bloqueo') || lowerWord.includes('embargo')) {
      hints.push('Evento o situación económica');
      hints.push('Crisis económica o política');
    }

    // Racionamiento
    if (lowerWord.includes('libreta') || lowerWord.includes('cartilla') || lowerWord.includes('racionamiento') || lowerWord.includes('bodega') || lowerWord.includes('normados')) {
      hints.push('Sistema de racionamiento');
      hints.push('Forma de distribución de productos');
    }

    // Productos básicos
    if (lowerWord.includes('pan') || lowerWord.includes('leche') || lowerWord.includes('pollo') || lowerWord.includes('aceite') || lowerWord.includes('jabon') || lowerWord.includes('detergente')) {
      hints.push('Producto básico de consumo');
      hints.push('Artículo de primera necesidad');
    }

    // Combustible
    if (lowerWord.includes('gasolina') || lowerWord.includes('diesel') || lowerWord.includes('combustible') || lowerWord.includes('gas') || lowerWord.includes('bombona') || lowerWord.includes('kerosene')) {
      hints.push('Tipo de combustible o energía');
      hints.push('Relacionado con energía doméstica');
    }

    // Economía y finanzas
    if (lowerWord.includes('inflacion') || lowerWord.includes('salario') || lowerWord.includes('pension') || lowerWord.includes('remesas') || lowerWord.includes('ordenamiento')) {
      hints.push('Término económico o financiero');
      hints.push('Relacionado con la economía cubana');
    }

    // Mercado
    if (lowerWord.includes('mercado') || lowerWord.includes('cadeca') || lowerWord.includes('compraventa') || lowerWord.includes('permuta')) {
      hints.push('Tipo de mercado o comercio');
      hints.push('Lugar o sistema de intercambio');
    }

    if (hints.length === 0) {
      hints.push('Problema o situación económica de Cuba');
      hints.push('Relacionado con la economía cubana');
    }

    return hints;
  },

  apodos: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Apodos físicos por color de piel
    if (lowerWord.includes('negro') || lowerWord.includes('chino') || lowerWord.includes('rubio') || lowerWord.includes('colorado') || lowerWord.includes('blanquito')) {
      hints.push('Apodo por color de piel o rasgos');
      hints.push('Sobrenombre relacionado con la apariencia');
    }

    // Apodos físicos por contextura
    if (lowerWord.includes('flaco') || lowerWord.includes('gordo') || lowerWord.includes('pelao') || lowerWord.includes('calvo')) {
      hints.push('Apodo por contextura física');
      hints.push('Sobrenombre por el peso o físico');
    }

    // Apodos por discapacidad
    if (lowerWord.includes('cojo') || lowerWord.includes('tuerto') || lowerWord.includes('bizco') || lowerWord.includes('mocho') || lowerWord.includes('mudo') || lowerWord.includes('sordo') || lowerWord.includes('ciego')) {
      hints.push('Apodo relacionado con característica física');
      hints.push('Sobrenombre descriptivo');
    }

    // Apodos por rasgos faciales
    if (lowerWord.includes('narigon') || lowerWord.includes('bembón') || lowerWord.includes('jetón') || lowerWord.includes('orejón') || lowerWord.includes('cabezón') || lowerWord.includes('chato') || lowerWord.includes('ñato') || lowerWord.includes('trompudo')) {
      hints.push('Apodo por rasgo facial');
      hints.push('Sobrenombre por característica de la cara');
    }

    // Apodos cariñosos
    if (lowerWord.includes('mi ') || lowerWord.includes('papito') || lowerWord.includes('mamita') || lowerWord.includes('nene') || lowerWord.includes('nena') || lowerWord.includes('bebé') || lowerWord.includes('baby') || lowerWord.includes('corazón') || lowerWord.includes('tesoro') || lowerWord.includes('principe') || lowerWord.includes('princesa')) {
      hints.push('Apodo cariñoso o amoroso');
      hints.push('Forma afectuosa de llamar a alguien');
    }

    // Términos familiares
    if (lowerWord.includes('papi') || lowerWord.includes('mami') || lowerWord.includes('hermano') || lowerWord.includes('primo') || lowerWord.includes('tio') || lowerWord.includes('viejo') || lowerWord.includes('vieja')) {
      hints.push('Término familiar usado como apodo');
      hints.push('Forma coloquial de referirse a alguien');
    }

    // Profesiones como apodo
    if (lowerWord.includes('doctor') || lowerWord.includes('ingeniero') || lowerWord.includes('maestro') || lowerWord.includes('profe') || lowerWord.includes('jefe')) {
      hints.push('Profesión usada como apodo');
      hints.push('Título profesional como sobrenombre');
    }

    // Apodos comunes
    if (lowerWord === 'yuma' || lowerWord === 'extranjero' || lowerWord === 'socio' || lowerWord === 'consorte' || lowerWord === 'compa' || lowerWord === 'compañero') {
      hints.push('Apodo común entre cubanos');
      hints.push('Forma coloquial de referirse a alguien');
    }

    if (hints.length === 0) {
      hints.push('Es un apodo o sobrenombre cubano');
      hints.push('Forma de llamar a las personas en Cuba');
    }

    return hints;
  },

  juegos: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Juegos de esconderse
    if (lowerWord.includes('escondido') || lowerWord.includes('escondite') || lowerWord.includes('pillao')) {
      hints.push('Juego de esconderse');
      hints.push('Juego infantil de calle');
    }

    // Juegos de persecución
    if (lowerWord.includes('lleva') || lowerWord.includes('quema') || lowerWord.includes('candela') || lowerWord.includes('pon') || lowerWord.includes('ere')) {
      hints.push('Juego de persecución');
      hints.push('Juego donde alguien persigue');
    }

    // Juegos con roles
    if (lowerWord.includes('policias') || lowerWord.includes('ladrones')) {
      hints.push('Juego con roles o personajes');
      hints.push('Juego de simulación');
    }

    // Juegos de saltar
    if (lowerWord.includes('soga') || lowerWord.includes('suiza') || lowerWord.includes('saltar')) {
      hints.push('Juego de saltar');
      hints.push('Requiere saltar o brincar');
    }

    // Juegos con objetos
    if (lowerWord.includes('trompo') || lowerWord.includes('yoyo') || lowerWord.includes('perinola') || lowerWord.includes('cometa') || lowerWord.includes('papalote') || lowerWord.includes('bolas') || lowerWord.includes('canicas')) {
      hints.push('Juego con objeto o juguete');
      hints.push('Requiere un objeto específico');
    }

    // Juegos de mesa tradicionales
    if (lowerWord === 'domino' || lowerWord === 'damas' || lowerWord === 'parchis' || lowerWord === 'ajedrez') {
      hints.push('Juego de mesa clásico');
      hints.push('Juego de tablero');
    }

    // Juegos de cartas
    if (lowerWord.includes('cartas') || lowerWord.includes('baraja') || lowerWord === 'conquian' || lowerWord === 'burro' || lowerWord === 'casino' || lowerWord === 'chinchon' || lowerWord === 'poker') {
      hints.push('Juego de cartas o baraja');
      hints.push('Se juega con naipes');
    }

    // Juegos infantiles con canciones
    if (lowerWord.includes('rueda') || lowerWord.includes('arroz con leche') || lowerWord.includes('vibora') || lowerWord.includes('pollitos') || lowerWord.includes('pin pon') || lowerWord.includes('gallinita ciega')) {
      hints.push('Juego infantil con canción');
      hints.push('Ronda o juego cantado');
    }

    // Juegos de pelota
    if (lowerWord.includes('pelota') || lowerWord.includes('baseball') || lowerWord.includes('futbol') || lowerWord.includes('baloncesto') || lowerWord.includes('viti') || lowerWord.includes('bateo')) {
      hints.push('Juego con pelota');
      hints.push('Deporte o juego de balón');
    }

    // Esquinas
    if (lowerWord.includes('esquinas')) {
      hints.push('Juego de posiciones o esquinas');
      hints.push('Se juega en esquinas o bases');
    }

    if (hints.length === 0) {
      hints.push('Es un juego tradicional cubano');
      hints.push('Juego popular en Cuba');
    }

    return hints;
  },

  cantantes: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Leyendas de la música cubana
    if (lowerWord.includes('celia cruz') || lowerWord.includes('benny mor')) {
      hints.push('Leyenda de la música cubana');
      hints.push('Icono internacional de Cuba');
    }

    // Salsa y timba clásicos
    if (lowerWord.includes('isaac') || lowerWord.includes('issac') || lowerWord.includes('paulito') || lowerWord.includes('manolito') || lowerWord.includes('manolin') || lowerWord.includes('adalberto')) {
      hints.push('Cantante de salsa o timba');
      hints.push('Artista de música bailable cubana');
    }

    // Orquestas y grupos de salsa/timba
    if (lowerWord.includes('van van') || lowerWord.includes('charanga') || lowerWord.includes('ng la banda') || lowerWord.includes('klimax') || lowerWord.includes('bamboleo') || lowerWord.includes('habana de primera') || lowerWord.includes('la elite')) {
      hints.push('Orquesta o grupo de salsa/timba');
      hints.push('Banda de música bailable cubana');
    }

    // Cantantes femeninas de timba/salsa
    if (lowerWord.includes('haila') || lowerWord.includes('osdalgia') || lowerWord.includes('tania pantoja')) {
      hints.push('Cantante femenina de timba');
      hints.push('Voz femenina de la salsa cubana');
    }

    // Reggaeton y música urbana con "el/la"
    if (lowerWord.includes('el taiger') || lowerWord.includes('el chacal') || lowerWord.includes('el micha') || lowerWord.includes('el dany') || lowerWord.includes('el kokito') || lowerWord.includes('el uniko') || lowerWord.includes('el kamel') || lowerWord.includes('la diosa')) {
      hints.push('Artista de reggaeton cubano');
      hints.push('Cantante de música urbana');
    }

    // Grupos de reggaeton/urbano
    if (lowerWord.includes('gente de zona') || lowerWord.includes('orishas')) {
      hints.push('Grupo de música urbana cubana');
      hints.push('Dúo o grupo de reggaeton');
    }

    // Trovadores clásicos
    if (lowerWord.includes('silvio') || lowerWord.includes('pablo milanes') || lowerWord.includes('pablo milanés')) {
      hints.push('Trovador cubano legendario');
      hints.push('Cantante de nueva trova');
    }

    // Trovadores contemporáneos
    if (lowerWord.includes('carlos varela') || lowerWord.includes('frank delgado') || lowerWord.includes('kelvis ochoa') || lowerWord.includes('polito')) {
      hints.push('Cantante de trova cubana');
      hints.push('Trovador contemporáneo');
    }

    // Grupos de trova/fusión
    if (lowerWord.includes('buena fe') || lowerWord.includes('interactivo')) {
      hints.push('Grupo de trova o fusión');
      hints.push('Banda de música alternativa cubana');
    }

    // Cantantes femeninas clásicas
    if (lowerWord.includes('omara') || lowerWord.includes('elena burke') || lowerWord.includes('celina') || lowerWord.includes('maria teresa') || lowerWord.includes('maría teresa')) {
      hints.push('Cantante femenina clásica');
      hints.push('Voz femenina histórica de Cuba');
    }

    // Buena Vista Social Club y similares
    if (lowerWord.includes('compay') || lowerWord.includes('ibrahim') || lowerWord.includes('eliades') || lowerWord.includes('pio leyva') || lowerWord.includes('pío leyva')) {
      hints.push('Artista de son cubano tradicional');
      hints.push('Músico clásico de Cuba');
    }

    // Orquestas y grupos históricos
    if (lowerWord.includes('sonora matancera') || lowerWord.includes('trio matamoros') || lowerWord.includes('trío matamoros') || lowerWord.includes('sexteto') || lowerWord.includes('septeto')) {
      hints.push('Orquesta o grupo histórico');
      hints.push('Agrupación musical clásica cubana');
    }

    // Cantantes con nombre propio común
    if (lowerWord.includes('jacob') || lowerWord.includes('yomil') || lowerWord.includes('chocolate') || lowerWord.includes('divan') || lowerWord.includes('baby lores') || lowerWord.includes('leoni')) {
      hints.push('Cantante popular cubano');
      hints.push('Artista de música contemporánea');
    }

    // Apellidos reconocidos
    if (lowerWord.includes('alexander abreu') || lowerWord.includes('david calzado') || lowerWord.includes('maykel blanco')) {
      hints.push('Director y cantante de orquesta');
      hints.push('Líder de banda de timba');
    }

    // Cantantes históricos con apodo
    if (lowerWord.includes('bola de nieve') || lowerWord.includes('barbarito')) {
      hints.push('Cantante histórico cubano');
      hints.push('Voz clásica de Cuba');
    }

    // Artistas latinos famosos de origen cubano
    if (lowerWord.includes('tito puente') || lowerWord.includes('machito') || lowerWord.includes('cheo feliciano') || lowerWord.includes('hector lavoe') || lowerWord.includes('héctor lavoe') || lowerWord.includes('ismael rivera')) {
      hints.push('Artista latino de origen cubano');
      hints.push('Salsero internacional');
    }

    if (hints.length === 0) {
      hints.push('Es un cantante o grupo cubano');
      hints.push('Artista de la música cubana');
    }

    return hints;
  },

  transporte: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Transporte público
    if (lowerWord.includes('guagua') || lowerWord.includes('almendrón') || lowerWord.includes('botero') || lowerWord.includes('máquina') || lowerWord.includes('camello') || lowerWord.includes('bicitaxi') || lowerWord.includes('cocotaxi') || lowerWord.includes('ómnibus') || lowerWord.includes('tren')) {
      hints.push('Es un medio de transporte público');
      hints.push('Se usa para moverse por la ciudad');
    }

    // Botella y pon
    if (lowerWord.includes('botella') || lowerWord.includes('pon') || lowerWord.includes('coger botella')) {
      hints.push('Expresión relacionada con conseguir transporte');
      hints.push('Forma de conseguir un viaje');
    }

    // Vehículos particulares
    if (lowerWord.includes('carro') || lowerWord.includes('auto') || lowerWord.includes('moto') || lowerWord.includes('bicicleta') || lowerWord.includes('yipi')) {
      hints.push('Es un vehículo');
      hints.push('Medio de transporte personal');
    }

    // Expresiones de transporte
    if (lowerWord.includes('parada') || lowerWord.includes('terminal') || lowerWord.includes('estación') || lowerWord.includes('caminar') || lowerWord.includes('ir a pie')) {
      hints.push('Relacionado con moverse o esperar transporte');
      hints.push('Expresión sobre transporte');
    }

    if (hints.length === 0) {
      hints.push('Relacionado con transporte en Cuba');
      hints.push('Medio de moverse por la isla');
    }

    return hints;
  },

  tv_medios: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Programas de TV famosos
    if (lowerWord.includes('vivir del cuento') || lowerWord.includes('pánfilo') || lowerWord.includes('chequera') || lowerWord.includes('tremenda corte') || lowerWord.includes('mesa redonda')) {
      hints.push('Es un programa de TV cubano muy conocido');
      hints.push('Programa popular en Cuba');
    }

    // Personajes de TV
    if (lowerWord === 'pánfilo' || lowerWord === 'panfilo' || lowerWord === 'chequera' || lowerWord === 'tremenda' || lowerWord === 'nené' || lowerWord === 'candito') {
      hints.push('Es un personaje de TV cubano');
      hints.push('Personaje conocido de programas cubanos');
    }

    // Cadenas de TV
    if (lowerWord.includes('cubavisión') || lowerWord.includes('cubavision') || lowerWord.includes('tele rebelde') || lowerWord.includes('canal educativo')) {
      hints.push('Es una cadena de TV cubana');
      hints.push('Canal de televisión de Cuba');
    }

    // Radio
    if (lowerWord.includes('radio')) {
      hints.push('Es una emisora de radio cubana');
      hints.push('Estación de radio');
    }

    // Noticieros y programas informativos
    if (lowerWord.includes('noticiero') || lowerWord.includes('mesa redonda') || lowerWord.includes('cuba dice')) {
      hints.push('Programa informativo o noticiero');
      hints.push('Programa de noticias');
    }

    if (hints.length === 0) {
      hints.push('Es un programa o medio de comunicación cubano');
      hints.push('Relacionado con TV o radio de Cuba');
    }

    return hints;
  },

  marcas: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Bebidas
    if (lowerWord === 'cristal' || lowerWord === 'bucanero' || lowerWord === 'tropicola' || lowerWord === 'cachito' || lowerWord === 'tukola' || lowerWord === 'jupiña' || lowerWord.includes('ron')) {
      hints.push('Es una marca de bebida cubana');
      hints.push('Bebida muy conocida en Cuba');
    }

    // Cervezas
    if (lowerWord === 'cristal' || lowerWord === 'bucanero' || lowerWord === 'mayabe') {
      hints.push('Es una cerveza cubana');
      hints.push('Marca de cerveza');
    }

    // Refrescos
    if (lowerWord === 'tropicola' || lowerWord === 'cachito' || lowerWord === 'tukola' || lowerWord === 'jupiña') {
      hints.push('Es un refresco cubano');
      hints.push('Bebida gaseosa');
    }

    // Ron
    if (lowerWord.includes('havana club') || lowerWord.includes('santiago') || lowerWord.includes('caney') || lowerWord.includes('ron')) {
      hints.push('Es una marca de ron cubano');
      hints.push('Ron muy conocido');
    }

    // Alimentos
    if (lowerWord.includes('pan') || lowerWord.includes('galletas') || lowerWord.includes('helado') || lowerWord.includes('queso')) {
      hints.push('Es un producto alimenticio');
      hints.push('Marca de comida');
    }

    // Productos de limpieza
    if (lowerWord.includes('detergente') || lowerWord.includes('jabón') || lowerWord.includes('pasta dental') || lowerWord.includes('colgate')) {
      hints.push('Es un producto de limpieza o higiene');
      hints.push('Artículo de aseo personal');
    }

    // Tabaco
    if (lowerWord.includes('tabaco') || lowerWord.includes('habano') || lowerWord.includes('cigarro')) {
      hints.push('Es un producto de tabaco');
      hints.push('Relacionado con tabaco cubano');
    }

    if (hints.length === 0) {
      hints.push('Es una marca o producto cubano');
      hints.push('Producto conocido en Cuba');
    }

    return hints;
  },

  comercios: (word: string) => {
    const hints: string[] = [];
    const lowerWord = word.toLowerCase();

    // Tiendas
    if (lowerWord === 'bodega' || lowerWord === 'shopping' || lowerWord.includes('tienda') || lowerWord === 'cimex' || lowerWord === 'trd' || lowerWord === 'mercado' || lowerWord === 'agromercado') {
      hints.push('Es un lugar donde se compra');
      hints.push('Tienda o establecimiento comercial');
    }

    // Restaurantes
    if (lowerWord === 'paladar' || lowerWord.includes('restaurante') || lowerWord.includes('cafetería') || lowerWord.includes('pizzería') || lowerWord === 'coppelia' || lowerWord === 'la rampa') {
      hints.push('Es un lugar para comer');
      hints.push('Restaurante o lugar gastronómico');
    }

    // Servicios
    if (lowerWord.includes('barbería') || lowerWord.includes('peluquería') || lowerWord.includes('taller') || lowerWord.includes('zapatería') || lowerWord.includes('lavandería')) {
      hints.push('Es un lugar de servicios');
      hints.push('Establecimiento de servicios');
    }

    // Mercados
    if (lowerWord.includes('mercado') || lowerWord === 'feria' || lowerWord.includes('agropecuario') || lowerWord.includes('artesanía')) {
      hints.push('Es un mercado o feria');
      hints.push('Lugar de compra-venta');
    }

    // Servicios de salud y finanzas
    if (lowerWord === 'farmacia' || lowerWord === 'hospital' || lowerWord === 'clínica' || lowerWord === 'banco' || lowerWord === 'cadeca' || lowerWord.includes('casa de cambio')) {
      hints.push('Es un servicio público o privado');
      hints.push('Establecimiento de servicios especializados');
    }

    // Alojamiento
    if (lowerWord === 'hotel' || lowerWord.includes('casa particular')) {
      hints.push('Es un lugar de alojamiento');
      hints.push('Lugar para hospedarse');
    }

    if (hints.length === 0) {
      hints.push('Es un comercio o negocio cubano');
      hints.push('Establecimiento comercial');
    }

    return hints;
  },
};

// Generar una pista específica para una palabra
export function generateHint(word: string, categoryName: string): string {
  const lowerWord = word.toLowerCase();
  
  // Encontrar la categoría
  let categoryKey: CategoryKey | undefined;
  for (const category of CATEGORIES_CONFIG) {
    if (category.name === categoryName || category.name.toLowerCase() === categoryName.toLowerCase()) {
      categoryKey = category.key;
      break;
    }
    // Buscar por subcategorías también
    for (const subcategory of category.subcategories) {
      if (subcategory.words.includes(lowerWord)) {
        categoryKey = category.key;
        break;
      }
    }
    if (categoryKey) break;
  }
  
  // Si no encontramos la categoría, usar el generador por defecto
  if (!categoryKey) {
    // Intentar adivinar por el nombre de la categoría
    const lowerCategoryName = categoryName.toLowerCase();
    if (lowerCategoryName.includes('comida')) categoryKey = 'comida';
    else if (lowerCategoryName.includes('lugar')) categoryKey = 'lugares';
    else if (lowerCategoryName.includes('influencer')) categoryKey = 'influencers';
    else if (lowerCategoryName.includes('jerga')) categoryKey = 'jerga';
    else if (lowerCategoryName.includes('cosa')) categoryKey = 'cosas';
    else if (lowerCategoryName.includes('deporte')) categoryKey = 'deportes';
    else if (lowerCategoryName.includes('historia')) categoryKey = 'historia';
    else if (lowerCategoryName.includes('tradicion')) categoryKey = 'tradiciones';
    else if (lowerCategoryName.includes('naturaleza')) categoryKey = 'naturaleza';
    else if (lowerCategoryName.includes('malas') || lowerCategoryName.includes('palabras')) categoryKey = 'malas_palabras';
    else if (lowerCategoryName.includes('cantante')) categoryKey = 'cantantes';
    else if (lowerCategoryName.includes('transporte')) categoryKey = 'transporte';
    else if (lowerCategoryName.includes('tv') || lowerCategoryName.includes('medios') || lowerCategoryName.includes('programa')) categoryKey = 'tv_medios';
    else if (lowerCategoryName.includes('marca') || lowerCategoryName.includes('producto')) categoryKey = 'marcas';
    else if (lowerCategoryName.includes('comercio') || lowerCategoryName.includes('negocio')) categoryKey = 'comercios';
  }
  
  // Recopilar todas las pistas posibles
  const allHints: string[] = [];
  
  // Generar pistas específicas de la categoría
  if (categoryKey && HINT_GENERATORS[categoryKey]) {
    const categoryHints = HINT_GENERATORS[categoryKey]!(lowerWord);
    allHints.push(...categoryHints);
  }
  
  // Agregar pistas generales basadas en características de la palabra
  // Primera letra (más útil que el nombre completo de la categoría)
  allHints.push(`Empieza con "${word[0].toUpperCase()}"`);
  
  // Número de letras (aproximado)
  if (word.length <= 5) {
    allHints.push('Palabra corta (5 letras o menos)');
  } else if (word.length <= 10) {
    allHints.push('Palabra mediana (6-10 letras)');
  } else {
    allHints.push('Palabra larga (más de 10 letras)');
  }
  
  // Si tiene espacios (nombre compuesto)
  if (word.includes(' ')) {
    allHints.push('Es un nombre compuesto (tiene espacios)');
  }
  
  // Si contiene números (raro pero posible)
  if (/\d/.test(word)) {
    allHints.push('Contiene números');
  }
  
  // Si no hay pistas específicas, usar la categoría como último recurso
  if (allHints.length === 0) {
    allHints.push(categoryName);
  }
  
  // Seleccionar una pista aleatoria de las disponibles, dando prioridad a pistas específicas
  // Si hay pistas de categoría, elegir entre esas primero (70% probabilidad)
  const categoryHintsCount = categoryKey && HINT_GENERATORS[categoryKey] 
    ? HINT_GENERATORS[categoryKey]!(lowerWord).length 
    : 0;
  
  if (categoryHintsCount > 0 && Math.random() < 0.7) {
    // Elegir de las pistas específicas de categoría
    const categorySpecificHints = HINT_GENERATORS[categoryKey!]!(lowerWord);
    return categorySpecificHints[Math.floor(Math.random() * categorySpecificHints.length)];
  }
  
  // Si no hay pistas de categoría o el random eligió una general, elegir de todas
  return allHints[Math.floor(Math.random() * allHints.length)];
}

// Generar múltiples pistas para elegir la mejor
export function generateMultipleHints(word: string, categoryName: string, count: number = 3): string[] {
  const hints: string[] = [];
  const lowerWord = word.toLowerCase();
  
  let categoryKey: CategoryKey | undefined;
  for (const category of CATEGORIES_CONFIG) {
    if (category.name === categoryName || category.name.toLowerCase() === categoryName.toLowerCase()) {
      categoryKey = category.key;
      break;
    }
  }
  
  if (!categoryKey) {
    const lowerCategoryName = categoryName.toLowerCase();
    if (lowerCategoryName.includes('comida')) categoryKey = 'comida';
    else if (lowerCategoryName.includes('lugar')) categoryKey = 'lugares';
    else if (lowerCategoryName.includes('influencer')) categoryKey = 'influencers';
    else if (lowerCategoryName.includes('jerga')) categoryKey = 'jerga';
    else if (lowerCategoryName.includes('cosa')) categoryKey = 'cosas';
    else if (lowerCategoryName.includes('deporte')) categoryKey = 'deportes';
    else if (lowerCategoryName.includes('historia')) categoryKey = 'historia';
    else if (lowerCategoryName.includes('tradicion')) categoryKey = 'tradiciones';
    else if (lowerCategoryName.includes('naturaleza')) categoryKey = 'naturaleza';
    else if (lowerCategoryName.includes('malas') || lowerCategoryName.includes('palabras')) categoryKey = 'malas_palabras';
    else if (lowerCategoryName.includes('cantante')) categoryKey = 'cantantes';
    else if (lowerCategoryName.includes('transporte')) categoryKey = 'transporte';
    else if (lowerCategoryName.includes('tv') || lowerCategoryName.includes('medios') || lowerCategoryName.includes('programa')) categoryKey = 'tv_medios';
    else if (lowerCategoryName.includes('marca') || lowerCategoryName.includes('producto')) categoryKey = 'marcas';
    else if (lowerCategoryName.includes('comercio') || lowerCategoryName.includes('negocio')) categoryKey = 'comercios';
  }
  
  if (categoryKey && HINT_GENERATORS[categoryKey]) {
    const categoryHints = HINT_GENERATORS[categoryKey]!(lowerWord);
    hints.push(...categoryHints);
  }
  
  // Agregar pistas generales
  hints.push(`Empieza con "${word[0].toUpperCase()}"`);
  
  if (word.length <= 5) {
    hints.push('Palabra corta');
  } else if (word.length <= 10) {
    hints.push('Palabra mediana');
  } else {
    hints.push('Palabra larga');
  }
  
  if (word.includes(' ')) {
    hints.push('Nombre compuesto');
  }
  
  // Eliminar duplicados y limitar cantidad
  const uniqueHints = [...new Set(hints)];
  return uniqueHints.slice(0, count);
}
