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
    <InputCard>
      <Header
        icon={iconTypes.blocked}
        heading="Block Time"
        description="Add custom blocked time for meetings or breaks (Optional)"
      />

      <div className="flex flex-col justify-start items-center gap-16 420:gap-24">
        <Toggle
          checked={checked}
          handleChange={() => setChecked(!checked)}
        />
        <div className={"flex flex-col justify-start items-center gap-16 420:gap-24" + (!checked ? " invisible" : "")}>
          <Carousel
            initialPages={1}
            pageLimit={15}
            // infinite
            renderItem={(disableFocus) => <TimeInput disableFocus={disableFocus} paddingStyle="px-32 420:px-48" />}
          />
        </div>
      </div>
    </InputCard>
  );
}

export default BlockTime;