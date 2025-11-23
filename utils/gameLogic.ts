import {
  WORDS,
  JERGA_CUBANA,
  INFLUENCERS_CUBANOS,
  COMIDA_CUBANA,
  LUGARES_CUBANOS,
  COSAS_CUBANAS,
} from '@/constants/words';
import { Player, Round, GameSettings, CategoryKey } from '@/types/game';

// Mapa de categorías con sus nombres en español
export const CATEGORY_MAP: { [key in CategoryKey]: { words: string[]; name: string } } = {
  jerga: { words: JERGA_CUBANA, name: 'Jerga cubana' },
  influencers: { words: INFLUENCERS_CUBANOS, name: 'Influencers cubanos' },
  comida: { words: COMIDA_CUBANA, name: 'Comida cubana' },
  lugares: { words: LUGARES_CUBANOS, name: 'Lugares de Cuba' },
  cosas: { words: COSAS_CUBANAS, name: 'Cosas cubanas' },
};

// Lista de todas las categorías disponibles
export const ALL_CATEGORIES: CategoryKey[] = ['jerga', 'influencers', 'comida', 'lugares', 'cosas'];

// Obtener palabra aleatoria con su categoría (filtrando por categorías seleccionadas)
export function getRandomWordWithCategory(selectedCategories: CategoryKey[]): { word: string; category: string } {
  // Si no hay categorías seleccionadas, usar todas
  const categories = selectedCategories.length > 0 ? selectedCategories : ALL_CATEGORIES;
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryData = CATEGORY_MAP[randomCategory];
  const randomWord = categoryData.words[Math.floor(Math.random() * categoryData.words.length)];
  return { word: randomWord, category: categoryData.name };
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
  const { word: normalWord, category } = getRandomWordWithCategory(settings.selectedCategories);
  const impostorWord = 'IMPOSTOR';
  const impostorCount = getImpostorCount(players.length);

  // Seleccionar índices de impostores al azar
  const shuffledIndices = shuffleArray([...Array(players.length).keys()]);
  const impostorIndices = shuffledIndices.slice(0, impostorCount);
  const impostorPlayerIds = impostorIndices.map((idx) => players[idx].id);

  // Crear los jugadores con sus palabras asignadas
  const playersWithWords: Player[] = players.map((player) => {
    const isImpostor = impostorPlayerIds.includes(player.id);
    return {
      ...player,
      isImpostor,
      word: isImpostor ? impostorWord : normalWord,
      hint: isImpostor && settings.showHintToImpostor ? category : undefined,
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

