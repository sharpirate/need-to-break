import PropTypes from "prop-types";
import TimelineDuration from "./TimelineDuration";
import IntervalSize from "./IntervalSize";
import BlockTime from "./BlockTime";
import NumberOfSprints from "./NumberOfSprints";
import LongBreaks from "./LongBreaks";
import TimelinePreview from "../TimelinePreview";

const types = {
  fullTime: 'fullTime',
  flexible: 'flexible'
};

export { types as cardsLayoutTypes };

function CardsLayout({ type }) {

  return (
    <>
      <ul className="grid grid-cols-1 808:grid-cols-2 auto-rows-fr gap-32 808:gap-48 mb-32 808:mb-48 1196:w-full 1196:flex 1196:justify-evenly 1196:gap-0">
        <li>
          {type === types.fullTime ? <TimelineDuration /> : <IntervalSize /> }
        </li>

        <li>
          {type === types.fullTime ? <IntervalSize /> : <NumberOfSprints /> }
        </li>

        <li className="flex justify-center items-center col-span-1 808:col-span-2 1196:col-span-1">
          {type === types.fullTime ? <BlockTime /> : <LongBreaks /> }
        </li>
      </ul>
      
      <TimelinePreview hasFloating />
    </>
  );
}

CardsLayout.propTypes = {
  type: PropTypes.string
};

export default CardsLayout;