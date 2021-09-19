import TimelineDuration from "../components/molecules/cards/TimelineDuration";
import IntervalSize from "../components/molecules/cards/IntervalSize";
import BlockTime from "../components/molecules/cards/BlockTime";
import TimelinePreview from "../components/molecules/TimelinePreview";

function FullTimePage() {
  return (
    <>
      <ul className="grid grid-cols-1 808:grid-cols-2 auto-rows-fr gap-32 808:gap-48 mb-32 808:mb-48 1196:w-full 1196:flex 1196:justify-around">
        <li>
          <TimelineDuration />
        </li>

        <li>
          <IntervalSize />
        </li>

        <li className="flex justify-center items-center col-span-1 808:col-span-2 1196:col-span-1">
          <BlockTime />
        </li>
      </ul>
      
      <TimelinePreview hasFloating />
    </>
  );
}

export default FullTimePage;