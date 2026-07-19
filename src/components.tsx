import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts } from './theme';

// Chunky button with the physical 6px base from the design system.
export function ChunkyButton({
  label,
  color = colors.coral,
  shadow = colors.coralDark,
  textColor = colors.white,
  onPress,
  style,
  fontFamily = fonts.headingBold,
  size = 18,
}: {
  label: string;
  color?: string;
  shadow?: string;
  textColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
  fontFamily?: string;
  size?: number;
}) {
  const press = useRef(new Animated.Value(0)).current;
  return (
    <Pressable
      onPressIn={() => Animated.timing(press, { toValue: 1, duration: 70, useNativeDriver: true }).start()}
      onPressOut={() => Animated.timing(press, { toValue: 0, duration: 90, useNativeDriver: true }).start()}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.chunky,
          { backgroundColor: color, shadowColor: shadow },
          {
            borderBottomWidth: 6,
            borderBottomColor: shadow,
            transform: [{ translateY: press.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }) }],
          },
          style,
        ]}
      >
        <Text style={{ fontFamily, fontSize: size, color: textColor, textAlign: 'center' }}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

// Gentle wiggle for wrong answers — reward, never punish.
export function useWiggle() {
  const wiggle = useRef(new Animated.Value(0)).current;
  const run = () => {
    wiggle.setValue(0);
    Animated.sequence(
      [8, -8, 6, -6, 0].map((v) =>
        Animated.timing(wiggle, { toValue: v, duration: 60, useNativeDriver: true })
      )
    ).start();
  };
  return { transform: [{ translateX: wiggle }], run };
}

const styles = StyleSheet.create({
  chunky: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 64, // thumb-first: min 64px hit targets
  },
});
