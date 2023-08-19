import PropTypes from "prop-types";
import React from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import Modal from "../Modal";

function TimelineHasEndedModal({ isOpen, setIsOpen }) {
  return (
    <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
      <InputCard>
        <Header
          icon={iconTypes.warning}
          heading="Timeline Has Ended"
          description="Unable to start this timeline because it has already ended"
        />

        <div className="mt-16 420:mt-24">
          <Button
            handleClick={() => setIsOpen(false)}
            type={buttonTypes.primary}
          >
            Ok
          </Button>
        </div>
      </InputCard>
    </Modal>
  );
}

TimelineHasEndedModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default TimelineHasEndedModal;
