import { useState, useEffect } from "react";
import ViewMoreLess from "../atoms/ViewMoreLess";
import Timer from "../atoms/Timer";
import Timeline from "./TImeline";
import Label, { labelTypes } from "../atoms/Label";
import RadioButton from "../atoms/RadioButton";
import Button, { buttonDelay, buttonTypes } from "../atoms/Button";
import { intervalTypes } from "../atoms/Interval";
import { blueprintToStored, storedToTimeline } from "../../utils/timelineUtil";
import { getStartingLocalStorage, getStoredLocalStorage, removeStartingLocalStorage, setStartingLocalStorage, setStoredLocalStorate } from "../../utils/localStorageUtil";
import { timestampToString, get12HourTime } from "../../utils/timeUtil";
import { useSettings } from "../../context/Settings";
import { SCALES } from "../../utils/constants";
import cloneDeep from "lodash.clonedeep";
import EnableNotificationsModal from "./cards/EnableNotificationsModal";
import { useNotifications } from "../../utils/notificationUtil";
import NoActiveTimeline from "./cards/NoActiveTimeline";
import { useAuth } from "../../firebase/Firebase";

function MainTimeline() {
  const [timeline, setTimeline] = useState();
  const [activeInterval, setActiveInterval] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [progress, setProgress] = useState();
  const [restartType, setRestartType] = useState(intervalTypes.work);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [audio, setAudio] = useState(null);
  const [viewMoreTimeline, setViewMoreTimeline] = useState(false);
  const [viewMoreRestart, setViewMoreRestart] = useState(false);
  const { use12Hour, useSmartRestart } = useSettings();
  const allowNotifications = useNotifications();
  const { user } = useAuth();
  
  function tick(now) {
    // get timer time left
    const endTimestamp = activeInterval.timestamp + (activeInterval.duration * 1000);
    setTimeLeft(Math.round((endTimestamp - now) / 1000));

    // get timeline progress
    const timelineProgress = (Math.round((now - timeline.startTime) / 1000) / timeline.duration * 100);
    setProgress(timelineProgress);
  }

  function createStartingTimer(firstTimestamp, uid) {
    const now = Date.now();
    let timestamp = getStartingLocalStorage(uid);

    if (!timestamp) {
      timestamp = now;
      setStartingLocalStorage(timestamp, uid);
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

  function startTimeline(uid) {
    const stored = getStoredLocalStorage(uid);

    if (stored) {
      const timeline = storedToTimeline(stored);
      setTimeline(timeline);

      if (Date.now() < timeline.startTime) {
        // timeline hasn't started yet
        setActiveInterval(createStartingTimer(timeline.startTime, uid));

      } else if (Date.now() > (timeline.startTime + (timeline.duration * 1000))) {
        // timeline has ended
        
      } else {
        const nextIntervalIndex = timeline.intervals.findIndex(interval => interval.timestamp > Date.now());
        setActiveInterval(timeline.intervals[nextIntervalIndex - 1]);
      }
    }
  }

  useEffect(() => {
    if (user) {
      startTimeline(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (activeInterval && timeline) {
      const worker = new Worker(new URL("../../utils/workerInterval.js", import.meta.url));

      // start the interval
      worker.postMessage({ delay: 1000 });
      
      // call the tick fn with Date.now() from the worker
      worker.onmessage = ({ data }) => tick(data);

      return () => {
        // end worker
        worker.postMessage({ clear: true });
        removeStartingLocalStorage(user.uid);
      }
    }
  }, [activeInterval, timeline]);

  useEffect(() => {
    if (timeLeft <= 3 && !audio) {
      const audio = new Audio("sounds/timer.wav");
      audio.autoplay = true;
      setAudio(audio)
    }

    if (timeLeft <= 0) {
      setAudio(null);
      const oldIndex = timeline.intervals.indexOf(activeInterval);

      let nextInterval;
      
      // if timeline has ended next interval will be null
      if (oldIndex + 1 === timeline.intervals.length) {
        nextInterval = null;
      } else {
        nextInterval = timeline.intervals[oldIndex + 1];
      }

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
    if (!nextInterval) {
      new Notification("Timeline Has Ended!");
    } else {
      const title = nextInterval.type === intervalTypes.work ? "Work Time!" : "Break Time!";
      const minutes = nextInterval.duration / 60;
      const body = `${minutes} min`;
  
      new Notification(title, { body: body });
    }
  }

  function handleRestartChange(e) {
    setRestartType(e.target.value);
  }

  function handleRestart(e) {
    e.preventDefault();

    setViewMoreRestart(false);

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

  const readyToShow = (activeInterval && timeline && timeLeft >= 0);
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
      <form className="flex flex-col justify-center items-center mb-32 420:mb-48" onSubmit={e => {
        e.preventDefault();
        setTimeout(handleRestart.bind(this, e), buttonDelay);
      }}>
        <ViewMoreLess
          viewMoreText="Restart Interval"
          viewLessText="Restart Interval"
          active={viewMoreRestart}
          handleClick={() => setViewMoreRestart(!viewMoreRestart)}
        >
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
      <ViewMoreLess
        viewMoreText="View Timeline"
        viewLessText="Hide Timeline"
        isTimeline={true}
        active={viewMoreTimeline}
        handleClick={() => setViewMoreTimeline(!viewMoreTimeline)}
      >
        <div className="mt-32 420:mt-48 932:mt-0 w-full">
          <Timeline timeline={timeline} progress={progress} />
        </div>
      </ViewMoreLess>

    </div>
  ) : <NoActiveTimeline />;
}

export default MainTimeline;