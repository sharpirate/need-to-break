import ViewMoreLess from "../atoms/ViewMoreLess";
import Timer from "../atoms/Timer";
import { intervalTypes } from "../atoms/Interval";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import RadioButton from "../atoms/RadioButton";
import Button, { buttonTypes } from "../atoms/Button";

const intervals = [
  { type: 'work' },
  { type: 'break' },
  { type: 'blocked' },
  { type: 'blocked' },
  { type: 'floating' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'work' },
  { type: 'break' },
  { type: 'blocked' },
  { type: 'blocked' },
  { type: 'floating' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'work' },
  { type: 'break' },
  { type: 'blocked' },
  { type: 'blocked' },
  { type: 'floating' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'work' },
  { type: 'break' },
  { type: 'blocked' },
  { type: 'blocked' },
  { type: 'floating' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
];

const otherIntervals = [
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'break' },
]

const hours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

function MainTimeline() {
  return (
    <main className="w-full max-w-[1536px] flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 732:px-32 732:py-32">

      {/* Calibrate Block */}
      <div className="flex flex-col justify-center items-center mb-32 420:mb-48">
        <ViewMoreLess viewMoreText="Restart Interval" viewLessText="Restart Interval">
          <div className="mt-16 420:mt-24">
            <Label size={labelTypes.large} as={labelTypes.h1} >Restart</Label>
            <p className="mb-16 font-base font-med text-gray-500 text-13 420:text-16 tracking-2">
              Align the timeline to the current moment
              <br />
              Select an interval type:
            </p>
            <div className="flex justify-center items-center gap-16 420:gap-24 mb-24 420:mb-32">
              <RadioButton name="calibrateType" id="work" label="Work" />
              <RadioButton name="calibrateType" id="break" label="Break" />
            </div>
            <Button type={buttonTypes.primary} >Restart</Button>
          </div>
        </ViewMoreLess>
      </div>

      {/* Timer Block */}
      <div className="mb-16 420:mb-24">
        <Label size={labelTypes.large} as={labelTypes.h1} >Work</Label>
        <p className="font-base font-med text-gray-500 text-13 420:text-16 tracking-2">12:00 - 12:30</p>
      </div>

      <div className="mb-32 420:mb-48">
        <Timer type={intervalTypes.work} />
      </div>

      <ViewMoreLess viewMoreText="View Timeline" viewLessText="Hide Timeline" isTimeline={true} >
        <div className="mt-32 420:mt-48 900:mt-0 w-full">
          <Timeline intervals={otherIntervals} hours={hours} showArrow={true} />
        </div>
      </ViewMoreLess>
    </main>
  );
}

export default MainTimeline;