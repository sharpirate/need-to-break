import { intervalTypes } from "../components/atoms/Interval";
import { SCALES } from "./constants";
import { parseStartTime, timestampToString } from "./timeUtil";
import { setStoredLocalStorate } from "./localStorageUtil";

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
  const { workDuration, breakDuration, startTime, duration, startWith } = blueprint;
  
  const intervals = [];
  let totalDuration = 0;
  let i = 0;

  do {
    let type;
    if (i === 0) {
      // use the startWith if exists or default to work
      type = startWith || intervalTypes.work;
    } else {
      type = intervals[i - 1].type === intervalTypes.work ? intervalTypes.break : intervalTypes.work;
    }

    const intervalDuration = type === intervalTypes.work ? workDuration : breakDuration;
    totalDuration += intervalDuration;

    const overflow = totalDuration - duration;
    let normalizedDuration = intervalDuration;
    
    if (overflow > 0) {
      normalizedDuration -= overflow;
    }

    intervals.push({
      type,
      duration: normalizedDuration
    });

    i++;
  } while (totalDuration < duration);

  return {
    intervals,
    startTime,
    // we need these only when restarting
    workDuration,
    breakDuration
  };
}

export function storedToTimeline(stored) {
  const { intervals, startTime, workDuration, breakDuration } = stored;

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
    duration: totalDuration,
    // we need these only when restarting
    workDuration,
    breakDuration
  };
}

export function blueprintToTimeline(blueprint) {
  const stored = blueprintToStored(blueprint);
  const timeline = storedToTimeline(stored);

  return timeline;
}

export function startTimeline(blueprint) {
  const stored = blueprintToStored(blueprint);
  setStoredLocalStorate(stored);
}

export function getDetails(blueprint) {
  const type = typeof blueprint.startTime === "number" ? "Flexible" : "Full Time";

  const startTime = isNaN(blueprint.startTime) ? parseStartTime(blueprint.startTime) : blueprint.startTime;
  const endTime = startTime + (blueprint.duration * 1000);
  const duration = `${timestampToString(startTime)} to ${timestampToString(endTime)}`;

  return {
    type,
    workDuration: blueprint.workDuration / 60,
    breakDuration: blueprint.breakDuration / 60,
    duration
  }
}
