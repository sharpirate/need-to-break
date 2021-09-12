import PropTypes from "prop-types";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timer from "../atoms/Timer";
import { intervalTypes } from "../atoms/Interval";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import RadioButton from "../atoms/RadioButton";
import Button, { buttonTypes } from "../atoms/Button";
import Icon, { iconTypes } from "../atoms/Icon";

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
  { type: 'work' },
]

const hours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

function TimelinePreview({ hasFloating }) {
  const floatingStyle = hasFloating ? '900:grid-cols-2' : '';

  return (
    <section className="w-full max-w-[1536px] flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 900:px-32 900:py-32">

      <div className={`grid grid-cols-1 ${floatingStyle} max-w-[252px] 420:max-w-[310px] 900:max-w-none gap-32 mb-32 420:gap-48 1172:gap-64 420:mb-48`}>

        {/* Timeline Preview Block */}
        <div className="flex flex-col justify-start items-center gap-16 420:gap-24 900:max-w-[408px] 1172:flex-row 1172:items-start">
          <div>
            <Icon type={iconTypes.timeline} />
          </div>
          <div>
            <Label size={labelTypes.large} as={labelTypes.h2} >Timeline Preview</Label>
            <p className="font-base font-med text-gray-500 text-13 420:text-16 tracking-2">
              A visual representation of your timeline. You can either generate it now or save it as a preset for later.
            </p>
          </div>
        </div>

        {/* Floating Time Block (If Any)*/}
        {hasFloating ? (
          <div className="flex flex-col justify-start items-center gap-16 420:gap-24 900:max-w-[408px] 1172:flex-row 1172:items-start">
            <div>
              <Icon type={iconTypes.warning} />
            </div>
            <div>
              <Label size={labelTypes.large} as={labelTypes.h2} >Floating Time</Label>
              <p className="font-base font-med text-gray-500 text-13 420:text-16 tracking-2">
                We have filled the empty blocks around your blocked time with floating time. This is unmanaged time and it’s up to you to decide how you spend it.
              </p>
            </div>
          </div>
        ) : null}

      </div>

      {/* Timeline & Buttons (Able To Reverse Flex Order) */}
      <div className="w-full flex flex-col 900:flex-col-reverse justify-center items-center gap-32 420:gap-48">
        <div className="grid gap-24 420:gap-32 540:grid-cols-2 540:gap-24">
          <Button type={buttonTypes.primary}>Generate</Button>
          <Button type={buttonTypes.outline}>Save Preset</Button>
        </div>

        <ViewMoreLess viewMoreText="View Timeline" viewLessText="Hide Timeline" isTimeline={true} >
          <div className=" 900:mt-0 w-full">
            <Timeline intervals={otherIntervals} hours={hours} showArrow={false} />
          </div>
        </ViewMoreLess>
      </div>
    </section>
  );
}

TimelinePreview.propTypes = {
  hasFloating: PropTypes.bool
};

export default TimelinePreview;