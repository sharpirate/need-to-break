import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Label, { labelTypes } from "../../atoms/Label";
import SelectInput from "../../atoms/SelectInput";
import { BLOCK_SIZE } from "../../../utils/constants";
import { useDispatchBlueprint, blueprintActions, hours24, hours12, minutes } from "../../../context/Blueprint";
import { parseTime } from "../../../utils/timeUtil";
import { useSettings } from "../../../context/Settings";

const actionTypes = {
  SET_START_HOUR: "SET_START_HOUR",
  SET_END_HOUR: "SET_END_HOUR",
  SET_START_MIN: "SET_START_MIN",
  SET_END_MIN: "SET_END_MIN",
}

const initialState = {
  startHour: hours24[0].value,
  startMin: minutes[0].value,
  endHour: hours24[0].value,
  endMin: minutes[0].value
}

function TimeInput({ paddingStyle, disableFocus }) {
  const [{ startHour, startMin, endHour, endMin }, dispatch] = useReducer(reducer, initialState);
  const blueprintDispatch = useDispatchBlueprint();

  const settings = useSettings();

  useEffect(() => {
    blueprintDispatch({ type: blueprintActions.SET_START, value: parseTime([startHour, startMin])});
  }, [startHour, startMin])

  useEffect(() => {
    const startDate = new Date();
    startDate.setHours(startHour);
    startDate.setMinutes(startMin);

    const endDate = new Date();
    endDate.setHours(endHour);
    endDate.setMinutes(endMin);

    const size = (endDate - startDate) / BLOCK_SIZE.ms;
    
    if (size > 0) {
      blueprintDispatch({ type: blueprintActions.SET_SIZE, value: size });
    }
  }, [startHour, startMin, endHour, endMin])

  let hours;
  let widthStyle;

  if (settings.is12Hour) {
    hours = hours12;
    widthStyle = "w-80 420:w-96";
  } else {
    hours = hours24;
    widthStyle = "w-64 420:w-72";
  }

  return (
    <div className={`flex flex-col gap-16 420:gap-24 ${paddingStyle}`}>

      {/* From */}
      <div>
        <Label size={labelTypes.big} as={labelTypes.h3} center>From</Label>
        <div className="flex items-center gap-8">
          <SelectInput
            name="hour"
            options={hours}
            widthStyle={widthStyle}
            disableFocus={disableFocus}
            selected={startHour}
            handleSelect={value => dispatch({ type: actionTypes.SET_START_HOUR, value })}
          />
          <span>:</span>
          <SelectInput
            name="minute"
            options={minutes}
            widthStyle={widthStyle}
            disableFocus={disableFocus}
            selected={startMin}
            handleSelect={value => dispatch({ type: actionTypes.SET_START_MIN, value })}
          />
        </div>
      </div>

      {/* To */}
      <div>
        <Label size={labelTypes.big} as={labelTypes.h3} center>To</Label>
        <div className="flex items-center gap-8">
          <SelectInput
            name="hour"
            options={hours}
            widthStyle={widthStyle}
            disableFocus={disableFocus}
            selected={endHour}
            handleSelect={value => dispatch({ type: actionTypes.SET_END_HOUR, value })}
          />
          <span>:</span>
          <SelectInput
            name="minute"
            options={minutes}
            widthStyle={widthStyle}
            disableFocus={disableFocus}
            selected={endMin}
            handleSelect={value => dispatch({ type: actionTypes.SET_END_MIN, value })}
          />
        </div>
      </div>

    </div>
  );
}

function reducer(state, action) {
  switch(action.type) {
    case actionTypes.SET_START_HOUR:
      return {
        ...state,
        startHour: action.value
      }
    case actionTypes.SET_END_HOUR:
      return {
        ...state,
        endHour: action.value
      }
    case actionTypes.SET_START_MIN:
      return {
        ...state,
        startMin: action.value
      }
    case actionTypes.SET_END_MIN:
      return {
        ...state,
        endMin: action.value
      }
    default:
      return state
  }
}

TimeInput.propTypes = {
  paddingStyle: PropTypes.string,
  disableFocus: PropTypes.bool
};

export default TimeInput;