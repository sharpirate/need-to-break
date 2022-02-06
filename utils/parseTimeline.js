import { parseTime, getTwoDigitTime } from "./timeUtil";
import { BLOCK_SIZE, SCALES } from "./constants";
import { intervalTypes } from "../components/atoms/Interval";

function parseBlocks(blocks, startTime) {
  // add timestamp and time
  for (let i = 0; i <= blocks.length; i++) {
    const prevBlock = blocks[i - 1];
    const timestamp = i === 0 ? startTime : prevBlock.timestamp + (BLOCK_SIZE * 1000);
    const date = new Date(timestamp);
    const hours = getTwoDigitTime(date.getHours());
    const minutes = getTwoDigitTime(date.getMinutes());
    const time = `${hours}:${minutes}`;

    if (i === blocks.length) {
      // add an additional end block at the end of the array (used when generating the scaleMap)
      blocks.push({
        type: intervalTypes.end,
        timestamp,
        time
      });

      // if you don't break it will result in a infinite loop since the length of the array is always growing
      break;
    } else {
      blocks[i].timestamp = timestamp;
      blocks[i].time = time;
    }
  }

  // reduce blocks to intervals
  const intervals = [];

  let counter = 1;
  for (let i = blocks.length - 2; i >= 0; i--) {
    if (i === 0 || blocks[i].type !== blocks[i - 1].type) {
      intervals.unshift({
        ...blocks[i],
        duration: counter * BLOCK_SIZE
      });

      counter = 1;
    } else {
      counter++;
    }
  }

  return [blocks, intervals];
}

function parseStartTime(startTime) {
  const [hours, minutes] = parseTime(startTime);
  return new Date().setHours(hours, minutes, 00);
}

function generateScaleMap(blocks) {
  const scaleMap = {};

  for (const scale of SCALES) {
    scaleMap[scale.value] = blocks.map(block => block.time).filter((time, index) => {
      // filter based on scale
      return index % (scale.value / (BLOCK_SIZE / 60)) === 0;
    });
  }

  return scaleMap;
}

function generatePages(blocks) {
  const pages = blocks.map(block => block.time).filter((time, index) => {
    // filter based on scale
    return index % (60 / (BLOCK_SIZE / 60)) === 0;
  });

  const valueStep = 1 / (pages.length - 1);

  return pages.map((page, index) => ({
    name: page,
    value: index * valueStep
  }));
}

export default function parseTimeline(timeline) {
  const startTime = timeline.startTime ? parseStartTime(timeline.startTime) : Date.now();
  const [blocks, intervals] = parseBlocks(timeline.blocks, startTime);
  const scaleMap = generateScaleMap(blocks);
  const pages = generatePages(blocks);

  return {
    blocks,
    intervals,
    scaleMap,
    pages
  }
}