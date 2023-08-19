export const SCALES = [
  { name: "5 min", value: 300 },
  { name: "15 min", value: 900 },
];

export const TRANSITIONS = {
  spring500: {
    type: "spring",
    duration: 0.5,
    bounce: 0,
  },
  springBounce500: {
    type: "spring",
    duration: 0.5,
    bounce: 0.25,
  },
};

export const ACTION_DELAYS = {
  short: 500,
  long: 1000,
};

export const DIRECTIONS = {
  default: "default",
  left: "left",
  right: "right",
  none: "none",
  vertical: "vertical",
};

// export const PRE_LOGIN_PAGES = [
//   { name: 'Sign Up', url: '/signup' },
//   { name: 'Login', url: '/login' },
// ];

export const APP_PAGES = [
  { name: "Timeline", url: "/timeline" },
  { name: "Presets", url: "/presets" },
];

// used for reading / writing the timeline in localStorage
export const STORED_KEY = "stored";

export const STARTING_KEY = "starting";

export const SETTINGS_KEY = "settings";
