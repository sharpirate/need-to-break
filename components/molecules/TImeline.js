import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';
import Tab, { tabTypes } from '../atoms/Tab';
function Timeline({ intervals, hours, showArrow }) {
  const [page, setPage] = useState(0);

  const timelineProps = {
    intervals,
    hours,
    page,
    handlePageChange: index => setPage(index)
  };

  return (
    <>
      {/* render MobileTimeline for screens smaller than 932px */}
      <div className="block 932:hidden">
        <MobileTimeline
          {...timelineProps}
        />
      </div>

      {/* render RegularTimeline for screens larger than 932px */}
      <div className="hidden 932:block">
        <RegularTimeline
          {...timelineProps}
        />
      </div>
    </>
  );
}

function RegularTimeline({ intervals, hours, page, handlePageChange }) {
  return (
    <div className="flex flex-col overflow-hidden">
      <div
        className="flex relative gap-64 transition-all duration-700 ease-[cubic-bezier(0.5,0,0.5,1)]"
        style={{ width: `calc(${(4 * 100)}% + ${3 * 64}px)`, left: `calc(${-page * 100}% - ${page * 64}px)` }}
      >
        {[1, 2, 3, 4].map((item) => (
          <div className="w-full">
            <Arrow
              visible={item === 1}
              type={intervalTypes.work}
            />

            <ul className='flex flex-row px-monopad'>
              {intervals.map((interval, index) => (
                <Interval key={index} type={interval.type} first={index === 0} last={false} />
                ))}
            </ul>

            <ul className='flex flex-row justify-between mt-24'>
              {hours.map((hour, index) => (
                <Hour key={index}>{hour}</Hour>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Pagination
        intervals={[
          { name: '12:00 - 14:00', url: '' },
          { name: '14:00 - 16:00', url: '' },
          { name: '16:00 - 18:00', url: '' },
          { name: '18:00 - 20:00', url: '' },
        ]}
        currentInterval={page}
        handleIntervalChange={handlePageChange}
        scales={[
          { name: '2 hours', url: '' },
          { name: '4 hours', url: '' },
        ]}
        currentScale={0}
        handleScaleChange={() => {}}
      />
    </div>
  );
}

function MobileTimeline({ intervals, hours, page, handlePageChange }) {
  return (
    <div>
      <Pagination
        intervals={[
          { name: '1', url: '' },
          { name: '2', url: '' },
          { name: '3', url: '' },
          { name: '4', url: '' },
        ]}
        currentInterval={page}
        handleIntervalChange={handlePageChange}
        scales={[
          { name: '2 hours', url: '' },
          { name: '4 hours', url: '' },
        ]}
        currentScale={0}
        handleScaleChange={() => {}}
      />
      
      <div className='relative inline-flex flex-row-reverse justify-center'>
        <Arrow
          visible={true}
          type={intervalTypes.work}
        />

        <ul className='inline-flex flex-col py-8 420:py-12 h-1472'>
          {intervals.map((interval, index) => (
            <Interval key={index} type={interval.type} first={index === 0} last={index === intervals.length - 1} />
            ))}
        </ul>

        <ul className='absolute top-0 h-full -left-24 -translate-x-full flex flex-col justify-between'>
          {hours.map((hour, index) => (
            <Hour key={index}>{hour}</Hour>
          ))}
        </ul>
      </div>
    </div>
  );
}
  Timeline.propTypes = {
  intervals: PropTypes.array,
  hours: PropTypes.array,
  showArrow: PropTypes.bool
};

function Hour({ children }) {
  return (
    <li className="mono-med text-gray-400">{children}</li>
  );
}
function Arrow({ type, visible, progress }) {
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

  let visibilityStyle = visible ? "visible" : "invisible";

  return (
    <div className={`${visibilityStyle} absolute h-full right-0 translate-x-full 932:h-auto 932:relative 932:translate-x-0 932:mx-monopad`}>
      <svg className="relative top-64 932:top-0 932:left-64 w-16 h-16 ml-8 932:m-0 932:mb-8 420:w-20 420:h-20 932:-rotate-90" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  )
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
          key={page.url}
          type={tabTypes.pagination}
          first={index === 0}
          active={index === currentPage}
          last={index === pages.length - 1}
          url={page.url}
          handleClick={handlePageChange.bind(this, index)}
        >
          {page.name}
        </Tab>
      ))}
    </ul>
  );
}

function Pagination({ intervals, currentInterval, handleIntervalChange, scales, currentScale, handleScaleChange }) {
  return (
    <div className="flex flex-col justify-center items-center gap-24 pb-48 932:pb-0 932:pt-48">
      <Pages
        pages={intervals}
        currentPage={currentInterval}
        handlePageChange={handleIntervalChange}
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

// TODO: improve timeline styling from 320 to 420
// TODO: Render component conditionally at 932 BP (tailwind config)