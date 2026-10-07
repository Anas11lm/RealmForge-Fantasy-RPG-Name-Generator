export interface SyllableDataset {
  prefixes: {
    male: string[];
    female: string[];
    neutral: string[];
  };
  middles: string[];
  suffixes: {
    male: string[];
    female: string[];
    neutral: string[];
  };
  surnames: {
    prefixes: string[];
    suffixes: string[];
  };
  epithets?: string[];
  meanings?: Record<string, string>;
}

export const elfDataset: SyllableDataset = {
  prefixes: {
    male: [
      'Ael', 'Aer', 'Bele', 'Cele', 'El', 'Fael', 'Gala', 'Ior', 'Laer', 'Loth',
      'Mith', 'Quel', 'Syl', 'Ther', 'Val', 'Zin', 'Kael', 'Ilid', 'Erion', 'Thelan'
    ],
    female: [
      'Ael', 'Alas', 'Aria', 'Cele', 'Elia', 'Fae', 'Gala', 'Ily', 'Lia', 'Lyra',
      'Miri', 'Quel', 'Sil', 'Thali', 'Vala', 'Yen', 'Naev', 'Sari', 'Elen', 'Alari'
    ],
    neutral: [
      'Ael', 'Cael', 'Elow', 'Fael', 'Ilith', 'Lumi', 'Nym', 'Quel', 'Rhi', 'Syl',
      'Thel', 'Val', 'Zeph', 'Kael', 'Astra', 'Sola', 'Mor', 'Vael', 'Eol', 'Lian'
    ],
  },
  middles: [
    'an', 'ar', 'dor', 'en', 'eth', 'ian', 'ith', 'ion', 'or', 'thil', 'wen',
    'las', 'mir', 'ril', 'vyn', 'riel', 'dar', 'lith', 'sil', 'val'
  ],
  suffixes: {
    male: [
      'dor', 'ian', 'ion', 'or', 'thorn', 'dil', 'fin', 'las', 'mir', 'rond',
      'vyn', 'mon', 'dhel', 'ros', 'gorn', 'thas', 'rian', 'dan', 'lorn', 'reth'
    ],
    female: [
      'a', 'anna', 'ea', 'iel', 'ina', 'la', 'ra', 'ria', 'riel', 'wen',
      'thil', 'wynn', 'lune', 'fey', 'sha', 'nara', 'lith', 'mira', 'stris', 'driel'
    ],
    neutral: [
      'an', 'ar', 'en', 'in', 'is', 'on', 'or', 'th', 'yn', 'el',
      'ris', 'del', 'val', 'lis', 'vor', 'ril', 'wyn', 'sol', 'ren', 'las'
    ],
  },
  surnames: {
    prefixes: [
      'Silver', 'Moon', 'Star', 'Sun', 'Dawn', 'Night', 'Faerun', 'Ever',
      'Wind', 'Spell', 'Shadow', 'Whisper', 'Glow', 'Autumn', 'Winter',
      'Spring', 'Crystal', 'Oak', 'River', 'Starlight'
    ],
    suffixes: [
      'whisper', 'shadow', 'breeze', 'strider', 'singer', 'fall', 'dell', 'glade',
      'runner', 'weaver', 'leaf', 'blossom', 'glen', 'brook', 'watcher',
      'seeker', 'thorn', 'crest', 'bow', 'feather'
    ],
  },
  epithets: [
    'of the Silver Canopy',
    'Voice of the Whispering Woods',
    'Keeper of the Moonwell',
    'Star-Gazer of Lothlor',
    'Warden of the Eternal Glade',
    'Child of the Dawnwind',
    'Scholar of High Arcanum',
    'Blade of the Eclipse'
  ]
};
