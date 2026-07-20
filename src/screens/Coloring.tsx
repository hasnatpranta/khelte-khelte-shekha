import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { say } from '../speech';
import BackBar from './BackBar';

const palette = [colors.coral, colors.sunny, colors.teal, colors.sky, colors.grape, colors.leaf];

const UNFILLED = '#f0e9da';

// Tap a colour, then tap a part of the fish to fill it.
export default function Coloring() {
  const app = useApp();
  const bn = app.language === 'bn';
  const [brush, setBrush] = useState(palette[0]);
  const [fills, setFills] = useState<Record<string, string>>({});
  const [rewarded, setRewarded] = useState(false);

  const paint = (region: string) => {
    const next = { ...fills, [region]: brush };
    setFills(next);
    if (!rewarded && ['body', 'tail', 'finTop', 'finBottom'].every((r) => next[r])) {
      setRewarded(true);
      app.addStars(2);
      say(bn ? 'বাহ! কী সুন্দর মাছ!' : 'Wow! What a beautiful fish!', app.language);
    }
  };

  const f = (r: string) => fills[r] ?? UNFILLED;

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={bn ? '🎨 রং করি' : '🎨 Coloring'} backTo="play" />
      <View style={styles.wrap}>
        <Text style={styles.hint}>
          {bn ? 'রং বেছে নাও, তারপর মাছে চাপ দাও' : 'Pick a colour, then tap the fish'}
        </Text>

        <View style={styles.canvas}>
          <Svg width={320} height={240} viewBox="0 0 320 240">
            <Rect x={0} y={0} width={320} height={240} rx={24} fill="#EAF6FF" onPress={() => paint('water')} />
            {fills.water && <Rect x={0} y={0} width={320} height={240} rx={24} fill={fills.water} opacity={0.25} />}
            {/* tail */}
            <Path d="M245 120 L300 80 L300 160 Z" fill={f('tail')} stroke={colors.ink} strokeWidth={3} onPress={() => paint('tail')} />
            {/* body */}
            <Ellipse cx={160} cy={120} rx={95} ry={62} fill={f('body')} stroke={colors.ink} strokeWidth={3} onPress={() => paint('body')} />
            {/* fins */}
            <Path d="M140 62 Q160 20 190 60 Z" fill={f('finTop')} stroke={colors.ink} strokeWidth={3} onPress={() => paint('finTop')} />
            <Path d="M140 178 Q160 220 190 180 Z" fill={f('finBottom')} stroke={colors.ink} strokeWidth={3} onPress={() => paint('finBottom')} />
            {/* eye + mouth (fixed) */}
            <Circle cx={95} cy={108} r={11} fill={colors.ink} />
            <Circle cx={98} cy={104} r={4} fill="#fff" />
            <Path d="M70 138 q10 8 22 2" stroke={colors.ink} strokeWidth={3} fill="none" strokeLinecap="round" />
            {/* bubbles */}
            <Circle cx={45} cy={60} r={9} fill={f('bubbles')} stroke={colors.ink} strokeWidth={2} onPress={() => paint('bubbles')} />
            <Circle cx={30} cy={38} r={6} fill={f('bubbles')} stroke={colors.ink} strokeWidth={2} onPress={() => paint('bubbles')} />
          </Svg>
        </View>

        <View style={styles.palette}>
          {palette.map((c) => (
            <Pressable
              key={c}
              style={[styles.swatch, { backgroundColor: c }, brush === c && styles.swatchActive]}
              onPress={() => setBrush(c)}
            />
          ))}
        </View>
        {rewarded && <Text style={styles.reward}>+2 ⭐</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center' },
  hint: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft, marginBottom: 14 },
  canvas: {
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 12,
    borderBottomWidth: 8,
    borderBottomColor: colors.sand,
  },
  palette: { flexDirection: 'row', gap: 12, marginTop: 20 },
  swatch: {
    width: 46,
    height: 46,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  swatchActive: { borderColor: colors.ink, transform: [{ scale: 1.15 }] },
  reward: { fontFamily: fonts.bodyBold, fontSize: 24, color: colors.coral, marginTop: 14 },
});
