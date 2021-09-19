import NumberOfSprints from "../components/molecules/cards/NumberOfSprints";
import IntervalSize from "../components/molecules/cards/IntervalSize";
import LongBreaks from "../components/molecules/cards/LongBreaks";
import TimelinePreview from "../components/molecules/TimelinePreview";

function FlexiblePage() {
  return (
    <>
      <ul className="grid grid-cols-1 808:grid-cols-2 auto-rows-fr gap-32 808:gap-48 mb-32 808:mb-48 1196:w-full 1196:flex 1196:justify-around">
        <li>
          <IntervalSize />
        </li>

        <li>
          <NumberOfSprints />
        </li>

        <li className="flex justify-center items-center col-span-1 808:col-span-2 1196:col-span-1">
          <LongBreaks />
        </li>
      </ul>
      
      <TimelinePreview hasFloating />
    </>
  );
}

export default FlexiblePage;