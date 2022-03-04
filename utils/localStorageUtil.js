import { STORED_KEY, STARTING_KEY, SETTINGS_KEY } from "./constants";

export function setStoredLocalStorate(stored) {
  localStorage.setItem(STORED_KEY, JSON.stringify(stored));
}

export function getStoredLocalStorage() {
  return JSON.parse(localStorage.getItem(STORED_KEY));
}

export function removeStoredLocalStorage() {
  localStorage.removeItem(STORED_KEY);
}

export function getStartingLocalStorage() {
  return Number(localStorage.getItem(STARTING_KEY));
}


export function setStartingLocalStorage(starting) {
  localStorage.setItem(STARTING_KEY, starting);
}

export function removeStartingLocalStorage() {
  localStorage.removeItem(STARTING_KEY);
}

export function setSettingsLocalStorage(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getSettingsLocalStorage() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY));
}