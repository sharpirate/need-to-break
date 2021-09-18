import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";
import SelectInput from "../../atoms/SelectInput";

const timeFormats = [
  { name: '12 hour', value: 12 },
  { name: '24 hour', value: 24 },
];

const timerSounds = [
  { name: 'Default', value: 'default' },
  { name: 'Guitar', value: 'guitar' },
];

function Settings() {
  return (
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
        />

        <SelectInput
          name="sound"
          options={timerSounds}
          bigLabel="Timer Sound"
          centerBig
          widthStyle="w-96 420:w-[112px]"
        />
        
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
          <Button type={buttonTypes.primary}>Apply</Button>
          <Button type={buttonTypes.outline}>Close</Button>
        </div>

      </form>
    </InputCard>
  );
}

export default Settings;