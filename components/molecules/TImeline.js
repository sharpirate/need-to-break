import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';
import Tab, { tabTypes } from '../atoms/Tab';
function Timeline({ timeline, hours, progress }) {
  const [page, setPage] = useState(0);

  const timelineProps = {
    timeline,
    hours,
    page,
    progress: 50,
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

function RegularTimeline({ timeline, hours, page, handlePageChange, progress }) {
  return (
    <div> 
      <div
        id="timeline"
        tabIndex="0"
        className="flex flex-col overflow-x-auto pb-64 custom-scroll scroll-smooth"
      >
        <div
          className="flex relative transition-all duration-500 ease-in-out min-w-full"
          style={{
            width: `${(156 * (hours.length - 1))}px`,
          }}
          // (label width in px * 3) * (number of labels - 1)
        >
          <div className="w-full">
            <Arrow
              isMobile={false}
              visible={true}
              type={intervalTypes.work}
              progress={progress}
            />

            <ul className='flex flex-row px-monopad'>
              {timeline.map((interval, index) => (
                <Interval key={index} type={interval} first={index === 0} last={index === timeline.length - 1} />
                ))}
            </ul>

            <ul className='flex flex-row justify-between mt-24'>
              {hours.map((hour, index) => (
                <Hour key={index}>{hour}</Hour>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Pagination
        intervals={[
          { name: '12:00', url: '' },
        ]}
        currentInterval={page}
        handleIntervalChange={handlePageChange}
        scales={[
          { name: '5 min', url: '' },
          { name: '15 min', url: '' },
          { name: '30 min', url: '' },
        ]}
        currentScale={0}
        handleScaleChange={() => {}}
      />

    </div>
  );
}

function MobileTimeline({ timeline, hours, page, handlePageChange, progress }) {
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
      
      <div className='border-blocked-500 relative inline-flex flex-row-reverse justify-center'>
        <Arrow
          isMobile={true}
          visible={true}
          type={intervalTypes.work}
          progress={progress}
        />

        <ul className='inline-flex flex-col h-1472 py-8 420:py-12'>
          {timeline.map((interval, index) => (
            <Interval key={index} type={interval.type} first={false} last={false} />
            ))}
        </ul>

        <ul className='absolute top-0 h-full -left-16 420:-left-24 -translate-x-full flex flex-col justify-between'>
          {hours.map((hour, index) => (
            <Hour key={index}>{hour}</Hour>
          ))}
        </ul>
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
    <div className={`${visibilityStyle} mx-monopad`}>
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
    <div className="flex flex-col justify-center items-center gap-16 420:gap-24 pb-32 420:pb-48 932:pb-0 932:pt-48">
      {/* <Pages
        pages={intervals}
        currentPage={currentInterval}
        handlePageChange={handleIntervalChange}
      /> */}

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