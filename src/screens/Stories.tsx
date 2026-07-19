import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { sayBoth } from '../speech';
import BackBar from './BackBar';

const sets = [
  { emoji: '🐘', bn: 'প্রাণী', en: 'Animals', items: [ { e: '🐅', bn: 'বাঘ', en: 'Tiger' }, { e: '🐘', bn: 'হাতি', en: 'Elephant' }, { e: '🐒', bn: 'বানর', en: 'Monkey' }, { e: '🦌', bn: 'হরিণ', en: 'Deer' } ] },
  { emoji: '🍎', bn: 'ফল', en: 'Fruits', items: [ { e: '🥭', bn: 'আম', en: 'Mango' }, { e: '🍌', bn: 'কলা', en: 'Banana' }, { e: '🍍', bn: 'আনারস', en: 'Pineapple' }, { e: '🍉', bn: 'তরমুজ', en: 'Watermelon' } ] },
  { emoji: '🚌', bn: 'যানবাহন', en: 'Vehicles', items: [ { e: '🚌', bn: 'বাস', en: 'Bus' }, { e: '🛺', bn: 'রিকশা', en: 'Rickshaw' }, { e: '🚤', bn: 'নৌকা', en: 'Boat' }, { e: '✈️', bn: 'বিমান', en: 'Plane' } ] },
];

export default function Stories() {
  const app = useApp();
  const bn = app.language === 'bn';

  return (
    <View style={{ flex: 1 }}>
      <BackBar title={bn ? '📖 গল্প ও জগৎ' : '📖 Stories & World'} />
      <ScrollView contentContainerStyle={styles.wrap}>
        {sets.map((s) => (
          <View key={s.en} style={styles.set}>
            <Text style={styles.setTitle}>
              {s.emoji} {bn ? s.bn : s.en}
            </Text>
            <View style={styles.row}>
              {s.items.map((it) => (
                <Pressable
                  key={it.en}
                  style={styles.item}
                  onPress={() => sayBoth(it.bn, it.en, app.language)}
                >
                  <Text style={{ fontSize: 40 }}>{it.e}</Text>
                  <Text style={styles.itemBn}>{it.bn}</Text>
                  <Text style={styles.itemEn}>{it.en}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, maxWidth: 520, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  set: { marginBottom: 22 },
  setTitle: { fontFamily: fonts.bangla, fontSize: 21, color: colors.ink, marginBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  item: {
    flexBasis: '22%',
    flexGrow: 1,
    minWidth: 100,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 14,
    borderBottomWidth: 5,
    borderBottomColor: colors.sand,
  },
  itemBn: { fontFamily: fonts.bangla, fontSize: 16, color: colors.ink, marginTop: 4 },
  itemEn: { fontFamily: fonts.body, fontSize: 12, color: colors.inkSoft },
});
