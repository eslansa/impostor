import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, TextInput, Alert, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useGame } from '@/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { HapticFeedback } from '@/utils/haptics';
import { KeyboardScrollContainer } from '@/components/common/KeyboardScrollContainer';
import { FontAwesome } from '@expo/vector-icons';
import { CustomCategory } from '@/types/game';

export default function AddCategoryScreen() {
  const router = useRouter();
  const { settings, setSettings } = useGame();
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newWords, setNewWords] = useState('');

  const handleBack = () => {
    Keyboard.dismiss();
    router.back();
  };

  const addCustomCategory = () => {
    Keyboard.dismiss();
    
    if (!newCategoryName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la categoría');
      return;
    }

    if (!newSubcategoryName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la subcategoría');
      return;
    }

    const wordsArray = newWords
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0);

    if (wordsArray.length === 0) {
      Alert.alert('Error', 'Por favor ingresa al menos una palabra (separadas por comas)');
      return;
    }

    const newCategory: CustomCategory = {
      key: `custom_${Date.now()}`,
      name: newCategoryName.trim(),
      subcategories: [{
        key: `custom_${Date.now()}_sub`,
        name: newSubcategoryName.trim(),
        words: wordsArray,
      }],
    };

    const updatedCustomCategories = [...settings.customCategories, newCategory];
    
    setSettings({
      ...settings,
      customCategories: updatedCustomCategories,
    });
    
    HapticFeedback.success();
    router.back();
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#312e81']}
      style={styles.container}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <KeyboardScrollContainer
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <FontAwesome name="arrow-left" size={24} color="white" />
            </Pressable>
            <Text style={styles.title}>Agregar Categoría</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre de la categoría</Text>
              <TextInput
                style={styles.input}
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                placeholder="Ej: Mi Categoria"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre de la subcategoría</Text>
              <TextInput
                style={styles.input}
                value={newSubcategoryName}
                onChangeText={setNewSubcategoryName}
                placeholder="Ej: General"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Palabras (separadas por comas)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={newWords}
                onChangeText={setNewWords}
                placeholder="palabra1, palabra2, palabra3..."
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <Pressable style={styles.addButton} onPress={addCustomCategory}>
              <LinearGradient
                colors={['#10b981', '#059669', '#047857']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.addButtonGradient}
              >
                <Text style={styles.addButtonText}>Agregar Categoría</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </KeyboardScrollContainer>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textArea: {
    height: 120,
    paddingTop: 15,
  },
  addButton: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
