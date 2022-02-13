import { BLUEPRINT_KEY, SETTINGS_KEY } from "./constants";

export function setBlueprintLocalStorage(blueprint) {
  localStorage.setItem(BLUEPRINT_KEY, JSON.stringify(blueprint));
}

export function getBlueprintLocalStorage() {
  return JSON.parse(localStorage.getItem(BLUEPRINT_KEY));
}

export function setSettingsLocalStorage(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getSettingsLocalStorage() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY));
}