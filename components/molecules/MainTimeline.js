import { useState, useEffect, useRef } from "react";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timer from "../atoms/Timer";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import RadioButton from "../atoms/RadioButton";
import Button, { buttonTypes } from "../atoms/Button";
import { intervalTypes } from "../atoms/Interval";
import * as worker from 'worker-timers';
import { getBlueprintLocalStorage, processTimelineBlueprint } from "../../utils/timelineUtil";
import { parseTimestampToTime } from "../../utils/timeUtil";
import { STARTING_KEY } from "../../utils/constants";

function MainTimeline() {
  const timerRef = useRef();
  const [timeline, setTimeline] = useState();
  const [activeInterval, setActiveInterval] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [progress, setProgress] = useState();

  function tick() {
    // get timer time left
    const endTimestamp = activeInterval.timestamp + (activeInterval.duration * 1000);
    setTimeLeft(Math.round((endTimestamp - Date.now()) / 1000));

    // get timeline progress
    const timelineProgress = (Math.round((Date.now() - timeline.start) / 1000) / timeline.duration * 100);
    setProgress(timelineProgress);
  }

  function createStartingTimer(firstTimestamp) {
    const now = Date.now();
    let timestamp = Number(localStorage.getItem(STARTING_KEY));
    if (!timestamp) {
      timestamp = now;
      localStorage.setItem(STARTING_KEY, timestamp);
    }

    const type = intervalTypes.starting;
    const durationMs = firstTimestamp - timestamp;
    const durationSec = Math.round(durationMs / 1000);
    const start = parseTimestampToTime(timestamp);
    const end = parseTimestampToTime(timestamp + durationMs);

    window.starting = {
      type,
      timestamp,
      duration: durationSec,
      start,
      end
    };

    return {
      type,
      timestamp,
      duration: durationSec,
      start,
      end
    }
  }

  useEffect(() => {
    const blueprint = getBlueprintLocalStorage();

    if (blueprint) {
      const timeline = processTimelineBlueprint(blueprint);
      setTimeline(timeline);

      if (Date.now() < timeline.start) {
        // timeline hasn't started yey
        const firstTimestamp = timeline.intervals[0].timestamp;
        setActiveInterval(createStartingTimer(firstTimestamp));

      } else if (Date.now() > (timeline.start + (timeline.duration * 1000))) {
        // timeline has ended
        
      } else {
        const nextInterval = timeline.intervals.findIndex(interval => interval.timestamp > Date.now());
        setActiveInterval(timeline.intervals[nextInterval - 1]);
      }
    }
  }, []);

  useEffect(() => {
    if (activeInterval && timeline) {
      tick();
      timerRef.current = worker.setInterval(() => {
        tick();
      }, 1000);

      return () => {
        worker.clearInterval(timerRef.current);
        localStorage.removeItem(STARTING_KEY);
        console.log('cleanup');
      }
    }
  }, [activeInterval, timeline]);

  useEffect(() => {
    if (timeLeft <= 0) {
      const oldIndex = timeline.intervals.indexOf(activeInterval);
      const nextInterval = timeline.intervals[oldIndex + 1];
      setActiveInterval(nextInterval);
    }
  }, [timeLeft]);

  const readyToShow = activeInterval && timeLeft;
  let timeLabel;

  if (activeInterval) {
    timeLabel = activeInterval.type === intervalTypes.starting ? activeInterval.end : `${activeInterval.start} - ${activeInterval.end}`;
  }

  return readyToShow ? (
    <div className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:py-32">

      {/* Restart Block */}

      <div className="flex flex-col justify-center items-center mb-32 420:mb-48">
        <ViewMoreLess viewMoreText="Restart Interval" viewLessText="Restart Interval">
          <div className="mt-16 420:mt-24">
            <Label size={labelTypes.large} as={labelTypes.h1} >Restart</Label>
            <p className="mb-16 body-med text-gray-500">
              Align the timeline to the current moment
              <br />
              Select an interval type:
            </p>
            <div className="flex justify-center items-center gap-16 420:gap-24 mb-24 420:mb-32">
              <RadioButton name="calibrateType" id="work" label="Work" />
              <RadioButton name="calibrateType" id="break" label="Break" />
            </div>
            <Button type={buttonTypes.primary} >Restart</Button>
          </div>
        </ViewMoreLess>
      </div>

      {/* Timer Block */}
      <div className="mb-16 420:mb-24">
        <Label size={labelTypes.large} as={labelTypes.h1} capitalize>{activeInterval.type}</Label>
        <p className="body-med text-gray-500">{timeLabel}</p>
      </div>

      <div className="mb-32 420:mb-48">
        <Timer
          type={activeInterval.type}
          timeLeft={timeLeft}
          duration={activeInterval.duration}
        />
      </div>

      <ViewMoreLess viewMoreText="View Timeline" viewLessText="Hide Timeline" isTimeline={true} >
        <div className="mt-32 420:mt-48 932:mt-0 w-full">
          <Timeline timeline={timeline} progress={progress} />
        </div>
      </ViewMoreLess>
    </div>
  ) : null;
}

export default MainTimeline;