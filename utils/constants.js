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

export const hours = [
  { name: '00', value: 0 },
  { name: '01', value: 1 },
  { name: '02', value: 2 },
  { name: '03', value: 3 },
  { name: '04', value: 4 },
  { name: '05', value: 5 },
  { name: '06', value: 6 },
  { name: '07', value: 7 },
  { name: '08', value: 8 },
  { name: '09', value: 9 },
  { name: '10', value: 10 },
  { name: '11', value: 11 },
  { name: '12', value: 12 },
  { name: '13', value: 13 },
  { name: '14', value: 14 },
  { name: '15', value: 15 },
  { name: '16', value: 16 },
  { name: '17', value: 17 },
  { name: '18', value: 18 },
  { name: '19', value: 19 },
  { name: '20', value: 20 },
  { name: '21', value: 21 },
  { name: '22', value: 22 },
  { name: '23', value: 23 },
];

export const minutes = [
  { name: '00', value: 0},
  { name: '15', value: 15},
  { name: '30', value: 30},
  { name: '45', value: 45},
]

// used for reading / writing the timeline in localStorage
export const BLUEPRINT_KEY = 'blueprint';

export const STARTING_KEY = 'starting';