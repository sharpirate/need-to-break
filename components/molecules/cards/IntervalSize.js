import InputCard from "./InputCard";
import Header from "./Header";
import NumberInput from "../../atoms/NumberInput";
import { iconTypes } from "../../atoms/Icon";
import { useState, useEffect } from "react";
import { useDispatchBlueprint, blueprintActions } from "../../../context/Blueprint";

function IntervalSize() {
  const [w, setW] = useState(5);
  const [b, setB] = useState(5);
  const dispatch = useDispatchBlueprint();

  useEffect(() => {
    dispatch({ type: blueprintActions.SET_WORK, value: w * 60 });
  }, [w]);

  useEffect(() => {
    dispatch({ type: blueprintActions.SET_BREAK, value: b * 60 });
  }, [b]);

  return (
    <InputCard useExtraPadding>
      <Header
        icon={iconTypes.sandclock}
        heading="Interval Size"
        description="Set the duration of work and break intervals"
      />

      <div className="flex flex-col justify-start items-center gap-16 420:gap-24">
        <NumberInput
          name="work"
          value={w}
          handleChange={value => setW(value)}
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
          value={b}
          handleChange={value => setB(value)}
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