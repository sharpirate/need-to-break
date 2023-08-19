import React, { useState } from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import Toggle from "../../atoms/Toggle";
import NumberInput from "../../atoms/NumberInput";
import { iconTypes } from "../../atoms/Icon";

function LongBreaks() {
  const [checked, setChecked] = useState(false);

  return (
    <InputCard useExtraPadding>
      <Header
        icon={iconTypes.coffee}
        heading="Long Breaks"
        description="Add custom longer breaks (Coming Soon)"
      />

      <div className="flex flex-col justify-start items-center gap-16 420:gap-24">
        <Toggle
          disabled
          checked={checked}
          handleChange={() => setChecked(!checked)}
        />
      </div>
    </InputCard>
  );
}

export default LongBreaks;
