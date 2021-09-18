import React, { useState } from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import Toggle from "../../atoms/Toggle";
import NumberInput from "../../atoms/NumberInput";
import { iconTypes } from "../../atoms/Icon";

function LongBreaks() {
  const [checked, setChecked] = useState(false);

  return (
    <InputCard>
      <Header
        icon={iconTypes.coffee}
        heading="Long Breaks"
        description="Add custom long breaks inbetween certain number of sprints (Optional)"
      />

      <div className="flex flex-col justify-start items-center gap-16 420:gap-24">
        <Toggle
          checked={checked}
          handleChange={() => setChecked(!checked)}
        />
        <div className={"flex flex-col justify-start items-center gap-16 420:gap-24" + (!checked ? " invisible" : "")}>
          <NumberInput
            name="duration"
            initial={30}
            step={5}
            min={5}
            max={90}
            unit="min"
            widthStyle="w-64 420:w-78"
            bigLabel="Duration"
            centerBig
          />

          <NumberInput
            name="frequency"
            initial={3}
            step={1}
            min={1}
            max={20}
            widthStyle="w-[37px] 420:w-[45px]"
            bigLabel="Frequency"
            centerBig
          />
        </div>
      </div>
    </InputCard>
  );
}

export default LongBreaks;