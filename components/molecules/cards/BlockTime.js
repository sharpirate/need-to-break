import React, { useState } from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import Toggle from "../../atoms/Toggle";
import { iconTypes } from "../../atoms/Icon";
import Carousel from "./Carousel";
import TimeInput from "./TimeInput";

function BlockTime() {
  const [checked, setChecked] = useState(false);

  return (
    <InputCard useExtraPadding>
      <Header
        icon={iconTypes.blocked}
        heading="Block Time"
        description="Add custom blocked time (Coming Soon)"
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

export default BlockTime;
