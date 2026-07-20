// Recorded voice-clip registry.
//
// Production audio plan: instead of device text-to-speech (whose Bangla voice
// varies by device), record real voice clips and register them here. Any
// phrase found in this map plays the recording; anything else falls back to
// TTS, so the app keeps working while clips are added incrementally.
//
// To add a clip: drop the file in assets/audio/ and register it, e.g.
//   'ক': require('../assets/audio/bn/ka.mp3'),
//   'কলা': require('../assets/audio/bn/kola.mp3'),
export const voiceClips: Record<string, number> = {};
