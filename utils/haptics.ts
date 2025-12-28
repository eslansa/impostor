// Utilidades para feedback háptico
import { Vibration, Platform } from 'react-native';

export const HapticFeedback = {
  // Feedback ligero para acciones normales
  light: () => {
    if (Platform.OS === 'ios') {
      // En iOS, Vibration funciona como feedback háptico ligero
      Vibration.vibrate(10);
    } else {
      Vibration.vibrate(10);
    }
  },
  
  // Feedback medio para acciones importantes
  medium: () => {
    Vibration.vibrate(50);
  },
  
  // Feedback fuerte para acciones críticas
  heavy: () => {
    Vibration.vibrate(100);
  },
  
  // Feedback de éxito
  success: () => {
    Vibration.vibrate([0, 50, 50, 50]);
  },
  
  // Feedback de error
  error: () => {
    Vibration.vibrate([0, 100, 50, 100]);
  },
  
  // Feedback de advertencia
  warning: () => {
    Vibration.vibrate([0, 50, 100, 50]);
  },
  
  // Feedback de selección (para switches, toggles)
  selection: () => {
    Vibration.vibrate(10);
  },
  
  // Feedback para flip de carta
  cardFlip: () => {
    Vibration.vibrate(30);
  },
  
  // Feedback para botón presionado
  buttonPress: () => {
    Vibration.vibrate(15);
  },
};
