// Configuración de categorías y subcategorías del juego

import { CategoryConfig } from '@/types/game';
import {
  JERGA_CUBANA,
  INFLUENCERS_CUBANOS,
  COMIDA_CUBANA,
  LUGARES_CUBANOS,
  COSAS_CUBANAS,
  DEPORTES_CUBANOS,
  HISTORIA_CUBANA,
  TRADICIONES_CUBANAS,
  NATURALEZA_CUBANA,
  MALAS_PALABRAS_CUBANAS,
  DICHOS_REFRANES_CUBANOS,
  ESCUELAS_UNIVERSIDADES_CUBANAS,
  ECONOMIA_PROBLEMAS_CUBANOS,
  APODOS_SOBRENOMBRES_CUBANOS,
  JUEGOS_TRADICIONALES_CUBANOS,
  CANTANTES_CUBANOS
} from './words';

// Dividir las palabras en subcategorías lógicas
export const CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    key: 'jerga',
    name: 'Jerga cubana',
    subcategories: [
      {
        key: 'jerga_expresiones',
        name: 'Expresiones comunes',
        words: ['asere', 'acere', 'pinga', 'reparto', 'yuma', 'fula', 'tremendo', 'candela', 'bemba', 'chama', 'chamo', 'socio', 'consorte', 'monina', 'ecobio', 'guajiro', 'mulata', 'negron', 'blanquito'],
      },
      {
        key: 'jerga_modismos',
        name: 'Modismos',
        words: ['almendron', 'jama', 'timba', 'guarapo', 'comemierda', 'singao', 'descarga', 'guarapera', 'jinetero', 'jinetera', 'paladar', 'bodega', 'chavito', 'guagua', 'botero', 'singadera', 'bola', 'tremenda', 'chusmeria', 'chusma'],
      },
      {
        key: 'jerga_verbos',
        name: 'Verbos',
        words: ['resolver', 'luchar', 'inventar', 'escapar', 'templar', 'coger', 'botar', 'tumbar', 'fletar', 'chivatear', 'fajarse', 'arrancao', 'pelao', 'duro', 'quedao', 'volao', 'fao', 'fiao', 'papeao', 'tragao', 'empingao', 'aplatanao'],
      },
      {
        key: 'jerga_sustantivos',
        name: 'Sustantivos',
        words: ['chopin', 'pulover', 'blumer', 'sayuela', 'chancleta', 'tenis', 'moña', 'puro', 'tabaco', 'mojito', 'daiquiri', 'malecon', 'baro', 'pasta', 'pincha', 'chivato', 'fiana', 'talla', 'chucho', 'friki', 'repa', 'mikki', 'bisne', 'paquete', 'bonche', 'muela', 'cuentero', 'guaperia', 'guapo', 'fajao', 'libreta', 'dieta', 'revolucion', 'comunista', 'compañero', 'gusano'],
      },
    ],
  },
  {
    key: 'influencers',
    name: 'Influencers cubanos',
    subcategories: [
      {
        key: 'influencers_musica',
        name: 'Artistas musicales',
        words: ['gente de zona', 'orishas', 'cimafunk', 'el chacal', 'el micha', 'chocolate mc', 'leoni torres', 'buena fe', 'los van van', 'habana de primera', 'havana d primera', 'el taiger', 'yomil', 'el dany', 'jacob forever', 'el chulo', 'la diosa', 'srta dayana', 'osmani garcia', 'el principe', 'los 4', 'charanga habanera', 'manolito simonet', 'issac delgado', 'paulito fg', 'david calzado', 'la elite', 'wampi', 'kimiko', 'yordy', 'el negrito', 'el kokito', 'manu manu', 'el uniko', 'yulien oviedo', 'el kamel', 'alex duvall', 'el deny', 'dj unic', 'el brujo', 'maykel osorbo', 'el funky', 'yotuel', 'beatriz luengo', 'willy chirino', 'gloria estefan', 'celia cruz', 'pitbull', 'camila cabello', 'gilberto santa rosa', 'la india', 'marc anthony', 'eddy k', 'alexander abreu', 'haila', 'osdalgia', 'kelvis ochoa', 'david torrens', 'frank delgado', 'polito ibañez', 'silvio rodriguez', 'pablo milanes', 'carlos varela', 'amaury gutierrez', 'willy gonzalez', 'el tosco', 'tirso duarte', 'la charanga forever', 'bamboleo', 'azucar negra', 'klimax', 'manolin el medico', 'ng la banda', 'adalberto alvarez', 'los aldeanos', 'silvito el libre', 'telmary', 'x alfonso', 'interactivo', 'david blanco', 'aldo moya'],
      },
      {
        key: 'influencers_publicos',
        name: 'Figuras públicas',
        words: ['otaola', 'carlucho', 'descemer', 'luis manuel otero', 'pánfilo', 'chequera', 'facundo correcto', 'limay blanco', 'alexis valdes', 'carlos otero', 'yunior morales', 'cuqui la mora', 'maikel pons', 'osvaldo doimeadios', 'luis silva'],
      },
      {
        key: 'influencers_actores',
        name: 'Actores/Actrices',
        words: ['william levy', 'ana de armas', 'daisy fuentes', 'andy vazquez'],
      },
    ],
  },
  {
    key: 'comida',
    name: 'Comida cubana',
    subcategories: [
      {
        key: 'comida_platos',
        name: 'Platos principales',
        words: ['moros', 'congri', 'ropa vieja', 'vaca frita', 'picadillo', 'bistec', 'fricasé', 'potaje', 'ajiaco', 'caldosa', 'tamal', 'arroz con pollo', 'arroz con mariscos', 'paella', 'mofongo', 'masreal', 'chilindrón', 'aporreado', 'boliche', 'carne con papa', 'guiso', 'estofado', 'albondigas', 'milanesa', 'escalope', 'cordon bleu', 'lasaña', 'canelones', 'ravioles', 'tortilla española', 'revoltillo', 'huevos fritos', 'bacalao a la vizcaina', 'sopa de pollo', 'caldo gallego', 'fabada', 'cocido'],
      },
      {
        key: 'comida_aperitivos',
        name: 'Aperitivos y snacks',
        words: ['croqueta', 'papa rellena', 'empanada', 'mariquita', 'tostones', 'fufu', 'pan con lechon', 'medianoche', 'sandwich cubano', 'bocadito', 'cangrejito', 'perro caliente', 'pizza cubana', 'espagueti', 'macarrones', 'arroz frito', 'chop suey', 'pollo frito', 'tamales en cazuela', 'harina con cangrejo', 'yuca', 'platano', 'chicharron', 'lechon', 'masas de cerdo', 'higado', 'lengua', 'rabo encendido', 'frijoles negros', 'frijoles colorados', 'arroz blanco', 'arroz amarillo', 'ensalada', 'aguacate', 'tomate', 'pepino', 'col', 'boniato', 'malanga', 'calabaza', 'quimbombo', 'chayote', 'name', 'pan con tortilla', 'pan con jamon', 'pan con queso', 'carne de res', 'carne de cerdo', 'pollo asado', 'pescado frito', 'camarones', 'langosta', 'enchilado', 'cangrejo', 'pulpo', 'calamar', 'tasajo', 'jamon serrano', 'chorizo', 'morcilla', 'butifarras'],
      },
      {
        key: 'comida_bebidas',
        name: 'Bebidas',
        words: ['guarapo', 'pru', 'malta', 'refresco', 'cerveza', 'ron', 'cristal', 'bucanero', 'havana club', 'santiago', 'batido', 'jugo natural'],
      },
      {
        key: 'comida_postres',
        name: 'Postres',
        words: ['boniatillo', 'casquitos', 'mermelada', 'natilla', 'arroz con leche', 'flan', 'churro', 'cake', 'dulce de coco', 'coco rallado', 'turrón', 'mazapán', 'buñuelos', 'torrijas', 'panetela', 'brazo gitano', 'tres leches', 'pudin', 'gelatina'],
      },
    ],
  },
  {
    key: 'lugares',
    name: 'Lugares de Cuba',
    subcategories: [
      {
        key: 'lugares_ciudades',
        name: 'Ciudades',
        words: ['habana vieja', 'trinidad', 'santiago', 'holguin', 'camaguey', 'cienfuegos', 'pinar del rio', 'matanzas', 'villa clara', 'sancti spiritus', 'ciego de avila', 'las tunas', 'granma', 'guantanamo', 'isla de la juventud', 'baracoa', 'el salado', 'guines', 'san antonio', 'artemisa', 'bahia honda', 'viñales', 'soroa', 'bayamo', 'manzanillo', 'nuevitas', 'moron', 'jatibonico', 'santa lucia'],
      },
      {
        key: 'lugares_barrios',
        name: 'Barrios de La Habana',
        words: ['vedado', 'miramar', 'centro habana', 'cerro', 'diez de octubre', 'marianao', 'playa', 'la lisa', 'guanabacoa', 'regla', 'alamar', 'cojimar', 'santa maria', 'san lazaro', 'universidad', 'colina', 'infanta', 'carlos tercero', 'cuatro caminos', 'monte', 'reina', 'belascoain', 'zanja', 'linea', 'paseo', 'primera', 'tercera', 'quinta avenida', 'siboney', 'atabey', 'la coronela', 'fontanar', 'nautico', 'biltmore', 'santa fe', 'jaimanitas'],
      },
      {
        key: 'lugares_turisticos',
        name: 'Lugares turísticos',
        words: ['varadero', 'cayo coco', 'cayo largo', 'cayo santa maria', 'jardines del rey', 'guardalavaca', 'playa esmeralda', 'baconao', 'el cobre', 'las terrazas', 'coppelia', 'la rampa', '23 y 12', 'g y 23', 'la piragua', 'el rapido', 'la tropical', 'karl marx', 'la madriguera', 'fabrica de arte', 'capitolio', 'morro', 'la cabaña', 'plaza de la revolucion', 'jose marti', 'parque central', 'prado', 'neptuno', 'san rafael', 'galiano', 'obispo', 'cathedral', 'floridita', 'bodeguita del medio', 'tropicana', 'parisien', 'cabaret nacional', 'teatro nacional', 'gran teatro', 'museo de bellas artes', 'museo de la revolucion', 'plaza vieja', 'plaza de armas'],
      },
    ],
  },
  {
    key: 'cosas',
    name: 'Cosas cubanas',
    subcategories: [
      {
        key: 'cosas_musica',
        name: 'Música y danza',
        words: ['santeria', 'oricha', 'babalawo', 'changó', 'yemayá', 'ochún', 'obatalá', 'elegguá', 'reggaeton', 'timba', 'salsa', 'son', 'rumba', 'casino', 'rueda de casino', 'comparsa', 'conga', 'carnaval', 'quince', 'cumpleaños', 'fiesta', 'parranda', 'despelote', 'bembé', 'toque', 'ceremonia', 'misa', 'velorio', 'guateque', 'pachanga', 'gozadera', 'cha cha cha', 'mambo', 'bolero', 'guaguancó', 'columbia', 'yambú', 'clave', 'bongo', 'tumbadora', 'tres', 'güiro', 'maracas', 'trompeta', 'piano', 'bajo', 'bateria', 'güembe', 'cajón', 'chekere', 'iyá', 'itótele', 'okónkolo', 'batá'],
      },
      {
        key: 'cosas_vestimenta',
        name: 'Vestimenta y accesorios',
        words: ['domino', 'bicicleta', 'carretilla', 'chivichana', 'patineta', 'pelota', 'manilla', 'collares', 'camiseta', 'short', 'bermuda', 'guayabera', 'sombrero', 'panama', 'gorra', 'visera', 'lentes', 'cadena', 'anillo', 'pulsera', 'arete', 'piercing', 'tatuaje', 'trenza', 'moño', 'afro', 'rastas', 'calvicie', 'peluca', 'extensiones', 'uñas postizas', 'gel', 'laca', 'crema', 'perfume', 'colonia', 'desodorante', 'jabon', 'champú', 'acondicionador', 'cepillo', 'peine', 'secador', 'plancha de pelo', 'rulos', 'bigudí'],
      },
      {
        key: 'cosas_objetos',
        name: 'Objetos',
        words: ['celular', 'movil', 'telefono', 'computadora', 'laptop', 'tablet', 'television', 'radio', 'bocina', 'audifonos', 'ventilador', 'aire acondicionado', 'split', 'nevera', 'refrigerador', 'freezer', 'cocina', 'horno', 'microondas', 'licuadora', 'batidora', 'cafetera', 'olla de presion', 'sarten', 'caldero', 'cuchillo', 'tenedor', 'cuchara', 'plato', 'vaso', 'taza', 'jarra'],
      },
    ],
  },
  {
    key: 'deportes',
    name: 'Deportes cubanos',
    subcategories: [
      {
        key: 'deportes_deportistas',
        name: 'Deportistas famosos',
        words: ['teofilo stevenson', 'félix savón', 'juan carlos robaina', 'ramón fonst', 'maría caridad colón', 'ana fidelia quiroga', 'javier sotomayor', 'ivan pedroso', 'yipsi moreno', 'dailenis alcantara', 'mijain lopez', 'roniel iglesias', 'arlen lopez', 'lazaro alvarez', 'robeycis ramirez', 'julio cesar la cruz', 'yosvany veitia', 'joahnys arguelles', 'lenier pero', 'juan carlos echevarría', 'yankiel leon', 'yuriolkis gamboa', 'andris laime', 'norge saez', 'luis ortiz', 'yoan pablo hernandez', 'emanuel navarrete', 'jorge solis', 'ricky hatton', 'camacho jr', 'mike tyson', 'floyd mayweather', 'manuel chararría', 'alexis rubalcaba', 'erislandy lara', 'yuriorkis gamboa', 'rigondeaux', 'luis concepcion', 'juanma lopez'],
      },
      {
        key: 'deportes_deportes',
        name: 'Deportes',
        words: ['boxeo', 'beisbol', 'voleibol', 'atletismo', 'lucha', 'judo', 'esgrima', 'tiro deportivo', 'canotaje', 'remar', 'natacion', 'polo acuatico', 'futbol', 'baloncesto', 'pelota vasca', 'ajedrez', 'balonmano', 'karate', 'taekwondo'],
      },
      {
        key: 'deportes_eventos',
        name: 'Equipos y eventos',
        words: ['industriales', 'santiago', 'villa clara', 'cienfuegos', 'pinar del rio', 'granma', 'matanzas', 'ciego de avila', 'camaguey', 'holguin', 'las tunas', 'sancti spiritus', 'juegos panamericanos', 'juegos olimpicos', 'serie nacional', 'play off', 'estadio latinoamericano', 'estadio guillermon moncada', 'serie del caribe'],
      },
    ],
  },
  {
    key: 'historia',
    name: 'Historia cubana',
    subcategories: [
      {
        key: 'historia_personajes',
        name: 'Personajes históricos',
        words: ['jose marti', 'antonio maceo', 'maximo gomez', 'carlos manuel de cespedes', 'calixto garcia', 'ignacio agramonte', 'mariana grajales', 'cecilia valdes', 'ruben martinez villena', 'nicolas guillen', 'alejo carpentier', 'jose lezama lima', 'virgilio pinera', 'gertrudis gomez de avellaneda', 'dulce maria loynaz', 'carilda oliver labra', 'fidel castro', 'che guevara', 'camilo cienfuegos', 'raul castro', 'abel santamaria', 'frank pais', 'jose antonio echeverria', 'ruben dario salazar', 'hugo chavez', 'simon bolivar', 'antonio nariño', 'benito juarez', 'jose de san martin'],
      },
      {
        key: 'historia_eventos',
        name: 'Eventos históricos',
        words: ['guerra de independencia', 'guerra de los diez años', 'guerra chiquita', 'grito de yara', 'grito de baire', 'batalla de las guasimas', 'batalla de peralejo', 'batalla de mal tiempo', 'asalto al cuartel moncada', 'desembarco del gramma', 'revolucion cubana', 'crisis de los misiles', 'bloqueo economico', 'periodo especial', 'mariel'],
      },
      {
        key: 'historia_monumentos',
        name: 'Monumentos y lugares históricos',
        words: ['monumento a marti', 'memorial jose marti', 'fortaleza san carlos de la cabaña', 'castillo del morro', 'castillo de la real fuerza', 'cementerio colon', 'necropolis cristobal colon', 'catedral de la habana', 'iglesia del espiritu santo', 'basilica menor de san francisco', 'real fuerza', 'plaza de armas', 'plaza de la revolucion', 'paseo del prado', 'malecón', 'capitolio', 'universidad de la habana'],
      },
    ],
  },
  {
    key: 'tradiciones',
    name: 'Tradiciones cubanas',
    subcategories: [
      {
        key: 'tradiciones_festividades',
        name: 'Festividades',
        words: ['carnaval de santiago', 'carnaval de la habana', 'parrandas de remedios', 'parrandas de camajuani', 'fiestas del fuego', 'festival internacional del habano', 'festival del son', 'festival de jazz', 'nochebuena', 'año nuevo', 'día de los reyes', 'día de la independencia', 'día de los trabajadores', 'día de la rebeldía nacional', 'día de las madres', 'quinceañera', 'bautizo', 'casamiento'],
      },
      {
        key: 'tradiciones_costumbres',
        name: 'Costumbres',
        words: ['toque de santo', 'misas de santería', 'bembé', 'tambor', 'comparsa', 'conga', 'rueda de casino', 'danzon', 'bolero', 'guateque', 'peña', 'tertulia', 'pachanga', 'descarga', 'jam session'],
      },
      {
        key: 'tradiciones_simbolos',
        name: 'Símbolos',
        words: ['bandera cubana', 'escudo nacional', 'himno nacional', 'estrella solitaria', 'palma real', 'ave nacional', 'flor nacional', 'arbol nacional', 'tocororo', 'mariposa', 'jardín de la mariposa'],
      },
    ],
  },
  {
    key: 'naturaleza',
    name: 'Naturaleza cubana',
    subcategories: [
      {
        key: 'naturaleza_animales',
        name: 'Animales',
        words: ['tocororo', 'zunzuncito', 'cocodrilo cubano', 'jutia', 'manati', 'iguana', 'almiqui', 'polimita', 'caracol cubano', 'flamenco', 'gaviota', 'pelicano', 'loro', 'perico', 'colibri', 'sinsonte', 'totí', 'cartacuba', 'tomeguin', 'bijirita'],
      },
      {
        key: 'naturaleza_plantas',
        name: 'Plantas',
        words: ['palma real', 'mariposa', 'jardín de la mariposa', 'ceiba', 'aguacate', 'mamey', 'guanabana', 'fruta bomba', 'mango', 'piña', 'coco', 'cafe', 'tabaco', 'caña de azúcar', 'platanal', 'malanga', 'yuca', 'boniato', 'quimbombo', 'calabaza', 'tomate', 'jitomate', 'chayote', 'frijoles', 'maiz', 'arroz', 'orquidea cubana', 'buganvilia', 'jazmin', 'gardenia'],
      },
      {
        key: 'naturaleza_lugares',
        name: 'Lugares naturales',
        words: ['viñales', 'soroa', 'las terrazas', 'peninsula de zapata', 'cienaga de zapata', 'playa varadero', 'cayo coco', 'cayo guillermo', 'cayo santa maria', 'cayo largo', 'archipielago de los canarreos', 'archipielago jardines del rey', 'archipielago sabana camaguey', 'peninsula de guanahacabibes', 'sierra maestra', 'cordillera de guaniguanico', 'pico turquino', 'sierra de los organos', 'valle de viñales', 'mogotes', 'cueva del indio', 'cueva de santo tomas', 'gran caverna de santo tomas', 'salto del caburní', 'salto de jibacoa', 'playa girón', 'playa larga', 'playa ancón', 'playa esmeralda', 'guardalavaca', 'baconao', 'el nicho', 'topes de collantes', 'sierra del escambray', 'valle de los ingenios', 'rio canimar', 'rio yumuri', 'cascada el nicho', 'jardin botanico nacional', 'jardin botanico de cienfuegos', 'parque natural de topes', 'reserva de la biosfera'],
      },
    ],
  },
  {
    key: 'malas_palabras',
    name: 'Malas palabras cubanas',
    subcategories: [
      {
        key: 'malas_palabras_insultos',
        name: 'Insultos comunes',
        words: ['comemierda', 'singao', 'hijo de puta', 'cabron', 'mamaguevo', 'pendejo', 'maricón', 'come pinga', 'chupamedias', 'lambeculo', 'cara de culo', 'pedazo de mierda', 'hijo de la gran puta', 'cabrón de mierda', 'hijueputa', 'soplapinga', 'mamapinga', 'pinche', 'chingado', 'malparido', 'desgraciado', 'malnacido', 'comecandela'],
      },
      {
        key: 'malas_palabras_expresiones',
        name: 'Expresiones vulgares',
        words: ['me cago en tu madre', 'vete pa la pinga', 'vete al carajo', 'que te parta un rayo', 'metelo por el culo', 'chupame el culo', 'comelon de mierda', 'lambón', 'singón', 'singuero', 'empingado', 'papeado', 'tragado', 'jodido', 'cojones', 'coño', 'coñazo', 'coñazo que te di', 'me cago en dios', 'pinga', 'pingazo', 'pingaza', 'singadera', 'jodedera', 'mariconería', 'boberias', 'chusmeria'],
      },
      {
        key: 'malas_palabras_verbos',
        name: 'Verbos vulgares',
        words: ['singar', 'singarse', 'joder', 'joderse', 'cagar', 'cagarse', 'mear', 'mearse', 'tirar', 'tirarse', 'templar', 'templarse', 'chingar', 'chinarse', 'coger', 'mamarse', 'chupar', 'lamer', 'tragar', 'empingar', 'papear', 'fletar', 'tumbar', 'botar pa la mierda'],
      },
      {
        key: 'malas_palabras_anatomia',
        name: 'Partes del cuerpo (vulgar)',
        words: ['pinga', 'pingón', 'pinguita', 'rabo', 'güevo', 'guevos', 'cojones', 'tetas', 'tetona', 'culo', 'culona', 'nalgas', 'nalgona', 'toto', 'crica', 'chocha', 'coño', 'panocha', 'ñema', 'bollito', 'bicho', 'verga'],
      },
    ],
  },
  {
    key: 'dichos_refranes',
    name: 'Dichos y refranes cubanos',
    subcategories: [
      {
        key: 'dichos_refranes_populares',
        name: 'Refranes populares',
        words: ['el que tiene padrino se bautiza', 'camarón que se duerme se lo lleva la corriente', 'el que nace para tamal del cielo le caen las hojas', 'perro que ladra no muerde', 'no dejes para mañana lo que puedes hacer hoy', 'más vale pájaro en mano que cien volando', 'el que mucho abarca poco aprieta', 'a caballo regalado no se le mira el diente', 'del dicho al hecho hay un trecho', 'en boca cerrada no entran moscas', 'cría cuervos y te sacarán los ojos', 'al que madruga dios lo ayuda', 'el que ríe último ríe mejor', 'dime con quién andas y te diré quién eres', 'más sabe el diablo por viejo que por diablo', 'candela con candela no alumbra', 'el vivo vive del bobo', 'el que no llora no mama'],
      },
      {
        key: 'dichos_refranes_cubanos',
        name: 'Dichos cubanos',
        words: ['estar en la fuácata', 'estar en candela', 'estar en el aire', 'estar con el moño torcido', 'estar arrancado', 'estar pelado', 'estar duro', 'estar en la lucha', 'estar resolviendo', 'estar inventando', 'darle al clavo', 'meter la pata', 'meter el diente', 'echar un cable', 'pasar roncha', 'pasar trabajo', 'coger lucha', 'coger botella', 'tirar la toalla', 'ponerse las pilas', 'ponerse pa lo suyo', 'ponerse bravo', 'ponerse guapo', 'caer de la mata', 'caer del nido', 'caer en el garlito', 'caer en la trampa', 'hacer agua', 'hacer el oso', 'hacer el ridículo', 'hacer el show', 'hacerse el loco', 'hacerse el muerto', 'no tener un kilo', 'no tener donde caerse muerto', 'no tener ni un chele', 'quedarse en blanco', 'quedarse en la calle', 'quedarse sin nada', 'andar de pinga en pinga', 'andar como pollo sin cabeza', 'andar volando bajo'],
      },
      {
        key: 'dichos_refranes_frases',
        name: 'Frases hechas',
        words: ['la cosa está dura', 'la cosa está mala', 'la cosa está fea', 'aquí no pasa nada', 'todo está bien', 'no hay problema', 'tranquilo hermano', 'sin presión', 'así es la cosa', 'qué bolá', 'qué bola contigo', 'qué vuelta', 'qué fue', 'te pasaste', 'estás loco', 'estás fuera de base', 'dale candela', 'dale pa delante', 'sigue pa lante'],
      },
    ],
  },
  {
    key: 'escuelas',
    name: 'Escuelas y universidades',
    subcategories: [
      {
        key: 'escuelas_universidades',
        name: 'Universidades',
        words: ['universidad de la habana', 'cujae', 'ispjae', 'uci', 'universidad central de las villas', 'universidad de oriente', 'universidad de camaguey', 'universidad de cienfuegos', 'universidad de matanzas', 'universidad de pinar del rio', 'universidad de sancti spiritus', 'instituto superior de arte', 'isa', 'escuela nacional de arte', 'ena', 'instituto superior pedagogico', 'universidad agraria', 'instituto superior de ciencias medicas'],
      },
      {
        key: 'escuelas_vocacionales',
        name: 'Escuelas vocacionales',
        words: ['vladimir ilich lenin', 'ipvce lenin', 'esbec', 'ipuec', 'ipvce', 'jose marti', 'ernesto che guevara', 'camilo cienfuegos', 'maximo gomez', 'antonio maceo', 'ignacio agramonte', 'frank pais', 'julio antonio mella', 'abel santamaria'],
      },
      {
        key: 'escuelas_tecnicas',
        name: 'Institutos y escuelas',
        words: ['politecnico', 'tecnologico', 'escuela de oficios', 'instituto preuniversitario', 'pre', 'secundaria basica', 'primaria', 'circulo infantil', 'escuela de arte', 'conservatorio', 'escuela de musica', 'escuela de ballet', 'escuela deportiva', 'eide', 'espa'],
      },
    ],
  },
  {
    key: 'economia',
    name: 'Economía y problemas actuales',
    subcategories: [
      {
        key: 'economia_moneda',
        name: 'Economía y moneda',
        words: ['dolar', 'mlc', 'cup', 'cuc', 'peso cubano', 'peso convertible', 'tienda en mlc', 'tarea ordenamiento', 'ordenamiento monetario', 'inflacion', 'deflacion', 'devaluacion', 'salario', 'pension', 'jubilacion', 'remesas', 'envios', 'transferencias', 'cadeca', 'casa de cambio', 'mercado negro', 'mercado informal', 'compraventa', 'permuta', 'alquiler', 'renta'],
      },
      {
        key: 'economia_problemas',
        name: 'Problemas cotidianos',
        words: ['apagon', 'blackout', 'corte de luz', 'falta de corriente', 'falta de agua', 'salidero', 'rotura', 'fuga de agua', 'cola', 'fila', 'hacer cola', 'hacer fila', 'escasez', 'falta de productos', 'desabastecimiento', 'carencia', 'shortage'],
      },
      {
        key: 'economia_crisis',
        name: 'Crisis y racionamiento',
        words: ['crisis economica', 'periodo especial', 'bloqueo', 'embargo', 'sanciones', 'restricciones', 'cartilla de racionamiento', 'libreta de abastecimiento', 'productos normados', 'racionamiento', 'bodega', 'la cola del pan', 'el pan', 'la leche', 'el pollo', 'el aceite', 'detergente', 'jabon', 'pasta dental', 'papel sanitario', 'papel higienico', 'falta de gasolina', 'escasez de combustible', 'diesel', 'gasolina', 'petroleo', 'gas', 'gas licuado', 'bombona', 'candela de gas', 'carbon', 'kerosene'],
      },
    ],
  },
  {
    key: 'apodos',
    name: 'Apodos y sobrenombres',
    subcategories: [
      {
        key: 'apodos_fisicos',
        name: 'Apodos físicos',
        words: ['flaco', 'flaca', 'gordo', 'gorda', 'negro', 'negra', 'negrito', 'negrita', 'chino', 'china', 'chinito', 'chinita', 'rubio', 'rubia', 'colorado', 'colorada', 'pelao', 'pelá', 'calvo', 'calva', 'mocho', 'mocha', 'cojo', 'coja', 'tuerto', 'tuerta', 'bizco', 'bizca', 'chato', 'chata', 'ñato', 'ñata', 'narigon', 'narigona', 'bembón', 'bembona', 'jetón', 'jetona', 'orejón', 'orejona', 'cabezón', 'cabezona', 'trompudo', 'trompuda'],
      },
      {
        key: 'apodos_carinosos',
        name: 'Apodos cariñosos',
        words: ['mi vida', 'mi amor', 'mi cielo', 'mi rey', 'mi reina', 'papito', 'mamita', 'papi', 'mami', 'chico', 'chica', 'niño', 'niña', 'nene', 'nena', 'bebé', 'baby', 'corazón', 'tesoro', 'principe', 'princesa'],
      },
      {
        key: 'apodos_comunes',
        name: 'Apodos comunes',
        words: ['yuma', 'extranjero', 'compa', 'compañero', 'socio', 'consorte', 'hermano', 'hermana', 'primo', 'prima', 'tio', 'tia', 'viejo', 'vieja', 'jefe', 'jefa', 'maestro', 'maestra', 'profe', 'doctor', 'doctora', 'ingeniero', 'ingeniera', 'el loco', 'la loca', 'el ciego', 'la ciega', 'el mudo', 'la muda', 'el sordo', 'la sorda', 'el bizco', 'la bizca'],
      },
    ],
  },
  {
    key: 'juegos',
    name: 'Juegos tradicionales',
    subcategories: [
      {
        key: 'juegos_calle',
        name: 'Juegos de calle',
        words: ['escondido', 'escondite', 'el pillao', 'la lleva', 'el quema', 'quemado', 'la candelita', 'la candela', 'policias y ladrones', 'el pon', 'pon', 'cuatro esquinas', 'las cuatro esquinas', 'la ere', 'erebo', 'pañuelito', 'el pañuelo', 'la soga', 'saltar la soga', 'saltar la suiza', 'la suiza', 'el trompo', 'la perinola', 'el yoyo', 'la cometa', 'el papalote', 'las bolas', 'las canicas', 'el aro', 'tocar timbre y correr', 'timbres'],
      },
      {
        key: 'juegos_mesa',
        name: 'Juegos de mesa',
        words: ['domino', 'damas', 'damas chinas', 'parchis', 'ajedrez', 'cartas', 'baraja', 'conquian', 'burro', 'casino', 'chinchon', 'canasta', 'rummy', 'poker', 'blackjack', 'veintiuna'],
      },
      {
        key: 'juegos_infantiles',
        name: 'Juegos infantiles',
        words: ['la rueda rueda', 'arroz con leche', 'la vibora de la mar', 'pin pon', 'palmas palmitas', 'este compro un huevito', 'los pollitos dicen', 'una dos y tres', 'cinco lobitos', 'aserrín aserrán', 'la gallinita ciega', 'gallinita ciega', 'pelota', 'baseball', 'cuatro esquinas con pelota', 'el viti', 'bateo', 'el fly', 'futbol callejero', 'futbolito', 'futbol de salon', 'baloncesto callejero'],
      },
    ],
  },
  {
    key: 'cantantes',
    name: 'Cantantes cubanos',
    subcategories: [
      {
        key: 'cantantes_salsa_timba',
        name: 'Salsa y timba',
        words: ['celia cruz', 'benny more', 'benny moré', 'isaac delgado', 'issac delgado', 'paulito fg', 'paulito fernandez', 'manolito simonet', 'manolin el medico', 'manolin el médico', 'adalberto alvarez', 'adalberto álvarez', 'david calzado', 'alexander abreu', 'haila mompie', 'haila', 'osdalgia', 'tania pantoja', 'mayito rivera', 'yeni rizo', 'michel maza', 'pedrito calvo', 'bamboleo', 'la charanga habanera', 'charanga habanera', 'los van van', 'ng la banda', 'klimax', 'azucar negra', 'la elite', 'habana de primera', 'havana d primera'],
      },
      {
        key: 'cantantes_reggaeton',
        name: 'Reggaeton y urbano',
        words: ['el taiger', 'el chacal', 'el micha', 'jacob forever', 'osmani garcia', 'osmany garcia', 'la diosa', 'yomil', 'el dany', 'chocolate mc', 'divan', 'baby lores', 'el kokito', 'el uniko', 'el kamel', 'kimiko', 'yordy', 'wampi', 'leoni torres', 'el negrito', 'yulien oviedo', 'srta dayana', 'senorita dayana', 'señorita dayana', 'gente de zona', 'orishas', 'cimafunk', 'maykel blanco'],
      },
      {
        key: 'cantantes_trova_bolero',
        name: 'Trova y bolero',
        words: ['silvio rodriguez', 'silvio rodríguez', 'pablo milanes', 'pablo milanés', 'carlos varela', 'noel nicola', 'sara gonzalez', 'sara gonzález', 'vicente feliu', 'vicente feliú', 'frank delgado', 'kelvis ochoa', 'david torrens', 'polito ibañez', 'polito ibáñez', 'amaury gutierrez', 'amaury gutiérrez', 'raul paz', 'raúl paz', 'x alfonso', 'aldo moya', 'david blanco', 'interactivo', 'buena fe', 'eduardo sosa', 'omara portuondo', 'elena burke', 'maria teresa vera', 'maría teresa vera', 'rosita fornes', 'rosita fornés', 'celina gonzalez', 'celina gonzález'],
      },
      {
        key: 'cantantes_clasicos',
        name: 'Clásicos e históricos',
        words: ['bola de nieve', 'ignacio villa', 'rita montaner', 'esther borja', 'barbarito diez', 'barbarito díez', 'blanca rosa gil', 'fernando albuerne', 'abelardo barroso', 'miguelito cuni', 'miguelito cuní', 'miguelito valdes', 'miguelito valdés', 'orlando vallejo', 'compay segundo', 'ibrahim ferrer', 'eliades ochoa', 'rubén gonzalez', 'rubén gonzález', 'pio leyva', 'pío leyva', 'cheo feliciano', 'ismael rivera', 'hector lavoe', 'héctor lavoe', 'tito puente', 'machito', 'celia y johnny', 'sonora matancera', 'la sonora matancera', 'trio matamoros', 'trío matamoros', 'sexteto habanero', 'septeto habanero'],
      },
    ],
  },
];

// Función helper para obtener todas las palabras de una configuración de categoría
export function getAllWordsFromConfig(): string[] {
  const allWords: string[] = [];
  CATEGORIES_CONFIG.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      allWords.push(...subcategory.words);
    });
  });
  return allWords;
}

// Función helper para obtener palabras por subcategoría
export function getWordsBySubcategory(subcategoryKey: string): string[] {
  for (const category of CATEGORIES_CONFIG) {
    const subcategory = category.subcategories.find((sub) => sub.key === subcategoryKey);
    if (subcategory) {
      return subcategory.words;
    }
  }
  return [];
}

// Función helper para obtener todas las palabras de una categoría
export function getWordsByCategory(categoryKey: string): string[] {
  const category = CATEGORIES_CONFIG.find((cat) => cat.key === categoryKey);
  if (!category) return [];
  
  const allWords: string[] = [];
  category.subcategories.forEach((subcategory) => {
    allWords.push(...subcategory.words);
  });
  return allWords;
}
