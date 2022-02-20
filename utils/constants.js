export const SCALES = [
  { name: '5 min', value: 300 },
  { name: '15 min', value: 900 },
];

export const TRANSITIONS = {
  spring500: {
    type: "spring",
    duration: 0.5,
    bounce: 0
  },
  springBounce500: {
    type: "spring",
    duration: 0.5,
    bounce: 0.25
  }
}

// used for reading / writing the timeline in localStorage
export const STORED_KEY = 'stored';

export const STARTING_KEY = 'starting';

export const SETTINGS_KEY = 'settings';