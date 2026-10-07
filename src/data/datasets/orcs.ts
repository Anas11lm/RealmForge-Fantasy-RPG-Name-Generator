import type { SyllableDataset } from './elves.ts';

export const orcDataset: SyllableDataset = {
  prefixes: {
    male: [
      'Azg', 'Brak', 'Dra', 'Gar', 'Gorg', 'Grom', 'Krug', 'Mork', 'Naz', 'Rulg',
      'Skab', 'Throk', 'Urg', 'Vorg', 'Zug', 'Gash', 'Kraz', 'Brot', 'Grok', 'Zul'
    ],
    female: [
      'Azka', 'Brakka', 'Durg', 'Gorga', 'Grend', 'Morka', 'Nakra', 'Rogha', 'Shel', 'Ugna',
      'Vash', 'Yash', 'Zura', 'Bagra', 'Ghasha', 'Krag', 'Murk', 'Ogha', 'Shara', 'Vol'
    ],
    neutral: [
      'Ash', 'Brak', 'Drok', 'Ghor', 'Gol', 'Karg', 'Korr', 'Lug', 'Mog', 'Nok',
      'Rakh', 'Skal', 'Thrum', 'Uzg', 'Vash', 'Wurg', 'Zorg', 'Krag', 'Brug', 'Grak'
    ],
  },
  middles: [
    'ar', 'at', 'dur', 'gar', 'gash', 'gor', 'krag', 'mash', 'nak', 'rok',
    'thar', 'ur', 'zag', 'gok', 'mog', 'shak', 'brak', 'vorg', 'drak', 'bash'
  ],
  suffixes: {
    male: [
      'ash', 'ath', 'dush', 'gar', 'gash', 'gor', 'krug', 'mash', 'mog', 'nak',
      'rak', 'rok', 'thar', 'throk', 'ur', 'zag', 'zug', 'bash', 'gul', 'mar'
    ],
    female: [
      'a', 'ka', 'ga', 'la', 'ra', 'sha', 'ya', 'na', 'va', 'da',
      'shi', 'gha', 'zha', 'vash', 'nak', 'kra', 'morg', 'tah', 'ba', 'ri'
    ],
    neutral: [
      'ak', 'ar', 'ash', 'at', 'ek', 'ik', 'ok', 'or', 'uk', 'ur',
      'khor', 'vash', 'drok', 'grum', 'morg', 'zag', 'thok', 'rak', 'naz', 'zul'
    ],
  },
  surnames: {
    prefixes: [
      'Skull', 'Blood', 'Iron', 'Bone', 'Doom', 'Spine', 'Gore', 'War',
      'Ash', 'Death', 'Flesh', 'Black', 'Grim', 'Fang', 'Rage',
      'Blade', 'Spike', 'Shadow', 'Rot', 'Steel'
    ],
    suffixes: [
      'crusher', 'fang', 'jaw', 'carver', 'hammer', 'shatter', 'howl', 'hound',
      'cleaver', 'render', 'striker', 'gorer', 'snarl', 'splitter', 'bane',
      'reaver', 'slayer', 'tusk', 'snout', 'claw'
    ],
  },
  epithets: [
    'the Bloodthirsty',
    'Warchief of the Ash Ridge',
    'the Horde-Breaker',
    'Scourge of the Borderlands',
    'the Relentless',
    'Bone-Collector of the Red Waste',
    'Tusk of Gruumsh',
    'the Undefeated'
  ]
};
