import { STORED_KEY, STARTING_KEY, SETTINGS_KEY } from "./constants";

const keys = {
  stored: STORED_KEY,
  starting: STARTING_KEY,
  settings: SETTINGS_KEY
}

function getUserKey(key, uid) {
  return `${key}_${uid}`;
}

export function setStoredLocalStorate(stored, uid) {
  localStorage.setItem(getUserKey(keys.stored, uid), JSON.stringify(stored));
}

export function getStoredLocalStorage(uid) {
  return JSON.parse(localStorage.getItem(getUserKey(keys.stored, uid)));
}

export function removeStoredLocalStorage(uid) {
  localStorage.removeItem(getUserKey(keys.stored, uid));
}

export function getStartingLocalStorage(uid) {
  return Number(localStorage.getItem(getUserKey(keys.starting, uid)));
}


export function setStartingLocalStorage(starting, uid) {
  localStorage.setItem(getUserKey(keys.starting, uid), starting);
}

export function removeStartingLocalStorage(uid) {
  localStorage.removeItem(getUserKey(keys.starting, uid));
}

export function setSettingsLocalStorage(settings, uid) {
  localStorage.setItem(getUserKey(keys.settings, uid), JSON.stringify(settings));
}

export function getSettingsLocalStorage(uid) {
  return JSON.parse(localStorage.getItem(getUserKey(keys.settings, uid)));
}