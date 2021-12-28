import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';
import Tab, { tabTypes } from '../atoms/Tab';
function Timeline({ intervals, hours, showArrow }) {
  const [page, setPage] = useState(0);
  return (
    <div className='relative inline-flex 932:flex flex-row-reverse justify-center 932:flex-col overflow-hidden w-full'>
      {/* {showArrow && <Arrow type={intervalTypes.work} />} */}
      <div
        className="flex relative gap-64 transition-all duration-[750ms] ease-[cubic-bezier(0.5,0,0.5,1)]"
        style={{ width: `calc(${(4 * 100)}% + ${3 * 64}px)`, left: `calc(${-page * 100}% - ${page * 64}px)` }}
      >
      {/* <div onClick={() => setPage(page === 3 ? 0 : page + 1)} className="ease-[cubic-bezier(0.5,0,0.5,1)] flex transition-all duration-[1000ms]" style={{ width: `${4 * 100}%`, transform: `translateX(${-page * (100 / 4)}%)` }}> */}
        <div className="w-full">
          <ul className='inline-flex flex-col py-8 420:py-12 h-1472 932:p-0 932:px-monopad 932:flex 932:flex-row 932:h-auto 932:w-full'>
            {intervals.map((interval, index) => (
              <Interval key={index} type={interval.type} first={index === 0} last={false} />
              ))}
          </ul>

          <ul className='absolute top-0 h-full -left-24 -translate-x-full 932:relative 932:left-0 932:transform-none flex flex-col justify-between 932:m-0 932:mt-24 932:flex 932:flex-row 932:h-auto'>
            {hours.map((hour, index) => (
              <Hour key={index}>{hour}</Hour>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <ul className='inline-flex flex-col py-8 420:py-12 h-1472 932:p-0 932:px-monopad 932:flex 932:flex-row 932:h-auto 932:w-full'>
            {intervals.map((interval, index) => (
              <Interval key={index} type={interval.type} first={false} last={false} />
              ))}
          </ul>

          <ul className='absolute top-0 h-full -left-24 -translate-x-full 932:relative 932:left-0 932:transform-none flex flex-col justify-between 932:m-0 932:mt-24 932:flex 932:flex-row 932:h-auto'>
            {hours.map((hour, index) => (
              <Hour key={index}>{hour}</Hour>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <ul className='inline-flex flex-col py-8 420:py-12 h-1472 932:p-0 932:px-monopad 932:flex 932:flex-row 932:h-auto 932:w-full'>
            {intervals.map((interval, index) => (
              <Interval key={index} type={interval.type} first={false} last={false} />
              ))}
          </ul>

          <ul className='absolute top-0 h-full -left-24 -translate-x-full 932:relative 932:left-0 932:transform-none flex flex-col justify-between 932:m-0 932:mt-24 932:flex 932:flex-row 932:h-auto'>
            {hours.map((hour, index) => (
              <Hour key={index}>{hour}</Hour>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <ul className='inline-flex flex-col py-8 420:py-12 h-1472 932:p-0 932:px-monopad 932:flex 932:flex-row 932:h-auto 932:w-full'>
            {intervals.map((interval, index) => (
              <Interval key={index} type={interval.type} first={false} last={index === intervals.length - 1} />
              ))}
          </ul>

          <ul className='absolute top-0 h-full -left-24 -translate-x-full 932:relative 932:left-0 932:transform-none flex flex-col justify-between 932:m-0 932:mt-24 932:flex 932:flex-row 932:h-auto'>
            {hours.map((hour, index) => (
              <Hour key={index}>{hour}</Hour>
            ))}
          </ul>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col justify-center items-center gap-24 pt-48">
        {/* use these for mobile and when intervals are more than 5 */}
        {/* <Pagination pages={[
          { name: '1', url: '' },
          { name: '2', url: '' },
          { name: '3', url: '' },
          { name: '4', url: '' },
          { name: '5', url: '' },
          { name: '6', url: '' },
        ]} /> */}
        <Pagination pages={[
          { name: '12:00 - 14:00', url: '' },
          { name: '14:00 - 16:00', url: '' },
          { name: '16:00 - 18:00', url: '' },
          { name: '18:00 - 20:00', url: '' },
        ]}  currentPage={page} setCurrentPage={index => setPage(index)} />
        {/* <Pagination pages={[
          { name: '0 - 2 hrs', url: '' },
          { name: '2 - 4 hrs', url: '' },
          { name: '4 - 6 hrs', url: '' },
          { name: '6 - 8 hrs', url: '' },
          { name: '8 - 10 hrs', url: '' },
          { name: '10 - 12 hrs', url: '' },
        ]} /> */}
        {/* <Pagination pages={[
          { name: '12 PM - 2 PM', url: '' },
          { name: '2 PM - 4 PM', url: '' },
          { name: '4 PM - 6 PM', url: '' },
          { name: '6 PM - 8 PM', url: '' },
        ]} currentPage={page} setCurrentPage={index => setPage(index)} /> */}
        <Pagination pages={[
          { name: '2 hours', url: '' },
          { name: '4 hours', url: '' },
        ]} currentPage={0} setCurrentPage={index => {}} />
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
function Arrow({ type }) {
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
  return (
    <div className="absolute h-full right-0 translate-x-full 932:relative 932:translate-x-0">
      <svg className="relative top-64 932:top-0 932:left-64 w-16 h-16 ml-8 932:m-0 932:mb-8 420:w-20 420:h-20 932:-rotate-90" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  )
}

Arrow.propTypes = {
  type: PropTypes.string
};

function Pagination({ pages, currentPage, setCurrentPage }) {
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
          handleClick={setCurrentPage.bind(this, index)}
        >
          {page.name}
        </Tab>
      ))}
    </ul>
  );
}

export default Timeline;