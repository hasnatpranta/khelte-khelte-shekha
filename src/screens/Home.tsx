import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Tutul from '../Tutul';
import { colors, fonts } from '../theme';
import { Screen, useApp } from '../AppState';
import { say } from '../speech';

const hubs: {
  key: Screen;
  emoji: string;
  bn: string;
  en: string;
  color: string;
  shadow: string;
}[] = [
  { key: 'learn', emoji: '🅰️', bn: 'শেখো', en: 'Learn', color: colors.coral, shadow: colors.coralDark },
  { key: 'play', emoji: '🎮', bn: 'খেলো', en: 'Play', color: colors.teal, shadow: colors.tealDark },
  { key: 'stories', emoji: '📖', bn: 'গল্প', en: 'Stories', color: colors.grape, shadow: colors.grapeDark },
  { key: 'rewards', emoji: '🏆', bn: 'পুরস্কার', en: 'Rewards', color: colors.sunny, shadow: colors.sunnyDark },
];

export default function Home() {
  const app = useApp();
  const bn = app.language === 'bn';

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.hello}>
            {bn ? `হ্যালো, ${app.childName || 'বন্ধু'}! 👋` : `Hello, ${app.childName || 'friend'}! 👋`}
          </Text>
          <Text style={styles.sub}>{bn ? 'আজ কী শিখবে?' : 'What will you learn today?'}</Text>
        </View>
        <View style={styles.starPill}>
          <Text style={{ fontSize: 18 }}>⭐</Text>
          <Text style={styles.starText}>{app.stars}</Text>
        </View>
      </View>

      <View style={styles.island}>
        <Tutul size={110} mood="happy" />
        <Text style={styles.islandTitle}>🏝️ {bn ? 'শেখার দ্বীপ' : 'Learning Island'}</Text>
      </View>

      <View style={styles.grid}>
        {hubs.map((h) => (
          <Pressable
            key={h.key}
            style={[styles.hub, { backgroundColor: h.color, borderBottomColor: h.shadow }]}
            onPress={() => {
              say(bn ? h.bn : h.en, app.language);
              app.go(h.key);
            }}
          >
            <Text style={{ fontSize: 44 }}>{h.emoji}</Text>
            <Text style={styles.hubBn}>{h.bn}</Text>
            <Text style={styles.hubEn}>{h.en}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.parents} onPress={() => app.go('parentGate')}>
        <Text style={{ fontSize: 18 }}>🔒</Text>
        <Text style={styles.parentsText}>{bn ? 'অভিভাবক' : 'Parents'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40, maxWidth: 520, width: '100%', alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  hello: { fontFamily: fonts.bangla, fontSize: 24, color: colors.ink },
  sub: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 4,
    borderBottomColor: colors.sand,
  },
  starText: { fontFamily: fonts.bodyBold, fontSize: 18, color: colors.ink },
  island: {
    alignItems: 'center',
    backgroundColor: colors.sunny,
    borderRadius: 32,
    paddingVertical: 22,
    borderBottomWidth: 8,
    borderBottomColor: colors.sunnyDark,
    marginBottom: 18,
  },
  islandTitle: { fontFamily: fonts.bangla, fontSize: 22, color: colors.white, marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  hub: {
    flexBasis: '47%',
    flexGrow: 1,
    alignItems: 'center',
    borderRadius: 26,
    paddingVertical: 20,
    borderBottomWidth: 7,
    minHeight: 130,
    justifyContent: 'center',
  },
  hubBn: { fontFamily: fonts.bangla, fontSize: 22, color: colors.white, marginTop: 4 },
  hubEn: { fontFamily: fonts.headingBold, fontSize: 14, color: 'rgba(255,255,255,.85)' },
  parents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.ink,
    borderRadius: 20,
    paddingVertical: 14,
    marginTop: 18,
  },
  parentsText: { fontFamily: fonts.bodyBold, fontSize: 15, color: colors.white },
});
