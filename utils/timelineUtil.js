import { intervalTypes } from "../components/atoms/Interval";
import { SCALES } from "./constants";
import { parseTime, timestampToString } from "./timeUtil";

function parseStartTime(startTime) {
  const [hours, minutes] = parseTime(startTime);
  return new Date().setHours(hours, minutes, 0);
}

function generateScales(intervals, totalDuration) {
  const scaleMap = {};

  const scales = SCALES.filter(scale => totalDuration % scale.value === 0);

  const smallestScale = scales[0].value;
  const numberOfBlocks = totalDuration / smallestScale;

  const timeLabels = [];

  for (let i = 0; i <= numberOfBlocks; i++ ) {
    const timestamp = intervals[0].timestamp + (i * smallestScale * 1000);

    timeLabels.push(timestampToString(timestamp));
  }

  for (const scale of scales) {
    scaleMap[scale.value] = timeLabels.filter((timeLabel, i) => i % (scale.value / smallestScale) === 0);
  }

  return [scales, scaleMap];
}

export function blueprintToStored(blueprint) {
  const { workDuration, breakDuration, startTime, duration } = blueprint;

  // generate intervals
  const intervals = [];

  // how many intervals will be needed in order to fill the timeline (round up if we don't get a perfect number)
  let numberOfIntevals;
  // fix additional interval added at the end
  if (workDuration >= duration || breakDuration >= duration) {
    numberOfIntevals = 1;
  } else {
    numberOfIntevals = Math.ceil(duration / ((workDuration + breakDuration) / 2));
  }

  let totalDuration = 0;

  for (let i = 0; i < numberOfIntevals; i++) {
    let type;
    if (i === 0) {
      type = intervalTypes.work;
    } else {
      type = intervals[i - 1].type === intervalTypes.work ? intervalTypes.break : intervalTypes.work;
    }

    const duration = type === intervalTypes.work ? workDuration : breakDuration;
    totalDuration += duration;

    intervals.push({
      type,
      duration
    });
  }

  // clip the duration of the last intervals in case it overflows the maximum timeline duration (if Math.ceil has rounded up)
  const durationOverflow = totalDuration - duration;
  intervals[intervals.length - 1].duration -= durationOverflow;

  return {
    intervals,
    startTime
  };
}

export function storedToTimeline(stored) {
  const { intervals, startTime } = stored;

  const parsedStartTime = typeof startTime === "string" ? parseStartTime(startTime) : startTime;

  let totalDuration = 0;

  for (let i = 0; i < intervals.length; i++) {
    let timestamp;

    if (i === 0) {
      timestamp = parsedStartTime;
    } else {
      timestamp = intervals[i - 1].timestamp + (intervals[i - 1].duration * 1000);
    }

    const startLabel = timestampToString(timestamp);
    const endLabel = timestampToString(timestamp + (intervals[i].duration * 1000));

    intervals[i].timestamp = timestamp;
    intervals[i].startLabel = startLabel;
    intervals[i].endLabel = endLabel;

    totalDuration += intervals[i].duration;
  }

  
  const [scales, scaleMap] = generateScales(intervals, totalDuration);

  return {
    intervals,
    scales,
    scaleMap,
    startTime: parsedStartTime,
    duration: totalDuration
  };
}

export function blueprintToTimeline(blueprint) {
  const stored = blueprintToStored(blueprint);
  const timeline = storedToTimeline(stored);

  return timeline;
}