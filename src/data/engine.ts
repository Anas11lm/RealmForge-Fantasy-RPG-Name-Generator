import { elfDataset, type SyllableDataset } from './datasets/elves.ts';
import { dwarfDataset } from './datasets/dwarves.ts';
import { orcDataset } from './datasets/orcs.ts';
import { tavernDataset, type CompoundDataset } from './datasets/taverns.ts';
import { dragonDataset } from './datasets/dragons.ts';

export type GenderOption = 'all' | 'male' | 'female' | 'neutral';

export interface GeneratorOptions {
  gender?: GenderOption;
  includeSurname?: boolean;
  count?: number;
}

export interface GeneratedResult {
  id: string;
  name: string;
  titleOrMeaning?: string;
  category: string;
  gender?: 'male' | 'female' | 'neutral';
}

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalize(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Syllable Combinatoric Algorithm
 * Generates rhythmic fantasy names composed of phonetic roots.
 */
export function generateSyllableName(
  dataset: SyllableDataset,
  options: GeneratorOptions = {}
): { name: string; titleOrMeaning: string; gender: 'male' | 'female' | 'neutral' } {
  const { gender = 'all', includeSurname = true } = options;

  let activeGender: 'male' | 'female' | 'neutral';
  if (gender === 'all') {
    const pick = Math.random();
    activeGender = pick < 0.45 ? 'male' : pick < 0.9 ? 'female' : 'neutral';
  } else {
    activeGender = gender;
  }

  const prefixPool = dataset.prefixes[activeGender].length > 0
    ? dataset.prefixes[activeGender]
    : dataset.prefixes.neutral;
  
  const suffixPool = dataset.suffixes[activeGender].length > 0
    ? dataset.suffixes[activeGender]
    : dataset.suffixes.neutral;

  const prefix = getRandomItem(prefixPool);
  const suffix = getRandomItem(suffixPool);

  // 65% chance to have a middle syllable for 3-syllable grandeur
  const useMiddle = Math.random() < 0.65;
  const middle = useMiddle ? getRandomItem(dataset.middles) : '';

  let firstName = `${prefix}${middle}${suffix}`.toLowerCase();
  // Clean double consonants at syllable boundaries if awkward
  firstName = firstName.replace(/([aeiou])\1{2,}/g, '$1$1');
  firstName = capitalize(firstName);

  let fullName = firstName;
  let titleOrMeaning = '';

  if (includeSurname && dataset.surnames) {
    const surPrefix = getRandomItem(dataset.surnames.prefixes);
    const surSuffix = getRandomItem(dataset.surnames.suffixes);
    const surname = `${surPrefix}${surSuffix}`;
    fullName = `${firstName} ${surname}`;
  }

  if (dataset.epithets && dataset.epithets.length > 0) {
    titleOrMeaning = getRandomItem(dataset.epithets);
  } else {
    titleOrMeaning = `${capitalize(activeGender)} Ancestry`;
  }

  return {
    name: fullName,
    titleOrMeaning,
    gender: activeGender,
  };
}

/**
 * Compound Word Combinatoric Algorithm
 * Generates evocative names for locations, taverns, inns, and strongholds.
 */
export function generateCompoundName(
  dataset: CompoundDataset,
  _options: GeneratorOptions = {}
): { name: string; titleOrMeaning: string } {
  const article = getRandomItem(dataset.articles);
  const adjective = getRandomItem(dataset.adjectives);
  const noun = getRandomItem(dataset.nouns);

  // 25% chance of compound "The [Adjective] [Noun] & [Noun]"
  const useDoubleNoun = Math.random() < 0.25 && dataset.secondNouns && dataset.secondNouns.length > 0;
  
  let name = '';
  if (useDoubleNoun) {
    const second = getRandomItem(dataset.secondNouns!);
    name = `${article} ${noun} ${second}`;
  } else {
    name = `${article} ${adjective} ${noun}`;
  }

  const atmosphere = getRandomItem(dataset.atmospheres);
  const specialty = getRandomItem(dataset.specialties);

  return {
    name,
    titleOrMeaning: `${atmosphere} · Specialty: ${specialty}`,
  };
}

export type GeneratorType = 'elves' | 'dwarves' | 'orcs' | 'taverns' | 'dragons';

export const generatorDatasets: Record<GeneratorType, SyllableDataset | CompoundDataset> = {
  elves: elfDataset,
  dwarves: dwarfDataset,
  orcs: orcDataset,
  taverns: tavernDataset,
  dragons: dragonDataset,
};

/**
 * High-level generator dispatcher
 */
export function generateNames(
  type: GeneratorType | string,
  options: GeneratorOptions = {}
): GeneratedResult[] {
  const count = options.count ?? 10;
  const results: GeneratedResult[] = [];
  const seen = new Set<string>();

  let attempts = 0;
  const maxAttempts = count * 5;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    let item: { name: string; titleOrMeaning: string; gender?: 'male' | 'female' | 'neutral' };

    if (type === 'taverns') {
      item = generateCompoundName(tavernDataset, options);
    } else if (type === 'dwarves') {
      item = generateSyllableName(dwarfDataset, options);
    } else if (type === 'orcs') {
      item = generateSyllableName(orcDataset, options);
    } else if (type === 'dragons') {
      item = generateSyllableName(dragonDataset, options);
    } else {
      // Default to elves
      item = generateSyllableName(elfDataset, options);
    }

    if (!seen.has(item.name)) {
      seen.add(item.name);
      results.push({
        id: `${type}-${Date.now()}-${results.length}-${Math.random().toString(36).substring(2, 6)}`,
        name: item.name,
        titleOrMeaning: item.titleOrMeaning,
        category: type,
        gender: item.gender,
      });
    }
  }

  return results;
}
