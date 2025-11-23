import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Text, Vibration } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

const DEBATE_TIME = 3 * 60; // 3 minutos en segundos

export default function DebateScreen() {
  const router = useRouter();
  const { currentRound, startNewRound } = useGame();
  const [timeLeft, setTimeLeft] = useState(DEBATE_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseAnim = useSharedValue(1);

  const startTimer = () => {
    setIsStarted(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsFinished(true);
          Vibration.vibrate([0, 500, 200, 500]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Animacion de pulso cuando queda poco tiempo
  useEffect(() => {
    if (timeLeft <= 30 && timeLeft > 0) {
      pulseAnim.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
    }
  }, [timeLeft <= 30]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 30) return '#ef4444';
    if (timeLeft <= 60) return '#f59e0b';
    return '#10b981';
  };

  const handleRestart = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeLeft(DEBATE_TIME);
    setIsFinished(false);
    pulseAnim.value = 1;
    startTimer();
  };

  const handleNewRound = () => {
    startNewRound();
    router.replace('/round-start');
  };

  const handleEndGame = () => {
    router.replace('/');
  };

  const progress = timeLeft / DEBATE_TIME;

  return (
    <LinearGradient
      colors={['#1e1b4b', '#312e81', '#4c1d95']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>DEBATE</Text>
          <Text style={styles.subtitle}>
            {!isStarted
              ? 'Listos para debatir?'
              : isFinished
              ? 'Tiempo terminado!'
              : 'Descubran al impostor'}
          </Text>
          {currentRound && currentRound.impostorCount > 1 && (
            <View style={styles.impostorBadge}>
              <Text style={styles.impostorBadgeText}>
                {currentRound.impostorCount} IMPOSTORES
              </Text>
            </View>
          )}
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerCircle, pulseStyle]}>
            <View style={styles.timerInner}>
              <Text style={[styles.timerText, { color: getTimeColor() }]}>
                {formatTime(timeLeft)}
              </Text>
              {!isFinished && (
                <Text style={styles.timerLabel}>restante</Text>
              )}
            </View>
            {/* Progress ring */}
            <View style={styles.progressRing}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: getTimeColor(),
                    height: `${progress * 100}%`,
                  },
                ]}
              />
            </View>
          </Animated.View>
        </View>

        {/* Instructions */}
        {isStarted && !isFinished && (
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Cada jugador debe describir la palabra sin decirla directamente
            </Text>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {!isStarted ? (
            <>
              <Pressable onPress={startTimer} style={styles.primaryButton}>
                <LinearGradient
                  colors={['#f59e0b', '#d97706', '#b45309']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>INICIAR DEBATE (3 MIN)</Text>
                </LinearGradient>
              </Pressable>
              <Pressable onPress={handleNewRound} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>SALTAR DEBATE</Text>
              </Pressable>
            </>
          ) : isFinished ? (
            <>
              <Pressable onPress={handleRestart} style={styles.primaryButton}>
                <LinearGradient
                  colors={['#f59e0b', '#d97706', '#b45309']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>REINICIAR (3 MIN)</Text>
                </LinearGradient>
              </Pressable>
              <Pressable onPress={handleNewRound} style={styles.primaryButton}>
                <LinearGradient
                  colors={['#10b981', '#059669', '#047857']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>NUEVA RONDA</Text>
                </LinearGradient>
              </Pressable>
              <Pressable onPress={handleEndGame} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>TERMINAR JUEGO</Text>
              </Pressable>
            </>
          ) : (
            <Pressable onPress={handleNewRound} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>SALTAR Y NUEVA RONDA</Text>
            </Pressable>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 4,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
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
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  timerInner: {
    alignItems: 'center',
    zIndex: 2,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  timerLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    includeFontPadding: false,
  },
  progressRing: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  progressFill: {
    width: '100%',
    opacity: 0.2,
  },
  instructionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 22,
    includeFontPadding: false,
  },
  buttonsContainer: {
    gap: 12,
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
