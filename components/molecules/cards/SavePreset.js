import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TextInput, { textInputTypes } from "../../atoms/TextInput";
import Button, { buttonTypes } from "../../atoms/Button";
import Label, { labelTypes } from "../../atoms/Label";

function SavePreset() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.save}
        heading="Save Preset"
        description="Save the current timeline so that you can reuse it later"
      />

      <div className="w-full flex flex-col justify-start items-center gap-16 420:gap-24">
        {/* Preset Name */}
        <TextInput
          // name, type, bigLabel, smallLabel, successLabel, errorLabel, children, value, disabled
          name="preset"
          type={textInputTypes.text}
          bigLabel="Name"
          centerBig
          widthStyle="w-full"
        >
          Preset Name
        </TextInput>

        {/* Details */}
        <div>
          <Label size={labelTypes.big} as={labelTypes.h3} center>Details</Label>
          <dl className="body-med flex flex-col gap-16 420:gap-24 text-gray-500">
            <div className="flex">
              <dt className="term">Type</dt>
              <dd>Full Time</dd>
            </div>
            
            <div className="flex">
              <dt className="term">Timeline</dt>
              <dd>12:00 to 20:00</dd>
            </div>
            
            <div className="flex">
              <dt className="term">Intervals</dt>
              <dd>45 min W / 15 min B</dd>
            </div>
            
            <div className="flex">
              <dt className="term">Blocked</dt>
              <div>
                <dd>12:00 to 12:30</dd>
                <dd>17:00 to 17:30</dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
          <Button type={buttonTypes.primary}>Save</Button>
          <Button type={buttonTypes.outline}>Discard</Button>
        </div>
      </div>
    </InputCard>
  );
}

export default SavePreset;