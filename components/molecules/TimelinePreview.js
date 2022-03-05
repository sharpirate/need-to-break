import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import Button, { buttonTypes } from "../atoms/Button";
import Icon, { iconTypes } from "../atoms/Icon";
import SavePresetModal from "../molecules/cards/SavePresetModal";
import { useBlueprint } from "../../context/Blueprint";
import { blueprintToTimeline } from "../../utils/timelineUtil";
import { startTimeline } from "../../utils/timelineUtil";
import { useRouter } from "next/router";
import useIsomorphicLayoutEffect from "../../utils/useIsomorphicLayoutEffect";
import { useAuth } from "../../firebase/Firebase";
function TimelinePreview({ hasFloating }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const blueprint = useBlueprint();
  const [timeline, setTimeline] = useState();
  const [viewMore, setViewMore] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useIsomorphicLayoutEffect(() => {
    if (blueprint.duration) {
      const timeline = blueprintToTimeline(blueprint);
      setTimeline(timeline);
    } else {
      setTimeline(null);
    }
  }, [blueprint])

  function handleStart() {
    if (blueprint && user) {
      startTimeline(blueprint, user.uid);
      router.push('/active');
    }
  }

  const floatingStyle = hasFloating ? '932:grid-cols-2' : '';

  return timeline ? (
    <section className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:py-32">

      <div className={`grid grid-cols-1 ${floatingStyle} max-w-[252px] 420:max-w-[310px] 932:max-w-none gap-32 mb-32 420:gap-48 1172:gap-64 1172:text-left 420:mb-48`}>

        {/* Timeline Preview Block */}
        <div className="flex flex-col justify-start items-center gap-16 420:gap-24 932:max-w-[408px] 1172:flex-row 1172:items-start">
          <div>
            <Icon type={iconTypes.timeline} />
          </div>
          <div>
            <Label size={labelTypes.large} as={labelTypes.h2} >Timeline Preview</Label>
            <p className="body-med text-gray-500">
              A visual representation of your timeline. You can either generate it now or save it as a preset for later.
            </p>
          </div>
        </div>

        {/* Floating Time Block (If Any)*/}
        {hasFloating ? (
          <div className="flex flex-col justify-start items-center gap-16 420:gap-24 932:max-w-[408px] 1172:flex-row 1172:items-start">
            <div>
              <Icon type={iconTypes.warning} />
            </div>
            <div>
              <Label size={labelTypes.large} as={labelTypes.h2} >Floating Time</Label>
              <p className="body-med text-gray-500">
                We have filled the empty blocks around your blocked time with floating time. This is unmanaged time and it’s up to you to decide how you spend it.
              </p>
            </div>
          </div>
        ) : null}

      </div>
      {/* Timeline & Buttons (Able To Reverse Flex Order) */}
      <div className="w-full flex flex-col 932:flex-col-reverse justify-center items-center">
        <div className="grid gap-24 420:gap-32 540:grid-cols-2 540:gap-24 mb-32 420:mb-48 932:mb-0 932:mt-48">
          <Button handleClick={handleStart} type={buttonTypes.primary}>Start</Button>
          <Button handleClick={() => setModalIsOpen(true)} type={buttonTypes.outline}>Save</Button>
        </div>

        {/* Timeline Block */}
        <ViewMoreLess
          viewMoreText="View Timeline"
          viewLessText="Hide Timeline"
          isTimeline={true}
          active={viewMore}
          handleClick={() => setViewMore(!viewMore)}
        >
          <div className="mt-32 420:mt-48 932:mt-0 w-full">
            <Timeline timeline={timeline} />
          </div>
        </ViewMoreLess>
      </div>

      {/* Save Preset Modal */}
      <SavePresetModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        blueprint={blueprint}
      />
    </section>
  ) : null;
}

TimelinePreview.propTypes = {
  hasFloating: PropTypes.bool
};

export default TimelinePreview;