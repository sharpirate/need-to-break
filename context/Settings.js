import { useState, useEffect } from 'react'
import { useContext, createContext } from 'react'
import { getSettingsLocalStorage, setSettingsLocalStorage } from '../utils/localStorageUtil'
import isBrowser from '../utils/isBrowser'
import { useAuth } from '../firebase/Firebase'

const SettingsContext = createContext()
const SetSettingsContext = createContext()

function getInitialState() {
  const { user } = useAuth();

  const initialState = {
    use12Hour: false,
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
      setSettingsLocalStorage(settings, user.uid);
    }
  }, [settings, user])

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

export const restartTypes = [
  { name: "Instant", value: false },
  { name: "Smart", value: true }
];