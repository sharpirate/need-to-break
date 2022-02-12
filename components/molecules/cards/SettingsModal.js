import PropTypes from "prop-types";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import SelectInput from "../../atoms/SelectInput";
import Modal from "../Modal";
import { useReducer } from "react";

const timeFormats = [
  { name: '12 hour', value: 12 },
  { name: '24 hour', value: 24 },
];

const timerSounds = [
  { name: 'Default', value: 'default' },
  { name: 'Guitar', value: 'guitar' },
];

const actionTypes = {
  SET_TIME_FORMAT: "SET_TIME_FORMAT",
  SET_TIMER_SOUND: "SET_TIMER_SOUND"
};

const initialState = {
  timeFormat: timeFormats[0].value,
  timerSound: timerSounds[0].value
}

function SettingsModal({ isOpen, setIsOpen }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <InputCard>
        <Header
          icon={iconTypes.settings}
          heading="Settings"
        />

        <form className="w-full flex flex-col justify-start items-center gap-16 420:gap-24">

          {/* Settings */}
          <SelectInput
            name="format"
            options={timeFormats}
            bigLabel="Time Format"
            centerBig
            widthStyle="w-96 420:w-[112px]"
            selected={state.timeFormat}
            handleSelect={value => dispatch({ type: actionTypes.SET_TIME_FORMAT, value })}
          />

          <SelectInput
            name="sound"
            options={timerSounds}
            bigLabel="Timer Sound"
            centerBig
            widthStyle="w-96 420:w-[112px]"
            selected={state.timerSound}
            handleSelect={value => dispatch({ type: actionTypes.SET_TIMER_SOUND, value })}
          />
          
          {/* Buttons */}
          <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
            <Button type={buttonTypes.primary}>Apply</Button>
            <Button handleClick={() => setIsOpen(false)} type={buttonTypes.outline}>Cancel</Button>
          </div>

        </form>
      </InputCard>
    </Modal>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_TIME_FORMAT:
      return {
        ...state,
        timeFormat: action.value
      }
    case actionTypes.SET_TIMER_SOUND:
      return {
        ...state,
        timerSound: action.value
      }
    default:
      return state
  }
}

SettingsModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
};

export default SettingsModal;