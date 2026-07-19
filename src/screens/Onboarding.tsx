import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Tutul from '../Tutul';
import { ChunkyButton } from '../components';
import { colors, fonts } from '../theme';
import { useApp } from '../AppState';
import { say } from '../speech';

export default function Onboarding() {
  const app = useApp();
  const [step, setStep] = useState(0);

  return (
    <View style={styles.wrap}>
      <View style={{ alignItems: 'center', marginBottom: 18 }}>
        <Tutul size={150} mood={step === 2 ? 'cheering' : 'happy'} />
        <View style={styles.namePill}>
          <Text style={{ fontFamily: fonts.bangla, color: colors.coral, fontSize: 19 }}>টুটুল · Tutul 🐯</Text>
        </View>
      </View>

      {step === 0 && (
        <View style={styles.card}>
          <Text style={styles.title}>ভাষা বেছে নাও{'\n'}Choose a language</Text>
          <View style={{ gap: 14, marginTop: 18 }}>
            <ChunkyButton
              label="বাংলা"
              color={colors.teal}
              shadow={colors.tealDark}
              fontFamily={fonts.bangla}
              onPress={() => {
                app.setLanguage('bn');
                say('বাংলা', 'bn');
                setStep(1);
              }}
            />
            <ChunkyButton
              label="English"
              color={colors.sky}
              shadow={colors.skyDark}
              onPress={() => {
                app.setLanguage('en');
                say('English', 'en');
                setStep(1);
              }}
            />
          </View>
        </View>
      )}

      {step === 1 && (
        <View style={styles.card}>
          <Text style={styles.title}>
            {app.language === 'bn' ? 'তোমার নাম কী?' : "What's your name?"}
          </Text>
          <TextInput
            style={styles.input}
            value={app.childName}
            onChangeText={app.setChildName}
            placeholder={app.language === 'bn' ? 'নাম লেখো…' : 'Type your name…'}
            placeholderTextColor="#b9b0a0"
          />
          <ChunkyButton
            label={app.language === 'bn' ? 'পরের ধাপ ➜' : 'Next ➜'}
            color={colors.sunny}
            shadow={colors.sunnyDark}
            style={{ marginTop: 16 }}
            onPress={() => setStep(2)}
          />
        </View>
      )}

      {step === 2 && (
        <View style={styles.card}>
          <Text style={styles.title}>
            {app.language === 'bn'
              ? `চলো খেলি, ${app.childName || 'বন্ধু'}! 🎈`
              : `Let's play, ${app.childName || 'friend'}! 🎈`}
          </Text>
          <ChunkyButton
            label={app.language === 'bn' ? 'খেলা শুরু!' : "Let's Play!"}
            fontFamily={app.language === 'bn' ? fonts.bangla : fonts.headingBold}
            style={{ marginTop: 18 }}
            onPress={() => {
              say(app.language === 'bn' ? 'চলো খেলি!' : "Let's play!", app.language);
              app.finishOnboarding();
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  namePill: {
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 28,
    padding: 28,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  title: {
    fontFamily: fonts.bangla,
    fontSize: 26,
    color: colors.ink,
    textAlign: 'center',
    lineHeight: 38,
  },
  input: {
    borderWidth: 3,
    borderColor: colors.sand,
    borderRadius: 18,
    padding: 14,
    fontFamily: fonts.body,
    fontSize: 18,
    color: colors.ink,
    marginTop: 16,
    textAlign: 'center',
  },
});
