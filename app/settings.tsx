import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Switch, ScrollView, Alert, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORIES_CONFIG } from '@/constants/categories';
import { GameSettings, CategoryKey, SubcategoryKey, CustomCategory } from '@/types/game';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { HapticFeedback } from '@/utils/haptics';

export default function SettingsScreen() {
  const router = useRouter();
  const { numberOfPlayers, setNumberOfPlayers, settings, setSettings, getImpostorCountForPlayers, clearRoundIfNeeded } = useGame();

  const [tempPlayers, setTempPlayers] = useState(numberOfPlayers);
  const [showHint, setShowHint] = useState(settings.showHintToImpostor);
  const [enableSurprises, setEnableSurprises] = useState(settings.enableSurprises);
  const [enableCustomImpostor, setEnableCustomImpostor] = useState(settings.enableCustomImpostorCount);
  const [tempCustomImpostorCount, setTempCustomImpostorCount] = useState(settings.customImpostorCount || 1);
  const [tempCategorySelections, setTempCategorySelections] = useState(settings.categorySelections);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Actualizar el contador de impostores cuando cambia el número de jugadores
  useEffect(() => {
    const maxImpostors = Math.max(1, tempPlayers - 1);
    if (tempCustomImpostorCount > maxImpostors) {
      setTempCustomImpostorCount(maxImpostors);
    }
  }, [tempPlayers, tempCustomImpostorCount]);

  const impostorCount = getImpostorCountForPlayers(tempPlayers);

  const handleIncrement = () => {
    HapticFeedback.light();
    setTempPlayers(tempPlayers + 1);
  };

  const handleDecrement = () => {
    if (tempPlayers > 3) {
      HapticFeedback.light();
      setTempPlayers(tempPlayers - 1);
    } else {
      HapticFeedback.error();
    }
  };

  const handleImpostorIncrement = () => {
    const maxImpostors = tempPlayers - 1;
    if (tempCustomImpostorCount < maxImpostors) {
      HapticFeedback.light();
      setTempCustomImpostorCount(tempCustomImpostorCount + 1);
    } else {
      HapticFeedback.error();
    }
  };

  const handleImpostorDecrement = () => {
    if (tempCustomImpostorCount > 1) {
      HapticFeedback.light();
      setTempCustomImpostorCount(tempCustomImpostorCount - 1);
    } else {
      HapticFeedback.error();
    }
  };

  const handleHintToggle = (value: boolean) => {
    HapticFeedback.selection();
    setShowHint(value);
  };

  const handleSurprisesToggle = (value: boolean) => {
    HapticFeedback.selection();
    setEnableSurprises(value);
  };

  const handleCustomImpostorToggle = (value: boolean) => {
    HapticFeedback.selection();
    setEnableCustomImpostor(value);
  };

  const toggleCategoryExpansion = (categoryKey: string) => {
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

  const toggleCategoryEnabled = (categoryKey: CategoryKey) => {
    HapticFeedback.selection();
    setTempCategorySelections((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        enabled: !prev[categoryKey].enabled,
      },
    }));
  };

  const toggleSubcategoryEnabled = (categoryKey: CategoryKey, subcategoryKey: SubcategoryKey) => {
    HapticFeedback.selection();
    setTempCategorySelections((prev) => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        subcategories: {
          ...prev[categoryKey].subcategories,
          [subcategoryKey]: !prev[categoryKey].subcategories[subcategoryKey],
        },
      },
    }));
  };

  const deleteCustomCategory = (categoryKey: string) => {
    Alert.alert(
      'Eliminar categoría',
      '¿Estás seguro de que quieres eliminar esta categoría personalizada?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const updatedCategories = settings.customCategories.filter(cat => cat.key !== categoryKey);
            setSettings({
              ...settings,
              customCategories: updatedCategories,
            });
            HapticFeedback.success();
          },
        },
      ]
    );
  };

  const navigateToAddCategory = () => {
    HapticFeedback.light();
    router.push('/add-category');
  };

  const navigateToEditCategory = (category: CustomCategory) => {
    HapticFeedback.light();
    router.push({
      pathname: '/edit-category',
      params: { categoryKey: category.key }
    });
  };

  const saveSettings = () => {
    Keyboard.dismiss();
    const newSettings: GameSettings = {
      showHintToImpostor: showHint,
      enableSurprises: enableSurprises,
      enableCustomImpostorCount: enableCustomImpostor,
      customImpostorCount: enableCustomImpostor ? tempCustomImpostorCount : undefined,
      categorySelections: tempCategorySelections,
      customCategories: settings.customCategories,
    };

    setSettings(newSettings);
    setNumberOfPlayers(tempPlayers);
    clearRoundIfNeeded(); // Limpiar ronda si hay una activa
    HapticFeedback.success();
    
    // Forzar limpieza del cache al salir de settings
    setTimeout(() => {
      router.back();
    }, 100);
  };

  const handleBack = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      router.back();
    }, 50);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1e1b4b', '#312e81']} style={styles.gradient}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <FontAwesome name="arrow-left" size={24} color="white" />
            </Pressable>
            <Text style={styles.title}>Configuración</Text>
          </View>

          {/* Número de Jugadores */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Número de Jugadores</Text>
            <View style={styles.playerControl}>
              <Pressable style={styles.button} onPress={handleDecrement}>
                <FontAwesome name="minus" size={20} color="white" />
              </Pressable>
              <Text style={styles.playerCount}>{tempPlayers}</Text>
              <Pressable style={styles.button} onPress={handleIncrement}>
                <FontAwesome name="plus" size={20} color="white" />
              </Pressable>
            </View>
            <Text style={styles.info}>Jugadores: Ilimitado</Text>
          </View>

          {/* Configuración de Impostores */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Configuración de Impostores</Text>
            <View style={styles.switchRow}>
              <Text style={styles.label}>Impostores personalizados</Text>
              <Switch
                value={enableCustomImpostor}
                onValueChange={handleCustomImpostorToggle}
                trackColor={{ false: '#767577', true: '#8b5cf6' }}
                thumbColor={enableCustomImpostor ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            
            {enableCustomImpostor && (
              <View style={styles.impostorControl}>
                <Pressable style={styles.button} onPress={handleImpostorDecrement}>
                  <FontAwesome name="minus" size={20} color="white" />
                </Pressable>
                <Text style={styles.impostorCount}>{tempCustomImpostorCount}</Text>
                <Pressable style={styles.button} onPress={handleImpostorIncrement}>
                  <FontAwesome name="plus" size={20} color="white" />
                </Pressable>
              </View>
            )}
            
            <Text style={styles.info}>
              Actual: {enableCustomImpostor ? `${tempCustomImpostorCount} impostores` : `${impostorCount} impostores (automático)`}
            </Text>
          </View>

          {/* Opciones de Juego */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Opciones de Juego</Text>
            <View style={styles.switchRow}>
              <Text style={styles.label}>Mostrar pista al impostor</Text>
              <Switch
                value={showHint}
                onValueChange={handleHintToggle}
                trackColor={{ false: '#767577', true: '#8b5cf6' }}
                thumbColor={showHint ? '#ffffff' : '#f4f3f4'}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.label}>Activar sorpresas cada 7 rondas</Text>
              <Switch
                value={enableSurprises}
                onValueChange={handleSurprisesToggle}
                trackColor={{ false: '#767577', true: '#8b5cf6' }}
                thumbColor={enableSurprises ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Categorías Personalizadas */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categorías Personalizadas</Text>
              <Pressable style={styles.addButton} onPress={navigateToAddCategory}>
                <FontAwesome name="plus" size={16} color="white" />
              </Pressable>
            </View>
            
            {settings.customCategories.length === 0 ? (
              <Text style={styles.emptyText}>No hay categorías personalizadas</Text>
            ) : (
              settings.customCategories.map((category) => (
                <View key={category.key} style={styles.customCategory}>
                  <View style={styles.customCategoryHeader}>
                    <Text style={styles.customCategoryName}>{category.name}</Text>
                    <View style={styles.customCategoryActions}>
                      <Pressable 
                        onPress={() => navigateToEditCategory(category)} 
                        style={styles.editButton}
                      >
                        <FontAwesome name="edit" size={16} color="#3b82f6" />
                      </Pressable>
                      <Pressable 
                        onPress={() => deleteCustomCategory(category.key)}
                        style={styles.deleteButton}
                      >
                        <FontAwesome name="trash" size={16} color="#ef4444" />
                      </Pressable>
                    </View>
                  </View>
                  <Text style={styles.customCategoryInfo}>
                    {category.subcategories[0]?.name || 'Sin subcategoría'} • {category.subcategories[0]?.words.length || 0} palabras
                  </Text>
                </View>
              ))
            )}
          </View>

          {/* Categorías Predefinidas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categorías Predefinidas</Text>
            {CATEGORIES_CONFIG.map((category) => {
              const categorySelection = tempCategorySelections[category.key];
              const isExpanded = expandedCategories.has(category.key);
              
              return (
                <View key={category.key} style={styles.categoryContainer}>
                  <Pressable
                    style={styles.categoryHeader}
                    onPress={() => toggleCategoryExpansion(category.key)}
                  >
                    <View style={styles.categoryInfo}>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      <Text style={styles.categoryCount}>
                        {category.subcategories.reduce((acc, sub) => acc + sub.words.length, 0)} palabras
                      </Text>
                    </View>
                    <View style={styles.categoryControls}>
                      <Switch
                        value={categorySelection.enabled}
                        onValueChange={() => toggleCategoryEnabled(category.key)}
                        trackColor={{ false: '#767577', true: '#8b5cf6' }}
                        thumbColor={categorySelection.enabled ? '#ffffff' : '#f4f3f4'}
                      />
                      <FontAwesome
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={16}
                        color="white"
                      />
                    </View>
                  </Pressable>
                  
                  {isExpanded && categorySelection.enabled && (
                    <View style={styles.subcategories}>
                      {category.subcategories.map((subcategory) => (
                        <View key={subcategory.key} style={styles.subcategoryRow}>
                          <Text style={styles.subcategoryName}>{subcategory.name}</Text>
                          <Switch
                            value={categorySelection.subcategories[subcategory.key] !== false}
                            onValueChange={() => toggleSubcategoryEnabled(category.key, subcategory.key)}
                            trackColor={{ false: '#767577', true: '#8b5cf6' }}
                            thumbColor={categorySelection.subcategories[subcategory.key] !== false ? '#ffffff' : '#f4f3f4'}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <Pressable style={styles.saveButton} onPress={saveSettings}>
            <Text style={styles.saveButtonText}>Guardar Configuración</Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  playerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8b5cf6',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  playerCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    minWidth: 40,
    textAlign: 'center',
  },
  impostorControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  impostorCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    minWidth: 30,
    textAlign: 'center',
  },
  info: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#10b981',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  customCategory: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  customCategoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customCategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  customCategoryInfo: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 5,
  },
  customCategoryActions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  categoryCount: {
    fontSize: 12,
    color: '#9ca3af',
  },
  categoryControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  subcategories: {
    paddingLeft: 20,
  },
  subcategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  subcategoryName: {
    fontSize: 14,
    color: '#d1d5db',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#10b981',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
