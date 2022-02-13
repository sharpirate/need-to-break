import { useState, useEffect } from 'react'
import { useContext, createContext } from 'react'
import { getSettingsLocalStorage, setSettingsLocalStorage } from '../utils/localStorageUtil'
import isBrowser from '../utils/isBrowser'

const SettingsContext = createContext()
const SetSettingsContext = createContext()

function getInitialState() {
  const initialState = {
    is12Hour: false
  };

  // prioritize settings from localStorage
  if (isBrowser) {
    const localStorageSettings = getSettingsLocalStorage();

    if (localStorageSettings) {
      return localStorageSettings;
    }
  }

  // initial state
  return initialState;
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(getInitialState());

  useEffect(() => {
    setSettingsLocalStorage(settings);
  }, [settings])

  return (
    <SetSettingsContext.Provider value={setSettings}>
      <SettingsContext.Provider value={settings}>
        {children}
      </SettingsContext.Provider>
    </SetSettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
export const useSetSettings = () => useContext(SetSettingsContext)

export const timeFormats = [
  { name: "AM / PM", value: true },
  { name: "24 hour", value: false }
];