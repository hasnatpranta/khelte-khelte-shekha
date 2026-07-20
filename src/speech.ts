import * as Speech from 'expo-speech';
import { AudioPlayer, createAudioPlayer } from 'expo-audio';
import { Language } from './theme';
import { voiceClips } from './voiceClips';

// Audio is the primary UI: every tap can speak, in the active language.
// Recorded voice clips (voiceClips.ts) take priority; device TTS is the fallback.

let activePlayer: AudioPlayer | null = null;

function stopAll() {
  Speech.stop();
  if (activePlayer) {
    activePlayer.remove();
    activePlayer = null;
  }
}

function playClip(text: string): boolean {
  const asset = voiceClips[text];
  if (asset === undefined) return false;
  activePlayer = createAudioPlayer(asset);
  activePlayer.play();
  return true;
}

function tts(text: string, lang: Language, onDone?: () => void) {
  Speech.speak(text, {
    language: lang === 'bn' ? 'bn-BD' : 'en-US',
    rate: 0.85,
    pitch: 1.1,
    onDone,
  });
}

export function say(text: string, lang: Language) {
  stopAll();
  if (playClip(text)) return;
  tts(text, lang);
}

export function sayBoth(bn: string, en: string, primary: Language) {
  stopAll();
  const [first, second] = primary === 'bn' ? [bn, en] : [en, bn];
  const secondLang: Language = primary === 'bn' ? 'en' : 'bn';
  if (playClip(first)) {
    // Clip durations are short; queue the second phrase after a beat.
    setTimeout(() => {
      if (!playClip(second)) tts(second, secondLang);
    }, 1200);
    return;
  }
  tts(first, primary, () => {
    if (!playClip(second)) tts(second, secondLang);
  });
}
