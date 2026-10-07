import type { SyllableDataset } from './elves.ts';

export const dwarfDataset: SyllableDataset = {
  prefixes: {
    male: [
      'Bal', 'Bor', 'Dag', 'Dur', 'Dwal', 'Fim', 'Gim', 'Gloin', 'Grim', 'Kaz',
      'Krag', 'Mor', 'Nord', 'Ror', 'Thor', 'Thrain', 'Thror', 'Ul', 'Varn', 'Zul'
    ],
    female: [
      'Bara', 'Beld', 'Dag', 'Dis', 'Dagna', 'Gimra', 'Hel', 'Helga', 'Kari', 'Morna',
      'Nura', 'Rora', 'Siga', 'Thora', 'Thyra', 'Vala', 'Vond', 'Yrsa', 'Zura', 'Berna'
    ],
    neutral: [
      'Bar', 'Brand', 'Dor', 'Fal', 'Grom', 'Harn', 'Keld', 'Lod', 'Mor', 'Rik',
      'Skor', 'Tor', 'Var', 'Bram', 'Drak', 'Karn', 'Thrum', 'Gald', 'Brak', 'Vond'
    ],
  },
  middles: [
    'in', 'or', 'ur', 'ar', 'grim', 'li', 'ri', 'gar', 'den', 'din',
    'rak', 'dak', 'run', 'mund', 'thor', 'dur', 'mar', 'nar', 'gund', 'keld'
  ],
  suffixes: {
    male: [
      'in', 'ur', 'or', 'grim', 'mund', 'rak', 'rek', 'li', 'gar', 'nar',
      'din', 'rik', 'mar', 'thor', 'gund', 'dan', 'keld', 'ram', 'var', 'son'
    ],
    female: [
      'a', 'dis', 'ga', 'hild', 'ina', 'mira', 'na', 'ra', 'run', 'sund',
      'dottir', 'vilda', 'wynn', 'nora', 'lin', 'gret', 'tilda', 'la', 'munda', 'va'
    ],
    neutral: [
      'ak', 'ar', 'en', 'ik', 'in', 'ok', 'or', 'un', 'ur', 'ek',
      'an', 'rim', 'dal', 'kar', 'rund', 'dun', 'gard', 'var', 'lok', 'bek'
    ],
  },
  surnames: {
    prefixes: [
      'Iron', 'Stone', 'Forge', 'Gold', 'Deep', 'Oaken', 'Bronze', 'Anvil',
      'Copper', 'Granite', 'Steel', 'Frost', 'Hammer', 'Rune', 'Shield',
      'Rock', 'Thunder', 'Mountain', 'Coal', 'Heavy'
    ],
    suffixes: [
      'foot', 'breaker', 'hammer', 'vein', 'delver', 'shield', 'beard', 'strike',
      'peak', 'fist', 'hewer', 'grip', 'foundry', 'heart', 'brow',
      'forge', 'axe', 'crag', 'cleaver', 'brand'
    ],
  },
  epithets: [
    'of the Deep Delve',
    'Thane of the High Hall',
    'Forgemaster of Karak-Mor',
    'Bearer of the Ancestral Rune',
    'the Unyielding',
    'Defender of the Iron Gate',
    'Warden of the Deep Vaults',
    'the Stout-Hearted'
  ]
};
