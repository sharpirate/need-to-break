import React, { useState } from "react";
import PropTypes from "prop-types";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import Button, { buttonTypes } from "../atoms/Button";
import Icon, { iconTypes } from "../atoms/Icon";
import DeletePresetModal from "./cards/DeletePresetModal";

function genRandomTimeline(length) {
  const timeline = [];

  for (let i = 0; i < length; i++) {
    switch (Math.floor(Math.random() * 2)) {
      case 0:
        timeline.push("work")
        break;
      case 1:
        timeline.push("break")
        break;
      case 2:
        timeline.push("floating")
        break;
      case 3:
        timeline.push("blocked")
        break;
      default:
        break;
    }
  }

  return timeline;
}

const timeline = genRandomTimeline(96);

// 5 min
const hours5 = [
  '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55',
  '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55',
  '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55',
  '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55',
  '16:00', '16:05', '16:10', '16:15', '16:20', '16:25', '16:30', '16:35', '16:40', '16:45', '16:50', '16:55',
  '17:00', '17:05', '17:10', '17:15', '17:20', '17:25', '17:30', '17:35', '17:40', '17:45', '17:50', '17:55',
  '18:00', '18:05', '18:10', '18:15', '18:20', '18:25', '18:30', '18:35', '18:40', '18:45', '18:50', '18:55',
  '19:00', '19:05', '19:10', '19:15', '19:20', '19:25', '19:30', '19:35', '19:40', '19:45', '19:50', '19:55',
  '20:00'
];

// 15 min
const hours15 = [
  '12:00', '12:15', '12:30', '12:45',
  '13:00', '13:15', '13:30', '13:45',
  '14:00', '14:15', '14:30', '14:45',
  '15:00', '15:15', '15:30', '15:45',
  '16:00', '16:15', '16:30', '16:45',
  '17:00', '17:15', '17:30', '17:45',
  '18:00', '18:15', '18:30', '18:45',
  '19:00', '19:15', '19:30', '19:45',
  '20:00'
];

// 30 min
const hours30 = [
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
  '17:00', '17:30',
  '18:00', '18:30',
  '19:00', '19:30',
  '20:00'
];

// 30 min
const hours60 = [
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00'
];

function Preset({ name }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <section className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:px-64 932:py-32">

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
            <Timeline timeline={timeline} hours={hours5} showArrow={true} />
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