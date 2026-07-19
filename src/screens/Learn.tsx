import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { banglaLetters, englishLetters, Letter } from '../content';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { say } from '../speech';
import { ChunkyButton } from '../components';
import BackBar from './BackBar';

const tileColors = [colors.coral, colors.teal, colors.sky, colors.grape, colors.sunny, colors.leaf];

export default function Learn() {
  const app = useApp();
  const [script, setScript] = useState<'bn' | 'en'>(app.language);
  const letters = script === 'bn' ? banglaLetters : englishLetters;
  const [active, setActive] = useState<Letter | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={app.language === 'bn' ? '🅰️ শেখো' : '🅰️ Learn'} />
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
          <ChunkyButton
            label="অ আ ক খ"
            fontFamily={fonts.bangla}
            size={16}
            color={script === 'bn' ? colors.coral : colors.white}
            shadow={script === 'bn' ? colors.coralDark : colors.sand}
            textColor={script === 'bn' ? colors.white : colors.ink}
            style={{ flex: 1 }}
            onPress={() => setScript('bn')}
          />
          <ChunkyButton
            label="A B C"
            size={16}
            color={script === 'en' ? colors.sky : colors.white}
            shadow={script === 'en' ? colors.skyDark : colors.sand}
            textColor={script === 'en' ? colors.white : colors.ink}
            style={{ flex: 1 }}
            onPress={() => setScript('en')}
          />
        </View>

        {active && (
          <Pressable
            style={styles.detail}
            onPress={() => say(`${active.name}, ${active.word}`, active.lang)}
          >
            <Text style={styles.detailGlyph}>{active.glyph}</Text>
            <Text style={{ fontSize: 54 }}>{active.wordEmoji}</Text>
            <Text style={styles.detailWord}>{active.word}</Text>
            <Text style={styles.detailHint}>🔊 {app.language === 'bn' ? 'আবার শুনতে চাপ দাও' : 'Tap to hear again'}</Text>
            <ChunkyButton
              label={app.language === 'bn' ? '✍️ লেখা শিখি' : '✍️ Trace it'}
              color={colors.leaf}
              shadow={colors.leafDark}
              size={16}
              style={{ marginTop: 12, alignSelf: 'stretch' }}
              onPress={() => app.go('tracing')}
            />
          </Pressable>
        )}

        <View style={styles.grid}>
          {letters.map((l, i) => (
            <Pressable
              key={l.glyph}
              style={[styles.tile, { backgroundColor: tileColors[i % tileColors.length] }]}
              onPress={() => {
                setActive(l);
                say(`${l.name}, ${l.word}`, l.lang);
              }}
            >
              <Text style={styles.tileGlyph}>{l.glyph}</Text>
              <Text style={{ fontSize: 20 }}>{l.wordEmoji}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  tile: {
    width: 104,
    height: 104,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
    borderBottomColor: 'rgba(0,0,0,.25)',
  },
  tileGlyph: { fontFamily: fonts.bangla, fontSize: 40, color: colors.white, lineHeight: 52 },
  detail: {
    backgroundColor: colors.white,
    borderRadius: 28,
    alignItems: 'center',
    padding: 20,
    marginBottom: 18,
    borderBottomWidth: 6,
    borderBottomColor: colors.sand,
  },
  detailGlyph: { fontFamily: fonts.bangla, fontSize: 84, color: colors.ink, lineHeight: 110 },
  detailWord: { fontFamily: fonts.bangla, fontSize: 28, color: colors.ink },
  detailHint: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, marginTop: 6 },
});
