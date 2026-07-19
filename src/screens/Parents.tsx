import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { ChunkyButton } from '../components';
import BackBar from './BackBar';

// Math-gate: keeps kids out of settings. A pre-reader can't answer 7 × 4.
export function ParentGate() {
  const app = useApp();
  const { a, b, options } = useMemo(() => {
    const a = 3 + Math.floor(Math.random() * 6);
    const b = 3 + Math.floor(Math.random() * 6);
    const right = a * b;
    const opts = [right, right + a, right - b].sort(() => Math.random() - 0.5);
    return { a, b, options: opts };
  }, []);
  const [wrong, setWrong] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <BackBar title="🔒 Parents" />
      <View style={styles.gateWrap}>
        <View style={styles.gateCard}>
          <Text style={styles.gateTitle}>For grown-ups</Text>
          <Text style={styles.gateQ}>
            {a} × {b} = ?
          </Text>
          {wrong && <Text style={styles.gateWrong}>Not quite — try again</Text>}
          <View style={{ gap: 10, marginTop: 14 }}>
            {options.map((o) => (
              <ChunkyButton
                key={o}
                label={String(o)}
                color={colors.white}
                shadow={colors.sand}
                textColor={colors.ink}
                onPress={() => (o === a * b ? app.go('parents') : setWrong(true))}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export function ParentDashboard() {
  const app = useApp();
  const minutes = Math.min(45, 5 + app.stars * 2); // demo metric derived from activity

  return (
    <View style={{ flex: 1 }}>
      <BackBar title="👨‍👩‍👧 Parent dashboard" />
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>⭐ {app.stars}</Text>
            <Text style={styles.statLabel}>Stars earned</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{minutes}m</Text>
            <Text style={styles.statLabel}>Learning time</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week</Text>
          {[
            ['Alphabet (বাংলা)', 0.7, colors.coral],
            ['Alphabet (English)', 0.45, colors.sky],
            ['Tracing', 0.6, colors.leaf],
            ['Games', 0.8, colors.teal],
          ].map(([label, v, c]) => (
            <View key={label as string} style={{ marginBottom: 12 }}>
              <Text style={styles.barLabel}>{label as string}</Text>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${(v as number) * 100}%`, backgroundColor: c as string }]} />
              </View>
            </View>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          <Row label="Child" value={app.childName || '—'} />
          <Row label="Language" value={app.language === 'bn' ? 'বাংলা first' : 'English first'} />
          <Row label="Daily limit" value="30 min" />
          <Row label="Moral/Islamic module" value="Off (opt-in)" />
          <Pressable onPress={() => { app.setLanguage(app.language === 'bn' ? 'en' : 'bn'); }}>
            <Text style={styles.link}>Switch primary language</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gateWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  gateCard: {
    backgroundColor: colors.white,
    borderRadius: 26,
    padding: 26,
    width: '100%',
    maxWidth: 380,
    borderBottomWidth: 7,
    borderBottomColor: colors.sand,
  },
  gateTitle: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.inkSoft, textAlign: 'center', letterSpacing: 1, textTransform: 'uppercase' },
  gateQ: { fontFamily: fonts.bodyBold, fontSize: 44, color: colors.ink, textAlign: 'center', marginTop: 8 },
  gateWrong: { fontFamily: fonts.body, fontSize: 13, color: colors.coral, textAlign: 'center', marginTop: 6 },
  wrap: { padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  statRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  stat: {
    flex: 1,
    backgroundColor: colors.ink,
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
  },
  statNum: { fontFamily: fonts.bodyBold, fontSize: 26, color: colors.white },
  statLabel: { fontFamily: fonts.body, fontSize: 12, color: '#cfc7b6', marginTop: 2 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
    borderBottomWidth: 6,
    borderBottomColor: colors.sand,
  },
  cardTitle: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink, marginBottom: 12 },
  barLabel: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, marginBottom: 4 },
  barBg: { height: 12, backgroundColor: colors.paper, borderRadius: 8, overflow: 'hidden' },
  barFill: { height: 12, borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.paper },
  rowLabel: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft },
  rowValue: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.ink },
  link: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.sky, marginTop: 12 },
});
