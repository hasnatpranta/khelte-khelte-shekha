import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import BackBar from './BackBar';
import Tutul from '../Tutul';

const badges = [
  { emoji: '🌟', bn: 'প্রথম তারা', en: 'First Star', need: 1 },
  { emoji: '✍️', bn: 'লেখক', en: 'Little Writer', need: 6 },
  { emoji: '🎈', bn: 'বেলুন মাস্টার', en: 'Balloon Master', need: 12 },
  { emoji: '🏆', bn: 'চ্যাম্পিয়ন', en: 'Champion', need: 25 },
];

export default function Rewards() {
  const app = useApp();
  const bn = app.language === 'bn';

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={bn ? '🏆 পুরস্কার' : '🏆 Rewards'} />
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.wallet}>
          <Tutul size={80} mood="cheering" />
          <View>
            <Text style={styles.walletStars}>⭐ {app.stars}</Text>
            <Text style={styles.walletLabel}>{bn ? 'তোমার তারা' : 'Your stars'}</Text>
          </View>
        </View>
        <Text style={styles.section}>{bn ? 'ব্যাজ তাক' : 'Badge shelf'}</Text>
        <View style={styles.grid}>
          {badges.map((b) => {
            const won = app.stars >= b.need;
            return (
              <View key={b.en} style={[styles.badge, { opacity: won ? 1 : 0.4 }]}>
                <Text style={{ fontSize: 40 }}>{won ? b.emoji : '🔒'}</Text>
                <Text style={styles.badgeBn}>{bn ? b.bn : b.en}</Text>
                <Text style={styles.badgeNeed}>
                  {won ? (bn ? 'জিতেছ!' : 'Earned!') : `⭐ ${b.need}`}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center' },
  wallet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    backgroundColor: colors.sunny,
    borderRadius: 28,
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: colors.sunnyDark,
    marginBottom: 22,
  },
  walletStars: { fontFamily: fonts.bodyBold, fontSize: 34, color: colors.white },
  walletLabel: { fontFamily: fonts.bangla, fontSize: 16, color: 'rgba(255,255,255,.9)' },
  section: { fontFamily: fonts.bangla, fontSize: 20, color: colors.ink, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  badge: {
    flexBasis: '47%',
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 16,
    borderBottomWidth: 6,
    borderBottomColor: colors.sand,
  },
  badgeBn: { fontFamily: fonts.bangla, fontSize: 16, color: colors.ink, marginTop: 6 },
  badgeNeed: { fontFamily: fonts.body, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
});
