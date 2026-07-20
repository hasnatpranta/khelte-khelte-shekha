import React, { useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { say } from '../speech';
import { ChunkyButton } from '../components';
import BackBar from './BackBar';
import Tutul from '../Tutul';

const PAD = 300;
const bnGlyphs = ['অ', 'আ', 'ক'];
const enGlyphs = ['A', 'B', 'C'];

export default function Tracing() {
  const app = useApp();
  const glyphs = app.language === 'bn' ? bnGlyphs : enGlyphs;
  const [idx, setIdx] = useState(0);
  const [strokes, setStrokes] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [done, setDone] = useState(false);
  const currentRef = useRef('');

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentRef.current = `${locationX},${locationY}`;
        setCurrent(currentRef.current);
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentRef.current += ` ${locationX},${locationY}`;
        setCurrent(currentRef.current);
      },
      onPanResponderRelease: () => {
        setStrokes((s) => [...s, currentRef.current]);
        currentRef.current = '';
        setCurrent('');
      },
    })
  ).current;

  const glyph = glyphs[idx];
  const bn = app.language === 'bn';
  const [needMore, setNeedMore] = useState(false);

  // Loose stroke validation: enough ink, spread across the letter area.
  // (No red X — if it's not enough yet, Tutul just asks for a little more.)
  const inkIsEnough = () => {
    const pts = strokes
      .flatMap((s) => s.split(' '))
      .map((p) => p.split(',').map(Number))
      .filter((p) => p.length === 2 && !p.some(isNaN));
    if (pts.length < 12) return false;
    let len = 0;
    for (let i = 1; i < pts.length; i++) {
      len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    }
    if (len < PAD * 0.9) return false;
    const bands = (axis: 0 | 1) =>
      new Set(pts.map((p) => Math.min(2, Math.floor((p[axis] / PAD) * 3)))).size;
    return bands(0) >= 2 && bands(1) >= 2;
  };

  const finish = () => {
    if (!inkIsEnough()) {
      setNeedMore(true);
      say(bn ? 'আরেকটু লেখো, তুমি পারবে!' : 'Trace a little more, you can do it!', app.language);
      return;
    }
    setNeedMore(false);
    setDone(true);
    app.addStars(2);
    say(bn ? 'দারুণ! খুব সুন্দর হয়েছে!' : 'Great job! Beautiful!', app.language);
  };

  const next = () => {
    setDone(false);
    setStrokes([]);
    setIdx((i) => (i + 1) % glyphs.length);
  };

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={bn ? '✍️ লেখা শিখি' : '✍️ Tracing'} backTo="learn" />
      <View style={styles.wrap}>
        <Text style={styles.hint}>
          {bn ? 'আঙুল দিয়ে অক্ষরের ওপর লেখো' : 'Trace the letter with your finger'}
        </Text>
        <View style={styles.padWrap}>
          <View style={styles.pad} {...pan.panHandlers}>
            <Text style={styles.ghost}>{glyph}</Text>
            <Svg width={PAD} height={PAD} style={StyleSheet.absoluteFill} pointerEvents="none">
              {[...strokes, current].filter(Boolean).map((pts, i) => (
                <Polyline
                  key={i}
                  points={pts}
                  fill="none"
                  stroke={colors.coral}
                  strokeWidth={14}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </Svg>
          </View>
          {done && (
            <View style={styles.cheer} pointerEvents="none">
              <Tutul size={90} mood="cheering" />
              <Text style={styles.cheerText}>+2 ⭐</Text>
            </View>
          )}
          {needMore && !done && (
            <View style={styles.cheer} pointerEvents="none">
              <Tutul size={90} mood="thinking" />
              <Text style={styles.cheerText}>{bn ? 'আরেকটু!' : 'A bit more!'}</Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <ChunkyButton
            label={bn ? 'মুছে ফেলি' : 'Clear'}
            color={colors.white}
            shadow={colors.sand}
            textColor={colors.ink}
            size={15}
            style={{ flex: 1 }}
            onPress={() => {
              setStrokes([]);
              setDone(false);
              setNeedMore(false);
            }}
          />
          {done ? (
            <ChunkyButton
              label={bn ? 'পরের অক্ষর ➜' : 'Next letter ➜'}
              color={colors.teal}
              shadow={colors.tealDark}
              size={15}
              style={{ flex: 1 }}
              onPress={next}
            />
          ) : (
            <ChunkyButton
              label={bn ? 'হয়ে গেছে! ✔' : 'Done! ✔'}
              color={colors.leaf}
              shadow={colors.leafDark}
              size={15}
              style={{ flex: 1 }}
              onPress={finish}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center' },
  hint: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft, marginBottom: 14 },
  padWrap: { position: 'relative' },
  pad: {
    width: PAD,
    height: PAD,
    backgroundColor: colors.white,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 8,
    borderBottomColor: colors.sand,
    overflow: 'hidden',
  },
  ghost: {
    fontFamily: fonts.bangla,
    fontSize: 200,
    lineHeight: 280,
    color: '#efe6d3',
  },
  cheer: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    alignItems: 'center',
  },
  cheerText: {
    fontFamily: fonts.bodyBold,
    fontSize: 20,
    color: colors.coral,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
