export const BLOCK_SIZE = {
  min: 5,
  sec: 300,
  ms: 300000
}

export const SCALES = [
  { name: '5 min', value: 5 },
  { name: '15 min', value: 15 },
  { name: '30 min', value: 30 },
];

// 60 min, 30 min, 15 min, 5 min / 5 = DIVIDERS;
export const DIVIDERS = [12, 6, 3, 1];

// used for reading / writing the timeline in localStorage
export const BLUEPRINT_KEY = 'blueprint';

export const STARTING_KEY = 'starting';

export const SETTINGS_KEY = 'settings';