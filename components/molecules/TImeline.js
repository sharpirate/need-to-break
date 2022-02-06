import React, { useState, useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from '../../utils/useIsomorphicLayoutEffect';
import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';
import Tab, { tabTypes } from '../atoms/Tab';
import { isBelowBreakpoint } from '../../utils/tailwindUtil';
import useClientWidth from '../../utils/useClientWidth';
import findClosest from '../../utils/findClosest';
import { SCALES as scales } from '../../utils/constants';

const timeline = {
  blocks: [
    { type: 'work', timestamp: 1644113574545, time: '04:12' },
    { type: 'work', timestamp: 1644113874545, time: '04:17' },
    { type: 'work', timestamp: 1644114174545, time: '04:22' },
    { type: 'work', timestamp: 1644114474545, time: '04:27' },
    { type: 'work', timestamp: 1644114774545, time: '04:32' },
    { type: 'work', timestamp: 1644115074545, time: '04:37' },
    { type: 'break', timestamp: 1644115374545, time: '04:42' },
    { type: 'work', timestamp: 1644115674545, time: '04:47' },
    { type: 'work', timestamp: 1644115974545, time: '04:52' },
    { type: 'break', timestamp: 1644116274545, time: '04:57' },
    { type: 'break', timestamp: 1644116574545, time: '05:02' },
    { type: 'break', timestamp: 1644116874545, time: '05:07' },
    { type: 'work', timestamp: 1644117174545, time: '05:12' },
    { type: 'work', timestamp: 1644117474545, time: '05:17' },
    { type: 'work', timestamp: 1644117774545, time: '05:22' },
    { type: 'work', timestamp: 1644118074545, time: '05:27' },
    { type: 'work', timestamp: 1644118374545, time: '05:32' },
    { type: 'break', timestamp: 1644118674545, time: '05:37' },
    { type: 'break', timestamp: 1644118974545, time: '05:42' },
    { type: 'work', timestamp: 1644119274545, time: '05:47' },
    { type: 'work', timestamp: 1644119574545, time: '05:52' },
    { type: 'work', timestamp: 1644119874545, time: '05:57' },
    { type: 'work', timestamp: 1644120174545, time: '06:02' },
    { type: 'work', timestamp: 1644120474545, time: '06:07' },
    { type: 'work', timestamp: 1644120774545, time: '06:12' },
    { type: 'work', timestamp: 1644121074545, time: '06:17' },
    { type: 'work', timestamp: 1644121374545, time: '06:22' },
    { type: 'work', timestamp: 1644121674545, time: '06:27' },
    { type: 'break', timestamp: 1644121974545, time: '06:32' },
    { type: 'work', timestamp: 1644122274545, time: '06:37' },
    { type: 'work', timestamp: 1644122574545, time: '06:42' },
    { type: 'break', timestamp: 1644122874545, time: '06:47' },
    { type: 'break', timestamp: 1644123174545, time: '06:52' },
    { type: 'work', timestamp: 1644123474545, time: '06:57' },
    { type: 'work', timestamp: 1644123774545, time: '07:02' },
    { type: 'work', timestamp: 1644124074545, time: '07:07' },
    { type: 'work', timestamp: 1644124374545, time: '07:12' },
    { type: 'work', timestamp: 1644124674545, time: '07:17' },
    { type: 'work', timestamp: 1644124974545, time: '07:22' },
    { type: 'work', timestamp: 1644125274545, time: '07:27' },
    { type: 'work', timestamp: 1644125574545, time: '07:32' },
    { type: 'work', timestamp: 1644125874545, time: '07:37' },
    { type: 'work', timestamp: 1644126174545, time: '07:42' },
    { type: 'work', timestamp: 1644126474545, time: '07:47' },
    { type: 'work', timestamp: 1644126774545, time: '07:52' },
    { type: 'break', timestamp: 1644127074545, time: '07:57' },
    { type: 'break', timestamp: 1644127374545, time: '08:02' },
    { type: 'work', timestamp: 1644127674545, time: '08:07' },
    { type: 'end', timestamp: 1644127974545, time: '08:12' }
  ],
  intervals: [
    {
      type: 'work',
      timestamp: 1644113574545,
      time: '04:12',
      duration: 1800
    },
    {
      type: 'break',
      timestamp: 1644115374545,
      time: '04:42',
      duration: 300
    },
    {
      type: 'work',
      timestamp: 1644115674545,
      time: '04:47',
      duration: 600
    },
    {
      type: 'break',
      timestamp: 1644116274545,
      time: '04:57',
      duration: 900
    },
    {
      type: 'work',
      timestamp: 1644117174545,
      time: '05:12',
      duration: 1500
    },
    {
      type: 'break',
      timestamp: 1644118674545,
      time: '05:37',
      duration: 600
    },
    {
      type: 'work',
      timestamp: 1644119274545,
      time: '05:47',
      duration: 2700
    },
    {
      type: 'break',
      timestamp: 1644121974545,
      time: '06:32',
      duration: 300
    },
    {
      type: 'work',
      timestamp: 1644122274545,
      time: '06:37',
      duration: 600
    },
    {
      type: 'break',
      timestamp: 1644122874545,
      time: '06:47',
      duration: 600
    },
    {
      type: 'work',
      timestamp: 1644123474545,
      time: '06:57',
      duration: 3600
    },
    {
      type: 'break',
      timestamp: 1644127074545,
      time: '07:57',
      duration: 600
    },
    {
      type: 'work',
      timestamp: 1644127674545,
      time: '08:07',
      duration: 300
    }
  ],
  scaleMap: {
    '5': [
      '04:12', '04:17', '04:22', '04:27', '04:32',
      '04:37', '04:42', '04:47', '04:52', '04:57',
      '05:02', '05:07', '05:12', '05:17', '05:22',
      '05:27', '05:32', '05:37', '05:42', '05:47',
      '05:52', '05:57', '06:02', '06:07', '06:12',
      '06:17', '06:22', '06:27', '06:32', '06:37',
      '06:42', '06:47', '06:52', '06:57', '07:02',
      '07:07', '07:12', '07:17', '07:22', '07:27',
      '07:32', '07:37', '07:42', '07:47', '07:52',
      '07:57', '08:02', '08:07', '08:12'
    ],
    '15': [
      '04:12', '04:27', '04:42',
      '04:57', '05:12', '05:27',
      '05:42', '05:57', '06:12',
      '06:27', '06:42', '06:57',
      '07:12', '07:27', '07:42',
      '07:57', '08:12'
    ],
    '30': [
      '04:12', '04:42',
      '05:12', '05:42',
      '06:12', '06:42',
      '07:12', '07:42',
      '08:12'
    ]
  },
  pages: [
    { name: '04:12', value: 0 },
    { name: '05:12', value: 0.25 },
    { name: '06:12', value: 0.5 },
    { name: '07:12', value: 0.75 },
    { name: '08:12', value: 1 }
  ]
}

const { pages, scaleMap, intervals } = timeline;
const pageValues = pages.map(page => page.value);

function Timeline() {
  const [scale, setScale] = useState(15);
  const [hours, setHours] = useState(scaleMap[scale]);

  const clientWidth = useClientWidth();
  const isMobile = isBelowBreakpoint(clientWidth, '932');

  const timelineProps = {
    intervals,
    pages,
    hours,
    setHours,
    scale,
    setScale,
    progress: 0,
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

const RegularTimeline = ({ intervals, pages, scale, setScale, hours, setHours, progress }) => {
  const timelineRef = useRef();
  const [page, setPage] = useState(0);
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

  // Update the current page while scrolling
  useEffect(() => {
    const nextPage = findClosest(scroll, pageValues);

    if (page !== nextPage && scrollTarget.value === null) {
      setPage(nextPage);
    }
  }, [scroll]);

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

  const handlePageChange = newPage => {
    setPage(newPage);
    setScrollTarget({
      value: newPage,
      smooth: true
    });
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
            // minWidth: clientWidth - monopadding
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
        pages={pages}
        page={page}
        handlePageChange={handlePageChange}
        scales={scales}
        currentScale={scale}
        handleScaleChange={handleScaleChange}
      />

    </div>
  );
};

function MobileTimeline({ intervals, scale, setScale, hours, setHours, progress }) {
  // const timelineRef = useRef();
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
        isMobile={true}
      />
      
      <div
        // ref={timelineRef}
      >
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
    </div>
  );
}
  Timeline.propTypes = {
  timeline: PropTypes.array,
  hours: PropTypes.array,
  showArrow: PropTypes.bool
};

function Hour({ children }) {
  return (
    <li className="mono-med text-gray-500 select-none">{children}</li>
  );
}
function Arrow({ type, visible, progress, isMobile }) {
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

  const visibilityStyle = visible ? "visible" : "invisible";

  return (isMobile ? (
    <div className={`${visibilityStyle} absolute left-full top-8 420:top-12 bottom-8 420:bottom-12`}>
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
    <div className={`${visibilityStyle}`}>
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
  visible: PropTypes.bool,
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

function Pagination({ pages, page, handlePageChange, scales, currentScale, handleScaleChange, isMobile }) {
  return isMobile ? (
    <div className="flex justify-center py-32 420:py-48">
      <Pages
        pages={scales}
        currentPage={currentScale}
        handlePageChange={handleScaleChange}  
      />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-24 pb-0 pt-48">
      <Pages
        pages={pages}
        currentPage={page}
        handlePageChange={handlePageChange}
      />
      <Pages
        pages={scales}
        currentPage={currentScale}
        handlePageChange={handleScaleChange}
      />
    </div>
  );
}

export default Timeline;