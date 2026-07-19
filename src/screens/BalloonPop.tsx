import React, { useMemo, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { banglaLetters, englishLetters } from '../content';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { say } from '../speech';
import { useWiggle } from '../components';
import BackBar from './BackBar';
import Tutul from '../Tutul';

const balloonColors = [colors.coral, colors.teal, colors.sky, colors.grape];

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

export default function BalloonPop() {
  const app = useApp();
  const bn = app.language === 'bn';
  const letters = bn ? banglaLetters : englishLetters;
  const [round, setRound] = useState(0);
  const [popped, setPopped] = useState<number | null>(null);
  const wiggle = useWiggle();

  const { target, options } = useMemo(() => {
    const opts = shuffle(letters).slice(0, 4);
    return { target: opts[Math.floor(Math.random() * opts.length)], options: opts };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, app.language]);

  const ask = () => say(bn ? `${target.name} খুঁজে বের করো` : `Find the letter ${target.name}`, app.language);

  React.useEffect(() => {
    ask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const onPick = (i: number) => {
    if (options[i].glyph === target.glyph) {
      setPopped(i);
      app.addStars(1);
      say(bn ? 'সাবাশ!' : 'Well done!', app.language);
      setTimeout(() => {
        setPopped(null);
        setRound((r) => r + 1);
      }, 900);
    } else {
      // gentle wiggle — no red X, no losing
      wiggle.run();
      say(bn ? 'আবার চেষ্টা করো' : 'Try again', app.language);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={bn ? '🎈 বেলুন ফাটাও' : '🎈 Balloon Pop'} backTo="play" />
      <View style={styles.wrap}>
        <Pressable style={styles.prompt} onPress={ask}>
          <Tutul size={70} mood="thinking" />
          <View style={{ flex: 1 }}>
            <Text style={styles.promptText}>
              {bn ? 'কোন বেলুনে আছে' : 'Which balloon has'}{' '}
              <Text style={{ color: colors.coral, fontSize: 30 }}>{target.glyph}</Text> ?
            </Text>
            <Text style={styles.promptHint}>🔊 {bn ? 'আবার শুনতে চাপ দাও' : 'Tap to hear again'}</Text>
          </View>
        </Pressable>

        <Animated.View style={[styles.balloons, wiggle]}>
          {options.map((l, i) => (
            <Pressable key={l.glyph} onPress={() => onPick(i)} style={styles.balloonWrap}>
              {popped === i ? (
                <Text style={{ fontSize: 54 }}>✨</Text>
              ) : (
                <>
                  <View style={[styles.balloon, { backgroundColor: balloonColors[i] }]}>
                    <Text style={styles.balloonGlyph}>{l.glyph}</Text>
                  </View>
                  <View style={[styles.knot, { borderTopColor: balloonColors[i] }]} />
                  <Text style={styles.string}>〰️</Text>
                </>
              )}
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center' },
  prompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
    borderBottomWidth: 6,
    borderBottomColor: colors.sand,
    marginBottom: 26,
  },
  promptText: { fontFamily: fonts.bangla, fontSize: 21, color: colors.ink },
  promptHint: { fontFamily: fonts.body, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  balloons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  balloonWrap: { alignItems: 'center', width: 120, minHeight: 170, justifyContent: 'center' },
  balloon: {
    width: 110,
    height: 130,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
  },
  balloonGlyph: { fontFamily: fonts.bangla, fontSize: 46, color: colors.white, lineHeight: 62 },
  knot: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  string: { fontSize: 18, transform: [{ rotate: '90deg' }], marginTop: 6 },
});
