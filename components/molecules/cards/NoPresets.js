import { iconTypes } from "../../atoms/Icon";
import InputCard from "./InputCard";
import Header from "./Header";

function NoPresets() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.save}
        heading="No Saved Presets"
        description="Once you save a preset, it will appear here"
      />
    </InputCard>
  );
}

export default NoPresets;
