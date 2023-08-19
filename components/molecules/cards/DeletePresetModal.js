import PropTypes from "prop-types";
import React from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import Modal from "../Modal";
import { useDB } from "../../../firebase/Firebase";
import { useState } from "react";
import { ACTION_DELAYS } from "../../../utils/constants";
import { useFetchPresets } from "../../../context/Presets";

function DeletePresetModal({ isOpen, setIsOpen, name, id }) {
  const [success, setSuccess] = useState(false);
  const { deletePreset } = useDB();
  const fetchPresets = useFetchPresets();

  async function handleDelete() {
    const error = await deletePreset(id);

    if (!error) {
      setSuccess(true);

      setTimeout(() => {
        handleClose(true);
      }, ACTION_DELAYS.short);
    }
  }

  function handleClose(refetch) {
    setIsOpen(false);
    setSuccess(false);

    if (refetch) {
      fetchPresets();
    }
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <InputCard>
        <Header
          icon={iconTypes.delete}
          heading="Are you Sure?"
          description={`Do you really want to remove "${name}" from your presets?`}
        />

        <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
          <Button handleClick={handleClose} type={buttonTypes.outline}>
            Cancel
          </Button>
          <Button
            handleClick={handleDelete}
            type={success ? buttonTypes.success : buttonTypes.delete}
          >
            Delete
          </Button>
        </div>
      </InputCard>
    </Modal>
  );
}

DeletePresetModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  presetName: PropTypes.string,
};

export default DeletePresetModal;
