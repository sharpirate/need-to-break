import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import Button, { buttonTypes } from "../atoms/Button";
import Icon, { iconTypes } from "../atoms/Icon";
import SavePresetModal from "../molecules/cards/SavePresetModal";

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

const hours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

function TimelinePreview({ hasFloating }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const floatingStyle = hasFloating ? '932:grid-cols-2' : '';

  return (
    <section className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:px-64 932:py-32">

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
      <div className="w-full flex flex-col 932:flex-col-reverse justify-center items-center gap-32 420:gap-48">
        <div className="grid gap-24 420:gap-32 540:grid-cols-2 540:gap-24">
          <Button type={buttonTypes.primary}>Generate</Button>
          <Button handleClick={() => setModalIsOpen(true)} type={buttonTypes.outline}>Save Preset</Button>
        </div>

        <ViewMoreLess viewMoreText="View Timeline" viewLessText="Hide Timeline" isTimeline={true} >
          <div className=" 932:mt-0 w-full">
            <Timeline timeline={timeline} hours={hours} showArrow={false} />
          </div>
        </ViewMoreLess>
      </div>

      {/* Save Preset Modal */}
      <SavePresetModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </section>
  );
}

TimelinePreview.propTypes = {
  hasFloating: PropTypes.bool
};

export default TimelinePreview;