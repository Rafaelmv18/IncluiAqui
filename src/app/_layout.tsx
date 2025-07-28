import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

import { LocationProvider } from '@/src/contexts/LocationContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
  const colorScheme = useColorScheme();

  return (
    <LocationProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false,  }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/login/index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/cadastrar/index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/home/index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/map/index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/infoLocal/index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/esqueceuSenha/index" options={{ headerShown: false }} />
          <Stack.Screen name="pages/esqueceuSenha/redefinir/index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </LocationProvider>
  );
}
