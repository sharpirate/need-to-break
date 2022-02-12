import { useReducer, useContext, createContext } from 'react'

const BlueprintStateContext = createContext()
const BlueprintDispatchContext = createContext()

const actionTypes = {
  SET_SIZE: 'SET_SIZE',
  SET_WORK: 'SET_WORK',
  SET_BREAK: 'SET_BREAK',
  SET_START: 'SET_START'
}

export { actionTypes as blueprintActions };

function reducer(blueprint, action) {
  switch(action.type) {
    case actionTypes.SET_SIZE:
      return {
        ...blueprint,
        size: action.value
      }
    case actionTypes.SET_START:
      return {
        ...blueprint,
        start: action.value
      }
    case actionTypes.SET_WORK:
      return {
        ...blueprint,
        w: action.value
      }
    case actionTypes.SET_BREAK:
      return {
        ...blueprint,
        b: action.value
      }
    default:
      return blueprint;
  }
}

export const BlueprintProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})
  return (
    <BlueprintDispatchContext.Provider value={dispatch}>
      <BlueprintStateContext.Provider value={state}>
        {children}
      </BlueprintStateContext.Provider>
    </BlueprintDispatchContext.Provider>
  )
}

export const useBlueprint = () => useContext(BlueprintStateContext)
export const useDispatchBlueprint = () => useContext(BlueprintDispatchContext)