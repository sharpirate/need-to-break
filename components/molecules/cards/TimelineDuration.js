import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TimeInput from "./TimeInput";

function TimelineDuration() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.timer}
        heading="Timeline Duration"
        description="Enter the start and end hours of your timeline"
      />

      <TimeInput />
    </InputCard>
  );
}

export default TimelineDuration;