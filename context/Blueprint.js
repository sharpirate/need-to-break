import { useReducer, useContext, createContext } from "react";

const BlueprintStateContext = createContext();
const BlueprintDispatchContext = createContext();

const actionTypes = {
  SET_DURATION: "SET_DURATION",
  SET_WORK: "SET_WORK",
  SET_BREAK: "SET_BREAK",
  SET_START: "SET_START",
};

export { actionTypes as blueprintActions };

function reducer(blueprint, action) {
  switch (action.type) {
    case actionTypes.SET_DURATION:
      return {
        ...blueprint,
        duration: action.value,
      };
    case actionTypes.SET_START:
      return {
        ...blueprint,
        startTime: action.value,
      };
    case actionTypes.SET_WORK:
      return {
        ...blueprint,
        workDuration: action.value,
      };
    case actionTypes.SET_BREAK:
      return {
        ...blueprint,
        breakDuration: action.value,
      };
    default:
      return blueprint;
  }
}

export const BlueprintProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <BlueprintDispatchContext.Provider value={dispatch}>
      <BlueprintStateContext.Provider value={state}>
        {children}
      </BlueprintStateContext.Provider>
    </BlueprintDispatchContext.Provider>
  );
};

export const useBlueprint = () => useContext(BlueprintStateContext);
export const useDispatchBlueprint = () => useContext(BlueprintDispatchContext);

export const hours24 = [
  { name: "00", value: 0 },
  { name: "01", value: 1 },
  { name: "02", value: 2 },
  { name: "03", value: 3 },
  { name: "04", value: 4 },
  { name: "05", value: 5 },
  { name: "06", value: 6 },
  { name: "07", value: 7 },
  { name: "08", value: 8 },
  { name: "09", value: 9 },
  { name: "10", value: 10 },
  { name: "11", value: 11 },
  { name: "12", value: 12 },
  { name: "13", value: 13 },
  { name: "14", value: 14 },
  { name: "15", value: 15 },
  { name: "16", value: 16 },
  { name: "17", value: 17 },
  { name: "18", value: 18 },
  { name: "19", value: 19 },
  { name: "20", value: 20 },
  { name: "21", value: 21 },
  { name: "22", value: 22 },
  { name: "23", value: 23 },
];

export const hours12 = [
  { name: "12 AM", value: 0 },
  { name: "1 AM", value: 1 },
  { name: "2 AM", value: 2 },
  { name: "3 AM", value: 3 },
  { name: "4 AM", value: 4 },
  { name: "5 AM", value: 5 },
  { name: "6 AM", value: 6 },
  { name: "7 AM", value: 7 },
  { name: "8 AM", value: 8 },
  { name: "9 AM", value: 9 },
  { name: "10 AM", value: 10 },
  { name: "11 AM", value: 11 },
  { name: "12 PM", value: 12 },
  { name: "1 PM", value: 13 },
  { name: "2 PM", value: 14 },
  { name: "3 PM", value: 15 },
  { name: "4 PM", value: 16 },
  { name: "5 PM", value: 17 },
  { name: "6 PM", value: 18 },
  { name: "7 PM", value: 19 },
  { name: "8 PM", value: 20 },
  { name: "9 PM", value: 21 },
  { name: "10 PM", value: 22 },
  { name: "11 PM", value: 23 },
];

export const minutes = [
  { name: "00", value: 0 },
  { name: "15", value: 15 },
  { name: "30", value: 30 },
  { name: "45", value: 45 },
];
