import { WORDS } from '@/constants/words';
import { CATEGORIES_CONFIG, getWordsBySubcategory, getWordsByCategory } from '@/constants/categories';
import { Player, Round, GameSettings, CategoryKey, SubcategoryKey } from '@/types/game';
import { generateHint } from './hints';

// Mapa de categorías con sus nombres en español (para compatibilidad)
export const CATEGORY_MAP: { [key in CategoryKey]: { name: string } } = {
  jerga: { name: 'Jerga cubana' },
  influencers: { name: 'Influencers cubanos' },
  comida: { name: 'Comida cubana' },
  lugares: { name: 'Lugares de Cuba' },
  cosas: { name: 'Cosas cubanas' },
  deportes: { name: 'Deportes cubanos' },
  historia: { name: 'Historia cubana' },
  tradiciones: { name: 'Tradiciones cubanas' },
  naturaleza: { name: 'Naturaleza cubana' },
  malas_palabras: { name: 'Malas palabras cubanas' },
  dichos_refranes: { name: 'Dichos y refranes cubanos' },
  escuelas: { name: 'Escuelas y universidades' },
  economia: { name: 'Economía y problemas actuales' },
  apodos: { name: 'Apodos y sobrenombres' },
  juegos: { name: 'Juegos tradicionales' },
  cantantes: { name: 'Cantantes cubanos' },
  transporte: { name: 'Transporte cubano' },
  tv_medios: { name: 'Programas de TV y medios' },
  marcas: { name: 'Marcas y productos cubanos' },
  comercios: { name: 'Comercios y negocios' },
};

// Lista de todas las categorías disponibles
export const ALL_CATEGORIES: CategoryKey[] = ['jerga', 'influencers', 'comida', 'lugares', 'cosas', 'deportes', 'historia', 'tradiciones', 'naturaleza', 'malas_palabras', 'dichos_refranes', 'escuelas', 'economia', 'apodos', 'juegos', 'cantantes', 'transporte', 'tv_medios', 'marcas', 'comercios'];

// Obtener todas las palabras disponibles basadas en la configuración de categorías
function getAvailableWords(settings: GameSettings): { words: string[]; categoryName: string }[] {
  const availableWords: { words: string[]; categoryName: string }[] = [];

  CATEGORIES_CONFIG.forEach((categoryConfig) => {
    const categorySelection = settings.categorySelections[categoryConfig.key];
    
    // Si la categoría está deshabilitada, saltarla
    if (!categorySelection.enabled) return;

    const categoryWords: string[] = [];
    let hasEnabledSubcategories = false;

    // Recopilar palabras de subcategorías habilitadas
    categoryConfig.subcategories.forEach((subcategory) => {
      const subcategoryEnabled = categorySelection.subcategories[subcategory.key] !== false; // Por defecto true si no está definido
      
      if (subcategoryEnabled) {
        categoryWords.push(...subcategory.words);
        hasEnabledSubcategories = true;
      }
    });

    // Si hay subcategorías habilitadas, agregar las palabras
    if (hasEnabledSubcategories && categoryWords.length > 0) {
      availableWords.push({
        words: categoryWords,
        categoryName: categoryConfig.name,
      });
    }
  });

  return availableWords;
}

// Obtener palabra aleatoria con su categoría (filtrando por categorías y subcategorías seleccionadas)
export function getRandomWordWithCategory(settings: GameSettings): { word: string; category: string } {
  const availableWords = getAvailableWords(settings);

  if (availableWords.length === 0) {
    // Fallback: si no hay palabras disponibles, usar todas
    const allWords = CATEGORIES_CONFIG.flatMap((cat) =>
      cat.subcategories.flatMap((sub) => sub.words)
    );
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    return { word: randomWord, category: 'General' };
  }

  // Seleccionar una categoría aleatoria de las disponibles
  const randomCategoryIndex = Math.floor(Math.random() * availableWords.length);
  const selectedCategory = availableWords[randomCategoryIndex];

  // Seleccionar una palabra aleatoria de esa categoría
  const randomWordIndex = Math.floor(Math.random() * selectedCategory.words.length);
  const randomWord = selectedCategory.words[randomWordIndex];

  return {
    word: randomWord,
    category: selectedCategory.categoryName,
  };
}

export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}

// Función para mezclar un array (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Calcular número de impostores basado en cantidad de jugadores
export function getImpostorCount(playerCount: number, settings?: GameSettings): number {
  // Si hay más de 5 jugadores y hay un número personalizado configurado, usarlo
  if (playerCount > 5 && settings?.customImpostorCount !== undefined) {
    // Validar que el número personalizado sea válido (al menos 1 y menos que el número de jugadores)
    const customCount = Math.max(1, Math.min(settings.customImpostorCount, playerCount - 1));
    return customCount;
  }
  
  // Lógica por defecto: 6+ jugadores = 2 impostores, menos de 6 = 1 impostor
  return playerCount >= 6 ? 2 : 1;
}

// Tipos de sorpresas disponibles
export type SurpriseType = 
  | 'all_impostors'           // Todos impostores
  | 'no_impostors'            // Nadie impostor
  | 'all_different_words'     // Todos diferentes palabras
  | 'all_different_2_impostors' // Todos diferentes palabras y 2 impostores
  | 'all_same_word'           // Todos la misma palabra (nadie impostor pero confusión)
  | 'half_impostors'          // Mitad impostores, mitad normales
  | 'one_not_impostor'        // Solo 1 no impostor (todos menos uno son impostores)
  | 'related_words';          // Palabras relacionadas (misma categoría, diferentes palabras)

// Determinar tipo de sorpresa aleatoria
function getRandomSurpriseType(): SurpriseType {
  const surprises: SurpriseType[] = [
    'all_impostors',
    'no_impostors',
    'all_different_words',
    'all_different_2_impostors',
    'all_same_word',
    'half_impostors',
    'one_not_impostor',
    'related_words',
  ];
  return surprises[Math.floor(Math.random() * surprises.length)];
}

// Verificar si es una ronda de sorpresa (cada 7 rondas)
function isSurpriseRound(roundNumber: number): boolean {
  return roundNumber > 0 && roundNumber % 7 === 0;
}

export function createRound(
  players: Player[],
  roundNumber: number,
  settings: GameSettings
): Round {
  const impostorWord = 'IMPOSTOR';
  let normalWord: string;
  let category: string;
  let impostorCount: number;
  let impostorPlayerIds: string[] = [];
  let surpriseType: SurpriseType | null = null;

  // Verificar si es ronda de sorpresa
  const isSurprise = settings.enableSurprises && isSurpriseRound(roundNumber);
  
  if (isSurprise) {
    surpriseType = getRandomSurpriseType();
  }

  // Aplicar lógica de sorpresa o normal
  if (isSurprise && surpriseType) {
    const availableWords = getAvailableWords(settings);
    const allWords = availableWords.flatMap(cat => cat.words);
    
    switch (surpriseType) {
      case 'all_impostors':
        // Todos impostores
        normalWord = allWords[Math.floor(Math.random() * allWords.length)] || 'PALABRA';
        category = 'Sorpresa';
        impostorCount = players.length;
        impostorPlayerIds = players.map(p => p.id);
        break;

      case 'no_impostors':
        // Nadie impostor
        const { word: word1, category: cat1 } = getRandomWordWithCategory(settings);
        normalWord = word1;
        category = cat1;
        impostorCount = 0;
        impostorPlayerIds = [];
        break;

      case 'all_different_words':
        // Todos diferentes palabras
        const shuffledWords = shuffleArray([...allWords]);
        normalWord = shuffledWords[0] || 'PALABRA';
        category = 'Sorpresa';
        impostorCount = 0;
        impostorPlayerIds = [];
        break;

      case 'all_different_2_impostors':
        // Todos diferentes palabras y 2 impostores
        const shuffledWords2 = shuffleArray([...allWords]);
        normalWord = shuffledWords2[0] || 'PALABRA';
        category = 'Sorpresa';
        impostorCount = Math.min(2, players.length - 1);
        const shuffledIndices2 = shuffleArray([...Array(players.length).keys()]);
        impostorPlayerIds = shuffledIndices2.slice(0, impostorCount).map(idx => players[idx].id);
        break;

      case 'all_same_word':
        // Todos la misma palabra (nadie impostor pero confusión)
        const { word: word2, category: cat2 } = getRandomWordWithCategory(settings);
        normalWord = word2;
        category = cat2;
        impostorCount = 0;
        impostorPlayerIds = [];
        break;

      case 'half_impostors':
        // Mitad impostores, mitad normales
        const { word: word3, category: cat3 } = getRandomWordWithCategory(settings);
        normalWord = word3;
        category = cat3;
        impostorCount = Math.floor(players.length / 2);
        const shuffledIndices3 = shuffleArray([...Array(players.length).keys()]);
        impostorPlayerIds = shuffledIndices3.slice(0, impostorCount).map(idx => players[idx].id);
        break;

      case 'one_not_impostor':
        // Solo 1 no impostor (todos menos uno son impostores)
        const { word: word4, category: cat4 } = getRandomWordWithCategory(settings);
        normalWord = word4;
        category = cat4;
        impostorCount = Math.max(1, players.length - 1);
        const shuffledIndices4 = shuffleArray([...Array(players.length).keys()]);
        impostorPlayerIds = shuffledIndices4.slice(0, impostorCount).map(idx => players[idx].id);
        break;

      case 'related_words':
        // Palabras relacionadas (misma categoría, diferentes palabras)
        const randomCategory = availableWords[Math.floor(Math.random() * availableWords.length)];
        if (randomCategory && randomCategory.words.length > 0) {
          const categoryWords = shuffleArray([...randomCategory.words]);
          normalWord = categoryWords[0] || 'PALABRA';
          category = randomCategory.categoryName;
          impostorCount = 0;
          impostorPlayerIds = [];
        } else {
          const { word: word5, category: cat5 } = getRandomWordWithCategory(settings);
          normalWord = word5;
          category = cat5;
          impostorCount = 0;
          impostorPlayerIds = [];
        }
        break;

      default:
        // Fallback a ronda normal
        const { word: wordDefault, category: catDefault } = getRandomWordWithCategory(settings);
        normalWord = wordDefault;
        category = catDefault;
        impostorCount = getImpostorCount(players.length, settings);
        const shuffledIndicesDefault = shuffleArray([...Array(players.length).keys()]);
        impostorPlayerIds = shuffledIndicesDefault.slice(0, impostorCount).map(idx => players[idx].id);
    }
  } else {
    // Ronda normal
    const { word: wordNormal, category: catNormal } = getRandomWordWithCategory(settings);
    normalWord = wordNormal;
    category = catNormal;
    impostorCount = getImpostorCount(players.length, settings);
    const shuffledIndices = shuffleArray([...Array(players.length).keys()]);
    impostorPlayerIds = shuffledIndices.slice(0, impostorCount).map(idx => players[idx].id);
  }

  // Generar pista específica para el impostor basada en la palabra real
  const impostorHint = settings.showHintToImpostor 
    ? generateHint(normalWord, category) 
    : undefined;

  // Crear los jugadores con sus palabras asignadas
  let playersWithWords: Player[] = [];
  
  if (isSurprise && surpriseType === 'all_different_words') {
    // Todos diferentes palabras
    const shuffledWords = shuffleArray([...getAvailableWords(settings).flatMap(cat => cat.words)]);
    playersWithWords = players.map((player, index) => {
      const word = shuffledWords[index % shuffledWords.length] || normalWord;
      return {
        ...player,
        isImpostor: false,
        word: word,
        hint: undefined,
      };
    });
  } else if (isSurprise && surpriseType === 'all_different_2_impostors') {
    // Todos diferentes palabras y 2 impostores
    const shuffledWords = shuffleArray([...getAvailableWords(settings).flatMap(cat => cat.words)]);
    playersWithWords = players.map((player, index) => {
      const isImpostor = impostorPlayerIds.includes(player.id);
      const word = isImpostor 
        ? impostorWord 
        : (shuffledWords[index % shuffledWords.length] || normalWord);
      return {
        ...player,
        isImpostor,
        word: word,
        hint: isImpostor ? impostorHint : undefined,
      };
    });
  } else if (isSurprise && surpriseType === 'related_words') {
    // Palabras relacionadas (misma categoría)
    const randomCategory = getAvailableWords(settings)[Math.floor(Math.random() * getAvailableWords(settings).length)];
    if (randomCategory && randomCategory.words.length >= players.length) {
      const categoryWords = shuffleArray([...randomCategory.words]);
      playersWithWords = players.map((player, index) => {
        return {
          ...player,
          isImpostor: false,
          word: categoryWords[index % categoryWords.length] || normalWord,
          hint: undefined,
        };
      });
    } else {
      // Fallback si no hay suficientes palabras
      playersWithWords = players.map((player) => {
        const isImpostor = impostorPlayerIds.includes(player.id);
        return {
          ...player,
          isImpostor,
          word: isImpostor ? impostorWord : normalWord,
          hint: isImpostor ? impostorHint : undefined,
        };
      });
    }
  } else {
    // Ronda normal o otras sorpresas
    playersWithWords = players.map((player) => {
      const isImpostor = impostorPlayerIds.includes(player.id);
      return {
        ...player,
        isImpostor,
        word: isImpostor ? impostorWord : normalWord,
        hint: isImpostor ? impostorHint : undefined,
      };
    });
  }

  // Mezclar el orden de los jugadores DESPUÉS de asignar palabras
  const shuffledPlayers = shuffleArray(playersWithWords);

  return {
    roundNumber,
    currentPlayerIndex: 0,
    players: shuffledPlayers,
    normalWord,
    impostorWord,
    impostorPlayerIds,
    impostorCount,
  };
}

export function getNextPlayerIndex(
  currentIndex: number,
  totalPlayers: number
): number {
  return (currentIndex + 1) % totalPlayers;
}

export function isLastPlayer(
  currentIndex: number,
  totalPlayers: number
): boolean {
  return currentIndex === totalPlayers - 1;
}


