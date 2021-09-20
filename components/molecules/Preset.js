import PropTypes from "prop-types";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
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

function Preset({ name }) {
  return (
    <section className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 900:px-32 900:py-32">

      {/* Icon & Name */}
      <div className="flex flex-col justify-center items-center gap-16 420:gap-24 mb-16 420:mb-24">
        <Icon type={iconTypes.save}/>
        <Label size={labelTypes.large} as={labelTypes.h2}>{name}</Label>
      </div>

      {/* Info List */}
      <ul className="w-full flex flex-col 900:flex-row justify-center items-center 900:justify-evenly 900:items-start gap-24 420:gap-32 900:gap-0 mb-32 420:mb-48">
        <li>
          <Label size={labelTypes.big} as={labelTypes.h3}>Type</Label>
          <p className="body-sbold text-gray-500">
            Full Time
          </p>
        </li>
        
        <li>
          <Label size={labelTypes.big} as={labelTypes.h3}>Timeline</Label>
          <p className="body-sbold text-gray-500">
            12:00 to 20:00
          </p>
        </li>
        
        <li>
          <Label size={labelTypes.big} as={labelTypes.h3}>Intervals</Label>
          <p className="body-sbold text-gray-500">
            Work: 30 min
            <br />
            Break: 15 min
          </p>
        </li>
        
        <li>
          <Label size={labelTypes.big} as={labelTypes.h3}>Blocked</Label>
          <p className="body-sbold text-gray-500">
            12:00 to 12:30
            <br />
            17:00 to 17:15
          </p>
        </li>
      </ul>

      {/* Timeline & Buttons (Able To Reverse Flex Order) */}
      <div className="w-full flex flex-col 900:flex-col-reverse justify-center items-center gap-32 420:gap-48">
        <div className="grid gap-24 420:gap-32 540:grid-cols-2 540:gap-24">
          <Button type={buttonTypes.primary}>Generate</Button>
          <Button type={buttonTypes.outline}>Delete</Button>
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

Preset.propTypes = {
  name: PropTypes.string
};

export default Preset;