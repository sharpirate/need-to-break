import PropTypes from "prop-types";
import React from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import Modal from "../Modal";
import { requestPermission } from "../../../utils/notificationUtil";

function EnableNotificationsModal({ isOpen, setIsOpen }) {
  function handleEnable() {
    requestPermission();
    setIsOpen(false);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
      <InputCard>
        <Header
          icon={iconTypes.warning}
          heading="Enable Notifications"
          description="Would you like to get notified when an interval ends?"
        />

        <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
          <Button handleClick={handleEnable} type={buttonTypes.primary}>
            Enable
          </Button>
          <Button handleClick={handleClose} type={buttonTypes.outline}>
            Cancel
          </Button>
        </div>
      </InputCard>
    </Modal>
  );
}

EnableNotificationsModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  presetName: PropTypes.string,
};

export default EnableNotificationsModal;
