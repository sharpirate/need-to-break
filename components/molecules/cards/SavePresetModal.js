import PropTypes from "prop-types";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TextInput, { textInputTypes } from "../../atoms/TextInput";
import Button, { buttonTypes } from "../../atoms/Button";
import Label, { labelTypes } from "../../atoms/Label";
import Modal from "../Modal";
import {  useDB } from "../../../firebase/Firebase";
import { useState } from "react";
import { getDetails } from "../../../utils/timelineUtil";
import { ACTION_DELAYS } from "../../../utils/constants";
import { useFetchPresets } from "../../../context/Presets";

function SavePresetModal({ isOpen, setIsOpen, blueprint }) {
  const { savePreset } = useDB();
  const fetchPresets = useFetchPresets();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleClose() {
    setName("");
    setNameError("");
    setSuccess(false);
    setIsOpen(false);
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!name) {
      return setNameError("Name is required");
    }
    
    if (blueprint) {
      const preset = {
        ...blueprint,
        name
      };

      if (typeof preset.startTime === "number") {
        // remove timestamp for flexible timeline
        delete preset.startTime;
      }

      const error = await savePreset(preset);
  
      if (!error) {
        await fetchPresets();
        
        // success
        setSuccess(true);

        setTimeout(() => {
          handleClose();
        }, ACTION_DELAYS.short);
      }
    }
  }

  const details = getDetails(blueprint);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <InputCard>
        <Header
          icon={iconTypes.save}
          heading="Save Preset"
          description="Save the current timeline so that you can reuse it later"
        />

        <form className="w-full flex flex-col justify-start items-center gap-16 420:gap-24" onSubmit={handleSave} autoComplete="off">
          
          {/* Preset Name */}
          <TextInput
            name="preset"
            type={textInputTypes.text}
            bigLabel="Name"
            centerBig
            widthStyle="w-full"
            value={name}
            handleChange={value => {
              setNameError("");
              setName(value)
            }}
            errorLabel={nameError}
            hasSuccess={success}
          >
            Preset Name
          </TextInput>

          {/* Details */}
          <div>
            <Label size={labelTypes.big} as={labelTypes.h3} center>Details</Label>
            <dl className="body-med flex flex-col gap-16 420:gap-24 text-gray-500">
              <div className="flex">
                <dt className="term">Type</dt>
                <dd>{details.type}</dd>
              </div>
              
              <div className="flex">
                <dt className="term">Timeline</dt>
                <dd>{details.duration}</dd>
              </div>
              
              <div className="flex">
                <dt className="term">Intervals</dt>
                <dd>W: {details.workDuration} min, B: {details.breakDuration} min</dd>
              </div>
              
              {/* <div className="flex">
                <dt className="term">Blocked</dt>
                <div>
                  <dd>12:00 to 12:30</dd>
                  <dd>17:00 to 17:30</dd>
                </div>
              </div> */}
            </dl>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
            <Button isSubmit type={success ? buttonTypes.success : buttonTypes.primary}>Save</Button>
            <Button handleClick={handleClose} type={buttonTypes.outline}>Cancel</Button>
          </div>
        </form>
      </InputCard>
    </Modal>
  );
}

SavePresetModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
};

export default SavePresetModal;