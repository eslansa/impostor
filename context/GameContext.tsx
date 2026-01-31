import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player, Round, GameSettings, CategoryKey, CategorySelection, CustomCategory } from '@/types/game';
import { createRound, getImpostorCount, ALL_CATEGORIES } from '@/utils/gameLogic';
import { CATEGORIES_CONFIG } from '@/constants/categories';

type GameContextType = {
  numberOfPlayers: number;
  players: Player[];
  currentRound: Round | null;
  roundNumber: number;
  settings: GameSettings;
  setNumberOfPlayers: (num: number) => void;
  setPlayers: (players: Player[]) => void;
  setSettings: (settings: GameSettings) => void;
  startNewRound: (currentPlayers?: Player[]) => void;
  resetGame: () => void;
  getImpostorCountForPlayers: (count: number) => number;
  clearRoundIfNeeded: () => void;
};

// Crear configuración por defecto con todas las categorías y subcategorías habilitadas
function createDefaultSettings(): GameSettings {
  const categorySelections: { [key in CategoryKey]: CategorySelection } = {} as any;
  
  ALL_CATEGORIES.forEach((categoryKey) => {
    const categoryConfig = CATEGORIES_CONFIG.find((cat) => cat.key === categoryKey);
    if (categoryConfig) {
      const subcategories: { [key: string]: boolean } = {};
      categoryConfig.subcategories.forEach((subcategory) => {
        subcategories[subcategory.key] = true; // Todas habilitadas por defecto
      });

      categorySelections[categoryKey] = {
        category: categoryKey,
        enabled: true,
        subcategories: subcategories as any,
      };
    }
  });

  return {
    showHintToImpostor: false,
    categorySelections,
    customCategories: [],
    enableCustomImpostorCount: false,
    customImpostorCount: 1,
    enableSurprises: false,
  };
}

const defaultSettings: GameSettings = createDefaultSettings();

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [numberOfPlayers, setNumberOfPlayers] = useState(4);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);

  const startNewRound = () => {
    if (players.length === 0) return;
    const newRoundNumber = roundNumber + 1;
    const newRound = createRound(players, newRoundNumber, settings);
    setCurrentRound(newRound);
    setRoundNumber(newRoundNumber);
  };

  const resetGame = () => {
    setPlayers([]);
    setCurrentRound(null);
    setRoundNumber(0);
    setNumberOfPlayers(4);
  };

  const getImpostorCountForPlayers = (count: number) => getImpostorCount(count, settings);

  // Solo limpiar la ronda si hay una activa cuando se resetea el juego
  const clearRoundIfNeeded = () => {
    if (currentRound) {
      setCurrentRound(null);
      setRoundNumber(0);
    }
  };

  return (
    <GameContext.Provider
      value={{
        numberOfPlayers,
        players,
        currentRound,
        roundNumber,
        settings,
        setNumberOfPlayers,
        setPlayers,
        setSettings,
        startNewRound,
        resetGame,
        getImpostorCountForPlayers,
        clearRoundIfNeeded,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}


