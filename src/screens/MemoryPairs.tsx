import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { say } from '../speech';
import BackBar from './BackBar';
import Tutul from '../Tutul';

const pool = [
  { e: '🥭', bn: 'আম', en: 'Mango' },
  { e: '🐅', bn: 'বাঘ', en: 'Tiger' },
  { e: '🌙', bn: 'চাঁদ', en: 'Moon' },
  { e: '⚽', bn: 'বল', en: 'Ball' },
  { e: '🐟', bn: 'মাছ', en: 'Fish' },
  { e: '🌺', bn: 'ফুল', en: 'Flower' },
];

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

export default function MemoryPairs() {
  const app = useApp();
  const bn = app.language === 'bn';
  const [round, setRound] = useState(0);
  const cards = useMemo(() => shuffle(pool.flatMap((p, i) => [{ ...p, pair: i }, { ...p, pair: i }])), [round]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const done = matched.length === cards.length;

  useEffect(() => {
    if (open.length === 2) {
      const [a, b] = open;
      if (cards[a].pair === cards[b].pair) {
        say(bn ? cards[a].bn : cards[a].en, app.language);
        setMatched((m) => [...m, a, b]);
        app.addStars(1);
        setOpen([]);
      } else {
        const t = setTimeout(() => setOpen([]), 900);
        return () => clearTimeout(t);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (done) say(bn ? 'দারুণ! সব জোড়া মিলে গেছে!' : 'Amazing! You found all the pairs!', app.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const flip = (i: number) => {
    if (open.length === 2 || open.includes(i) || matched.includes(i)) return;
    setOpen((o) => [...o, i]);
  };

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={bn ? '🃏 মেমোরি জোড়া' : '🃏 Memory Pairs'} backTo="play" />
      <View style={styles.wrap}>
        {done ? (
          <View style={styles.doneBox}>
            <Tutul size={110} mood="cheering" />
            <Text style={styles.doneText}>{bn ? 'সাবাশ! +৬ ⭐' : 'Well done! +6 ⭐'}</Text>
            <Pressable
              style={styles.again}
              onPress={() => {
                setMatched([]);
                setOpen([]);
                setRound((r) => r + 1);
              }}
            >
              <Text style={styles.againText}>{bn ? 'আবার খেলি 🔁' : 'Play again 🔁'}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.grid}>
            {cards.map((c, i) => {
              const faceUp = open.includes(i) || matched.includes(i);
              return (
                <Pressable
                  key={i}
                  style={[styles.card, faceUp ? styles.cardUp : styles.cardDown]}
                  onPress={() => flip(i)}
                >
                  <Text style={{ fontSize: 38 }}>{faceUp ? c.e : '❓'}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', padding: 16, maxWidth: 520, width: '100%', alignSelf: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 360 },
  card: {
    width: 78,
    height: 92,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
  },
  cardDown: { backgroundColor: colors.grape, borderBottomColor: colors.grapeDark },
  cardUp: { backgroundColor: colors.white, borderBottomColor: colors.sand },
  doneBox: { alignItems: 'center', marginTop: 40, gap: 14 },
  doneText: { fontFamily: fonts.bangla, fontSize: 26, color: colors.ink },
  again: {
    backgroundColor: colors.teal,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderBottomWidth: 6,
    borderBottomColor: colors.tealDark,
  },
  againText: { fontFamily: fonts.bangla, fontSize: 18, color: colors.white },
});
