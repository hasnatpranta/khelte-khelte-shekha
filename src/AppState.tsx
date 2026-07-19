import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from './theme';

export type Screen =
  | 'onboarding'
  | 'home'
  | 'learn'
  | 'play'
  | 'stories'
  | 'rewards'
  | 'tracing'
  | 'balloon'
  | 'parentGate'
  | 'parents';

type State = {
  screen: Screen;
  go: (s: Screen) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  childName: string;
  setChildName: (n: string) => void;
  stars: number;
  addStars: (n: number) => void;
  onboarded: boolean;
  finishOnboarding: () => void;
};

const Ctx = createContext<State | null>(null);
export const useApp = () => useContext(Ctx)!;

const KEY = 'kks-state-v1';

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [language, setLanguage] = useState<Language>('bn');
  const [childName, setChildName] = useState('');
  const [stars, setStars] = useState(0);
  const [onboarded, setOnboarded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) {
        try {
          const s = JSON.parse(raw);
          setLanguage(s.language ?? 'bn');
          setChildName(s.childName ?? '');
          setStars(s.stars ?? 0);
          if (s.onboarded) {
            setOnboarded(true);
            setScreen('home');
          }
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(KEY, JSON.stringify({ language, childName, stars, onboarded }));
  }, [language, childName, stars, onboarded, loaded]);

  const value: State = {
    screen,
    go: setScreen,
    language,
    setLanguage,
    childName,
    setChildName,
    stars,
    addStars: (n) => setStars((s) => s + n),
    onboarded,
    finishOnboarding: () => {
      setOnboarded(true);
      setScreen('home');
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
