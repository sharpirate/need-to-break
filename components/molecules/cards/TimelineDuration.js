import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Label, { labelTypes } from "../../atoms/Label";
import SelectInput from "../../atoms/SelectInput";

const hours = [
  { name: '12 am', value: 0 },
  { name: '1 am', value: 1 },
  { name: '2 am', value: 2 },
  { name: '3 am', value: 3 },
  { name: '4 am', value: 4 },
  { name: '5 am', value: 5 },
  { name: '6 am', value: 6 },
  { name: '7 am', value: 7 },
  { name: '8 am', value: 8 },
  { name: '9 am', value: 9 },
  { name: '10 am', value: 10 },
  { name: '11 am', value: 11 },
  { name: '12 pm', value: 12 },
  { name: '1 pm', value: 1 },
  { name: '2 pm', value: 2 },
  { name: '3 pm', value: 3 },
  { name: '4 pm', value: 4 },
  { name: '5 pm', value: 5 },
  { name: '6 pm', value: 6 },
  { name: '7 pm', value: 7 },
  { name: '8 pm', value: 8 },
  { name: '9 pm', value: 9 },
  { name: '10 pm', value: 10 },
  { name: '11 pm', value: 11 },
];

const minutes = [
  { name: '01', value: 1 },
  { name: '02', value: 2 },
  { name: '03', value: 3 },
  { name: '04', value: 4 },
  { name: '05', value: 5 },
  { name: '06', value: 6 },
  { name: '07', value: 7 },
  { name: '08', value: 8 },
  { name: '09', value: 9 },
  { name: '10', value: 10 },
];

function TimelineDuration() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.timer}
        heading="Timeline Duration"
        description="Enter the start and end hours of your timeline"
      />

      <div className="flex flex-col gap-16 420:gap-24">      
        {/* From */}
        <div>
          <Label size={labelTypes.big} as={labelTypes.h3} center>From</Label>
          <div className="flex gap-32">
            <SelectInput
              name="hour"
              options={hours}
              smallLabel="Hour"
              widthStyle="w-80 420:w-96"
            />

            <SelectInput
              name="minute"
              options={minutes}
              smallLabel="Minute"
              widthStyle="w-80 420:w-96"
            />
          </div>
        </div>

        {/* To */}
        <div>
          <Label size={labelTypes.big} as={labelTypes.h3} center>То</Label>
          <div className="flex gap-32">
            <SelectInput
              name="hour"
              options={hours}
              smallLabel="Hour"
              widthStyle="w-80 420:w-96"
            />

            <SelectInput
              name="minute"
              options={minutes}
              smallLabel="Minute"
              widthStyle="w-80 420:w-96"
            />
          </div>
        </div>
      </div>
    </InputCard>
  );
}

export default TimelineDuration;