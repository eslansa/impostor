import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function PlayersScreen() {
  const router = useRouter();
  const { numberOfPlayers, setPlayers } = useGame();
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(numberOfPlayers).fill('')
  );

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleContinue = () => {
    const validPlayers = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name: name.trim() || `Jugador ${index + 1}`,
      isImpostor: false,
      word: '',
    }));

    setPlayers(validPlayers);
    router.push('/round-start');
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#312e81', '#4c1d95']}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Jugadores</Text>
        <Text style={styles.subtitle}>Ingresa los nombres</Text>

        <View style={styles.inputsContainer}>
          {playerNames.map((name, index) => (
            <View key={index} style={styles.inputWrapper}>
              <View style={styles.playerNumber}>
                <Text style={styles.playerNumberText}>{index + 1}</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder={`Jugador ${index + 1}`}
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={name}
                onChangeText={(value) => handleNameChange(index, value)}
              />
            </View>
          ))}
        </View>

        <Pressable onPress={handleContinue} style={styles.startButton}>
          <LinearGradient
            colors={['#10b981', '#059669', '#047857']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButtonGradient}
          >
            <Text style={styles.startButtonText}>INICIAR JUEGO</Text>
          </LinearGradient>
        </Pressable>

        <Text style={styles.hint}>
          Los campos vacios usaran nombres por defecto
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 8,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 32,
    includeFontPadding: false,
  },
  inputsContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playerNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    includeFontPadding: false,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    includeFontPadding: false,
  },
  hint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    includeFontPadding: false,
  },
});
