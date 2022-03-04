import { iconTypes } from "../../atoms/Icon";
import InputCard from "./InputCard";
import Header from "./Header";

function NoPresets() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.save}
        heading="No Presets Found"
        description="Use the navigation to help you create and save timelines"
      />
    </InputCard>
  )
}

export default NoPresets;