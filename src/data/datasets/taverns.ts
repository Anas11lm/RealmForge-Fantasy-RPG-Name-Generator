export interface CompoundDataset {
  articles: string[];
  adjectives: string[];
  nouns: string[];
  secondNouns?: string[];
  atmospheres: string[];
  specialties: string[];
}

export const tavernDataset: CompoundDataset = {
  articles: [
    'The', 'Ye Olde', 'At the Sign of the', 'The Wandering', 'The Merry', 'The Royal'
  ],
  adjectives: [
    'Drunken', 'Prancing', 'Salty', 'Rusty', 'Blind', 'Laughing', 'Golden', 'Sleepy',
    'Silver', 'Wandering', 'Fiery', 'Hidden', 'Jolly', 'Howling', 'Battered',
    'Whispering', 'Dancing', 'Black', 'Crimson', 'Crooked', 'Silent', 'Merry',
    'Wicked', 'Brave', 'Stumbling', 'Gilded', 'Broken', 'Roaring', 'Tarnished', 'Thirsty'
  ],
  nouns: [
    'Dragon', 'Pony', 'Sailor', 'Tankard', 'Boar', 'Goblet', 'Flagon', 'Griffin',
    'Stag', 'Badger', 'Crow', 'Serpent', 'Anchor', 'Shield', 'Lantern', 'Hound',
    'Raven', 'Compass', 'Whale', 'Unicorn', 'Kettle', 'Cauldron', 'Barrel',
    'Sword', 'Anvil', 'Cat', 'Goat', 'Helm', 'Mare', 'Gargoyle'
  ],
  secondNouns: [
    'and Flagon', 'and Anchor', 'and Crow', 'and Dragon', 'and Boar', 'and Hound',
    'and Thistle', 'and Moon', 'and Tankard', 'and Rose', 'and Cauldron'
  ],
  atmospheres: [
    'A rowdy haven with roaring hearthfire and spiced dwarven ale',
    'A quiet waterside dive frequented by smugglers and seafaring bards',
    'A warm roadside shelter offering hot mutton stew and clean straw',
    'A shadowy basement den known for underground dice games and rumor-mongers',
    'A grand imperial hostel with vaulted oak timber and vintage elven mead',
    'A cozy mountain tavern where hunters gather before the highland snows'
  ],
  specialties: [
    'Spiced Honey Mead & Roasted Boar',
    'Elderberry Cider & Smoked Trout',
    'Black Stout & Peppered Venison Hand-Pies',
    'Moonberry Wine & Glazed Hazelnut Loaf',
    'Firebrand Whiskey & Hearth-baked Sourdough'
  ]
};
