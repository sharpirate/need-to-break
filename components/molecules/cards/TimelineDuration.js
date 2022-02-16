import { useState, useEffect } from "react";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import InputCard from "./InputCard";
import NumberInput from "../../atoms/NumberInput";
import { useDispatchBlueprint, blueprintActions } from "../../../context/Blueprint";

function TimelineDuration() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const blueprintDispatch = useDispatchBlueprint();

  useEffect(() => {
    const duration = (hours * 3600) + (minutes * 60);

    blueprintDispatch({ type: blueprintActions.SET_START, value: Date.now() });
    blueprintDispatch({ type: blueprintActions.SET_DURATION, value: duration });
  }, [hours, minutes]);

  return (
    <InputCard>
      <Header
        icon={iconTypes.timer}
        heading="Timeline Duration"
        description="Set the full duration of your timeline"
      />

      <div className="flex flex-col justify-start items-center gap-16 420:gap-24">
        <NumberInput
          name="hours"
          value={hours}
          handleChange={value => setHours(value)}
          step={1}
          min={0}
          max={12}
          unit="hrs"
          widthStyle="w-64 420:w-78"
          bigLabel="Hours"
          centerBig
        />

        <NumberInput
          name="minutes"
          value={minutes}
          handleChange={value => setMinutes(value)}
          step={15}
          min={0}
          max={45}
          unit="min"
          widthStyle="w-64 420:w-78"
          bigLabel="Minutes"
          centerBig
        />
      </div>    
    </InputCard>
  );
}

export default TimelineDuration;