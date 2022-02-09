import { parseTime, getTwoDigitTime } from "./timeUtil";
import { BLOCK_SIZE, SCALES, DIVIDERS, BLUEPRINT_KEY } from "./constants";
import { intervalTypes } from "../components/atoms/Interval";

function generateIntervals(blocks, startTime) {
  // add timestamp and time
  for (let i = 0; i <= blocks.length; i++) {
    const prevBlock = blocks[i - 1];
    const timestamp = i === 0 ? startTime : prevBlock.timestamp + BLOCK_SIZE.ms;
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

  let duration = 0;
  let counter = 1;
  for (let i = blocks.length - 2; i >= 0; i--) {
    if (i === 0 || blocks[i].type !== blocks[i - 1].type) {
      intervals.unshift({
        ...blocks[i],
        duration: counter * BLOCK_SIZE.sec
      });

      duration += intervals[0].duration;
      counter = 1;
    } else {
      counter++;
    }
  }

  return [blocks, intervals, duration];
}

function parseStartTime(startTime) {
  console.log(startTime)
  const [hours, minutes] = parseTime(startTime);
  return new Date().setHours(hours, minutes, 0);
}

function generateScales(blocks) {
  const scaleMap = {};

  const intervals = blocks.length - 1;
  const scales = SCALES.filter(scale => scale.value <= intervals * BLOCK_SIZE.min);

  for (const scale of scales) {
    scaleMap[scale.value] = blocks.map(block => block.time).filter((time, index) => {
      // filter based on scale
      return index % (scale.value / BLOCK_SIZE.min) === 0;
    });
  }

  return [scales, scaleMap];
}

function generatePages(blocks) {
  const intervals = blocks.length - 1;
  const divider = DIVIDERS.find(divider => intervals % divider === 0 );

  const pages = blocks.map(block => block.time).filter((time, index) => {
    return index % divider === 0;
  })

  const valueStep = 1 / (pages.length - 1);

  const pageMap = pages.map((page, index) => ({
    name: page,
    value: index * valueStep
  }));

  const values = pageMap.map(page => page.value);

  return [pageMap, values];
}

function generateBlocks(size, w, b) {
  const blocks = [];

  const workBlocks = w / BLOCK_SIZE.min; // 2
  const breakBlocks = b / BLOCK_SIZE.min; // 1

  let counter = 0;
  let type = 'work';

  for (let i = 0; i < size; i++) {
    if (type === 'work') {
      if (counter < workBlocks) {
        blocks.push({ type: 'work' });
      } else {
        type = 'break';
        counter = 0;
        blocks.push({ type: 'break' });
      }
    } else {
      if (counter < breakBlocks) {
        blocks.push({ type: 'break' });
      } else {
        type = 'work';
        counter = 0;
        blocks.push({ type: 'work' });
      }
    }
    counter++;
  }

  return blocks;
}

// probably useful when restaring intervals and modifying existing blocks, if not, remove it and just use processTimelineBlueprint
export function processTimelineBlocks({ blocks: inputBlocks, start  }) {
  const startTime = typeof start === 'string' ? parseStartTime(start) : start;
  const [blocks, intervals, duration] = generateIntervals(inputBlocks, startTime);
  const [scales, scaleMap] = generateScales(blocks);
  const [pages, pageValues] = generatePages(blocks);
  
  return {
    blocks,
    intervals,
    scaleMap,
    scales,
    pages,
    pageValues,
    start: startTime,
    duration
  }
}

export function processTimelineBlueprint({ size, w, b, start }) {
  const blocks = generateBlocks(size, w, b);
  return processTimelineBlocks({ blocks, start });
}

export function setBlueprintLocalStorage(blueprint) {
  localStorage.setItem(BLUEPRINT_KEY, JSON.stringify(blueprint));
}

export function getBlueprintLocalStorage() {
  return JSON.parse(localStorage.getItem(BLUEPRINT_KEY));
}