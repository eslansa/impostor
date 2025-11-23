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

export type CategoryKey = 'jerga' | 'influencers' | 'comida' | 'lugares' | 'cosas';

export type GameSettings = {
  showHintToImpostor: boolean; // Si el impostor ve la categoría de la palabra
  selectedCategories: CategoryKey[]; // Categorías seleccionadas para el juego
};

export type GameState = {
  players: Player[];
  currentRound: Round | null;
  numberOfPlayers: number;
  roundNumber: number;
  settings: GameSettings;
};

