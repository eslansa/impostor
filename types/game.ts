export type Player = {
  id: string;
  name: string;
  isImpostor: boolean;
  word: string;
  hint?: string; // Pista de categoría para el impostor
};

export type Round = {
  roundNumber: number;
  currentPlayerIndex: number;
  players: Player[];
  normalWord: string;
  impostorWord: string;
  impostorPlayerIds: string[]; // Cambiado a array para múltiples impostores
  impostorCount: number;
};

export type CategoryKey = 'jerga' | 'influencers' | 'comida' | 'lugares' | 'cosas' | 'deportes' | 'historia' | 'tradiciones' | 'naturaleza' | 'malas_palabras' | 'dichos_refranes' | 'escuelas' | 'economia' | 'apodos' | 'juegos' | 'cantantes';

export type SubcategoryKey =
  // Jerga
  | 'jerga_expresiones' | 'jerga_modismos' | 'jerga_verbos' | 'jerga_sustantivos'
  // Influencers
  | 'influencers_musica' | 'influencers_publicos' | 'influencers_actores'
  // Comida
  | 'comida_platos' | 'comida_aperitivos' | 'comida_bebidas' | 'comida_postres'
  // Lugares
  | 'lugares_ciudades' | 'lugares_barrios' | 'lugares_turisticos'
  // Cosas
  | 'cosas_musica' | 'cosas_vestimenta' | 'cosas_objetos'
  // Deportes
  | 'deportes_deportistas' | 'deportes_deportes' | 'deportes_eventos'
  // Historia
  | 'historia_personajes' | 'historia_eventos' | 'historia_monumentos'
  // Tradiciones
  | 'tradiciones_festividades' | 'tradiciones_costumbres' | 'tradiciones_simbolos'
  // Naturaleza
  | 'naturaleza_animales' | 'naturaleza_plantas' | 'naturaleza_lugares'
  // Malas palabras
  | 'malas_palabras_insultos' | 'malas_palabras_expresiones' | 'malas_palabras_verbos' | 'malas_palabras_anatomia'
  // Dichos y refranes
  | 'dichos_refranes_populares' | 'dichos_refranes_cubanos' | 'dichos_refranes_frases'
  // Escuelas
  | 'escuelas_universidades' | 'escuelas_vocacionales' | 'escuelas_tecnicas'
  // Economía
  | 'economia_moneda' | 'economia_problemas' | 'economia_crisis'
  // Apodos
  | 'apodos_fisicos' | 'apodos_carinosos' | 'apodos_comunes'
  // Juegos
  | 'juegos_calle' | 'juegos_mesa' | 'juegos_infantiles'
  // Cantantes
  | 'cantantes_salsa_timba' | 'cantantes_reggaeton' | 'cantantes_trova_bolero' | 'cantantes_clasicos';

export type CategoryConfig = {
  key: CategoryKey;
  name: string;
  subcategories: {
    key: SubcategoryKey;
    name: string;
    words: string[];
  }[];
};

export type CategorySelection = {
  category: CategoryKey;
  enabled: boolean;
  subcategories: {
    [key in SubcategoryKey]?: boolean;
  };
};

export type GameSettings = {
  showHintToImpostor: boolean; // Si el impostor ve la categoría de la palabra
  categorySelections: {
    [key in CategoryKey]: CategorySelection;
  };
};

export type GameState = {
  players: Player[];
  currentRound: Round | null;
  numberOfPlayers: number;
  roundNumber: number;
  settings: GameSettings;
};


