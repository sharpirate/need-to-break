import { useState } from "react";
import PropTypes from "prop-types";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import SelectInput from "../../atoms/SelectInput";
import Modal from "../Modal";
import { useSettings, useSetSettings, timeFormats, restartTypes } from "../../../context/Settings";
import { ACTION_DELAYS } from "../../../utils/constants";

function SettingsModal({ isOpen, setIsOpen }) {
  const settings = useSettings();
  const setSettings = useSetSettings();
  const [localSettings, setLocalSettings] = useState(settings);
  const [success, setSuccess] = useState(false);

  function handleApply() {
    // push local settings to the context
    setSettings(localSettings);

    setSuccess(true);

    setTimeout(() => {
      closeModal();
    }, ACTION_DELAYS.short)
  }

  function handleCancel() {
    // revert local changes to context
    setLocalSettings(settings);
    closeModal();
  }

  function closeModal() {
    setIsOpen(false);
    setSuccess(false);
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
            selected={localSettings.use12Hour}
            handleSelect={value => setLocalSettings({ ...localSettings, use12Hour: value })}
            hasSuccess={success}
          />

          <SelectInput
            name="restart"
            options={restartTypes}
            bigLabel="Restart Type"
            centerBig
            widthStyle="w-96 420:w-[112px]"
            selected={localSettings.useSmartRestart}
            handleSelect={value => setLocalSettings({ ...localSettings,  useSmartRestart: value })}
            hasSuccess={success}
          />
          
          {/* Buttons */}
          <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
            <Button handleClick={handleApply} type={success ? buttonTypes.success : buttonTypes.primary}>Apply</Button>
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