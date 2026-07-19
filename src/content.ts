// Learning content — first slice of the Learn module.
export type Letter = {
  glyph: string;
  name: string; // spoken name
  word: string; // example word
  wordEmoji: string;
  lang: 'bn' | 'en';
};

export const banglaLetters: Letter[] = [
  { glyph: 'অ', name: 'অ', word: 'অজগর', wordEmoji: '🐍', lang: 'bn' },
  { glyph: 'আ', name: 'আ', word: 'আম', wordEmoji: '🥭', lang: 'bn' },
  { glyph: 'ই', name: 'ই', word: 'ইলিশ', wordEmoji: '🐟', lang: 'bn' },
  { glyph: 'ঈ', name: 'ঈ', word: 'ঈগল', wordEmoji: '🦅', lang: 'bn' },
  { glyph: 'উ', name: 'উ', word: 'উট', wordEmoji: '🐫', lang: 'bn' },
  { glyph: 'ঊ', name: 'ঊ', word: 'ঊষা', wordEmoji: '🌅', lang: 'bn' },
  { glyph: 'ক', name: 'ক', word: 'কলা', wordEmoji: '🍌', lang: 'bn' },
  { glyph: 'খ', name: 'খ', word: 'খরগোশ', wordEmoji: '🐰', lang: 'bn' },
  { glyph: 'গ', name: 'গ', word: 'গরু', wordEmoji: '🐄', lang: 'bn' },
  { glyph: 'ঘ', name: 'ঘ', word: 'ঘড়ি', wordEmoji: '⏰', lang: 'bn' },
  { glyph: 'চ', name: 'চ', word: 'চাঁদ', wordEmoji: '🌙', lang: 'bn' },
  { glyph: 'ছ', name: 'ছ', word: 'ছাতা', wordEmoji: '☂️', lang: 'bn' },
];

export const englishLetters: Letter[] = [
  { glyph: 'A', name: 'A', word: 'Apple', wordEmoji: '🍎', lang: 'en' },
  { glyph: 'B', name: 'B', word: 'Ball', wordEmoji: '⚽', lang: 'en' },
  { glyph: 'C', name: 'C', word: 'Cat', wordEmoji: '🐱', lang: 'en' },
  { glyph: 'D', name: 'D', word: 'Dog', wordEmoji: '🐶', lang: 'en' },
  { glyph: 'E', name: 'E', word: 'Elephant', wordEmoji: '🐘', lang: 'en' },
  { glyph: 'F', name: 'F', word: 'Fish', wordEmoji: '🐟', lang: 'en' },
  { glyph: 'G', name: 'G', word: 'Goat', wordEmoji: '🐐', lang: 'en' },
  { glyph: 'H', name: 'H', word: 'Hat', wordEmoji: '👒', lang: 'en' },
  { glyph: 'I', name: 'I', word: 'Ice cream', wordEmoji: '🍦', lang: 'en' },
  { glyph: 'J', name: 'J', word: 'Jug', wordEmoji: '🫙', lang: 'en' },
  { glyph: 'K', name: 'K', word: 'Kite', wordEmoji: '🪁', lang: 'en' },
  { glyph: 'L', name: 'L', word: 'Lion', wordEmoji: '🦁', lang: 'en' },
];
