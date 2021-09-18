import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import InputCard from "./InputCard";
import NumberInput from "../../atoms/NumberInput";

function NumberOfSprints() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.timer}
        heading="Number of Sprints"
        description="Enter the total number of sprints you want in your timeline"
      />

      <div className="flex flex-col justify-start items-center">
        <NumberInput
          name="sprints"
          initial={5}
          step={1}
          min={1}
          max={20}
          widthStyle="w-[37px] 420:w-[45px]"
          bigLabel="Sprints"
          centerBig
        />
      </div>
    </InputCard>
  );
}

export default NumberOfSprints;