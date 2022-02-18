import PropTypes from "prop-types";
import React from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import Modal from "../Modal";

function DeletePresetModal({ isOpen, setIsOpen, presetName }) {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => setIsOpen(false)}
    >
      <InputCard>
        <Header
          icon={iconTypes.delete}
          heading="Are you Sure?"
          description={`Do you really want to remove ${presetName} from your presets?`}
        />

        <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
          <Button handleClick={() => setIsOpen(false)} type={buttonTypes.outline}>Cancel</Button>
          <Button type={buttonTypes.delete}>Delete</Button>
        </div>
      </InputCard>
    </Modal>
  );
}

DeletePresetModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  presetName: PropTypes.string
};

export default DeletePresetModal;