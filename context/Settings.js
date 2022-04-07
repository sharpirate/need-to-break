import { useState, useEffect } from 'react'
import { useContext, createContext } from 'react'
import { getSettingsLocalStorage, setSettingsLocalStorage } from '../utils/localStorageUtil'
import isBrowser from '../utils/isBrowser'
import { useAuth } from '../firebase/Firebase'

const SettingsContext = createContext()
const SaveSettingsContext = createContext()

function getInitialState(user) {
  const initialState = {
    use12Hour: true,
    useSmartRestart: false
  };

  // prioritize settings from localStorage
  if (isBrowser && user) {
    const localStorageSettings = getSettingsLocalStorage(user.uid);

    if (localStorageSettings) {
      return localStorageSettings;
    }
  }

  // initial state
  return initialState;
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(getInitialState());
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setSettings(getInitialState(user));
    }
  }, [user]);

  function saveSettings(settings) {
    setSettings(settings);

    if (user) {
      setSettingsLocalStorage(settings, user.uid);
    }
  }

  return (
    <SaveSettingsContext.Provider value={saveSettings}>
      <SettingsContext.Provider value={settings}>
        {children}
      </SettingsContext.Provider>
    </SaveSettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
export const useSaveSettings = () => useContext(SaveSettingsContext)

export const timeFormats = [
  { name: "AM / PM", value: true },
  { name: "24 hour", value: false }
];

export const restartTypes = [
  { name: "Instant", value: false },
  { name: "Smart", value: true }
];