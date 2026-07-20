import React, { useMemo, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { say } from '../speech';
import { useWiggle } from '../components';
import BackBar from './BackBar';
import Tutul from '../Tutul';

// Pattern puzzles: what comes next? Age-appropriate for pre-readers.
const patterns = [
  { seq: ['🍎', '🍌', '🍎', '🍌', '🍎'], answer: '🍌', options: ['🍌', '🍎', '🍇'] },
  { seq: ['🔴', '🔵', '🔴', '🔵', '🔴'], answer: '🔵', options: ['🟢', '🔵', '🔴'] },
  { seq: ['🐱', '🐶', '🐱', '🐶', '🐱'], answer: '🐶', options: ['🐶', '🐭', '🐱'] },
  { seq: ['⭐', '⭐', '🌙', '⭐', '⭐'], answer: '🌙', options: ['⭐', '🌙', '☀️'] },
  { seq: ['🟨', '🟩', '🟩', '🟨', '🟩'], answer: '🟩', options: ['🟨', '🟦', '🟩'] },
];

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

export default function Puzzle() {
  const app = useApp();
  const bn = app.language === 'bn';
  const [idx, setIdx] = useState(0);
  const [solved, setSolved] = useState(false);
  const wiggle = useWiggle();
  const p = patterns[idx % patterns.length];
  const options = useMemo(() => shuffle(p.options), [idx]);

  const pick = (o: string) => {
    if (solved) return;
    if (o === p.answer) {
      setSolved(true);
      app.addStars(1);
      say(bn ? 'সাবাশ! ঠিক হয়েছে!' : "That's right! Well done!", app.language);
      setTimeout(() => {
        setSolved(false);
        setIdx((i) => i + 1);
      }, 1100);
    } else {
      wiggle.run();
      say(bn ? 'আবার ভেবে দেখো' : 'Think again', app.language);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={bn ? '🧩 ধাঁধা' : '🧩 Puzzles'} backTo="play" />
      <View style={styles.wrap}>
        <View style={styles.prompt}>
          <Tutul size={64} mood={solved ? 'cheering' : 'thinking'} />
          <Text style={styles.promptText}>{bn ? 'এরপর কোনটা আসবে?' : 'What comes next?'}</Text>
        </View>
        <View style={styles.seq}>
          {p.seq.map((s, i) => (
            <Text key={i} style={{ fontSize: 40 }}>{s}</Text>
          ))}
          <View style={styles.blank}>
            <Text style={{ fontSize: 40 }}>{solved ? p.answer : '❓'}</Text>
          </View>
        </View>
        <Animated.View style={[styles.options, wiggle]}>
          {options.map((o) => (
            <Pressable key={o} style={styles.option} onPress={() => pick(o)}>
              <Text style={{ fontSize: 44 }}>{o}</Text>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center' },
  prompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 6,
    borderBottomColor: colors.sand,
    marginBottom: 24,
  },
  promptText: { fontFamily: fonts.bangla, fontSize: 20, color: colors.ink },
  seq: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 18,
    borderBottomWidth: 6,
    borderBottomColor: colors.sand,
    marginBottom: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  blank: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: colors.sky,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF3FF',
  },
  options: { flexDirection: 'row', gap: 16 },
  option: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
    borderBottomColor: colors.sand,
  },
});
