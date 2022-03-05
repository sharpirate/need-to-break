import { useEffect, useState } from 'react'
import { useContext, createContext } from 'react'
import { useDB } from '../firebase/Firebase'
import { useAuth } from '../firebase/Firebase'

const PresetsContext = createContext()
const FetchPresetsContext = createContext()

export const PresetsProvider = ({ children }) => {
  const { getPresets } = useDB();
  const [presets, setPresets] = useState();
  const { user } = useAuth();

  async function fetchPresets() {
    const { presets: results } = await getPresets();

    if (results) {
      const processedPresets = results.map(preset => {
  
        if (!preset.startTime) {
          preset.startTime = Date.now();
        }
        
        return preset;
      });
  
      setPresets(processedPresets);
    }
  }

  useEffect(() => {
    if (user) {
      fetchPresets();
    }
  }, [user]);

  return (
    <FetchPresetsContext.Provider value={fetchPresets}>
      <PresetsContext.Provider value={presets}>
        {children}
      </PresetsContext.Provider>
    </FetchPresetsContext.Provider>
  )
}

export const usePresets = () => useContext(PresetsContext)
export const useFetchPresets = () => useContext(FetchPresetsContext)