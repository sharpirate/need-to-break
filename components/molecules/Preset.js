import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import Button, { buttonTypes } from "../atoms/Button";
import Icon, { iconTypes } from "../atoms/Icon";
import DeletePresetModal from "./cards/DeletePresetModal";

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

function Preset({ name }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <section className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:px-32 932:py-32">

      {/* Icon & Name */}
      <div className="flex flex-col justify-center items-center gap-16 420:gap-24 mb-16 420:mb-24">
        <Icon type={iconTypes.save}/>
        <Label size={labelTypes.large} as={labelTypes.h2}>{name}</Label>
      </div>

      {/* Info List */}
      <ul className="w-full flex flex-col 932:flex-row justify-center items-center 932:justify-evenly 932:items-start gap-24 420:gap-32 932:gap-0 mb-32 420:mb-48">
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
      <div className="w-full flex flex-col 932:flex-col-reverse justify-center items-center gap-32 420:gap-48">
        <div className="grid gap-24 420:gap-32 540:grid-cols-2 540:gap-24">
          <Button type={buttonTypes.primary}>Generate</Button>
          <Button handleClick={() => setModalIsOpen(true)} type={buttonTypes.outline}>Delete</Button>
        </div>

        <ViewMoreLess viewMoreText="View Timeline" viewLessText="Hide Timeline" isTimeline={true} >
          <div className=" 932:mt-0 w-full">
            <Timeline timeline={timeline} hours={hours} showArrow={true} />
          </div>
        </ViewMoreLess>
      </div>

      {/* Delete Preset Modal */}
      <DeletePresetModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        presetName={name}
      />
    </section>
  );
}

Preset.propTypes = {
  name: PropTypes.string
};

export default Preset;