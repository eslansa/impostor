import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Player, Round, GameSettings } from '@/types/game';
import { createRound, getImpostorCount, ALL_CATEGORIES } from '@/utils/gameLogic';

type GameContextType = {
  numberOfPlayers: number;
  players: Player[];
  currentRound: Round | null;
  roundNumber: number;
  settings: GameSettings;
  setNumberOfPlayers: (num: number) => void;
  setPlayers: (players: Player[]) => void;
  setSettings: (settings: GameSettings) => void;
  startNewRound: () => void;
  resetGame: () => void;
  getImpostorCountForPlayers: (count: number) => number;
};

const defaultSettings: GameSettings = {
  showHintToImpostor: false,
  selectedCategories: [...ALL_CATEGORIES], // Todas las categorías por defecto
};

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

  const getImpostorCountForPlayers = (count: number) => getImpostorCount(count);

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

