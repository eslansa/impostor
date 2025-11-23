import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORY_MAP, ALL_CATEGORIES } from '@/utils/gameLogic';
import { CategoryKey } from '@/types/game';

export default function SettingsScreen() {
  const router = useRouter();
  const { numberOfPlayers, setNumberOfPlayers, settings, setSettings, getImpostorCountForPlayers } = useGame();

  const [tempPlayers, setTempPlayers] = useState(numberOfPlayers);
  const [showHint, setShowHint] = useState(settings.showHintToImpostor);
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>(settings.selectedCategories);

  const impostorCount = getImpostorCountForPlayers(tempPlayers);

  const handleIncrement = () => {
    if (tempPlayers < 8) {
      setTempPlayers(tempPlayers + 1);
    }
  };

  const handleDecrement = () => {
    if (tempPlayers > 4) {
      setTempPlayers(tempPlayers - 1);
    }
  };

  const handleHintToggle = (value: boolean) => {
    setShowHint(value);
  };

  const handleCategoryToggle = (category: CategoryKey) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // No permitir deseleccionar si solo queda una
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSave = () => {
    setNumberOfPlayers(tempPlayers);
    setSettings({
      showHintToImpostor: showHint,
      selectedCategories: selectedCategories,
    });
    router.back();
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
        <Text style={styles.title}>Ajustes</Text>

        {/* Jugadores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jugadores</Text>
          <View style={styles.playerSelector}>
            <Pressable
              onPress={handleDecrement}
              style={[
                styles.selectorButton,
                tempPlayers <= 4 && styles.selectorButtonDisabled,
              ]}
              disabled={tempPlayers <= 4}
            >
              <Text style={styles.selectorButtonText}>-</Text>
            </Pressable>

            <View style={styles.selectorValue}>
              <Text style={styles.selectorValueText}>{tempPlayers}</Text>
            </View>

            <Pressable
              onPress={handleIncrement}
              style={[
                styles.selectorButton,
                tempPlayers >= 8 && styles.selectorButtonDisabled,
              ]}
              disabled={tempPlayers >= 8}
            >
              <Text style={styles.selectorButtonText}>+</Text>
            </Pressable>
          </View>
          <Text style={styles.selectorHint}>4 - 8 jugadores</Text>
          {impostorCount > 1 && (
            <View style={styles.impostorBadge}>
              <Text style={styles.impostorBadgeText}>{impostorCount} IMPOSTORES</Text>
            </View>
          )}
        </View>

        {/* Categorías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <Text style={styles.sectionDescription}>
            Selecciona las categorias de palabras
          </Text>
          <View style={styles.categoriesContainer}>
            {ALL_CATEGORIES.map((categoryKey) => {
              const isSelected = selectedCategories.includes(categoryKey);
              const categoryData = CATEGORY_MAP[categoryKey];
              return (
                <Pressable
                  key={categoryKey}
                  onPress={() => handleCategoryToggle(categoryKey)}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.categoryChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextSelected,
                    ]}
                  >
                    {categoryData.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.categoryCount}>
            {selectedCategories.length} de {ALL_CATEGORIES.length} seleccionadas
          </Text>
        </View>

        {/* Pista para impostor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones</Text>
          <View style={styles.optionRow}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>Pista para impostor</Text>
              <Text style={styles.optionDescription}>
                El impostor ve la categoria de la palabra
              </Text>
            </View>
            <Switch
              value={showHint}
              onValueChange={handleHintToggle}
              trackColor={{ false: 'rgba(255,255,255,0.2)', true: '#10b981' }}
              thumbColor={showHint ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Botón Guardar */}
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <LinearGradient
            colors={['#10b981', '#059669', '#047857']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButtonGradient}
          >
            <Text style={styles.saveButtonText}>GUARDAR</Text>
          </LinearGradient>
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>CANCELAR</Text>
        </Pressable>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 32,
    textAlign: 'center',
    includeFontPadding: false,
  },
  section: {
    marginBottom: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    includeFontPadding: false,
  },
  sectionDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 16,
    includeFontPadding: false,
  },
  playerSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
  },
  selectorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectorButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectorButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    includeFontPadding: false,
  },
  selectorValue: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  selectorValueText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    includeFontPadding: false,
  },
  selectorHint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 12,
    textAlign: 'center',
    includeFontPadding: false,
  },
  impostorBadge: {
    marginTop: 12,
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'center',
  },
  impostorBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    includeFontPadding: false,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryChipSelected: {
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderColor: '#10b981',
  },
  categoryChipText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    includeFontPadding: false,
  },
  categoryChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 12,
    textAlign: 'center',
    includeFontPadding: false,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    includeFontPadding: false,
  },
  optionDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
    includeFontPadding: false,
  },
  saveButton: {
    width: '100%',
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    includeFontPadding: false,
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    includeFontPadding: false,
  },
});
