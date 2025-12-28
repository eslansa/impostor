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
};

// Lista de todas las categorías disponibles
export const ALL_CATEGORIES: CategoryKey[] = ['jerga', 'influencers', 'comida', 'lugares', 'cosas', 'deportes', 'historia', 'tradiciones', 'naturaleza', 'malas_palabras', 'dichos_refranes', 'escuelas', 'economia', 'apodos', 'juegos', 'cantantes'];

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
export function getImpostorCount(playerCount: number): number {
  // 6+ jugadores = 2 impostores, menos de 6 = 1 impostor
  return playerCount >= 6 ? 2 : 1;
}

export function createRound(
  players: Player[],
  roundNumber: number,
  settings: GameSettings
): Round {
  const { word: normalWord, category } = getRandomWordWithCategory(settings);
  const impostorWord = 'IMPOSTOR';
  const impostorCount = getImpostorCount(players.length);

  // Seleccionar índices de impostores al azar
  const shuffledIndices = shuffleArray([...Array(players.length).keys()]);
  const impostorIndices = shuffledIndices.slice(0, impostorCount);
  const impostorPlayerIds = impostorIndices.map((idx) => players[idx].id);

  // Generar pista específica para el impostor basada en la palabra real
  const impostorHint = settings.showHintToImpostor 
    ? generateHint(normalWord, category) 
    : undefined;

  // Crear los jugadores con sus palabras asignadas
  const playersWithWords: Player[] = players.map((player) => {
    const isImpostor = impostorPlayerIds.includes(player.id);
    return {
      ...player,
      isImpostor,
      word: isImpostor ? impostorWord : normalWord,
      hint: isImpostor ? impostorHint : undefined,
    };
  });

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


