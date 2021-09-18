import InputCard from "./InputCard";
import Header from "./Header";
import NumberInput from "../../atoms/NumberInput";
import { iconTypes } from "../../atoms/Icon";

function IntervalSize() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.sandclock}
        heading="Interval Size"
        description="Set the duration of work and break intervals"
      />

      <div className="flex flex-col justify-start items-center gap-16 420:gap-24">
        <NumberInput
          name="work"
          initial={30}
          step={5}
          min={5}
          max={90}
          unit="min"
          widthStyle="w-64 420:w-78"
          bigLabel="Work"
          centerBig
        />

        <NumberInput
          name="break"
          initial={10}
          step={5}
          min={5}
          max={90}
          unit="min"
          widthStyle="w-64 420:w-78"
          bigLabel="Break"
          centerBig
        />
      </div>    
    </InputCard>
  );
}

export default IntervalSize;