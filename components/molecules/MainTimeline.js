import ViewMoreLess from "../atoms/ViewMoreLess";
import Timer from "../atoms/Timer";
import { intervalTypes } from "../atoms/Interval";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import RadioButton from "../atoms/RadioButton";
import Button, { buttonTypes } from "../atoms/Button";

const timeline = [
  // 12 to 13
  {
    type: 'work',
    blocks: 4,
    start: '12:00',
    id: 0
  },
  {
    type: 'break',
    blocks: 8,
    start: '12:20',
    id: 1
  },
  
  // 13 to 14
  {
    type: 'work',
    blocks: 6,
    start: '13:00',
    id: 2
  },
  {
    type: 'break',
    blocks: 6,
    start: '13:30',
    id: 3
  },
  
  // 14 to 15
  {
    type: 'work',
    blocks: 8,
    start: '14:00',
    id: 4
  },
  {
    type: 'break',
    blocks: 4,
    start: '14:40',
    id: 5
  },
  
  // 15 to 16
  {
    type: 'work',
    blocks: 10,
    start: '15:00',
    id: 6
  },
  {
    type: 'break',
    blocks: 2,
    start: '15:50',
    id: 7
  },
];

const hours = ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00'];

function MainTimeline() {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:px-32 932:py-32">

      {/* Restart Block */}
      <div className="flex flex-col justify-center items-center mb-32 420:mb-48">
        <ViewMoreLess viewMoreText="Restart Interval" viewLessText="Restart Interval">
          <div className="mt-16 420:mt-24">
            <Label size={labelTypes.large} as={labelTypes.h1} >Restart</Label>
            <p className="mb-16 body-med text-gray-500">
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
        <p className="body-med text-gray-500">12:00 - 12:30</p>
      </div>

      <div className="mb-32 420:mb-48">
        <Timer type={intervalTypes.work} />
      </div>

      <ViewMoreLess viewMoreText="View Timeline" viewLessText="Hide Timeline" isTimeline={true} >
        <div className="mt-32 420:mt-48 932:mt-0 w-full">
          <Timeline timeline={timeline} hours={hours} showArrow={true} />
        </div>
      </ViewMoreLess>
    </div>
  );
}

export default MainTimeline;