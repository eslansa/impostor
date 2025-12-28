import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORIES_CONFIG } from '@/constants/categories';
import { GameSettings, CategoryKey, SubcategoryKey } from '@/types/game';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { HapticFeedback } from '@/utils/haptics';

export default function SettingsScreen() {
  const router = useRouter();
  const { numberOfPlayers, setNumberOfPlayers, settings, setSettings, getImpostorCountForPlayers } = useGame();

  const [tempPlayers, setTempPlayers] = useState(numberOfPlayers);
  const [showHint, setShowHint] = useState(settings.showHintToImpostor);
  const [tempCategorySelections, setTempCategorySelections] = useState(settings.categorySelections);
  const [expandedCategories, setExpandedCategories] = useState<Set<CategoryKey>>(new Set());

  const impostorCount = getImpostorCountForPlayers(tempPlayers);

  const handleIncrement = () => {
    if (tempPlayers < 8) {
      HapticFeedback.light();
      setTempPlayers(tempPlayers + 1);
    } else {
      HapticFeedback.error();
    }
  };

  const handleDecrement = () => {
    if (tempPlayers > 4) {
      HapticFeedback.light();
      setTempPlayers(tempPlayers - 1);
    } else {
      HapticFeedback.error();
    }
  };

  const handleHintToggle = (value: boolean) => {
    HapticFeedback.selection();
    setShowHint(value);
  };

  const toggleCategoryExpansion = (categoryKey: CategoryKey) => {
    HapticFeedback.light();
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey);
      } else {
        newSet.add(categoryKey);
      }
      return newSet;
    });
  };

  const handleCategoryToggle = (categoryKey: CategoryKey) => {
    HapticFeedback.selection();
    setTempCategorySelections((prev) => {
      const newSelections = { ...prev };
      const currentSelection = newSelections[categoryKey];
      
      // Si desactivamos la categoría, desactivamos todas las subcategorías
      // Si activamos la categoría, activamos todas las subcategorías
      const newEnabled = !currentSelection.enabled;
      
      const newSubcategories: { [key in SubcategoryKey]?: boolean } = {};
      const categoryConfig = CATEGORIES_CONFIG.find((cat) => cat.key === categoryKey);
      
      if (categoryConfig) {
        categoryConfig.subcategories.forEach((subcategory) => {
          newSubcategories[subcategory.key] = newEnabled;
        });
      }

      newSelections[categoryKey] = {
        ...currentSelection,
        enabled: newEnabled,
        subcategories: newSubcategories,
      };

      return newSelections;
    });
  };

  const handleSubcategoryToggle = (categoryKey: CategoryKey, subcategoryKey: SubcategoryKey) => {
    HapticFeedback.selection();
    setTempCategorySelections((prev) => {
      const newSelections = { ...prev };
      const currentSelection = newSelections[categoryKey];
      const currentSubcategoryEnabled = currentSelection.subcategories[subcategoryKey] !== false;

      // Actualizar la subcategoría
      const newSubcategories = {
        ...currentSelection.subcategories,
        [subcategoryKey]: !currentSubcategoryEnabled,
      };

      // Verificar si todas las subcategorías están desactivadas
      const categoryConfig = CATEGORIES_CONFIG.find((cat) => cat.key === categoryKey);
      let allDisabled = true;
      if (categoryConfig) {
        allDisabled = categoryConfig.subcategories.every(
          (sub) => newSubcategories[sub.key] === false
        );
      }

      newSelections[categoryKey] = {
        ...currentSelection,
        enabled: !allDisabled, // Si todas están desactivadas, desactivar la categoría
        subcategories: newSubcategories,
      };

      return newSelections;
    });
  };

  const handleSave = () => {
    HapticFeedback.success();
    setNumberOfPlayers(tempPlayers);
    const newSettings: GameSettings = {
      showHintToImpostor: showHint,
      categorySelections: tempCategorySelections,
    };
    setSettings(newSettings);
    router.back();
  };

  // Calcular estadísticas
  const getTotalEnabledSubcategories = () => {
    let total = 0;
    CATEGORIES_CONFIG.forEach((categoryConfig) => {
      const selection = tempCategorySelections[categoryConfig.key];
      if (selection.enabled) {
        categoryConfig.subcategories.forEach((subcategory) => {
          if (selection.subcategories[subcategory.key] !== false) {
            total++;
          }
        });
      }
    });
    return total;
  };

  const getTotalSubcategories = () => {
    return CATEGORIES_CONFIG.reduce((sum, cat) => sum + cat.subcategories.length, 0);
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#312e81', '#4c1d95']}
      style={styles.container}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
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
              style={({ pressed }) => [
                styles.selectorButton,
                tempPlayers <= 4 && styles.selectorButtonDisabled,
                pressed && !(tempPlayers <= 4) && styles.selectorButtonPressed,
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
              style={({ pressed }) => [
                styles.selectorButton,
                tempPlayers >= 8 && styles.selectorButtonDisabled,
                pressed && !(tempPlayers >= 8) && styles.selectorButtonPressed,
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

        {/* Categorías y Subcategorías */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías y Subcategorías</Text>
          <Text style={styles.sectionDescription}>
            Selecciona las categorías y subcategorías de palabras
          </Text>
          
          {CATEGORIES_CONFIG.map((categoryConfig) => {
            const categorySelection = tempCategorySelections[categoryConfig.key];
            const isExpanded = expandedCategories.has(categoryConfig.key);
            const enabledSubcategoriesCount = categoryConfig.subcategories.filter(
              (sub) => categorySelection.subcategories[sub.key] !== false
            ).length;

            return (
              <View key={categoryConfig.key} style={styles.categoryContainer}>
                {/* Header de categoría */}
                <Pressable
                  onPress={() => toggleCategoryExpansion(categoryConfig.key)}
                  style={styles.categoryHeader}
                >
                  <View style={styles.categoryHeaderLeft}>
                    <FontAwesome
                      name={isExpanded ? 'chevron-down' : 'chevron-right'}
                      size={16}
                      color="rgba(255, 255, 255, 0.6)"
                      style={styles.expandIcon}
                    />
                    <Text style={styles.categoryHeaderText}>{categoryConfig.name}</Text>
                    <Text style={styles.categoryCountBadge}>
                      {enabledSubcategoriesCount}/{categoryConfig.subcategories.length}
                    </Text>
                  </View>
                  <Switch
                    value={categorySelection.enabled}
                    onValueChange={() => handleCategoryToggle(categoryConfig.key)}
                    trackColor={{ false: 'rgba(255,255,255,0.2)', true: '#10b981' }}
                    thumbColor={categorySelection.enabled ? '#fff' : '#f4f3f4'}
                    onTouchEnd={(e) => e.stopPropagation()}
                  />
                </Pressable>

                {/* Subcategorías expandidas */}
                {isExpanded && categoryConfig.subcategories.map((subcategory) => {
                  const isSubcategoryEnabled = categorySelection.subcategories[subcategory.key] !== false && categorySelection.enabled;
                  
                  return (
                    <View key={subcategory.key} style={styles.subcategoryContainer}>
                      <View style={styles.subcategoryContent}>
                        <Text style={[
                          styles.subcategoryName,
                          !categorySelection.enabled && styles.subcategoryNameDisabled
                        ]}>
                          {subcategory.name}
                        </Text>
                        <Text style={[
                          styles.subcategoryWordCount,
                          !categorySelection.enabled && styles.subcategoryWordCountDisabled
                        ]}>
                          {subcategory.words.length} palabras
                        </Text>
                      </View>
                      <Switch
                        value={isSubcategoryEnabled}
                    onValueChange={() => handleSubcategoryToggle(categoryConfig.key, subcategory.key)}
                        trackColor={{ false: 'rgba(255,255,255,0.2)', true: '#10b981' }}
                        thumbColor={isSubcategoryEnabled ? '#fff' : '#f4f3f4'}
                        disabled={!categorySelection.enabled}
                      />
                    </View>
                  );
                })}
              </View>
            );
          })}

          <Text style={styles.categoryCount}>
            {getTotalEnabledSubcategories()} de {getTotalSubcategories()} subcategorías activas
          </Text>
        </View>

        {/* Pista para impostor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones</Text>
          <View style={styles.optionRow}>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionLabel}>Pista para impostor</Text>
              <Text style={styles.optionDescription}>
                El impostor ve la categoría de la palabra
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

        <Pressable onPress={() => {
          HapticFeedback.light();
          router.back();
        }} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>CANCELAR</Text>
        </Pressable>
        </ScrollView>
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
  selectorButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
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
  categoryContainer: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  categoryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  expandIcon: {
    marginRight: 12,
  },
  categoryHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    includeFontPadding: false,
  },
  categoryCountBadge: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
    includeFontPadding: false,
  },
  subcategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingLeft: 44,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  subcategoryContent: {
    flex: 1,
    marginRight: 12,
  },
  subcategoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    includeFontPadding: false,
  },
  subcategoryNameDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  subcategoryWordCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    includeFontPadding: false,
  },
  subcategoryWordCountDisabled: {
    color: 'rgba(255, 255, 255, 0.2)',
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