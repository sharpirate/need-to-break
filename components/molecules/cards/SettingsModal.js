import { useState } from "react";
import PropTypes from "prop-types";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import SelectInput from "../../atoms/SelectInput";
import Modal from "../Modal";
import { useSettings, useSetSettings, timeFormats } from "../../../context/Settings";

function SettingsModal({ isOpen, setIsOpen }) {
  const settings = useSettings();
  const setSettings = useSetSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  function handleApply() {
    // push local settings to the context
    setSettings(localSettings);
    setIsOpen(false);
  }

  function handleCancel() {
    // revert local changes to context
    setLocalSettings(settings);
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleCancel}
    >
      <InputCard>
        <Header
          icon={iconTypes.settings}
          heading="Settings"
        />

        <form className="w-full flex flex-col justify-start items-center gap-16 420:gap-24" onSubmit={e => e.preventDefault()}>

          {/* Settings */}
          <SelectInput
            name="format"
            options={timeFormats}
            bigLabel="Time Format"
            centerBig
            widthStyle="w-96 420:w-[112px]"
            selected={localSettings.is12Hour}
            handleSelect={value => setLocalSettings({ is12Hour: value })}
          />
{/* 
          <SelectInput
            name="sound"
            options={timerSounds}
            bigLabel="Timer Sound"
            centerBig
            widthStyle="w-96 420:w-[112px]"
            selected={state.timerSound}
            handleSelect={value => dispatch({ type: actionTypes.SET_TIMER_SOUND, value })}
          /> */}
          
          {/* Buttons */}
          <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
            <Button handleClick={handleApply} type={buttonTypes.primary}>Apply</Button>
            <Button handleClick={handleCancel} type={buttonTypes.outline}>Cancel</Button>
          </div>

        </form>
      </InputCard>
    </Modal>
  );
}

SettingsModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
};

export default SettingsModal;