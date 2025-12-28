import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GameProvider } from '@/context/GameContext';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from '@/components/ui/safe-area-view';

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="dark">
        <GameProvider>
          <StatusBar style="light" />
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}
            >
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  contentStyle: { backgroundColor: '#1e1b4b' },
                }}
              >
                <Stack.Screen 
                  name="index" 
                  options={{
                    title: 'Inicio',
                  }}
                />
                <Stack.Screen 
                  name="players" 
                  options={{
                    title: 'Jugadores',
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen 
                  name="settings" 
                  options={{
                    title: 'Ajustes',
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen 
                  name="round-start" 
                  options={{
                    title: 'Inicio de Ronda',
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen 
                  name="round" 
                  options={{
                    title: 'Ronda',
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen 
                  name="debate" 
                  options={{
                    title: 'Debate',
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen 
                  name="modal" 
                  options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                  }}
                />
                <Stack.Screen 
                  name="tabs" 
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
            </KeyboardAvoidingView>
          </View>
        </GameProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1b4b',
  },
});
