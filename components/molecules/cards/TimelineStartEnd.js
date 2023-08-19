import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import TimeInput from "./TimeInput";

function TimelineStartEnd() {
  return (
    <InputCard useExtraPadding>
      <Header
        icon={iconTypes.timer}
        heading="Timeline Start / End"
        description="Specify when will your timeline start / end"
      />

      <TimeInput />
    </InputCard>
  );
}

export default TimelineStartEnd;
