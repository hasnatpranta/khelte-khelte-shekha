import * as Speech from 'expo-speech';
import { Language } from './theme';

// Audio is the primary UI: every tap can speak, in the active language.
export function say(text: string, lang: Language) {
  Speech.stop();
  Speech.speak(text, {
    language: lang === 'bn' ? 'bn-BD' : 'en-US',
    rate: 0.85,
    pitch: 1.1,
  });
}

export function sayBoth(bn: string, en: string, primary: Language) {
  Speech.stop();
  const first = primary === 'bn' ? bn : en;
  const second = primary === 'bn' ? en : bn;
  Speech.speak(first, {
    language: primary === 'bn' ? 'bn-BD' : 'en-US',
    rate: 0.85,
    pitch: 1.1,
    onDone: () =>
      Speech.speak(second, {
        language: primary === 'bn' ? 'en-US' : 'bn-BD',
        rate: 0.85,
        pitch: 1.1,
      }),
  });
}
