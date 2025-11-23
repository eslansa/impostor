import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

type CardProps = {
  word: string;
  onFlip: () => void;
  isRevealed: boolean;
  hint?: string; // Pista de categoría para el impostor
};

export default function Card({ word, onFlip, isRevealed, hint }: CardProps) {
  const flipProgress = useSharedValue(0);
  const isImpostor = word === 'IMPOSTOR';

  useEffect(() => {
    if (isRevealed) {
      flipProgress.value = withSpring(1, {
        damping: 12,
        stiffness: 90,
      });
    } else {
      // Instantly reset to 0 so the word is never visible when switching players
      flipProgress.value = 0;
    }
  }, [isRevealed]);

  const handlePress = () => {
    if (!isRevealed) {
      onFlip();
    }
  };

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipProgress.value,
      [0, 1],
      [0, 180],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      flipProgress.value,
      [0, 0.5],
      [1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipProgress.value,
      [0, 1],
      [180, 360],
      Extrapolation.CLAMP
    );
    // Hide immediately when not revealed (flipProgress goes back to 0)
    // Only show when flipProgress is > 0.5
    const opacity = interpolate(
      flipProgress.value,
      [0, 0.4, 0.5, 1],
      [0, 0, 0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden' as const,
    };
  });

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Front of card - Toca para ver */}
        <Animated.View style={[styles.card, frontStyle]}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6', '#a855f7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.cardInner}>
              <Text style={styles.questionMark}>?</Text>
              <Text style={styles.tapText}>TOCA PARA VER</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Back of card - Palabra */}
        <Animated.View style={[styles.card, styles.cardBack, backStyle]}>
          <LinearGradient
            colors={isImpostor ? ['#dc2626', '#ef4444', '#f87171'] : ['#059669', '#10b981', '#34d399']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.cardInner}>
              {isImpostor && (
                <Text style={styles.impostorLabel}>ERES EL</Text>
              )}
              <Text style={[styles.wordText, isImpostor && styles.impostorText]}>
                {word.toUpperCase()}
              </Text>
              {!isImpostor && (
                <Text style={styles.hintText}>Recuerda tu palabra</Text>
              )}
              {isImpostor && hint && (
                <View style={styles.hintContainer}>
                  <Text style={styles.hintLabel}>PISTA:</Text>
                  <Text style={styles.categoryHint}>{hint}</Text>
                </View>
              )}
              {isImpostor && !hint && (
                <Text style={styles.hintText}>No conoces la palabra</Text>
              )}
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  cardBack: {
    // Back card styles
  },
  gradient: {
    flex: 1,
    borderRadius: 24,
    padding: 4,
  },
  cardInner: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  questionMark: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'white',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  tapText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 16,
    letterSpacing: 1,
    includeFontPadding: false,
  },
  impostorLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    letterSpacing: 2,
    includeFontPadding: false,
  },
  wordText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    includeFontPadding: false,
  },
  impostorText: {
    fontSize: 40,
  },
  hintText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 16,
    includeFontPadding: false,
  },
  hintContainer: {
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  hintLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1,
    marginBottom: 4,
    includeFontPadding: false,
  },
  categoryHint: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fbbf24',
    includeFontPadding: false,
  },
});
