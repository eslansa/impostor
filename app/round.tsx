import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import Card from '@/components/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { isLastPlayer } from '@/utils/gameLogic';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { HapticFeedback } from '@/utils/haptics';

export default function RoundScreen() {
  const router = useRouter();
  const { currentRound, startNewRound } = useGame();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const { height } = Dimensions.get('window');
  const isSmallScreen = height < 700;

  useEffect(() => {
    if (currentRound) {
      setCurrentPlayerIndex(0);
      setIsCardRevealed(false);
    }
  }, [currentRound]);

  const handleCardFlip = () => {
    HapticFeedback.cardFlip();
    setIsCardRevealed(true);
  };

  const handleNextPlayer = () => {
    if (!currentRound) return;

    const totalPlayers = currentRound.players.length;
    const nextIndex = currentPlayerIndex + 1;

    if (nextIndex < totalPlayers) {
      HapticFeedback.medium();
      setCurrentPlayerIndex(nextIndex);
      setIsCardRevealed(false);
    }
  };

  const handleStartDebate = () => {
    HapticFeedback.success();
    router.replace('/debate');
  };

  const handleNewRound = () => {
    startNewRound();
    router.replace('/round-start');
  };

  const handleEndGame = () => {
    router.replace('/');
  };

  if (!currentRound) {
    return (
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#4c1d95']}
        style={styles.container}
      >
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const currentPlayer = currentRound.players[currentPlayerIndex];
  const totalPlayers = currentRound.players.length;
  const isLast = isLastPlayer(currentPlayerIndex, totalPlayers);

  if (!currentPlayer) {
    return (
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#4c1d95']}
        style={styles.container}
      >
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Error: Jugador no encontrado</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#1e1b4b', '#312e81', '#4c1d95']}
      style={styles.container}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
            <Text style={[styles.playerName, isSmallScreen && styles.playerNameSmall]}>
              {currentPlayer.name}
            </Text>
            <View style={styles.progressContainer}>
              <Text style={[styles.progressText, isSmallScreen && styles.progressTextSmall]}>
                {currentPlayerIndex + 1} / {totalPlayers}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${((currentPlayerIndex + 1) / totalPlayers) * 100}%` }
                  ]}
                />
              </View>
            </View>
            <Text style={[styles.roundText, isSmallScreen && styles.roundTextSmall]}>
              Ronda {currentRound.roundNumber}
            </Text>
          </View>

          {/* Card */}
          <View style={[styles.cardContainer, isSmallScreen && styles.cardContainerSmall]}>
            <Card
              key={`card-${currentPlayerIndex}`}
              word={currentPlayer.word}
              onFlip={handleCardFlip}
              isRevealed={isCardRevealed}
              hint={currentPlayer.hint}
            />
          </View>

          {/* Instructions or Buttons */}
          {!isCardRevealed ? (
            <View style={styles.instructionsContainer}>
              <Text style={[styles.instructions, isSmallScreen && styles.instructionsSmall]}>
                Toca la carta para ver tu palabra
              </Text>
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              {isLast ? (
                <Pressable onPress={handleStartDebate} style={styles.primaryButton}>
                  <LinearGradient
                    colors={['#6366f1', '#8b5cf6', '#a855f7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>SIGUIENTE</Text>
                  </LinearGradient>
                </Pressable>
              ) : (
                <Pressable onPress={handleNextPlayer} style={styles.primaryButton}>
                  <LinearGradient
                    colors={['#6366f1', '#8b5cf6', '#a855f7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>SIGUIENTE JUGADOR</Text>
                  </LinearGradient>
                </Pressable>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    includeFontPadding: false,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  headerSmall: {
    marginBottom: 8,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    includeFontPadding: false,
    textAlign: 'center',
  },
  playerNameSmall: {
    fontSize: 20,
    marginBottom: 6,
  },
  progressContainer: {
    width: '100%',
    maxWidth: 180,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 6,
    includeFontPadding: false,
  },
  progressTextSmall: {
    fontSize: 12,
    marginBottom: 4,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  roundText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 6,
    includeFontPadding: false,
  },
  roundTextSmall: {
    fontSize: 11,
    marginTop: 4,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    paddingVertical: 8,
  },
  cardContainerSmall: {
    minHeight: 250,
    paddingVertical: 4,
  },
  instructionsContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  instructions: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    includeFontPadding: false,
  },
  instructionsSmall: {
    fontSize: 13,
    paddingVertical: 8,
  },
  buttonsContainer: {
    gap: 12,
    paddingTop: 8,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 10,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    includeFontPadding: false,
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    includeFontPadding: false,
  },
});
