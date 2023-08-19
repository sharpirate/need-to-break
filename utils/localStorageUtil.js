import { STORED_KEY, STARTING_KEY, SETTINGS_KEY } from "./constants";

const keys = {
  stored: STORED_KEY,
  starting: STARTING_KEY,
  settings: SETTINGS_KEY,
};

export function setStoredLocalStorage(stored) {
  localStorage.setItem(keys.stored, JSON.stringify(stored));
}

export function getStoredLocalStorage() {
  return JSON.parse(localStorage.getItem(keys.stored));
}

export function removeStoredLocalStorage() {
  localStorage.removeItem(keys.stored);
}

export function getStartingLocalStorage() {
  return Number(localStorage.getItem(keys.starting));
}

export function setStartingLocalStorage(starting) {
  localStorage.setItem(keys.starting, starting);
}

export function removeStartingLocalStorage() {
  localStorage.removeItem(keys.starting);
}

export function setSettingsLocalStorage(settings) {
  localStorage.setItem(keys.settings, JSON.stringify(settings));
}

export function getSettingsLocalStorage() {
  return JSON.parse(localStorage.getItem(keys.settings));
}
