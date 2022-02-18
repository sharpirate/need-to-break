import { useState, useEffect, useRef } from "react";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timer from "../atoms/Timer";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import RadioButton from "../atoms/RadioButton";
import Button, { buttonTypes } from "../atoms/Button";
import { intervalTypes } from "../atoms/Interval";
import * as worker from 'worker-timers';
import { blueprintToStored, storedToTimeline } from "../../utils/timelineUtil";
import { getStartingLocalStorage, getStoredLocalStorage, removeStartingLocalStorage, setStartingLocalStorage, setStoredLocalStorate } from "../../utils/localStorageUtil";
import { timestampToString, get12HourTime } from "../../utils/timeUtil";
import { useSettings } from "../../context/Settings";
import { SCALES } from "../../utils/constants";
import cloneDeep from "lodash.clonedeep";
import EnableNotificationsModal from "./cards/EnableNotificationsModal";
import { useNotifications } from "../../utils/notificationUtil";

function MainTimeline() {
  const timerRef = useRef();
  const [timeline, setTimeline] = useState();
  const [activeInterval, setActiveInterval] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [progress, setProgress] = useState();
  const [restartType, setRestartType] = useState(intervalTypes.work);
  const { use12Hour, useSmartRestart } = useSettings();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const allowNotifications = useNotifications();
  
  function tick() {
    // get timer time left
    const endTimestamp = activeInterval.timestamp + (activeInterval.duration * 1000);
    setTimeLeft(Math.round((endTimestamp - Date.now()) / 1000));

    // get timeline progress
    const timelineProgress = (Math.round((Date.now() - timeline.startTime) / 1000) / timeline.duration * 100);
    setProgress(timelineProgress);
  }

  function createStartingTimer(firstTimestamp) {
    const now = Date.now();
    let timestamp = getStartingLocalStorage();

    if (!timestamp) {
      timestamp = now;
      setStartingLocalStorage(timestamp);
    }

    const type = intervalTypes.starting;
    const durationMs = firstTimestamp - timestamp;
    const durationSec = Math.round(durationMs / 1000);
    const startLabel = timestampToString(timestamp);
    const endLabel = timestampToString(timestamp + durationMs);

    return {
      type,
      duration: durationSec,
      timestamp,
      startLabel,
      endLabel
    }
  }

  function startTimeline() {
    const stored = getStoredLocalStorage();

    if (stored) {
      const timeline = storedToTimeline(stored);
      setTimeline(timeline);

      if (Date.now() < timeline.startTime) {
        // timeline hasn't started yet
        setActiveInterval(createStartingTimer(timeline.startTime));

      } else if (Date.now() > (timeline.startTime + (timeline.duration * 1000))) {
        // timeline has ended
        
      } else {
        const nextInterval = timeline.intervals.findIndex(interval => interval.timestamp > Date.now());
        setActiveInterval(timeline.intervals[nextInterval - 1]);
      }
    }
  }

  useEffect(() => {
    startTimeline();
  }, []);

  useEffect(() => {
    if (activeInterval && timeline) {
      tick();
      timerRef.current = worker.setInterval(() => {
        tick();
      }, 1000);

      return () => {
        worker.clearInterval(timerRef.current);
        removeStartingLocalStorage();
        console.log('cleanup');
      }
    }
  }, [activeInterval, timeline]);

  useEffect(() => {
    if (timeLeft <= 0) {
      const oldIndex = timeline.intervals.indexOf(activeInterval);
      const nextInterval = timeline.intervals[oldIndex + 1];
      setActiveInterval(nextInterval);

      if (allowNotifications) {
        showNotificationOnIntervalEnd(nextInterval);
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    if (allowNotifications === null) {
      setTimeout(() => {
        setModalIsOpen(true);
      }, 3000)
    }
  }, [allowNotifications]);

  function showNotificationOnIntervalEnd(nextInterval) {
    const title = nextInterval.type === intervalTypes.work ? "Work Time!" : "Break Time!";
    const minutes = nextInterval.duration / 60;
    const body = `${minutes} min`;

    new Notification(title, { body: body });
  }

  function handleRestartChange(e) {
    setRestartType(e.target.value);
  }

  function handleRestart(e) {
    e.preventDefault();

    let closestBlock;
    const now = Date.now();

    if (useSmartRestart) {
      // 5 min
      const blockSize = SCALES[0].value;
      const numberOfBlocks = timeline.duration / blockSize;
      const blockStartTimes = [];
      let nearestBlocks;
  
      for (let i = 0; i <= numberOfBlocks; i++) {
        const blockStart = timeline.startTime + (i * blockSize * 1000);
  
        blockStartTimes.push(blockStart);
  
        if (blockStart >= now) {
          // return the last two blocks
          nearestBlocks = blockStartTimes.slice(-2);
          break;
        } else {
          // TODO: Handle restarting at the last interval
          nearestBlocks = [];
        }
      }
      
      const [leftBlock, rightBlock] = nearestBlocks;
      const timeToLeftBlock = Math.abs(now - leftBlock);
      const timeToRightBlock = Math.abs(now - rightBlock);
      closestBlock = timeToLeftBlock < timeToRightBlock ? leftBlock : rightBlock;
    }

    const { workDuration, breakDuration } = timeline;
    let intervalEnd;
    let startBlock = restartType;

    if (useSmartRestart) {
      if (activeInterval.type === restartType) {
        const intervalDuration = restartType === intervalTypes.work ? workDuration : breakDuration;
        intervalEnd = closestBlock + (intervalDuration * 1000);
        // invert start block
        startBlock = restartType === intervalTypes.work ? intervalTypes.break : intervalTypes.work;
      } else {
        intervalEnd = closestBlock;
      }
    } else {
      intervalEnd = now;
    }

    // copy the current intervals so they can be mutated without affecting the timeline
    const intervalsCopy = cloneDeep(timeline.intervals);
    const activeIntervalIndex = intervalsCopy.findIndex(interval => interval.timestamp === activeInterval.timestamp);

    // end the current interval now for instant restart or end it at the closest block
    intervalsCopy[activeIntervalIndex].duration = Math.round((intervalEnd - activeInterval.timestamp) / 1000);

    // remove all elements after the current interval and remove startLabel, endLabel and timestamp
    const prevIntervals = intervalsCopy.filter((interval, i) => i <= activeIntervalIndex).map(interval => ({
      type: interval.type,
      duration: interval.duration
    }));

    // find the remaining duration of the timeline
    const timelineEnd = timeline.startTime + (timeline.duration * 1000);
    const remainingDuration = Math.round((timelineEnd - intervalEnd) / 1000);
    
    // generate the new part of the timeline
    const nextIntervals = blueprintToStored({
      startTime: intervalEnd,
      duration: remainingDuration,
      workDuration,
      breakDuration,
      startWith: startBlock
    }).intervals;


    const newStored = {
      intervals: [...prevIntervals, ...nextIntervals],
      startTime: timeline.startTime,
      workDuration,
      breakDuration
    };

    // tigger a timeline restart
    setStoredLocalStorate(newStored);
    startTimeline();
  }

  const readyToShow = (activeInterval && timeline && !isNaN(timeLeft));
  let timeLabel;

  if (activeInterval) {
    let startTime;
    let endTime;

    if (use12Hour) {
      const [startHour, startMin, startSuffix] = get12HourTime(activeInterval.startLabel);
      const [endHour, endMin, endSuffix] = get12HourTime(activeInterval.endLabel);

      startTime = `${startHour}:${startMin} ${startSuffix}`;
      endTime = `${endHour}:${endMin} ${endSuffix}`;
    } else {
      startTime = activeInterval.startLabel;
      endTime = activeInterval.endLabel;
    }

    timeLabel = activeInterval.type === intervalTypes.starting ? endTime : `${startTime} - ${endTime}`;
  }

  return readyToShow ? (
    <div className="w-full flex flex-col justify-center items-center text-center bg-white rounded-8 py-16 px-32 420:py-24 420:px-48 932:py-32">
      <EnableNotificationsModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />

      {/* Restart Block */}
      <form className="flex flex-col justify-center items-center mb-32 420:mb-48" onSubmit={e => handleRestart(e)}>
        <ViewMoreLess viewMoreText="Restart Interval" viewLessText="Restart Interval">
          <div className="mt-16 420:mt-24">
            <Label size={labelTypes.large} as={labelTypes.h1} >Restart</Label>
            <p className="mb-16 body-med text-gray-500">
              Align the timeline to the current moment
              <br />
              Select an interval type:
            </p>
            <div className="flex justify-center items-center gap-16 420:gap-24 mb-24 420:mb-32">
              <RadioButton isChecked={restartType === intervalTypes.work} handleChange={handleRestartChange} value={intervalTypes.work} name="restartType" id="work" label="Work" />
              <RadioButton isChecked={restartType === intervalTypes.break} handleChange={handleRestartChange} value={intervalTypes.break} name="restartType" id="break" label="Break" />
            </div>
            <Button isSubmit type={buttonTypes.primary}>Restart</Button>
          </div>
        </ViewMoreLess>
      </form>

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

      {/* Timeline Block */}
      <ViewMoreLess viewMoreText="View Timeline" viewLessText="Hide Timeline" isTimeline={true} >
        <div className="mt-32 420:mt-48 932:mt-0 w-full">
          <Timeline timeline={timeline} progress={progress} />
        </div>
      </ViewMoreLess>

    </div>
  ) : null;
}

export default MainTimeline;