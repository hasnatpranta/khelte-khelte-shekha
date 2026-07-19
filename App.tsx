import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useFonts, Baloo2_700Bold, Baloo2_800ExtraBold } from '@expo-google-fonts/baloo-2';
import { BalooDa2_700Bold, BalooDa2_800ExtraBold } from '@expo-google-fonts/baloo-da-2';
import { Nunito_600SemiBold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { AppStateProvider, useApp } from './src/AppState';
import { colors } from './src/theme';
import Onboarding from './src/screens/Onboarding';
import Home from './src/screens/Home';
import Learn from './src/screens/Learn';
import Play from './src/screens/Play';
import Stories from './src/screens/Stories';
import Rewards from './src/screens/Rewards';
import Tracing from './src/screens/Tracing';
import BalloonPop from './src/screens/BalloonPop';
import { ParentDashboard, ParentGate } from './src/screens/Parents';

function Router() {
  const app = useApp();
  switch (app.screen) {
    case 'onboarding': return <Onboarding />;
    case 'home': return <Home />;
    case 'learn': return <Learn />;
    case 'play': return <Play />;
    case 'stories': return <Stories />;
    case 'rewards': return <Rewards />;
    case 'tracing': return <Tracing />;
    case 'balloon': return <BalloonPop />;
    case 'parentGate': return <ParentGate />;
    case 'parents': return <ParentDashboard />;
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
    BalooDa2_700Bold,
    BalooDa2_800ExtraBold,
    Nunito_600SemiBold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={[styles.app, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.coral} />
      </View>
    );
  }

  return (
    <AppStateProvider>
      <View style={styles.app}>
        <StatusBar style="dark" />
        <Router />
      </View>
    </AppStateProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.paper },
});
