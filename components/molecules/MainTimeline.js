import ViewMoreLess from "../atoms/ViewMoreLess";
import Timer from "../atoms/Timer";
import { intervalTypes } from "../atoms/Interval";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import RadioButton from "../atoms/RadioButton";
import Button, { buttonTypes } from "../atoms/Button";

import dynamic from 'next/dynamic'

const TimelineNoSSR = dynamic(
  () => import("./TImeline"),
  { ssr: false }
);

function MainTimeline() {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:py-32">

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
          <TimelineNoSSR />
        </div>
      </ViewMoreLess>
    </div>
  );
}

export default MainTimeline;