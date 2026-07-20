import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import BackBar from './BackBar';

export default function Play() {
  const app = useApp();
  const bn = app.language === 'bn';
  const games = [
    { emoji: '🎈', bn: 'বেলুন ফাটাও', en: 'Balloon Pop', screen: 'balloon' as const, color: colors.coral, shadow: colors.coralDark },
    { emoji: '🧩', bn: 'ধাঁধা', en: 'Puzzles', screen: 'puzzle' as const, color: colors.sky, shadow: colors.skyDark },
    { emoji: '🃏', bn: 'মেমোরি জোড়া', en: 'Memory Pairs', screen: 'memory' as const, color: colors.grape, shadow: colors.grapeDark },
    { emoji: '🎨', bn: 'রং করি', en: 'Coloring', screen: 'coloring' as const, color: colors.teal, shadow: colors.tealDark },
  ];

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={bn ? '🎮 খেলো' : '🎮 Play'} />
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.grid}>
          {games.map((g) => (
            <Pressable
              key={g.en}
              style={[styles.tile, { backgroundColor: g.color, borderBottomColor: g.shadow }]}
              onPress={() => app.go(g.screen)}
            >
              <Text style={{ fontSize: 44 }}>{g.emoji}</Text>
              <Text style={styles.tileBn}>{g.bn}</Text>
              <Text style={styles.tileEn}>{g.en}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    alignItems: 'center',
    borderRadius: 26,
    paddingVertical: 22,
    borderBottomWidth: 7,
    minHeight: 140,
    justifyContent: 'center',
  },
  tileBn: { fontFamily: fonts.bangla, fontSize: 20, color: colors.white, marginTop: 4 },
  tileEn: { fontFamily: fonts.headingBold, fontSize: 13, color: 'rgba(255,255,255,.85)' },
  soon: { fontFamily: fonts.body, fontSize: 11, color: colors.white, marginTop: 4 },
});
