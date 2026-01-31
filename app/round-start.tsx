import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { HapticFeedback } from '@/utils/haptics';

export default function RoundStartScreen() {
  const router = useRouter();
  const { players, currentRound, startNewRound } = useGame();
  const [isReady, setIsReady] = useState(false);

  // Efecto para crear la ronda inmediatamente al montar el componente
  useEffect(() => {
    // Si no hay ronda y hay jugadores, crear la ronda inmediatamente
    if (!currentRound && players.length > 0) {
      startNewRound();
    }
    // Solo ejecutar al montar, no cuando cambien las dependencias
  }, []);

  // Efecto separado para actualizar isReady cuando cambia currentRound
  useEffect(() => {
    if (currentRound && currentRound.players.length > 0) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [currentRound]);

  useEffect(() => {
    if (currentRound && currentRound.players.length > 0) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [currentRound]);

  const handleContinue = () => {
    if (isReady && currentRound) {
      HapticFeedback.success();
      router.replace('/round');
    }
  };

  const firstPlayer = currentRound?.players[0];

  if (!isReady || !firstPlayer || !currentRound) {
    return (
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#4c1d95']}
        style={styles.container}
      >
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Preparando ronda...</Text>
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
        {/* Round number */}
        <View style={styles.roundBadge}>
          <Text style={styles.roundLabel}>RONDA</Text>
          <Text style={styles.roundNumber}>{currentRound.roundNumber}</Text>
        </View>

        {/* First player */}
        <View style={styles.playerCard}>
          <LinearGradient
            colors={['#f59e0b', '#d97706', '#b45309']}
            style={styles.playerCardGradient}
          >
            <Text style={styles.startsLabel}>EMPIEZA</Text>
            <Text style={styles.playerName}>{firstPlayer.name}</Text>
          </LinearGradient>
        </View>

        {/* Instructions */}
        <Text style={styles.instructions}>
          Pasa el dispositivo a {firstPlayer.name}
        </Text>

        {/* Continue button */}
        <Pressable onPress={handleContinue} style={styles.continueButton}>
          <LinearGradient
            colors={['#10b981', '#059669', '#047857']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>CONTINUAR</Text>
          </LinearGradient>
        </Pressable>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  roundBadge: {
    alignItems: 'center',
    marginBottom: 40,
  },
  roundLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 3,
    marginBottom: 8,
    includeFontPadding: false,
  },
  roundNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
    includeFontPadding: false,
  },
  impostorBadge: {
    marginTop: 12,
    backgroundColor: '#dc2626',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  impostorBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    includeFontPadding: false,
  },
  playerCard: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  playerCardGradient: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  startsLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 2,
    marginBottom: 8,
    includeFontPadding: false,
  },
  playerName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    includeFontPadding: false,
  },
  instructions: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 40,
    includeFontPadding: false,
  },
  continueButton: {
    width: '100%',
    maxWidth: 280,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    includeFontPadding: false,
  },
});
