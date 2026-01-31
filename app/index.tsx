import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORIES_CONFIG } from '@/constants/categories';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { HapticFeedback } from '@/utils/haptics';

export default function Home() {
  const router = useRouter();
  const { resetGame, numberOfPlayers, settings, getImpostorCountForPlayers } = useGame();

  useEffect(() => {
    // Solo resetear el juego cuando volvemos al menú principal
    // No usar currentRound como dependencia para evitar loops
    resetGame();
  }, []);

  const impostorCount = getImpostorCountForPlayers(numberOfPlayers);

  // Calcular el número de categorías habilitadas
  const enabledCategoriesCount = useMemo(() => {
    let count = 0;
    CATEGORIES_CONFIG.forEach((categoryConfig) => {
      const selection = settings.categorySelections[categoryConfig.key];
      if (selection && selection.enabled) {
        // Contar subcategorías habilitadas
        const enabledSubcategories = categoryConfig.subcategories.filter(
          (sub) => selection.subcategories && selection.subcategories[sub.key] !== false
        ).length;
        if (enabledSubcategories > 0) {
          count++;
        }
      }
    });
    return count;
  }, [settings.categorySelections]);

  const handleContinue = () => {
    HapticFeedback.medium();
    router.push('/players');
  };

  const handleSettings = () => {
    HapticFeedback.light();
    router.push('/settings');
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#312e81', '#4c1d95']}
      style={styles.container}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>IMPOSTOR</Text>
          <Text style={styles.subtitle}>El juego de las palabras</Text>
        </View>

        {/* Quick Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{numberOfPlayers}</Text>
            <Text style={styles.infoLabel}>Jugadores</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{impostorCount}</Text>
            <Text style={styles.infoLabel}>{impostorCount === 1 ? 'Impostor' : 'Impostores'}</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>{enabledCategoriesCount}</Text>
            <Text style={styles.infoLabel}>Categorias</Text>
          </View>
        </View>

        {/* Settings indicator */}
        {settings.showHintToImpostor && (
          <View style={styles.hintBadge}>
            <Text style={styles.hintBadgeText}>Pistas activadas</Text>
          </View>
        )}

        {/* Start button */}
        <Pressable onPress={handleContinue} style={styles.startButton}>
          <LinearGradient
            colors={['#10b981', '#059669', '#047857']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButtonGradient}
          >
            <Text style={styles.startButtonText}>COMENZAR</Text>
          </LinearGradient>
        </Pressable>

        {/* Settings button */}
        <Pressable onPress={handleSettings} style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>AJUSTES</Text>
        </Pressable>

        {/* Rules hint */}
        <View style={styles.rulesContainer}>
          <Text style={styles.rulesText}>
            Un jugador sera el impostor y no conocera la palabra secreta
          </Text>
        </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 6,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 10,
    letterSpacing: 1,
    includeFontPadding: false,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  infoItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  infoValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    includeFontPadding: false,
  },
  infoLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    includeFontPadding: false,
  },
  infoDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  hintBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  hintBadgeText: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '600',
    includeFontPadding: false,
  },
  startButton: {
    width: '100%',
    maxWidth: 280,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    includeFontPadding: false,
  },
  settingsButton: {
    width: '100%',
    maxWidth: 280,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 32,
  },
  settingsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1,
    includeFontPadding: false,
  },
  rulesContainer: {
    paddingHorizontal: 32,
  },
  rulesText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    lineHeight: 20,
    includeFontPadding: false,
  },
});
