import React, { useState, useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from '../../utils/useIsomorphicLayoutEffect';
import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';
import Tab, { tabTypes } from '../atoms/Tab';
import { isBelowBreakpoint } from '../../utils/tailwindUtil';
import useClientWidth from '../../utils/useClientWidth';
import { useSettings } from '../../context/Settings';
import { get12HourTime } from '../../utils/timeUtil';

function Timeline({ timeline, progress }) {
  const { scaleMap, scales, intervals } = timeline;

  const [scale, setScale] = useState(scales[1].value);
  const [hours, setHours] = useState(scaleMap[scale]);
  
  const clientWidth = useClientWidth();
  const isMobile = isBelowBreakpoint(clientWidth, '932');
  
  const timelineProps = {
    scaleMap,
    scales,
    intervals,
    scale,
    setScale,
    hours,
    setHours,
    progress,
  };
  
  const regularTimeline = (
    <div className="hidden 932:block">
      <RegularTimeline {...timelineProps} />
    </div>
  );

  const mobileTimeline = (
    <div className="block 932:hidden">
      <MobileTimeline {...timelineProps} />
    </div>
  );

  return isMobile === null ? (
    // return both on server side to avoid flickering
    <>
      {regularTimeline}
      {mobileTimeline}
    </>
  ) : isMobile === false ? regularTimeline : mobileTimeline;
}

const RegularTimeline = ({ scaleMap, scales, intervals, scale, setScale, hours, setHours, progress }) => {
  const timelineRef = useRef();
  const [scroll, setScroll] = useState(0);
  const [scrollTarget, setScrollTarget] = useState({ value: null, smooth: null });

  // Listen for scroll event
  useIsomorphicLayoutEffect(() => {
    const timeline = timelineRef.current;

    if (timeline) {
      const { clientWidth, scrollWidth } = timeline;
      const scrollableWidth = scrollWidth - clientWidth;

      const handleScroll = e => {
        const currentScroll = e.target.scrollLeft / scrollableWidth;

        if (scrollTarget.value === currentScroll) {
          setScrollTarget({ value: null, smooth: null });
        }

        setScroll(currentScroll);
      };

      timeline.addEventListener('scroll', handleScroll);
    }

    return () => timeline.removeEventListener('scroll', handleScroll);
  }, [timelineRef, scrollTarget.value]);

  // Programatically scroll to a certain scroll target
  useIsomorphicLayoutEffect(() => {
    if (scrollTarget.value !== null && scrollTarget.smooth !== null) {
      scrollTo(scrollTarget);
    }
  }, [scrollTarget.value, scrollTarget.smooth]);

  const scrollTo = ({ value, smooth }) => {
    const timeline = timelineRef.current;

    if (timeline) {
      const { clientWidth, scrollWidth } = timeline;
      const scrollableWidth = scrollWidth - clientWidth;

      timeline.scrollTo({
        left: value  * scrollableWidth,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  }

  const handleScaleChange = newScale => {
    if (newScale !== scale) {
      setScrollTarget({
        value: scroll,
        smooth: false
      });
      setScale(newScale);
      setHours(scaleMap[newScale]);
    }
  }

  return (
    <div> 
      <div
        tabIndex={0}
        ref={timelineRef}
        className="overflow-x-auto pb-64 custom-scrollbar focus:outline-none"
        onMouseEnter={() => timelineRef.current.focus()}
      >
        <div
          className='px-[50%]'
          style={{
            width: `calc(100% + ${(156 * (hours.length - 1))}px)`,
            // (label width in px * 3) * (number of labels - 1)
          }}
        >
          <Arrow
            isMobile={false}
            visible={true}
            type={intervalTypes.work}
            progress={progress}
          />

          <ul className='flex flex-row'>
            {intervals.map((interval, index) => (
              <Interval key={interval.timestamp} type={interval.type} first={index === 0} last={index === intervals.length - 1} duration={interval.duration} />
              ))}
          </ul>

          <ul className='flex flex-row justify-between mt-24 -mx-monopad'>
            {hours.map(hour => (
              <Hour key={hour}>{hour}</Hour>
            ))}
          </ul>
        </div>
      </div>

      <Pagination
        scales={scales}
        currentScale={scale}
        handleScaleChange={handleScaleChange}
      />

    </div>
  );
};

function MobileTimeline({ scaleMap, scales, intervals, scale, setScale, hours, setHours, progress }) {
  const handleScaleChange = newScale => {
    if (newScale !== scale) {
      setScale(newScale);
      setHours(scaleMap[newScale]);
    }
  }

  return (
    <div>
      <Pagination
        scales={scales}
        currentScale={scale}
        handleScaleChange={handleScaleChange}
      />      
        <div
          className="relative inline-flex flex-row-reverse justify-center"
          style={{
            height: `${(156 * (hours.length - 1))}px`,
          }}
        >
          <Arrow
            isMobile={true}
            visible={true}
            type={intervalTypes.work}
            progress={progress}
          />

          <ul className="inline-flex flex-col h-full py-8 420:py-12">
            {intervals.map((interval, index) => (
              <Interval key={interval.timestamp} type={interval.type} first={index === 0} last={index === intervals.length - 1} duration={interval.duration} />
              ))}
          </ul>

          <ul className="absolute top-0 h-full -left-16 420:-left-24 -translate-x-full flex flex-col justify-between">
            {hours.map(hour => (
              <Hour key={hour}>{hour}</Hour>
            ))}
          </ul>
        </div>
    </div>
  );
}
Timeline.propTypes = {
  timeline: PropTypes.object,
  progress: PropTypes.number
};

function Hour({ children }) {
  const { is12Hour } = useSettings();

  let item;

  if (is12Hour) {
    const [hour, min, suffix] = get12HourTime(children);

    item = (
      <div className="flex flex-col">
        <span className="text-16">{hour}:{min}</span>
        <span className="text-13">{suffix}</span>
      </div>
    );
  } else {
    item = children;
  }

  return (
    <li className="mono-med text-gray-500 select-none">
      {item}
    </li>
  );
}
function Arrow({ type, progress, isMobile }) {
  let colorStyle = '';

  switch (type) {
    case intervalTypes.work:
    case intervalTypes.break:
      colorStyle = 'fill-primary-500';
      break;
    case intervalTypes.blocked:
    case intervalTypes.floating:
    colorStyle = 'fill-blocked-500';
      break;
    default:
      break;
  }

  const visibleStyle = progress >= 0 ? "visible" : "invisible";

  return (isMobile ? (
    <div className={`${visibleStyle} absolute left-full top-8 420:top-12 bottom-8 420:bottom-12`}>
      <svg
        className="relative w-16 h-16 420:w-20 420:h-20 ml-8 -translate-y-1/2"
        style={{ top: `${progress}%` }}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  ) : (
    <div className={`${visibleStyle}`}>
      <svg
        className="relative mb-8 w-20 h-20 -rotate-90 -translate-x-1/2"
        style={{ left: `${progress}%` }}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  ));
}

Arrow.propTypes = {
  type: PropTypes.string,
  progress: PropTypes.number
};

function Pages({ pages, currentPage, handlePageChange }) {
  return (
    <ul className="flex">
      {pages.map((page, index) => (
        <Tab
          key={page.value}
          type={tabTypes.pagination}
          first={index === 0}
          active={page.value === currentPage}
          last={index === pages.length - 1}
          value={page.value}
          handleClick={() => handlePageChange(page.value)}
        >
          {page.name}
        </Tab>
      ))}
    </ul>
  );
}

function Pagination({ scales, currentScale, handleScaleChange }) {
  return (
    <div className="flex justify-center pb-32 420:pb-48 932:pb-0 932:pt-48">
      <Pages
        pages={scales}
        currentPage={currentScale}
        handlePageChange={handleScaleChange}  
      />
    </div>
  );
}

export default Timeline;