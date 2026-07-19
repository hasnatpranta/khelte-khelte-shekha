import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { Screen, useApp } from '../AppState';

export default function BackBar({ title, backTo = 'home' }: { title: string; backTo?: Screen }) {
  const app = useApp();
  return (
    <View style={styles.bar}>
      <Pressable style={styles.back} onPress={() => app.go(backTo)}>
        <Text style={{ fontSize: 22 }}>🏠</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.starPill}>
        <Text>⭐</Text>
        <Text style={styles.starText}>{app.stars}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  back: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: colors.sand,
  },
  title: { flex: 1, fontFamily: fonts.bangla, fontSize: 22, color: colors.ink },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 4,
    borderBottomColor: colors.sand,
  },
  starText: { fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink },
});
