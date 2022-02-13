import PropTypes from "prop-types";
import TimelineStartEnd from "./TimelineStartEnd";
import IntervalSize from "./IntervalSize";
import BlockTime from "./BlockTime";
import TimelineDuration from "./TimelineDuration";
import LongBreaks from "./LongBreaks";
import TimelinePreview from "../TimelinePreview";
import { BlueprintProvider } from "../../../context/Blueprint";

const types = {
  fullTime: 'fullTime',
  flexible: 'flexible'
};

export { types as cardsLayoutTypes };

function CardsLayout({ type }) {

  return (
    <BlueprintProvider>
      <ul className="grid grid-cols-1 auto-rows-fr gap-24 420:gap-32 808:grid-cols-2 932:gap-48 1260:w-[100vw] 1260:max-w-[1600px] 1260:flex 1260:justify-evenly 1260:gap-0">
        <li>
          {type === types.fullTime ? <TimelineStartEnd /> : <TimelineDuration /> }
        </li>

        <li>
          <IntervalSize />
        </li>

        <li className="flex justify-center items-center col-span-1 808:col-span-2 1260:col-span-1">
          {type === types.fullTime ? <BlockTime /> : <LongBreaks /> }
        </li>
      </ul>

      <div className="w-full pt-24 420:pt-32 932:pt-48">
        <TimelinePreview />
      </div>
    </BlueprintProvider>
  );
}

CardsLayout.propTypes = {
  type: PropTypes.string
};

export default CardsLayout;