import type { SyllableDataset } from './elves.ts';

export const dragonDataset: SyllableDataset = {
  prefixes: {
    male: [
      'Ancal', 'Bala', 'Drak', 'Fyr', 'Ign', 'Kauth', 'Mor', 'Pyra', 'Rhad', 'Sarkh',
      'Thrax', 'Verm', 'Vael', 'Zul', 'Xy', 'Glaur', 'Smaug', 'Aethel', 'Cael', 'Nidh'
    ],
    female: [
      'Aethel', 'Cira', 'Draca', 'Elys', 'Fyra', 'Hesper', 'Ignis', 'Kaela', 'Lyra', 'Nym',
      'Pyria', 'Saph', 'Sarkha', 'Thyra', 'Vaelis', 'Vermia', 'Xyra', 'Yvera', 'Zaphira', 'Aurelia'
    ],
    neutral: [
      'Ash', 'Cinder', 'Drak', 'Ember', 'Frost', 'Glaur', 'Ign', 'Pyre', 'Rime', 'Scourge',
      'Searing', 'Shadow', 'Smalt', 'Storm', 'Talon', 'Thrax', 'Vael', 'Venom', 'Wyrm', 'Zephyr'
    ],
  },
  middles: [
    'a', 'an', 'ar', 'ath', 'dor', 'el', 'en', 'gor', 'ion', 'or',
    'rak', 'roth', 'sur', 'thos', 'ur', 'vash', 'xir', 'zhor', 'khor', 'morn'
  ],
  suffixes: {
    male: [
      'ar', 'ath', 'ax', 'drak', 'gor', 'ion', 'or', 'oth', 'rak', 'ros',
      'thas', 'thor', 'ur', 'us', 'x', 'zar', 'zhor', 'gorn', 'rion', 'nadir'
    ],
    female: [
      'a', 'ae', 'ara', 'ia', 'iel', 'ina', 'is', 'ora', 'ra', 'ria',
      'ris', 'tha', 'vra', 'xis', 'zira', 'dris', 'mira', 'thira', 'na', 'trix'
    ],
    neutral: [
      'an', 'ar', 'as', 'ax', 'en', 'is', 'on', 'or', 'os', 'ox',
      'th', 'ur', 'us', 'ux', 'x', 'yn', 'ys', 'z', 'drak', 'gale'
    ],
  },
  surnames: {
    prefixes: [
      'the Flame', 'the Dread', 'the Ash', 'the Sun', 'the Night', 'the World', 'the Gold',
      'the Frost', 'the Iron', 'the Cinder', 'the Storm', 'the Void', 'the Emerald', 'the Crimson'
    ],
    suffixes: [
      'weaver', 'bringer', 'eater', 'lord', 'scourge', 'render', 'fang',
      'wing', 'claw', 'scale', 'sovereign', 'terror', 'tyrant', 'gale'
    ],
  },
  epithets: [
    'the Desolation of the North',
    'Scourge of the Ashen Peak',
    'the Undying Inferno',
    'Terror of the Whispering Spires',
    'Sovereign of the Molten Vaults',
    'the World-Eater',
    'Bringer of the Long Twilight',
    'Guardian of the Prismatic Hoard'
  ]
};
