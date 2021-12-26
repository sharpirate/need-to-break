import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';
import Tab, { tabTypes } from '../atoms/Tab';
function Timeline({ intervals, hours, showArrow }) {
  return (
    <div className='relative inline-flex 932:flex flex-row-reverse justify-center 932:flex-col'>
      {showArrow ? <Arrow type={intervalTypes.work} /> : null}

        <ul className='inline-flex flex-col py-8 420:py-12 h-1472 932:p-0 932:px-sch 932:flex 932:flex-row 932:h-auto 932:w-full'>
          <Hour invisible>12</Hour>
          {intervals.map((interval, index) => (
            <Interval key={index} type={interval.type} first={index === 0} last={index === intervals.length - 1} />
            ))}
          <Hour invisible>00</Hour>
        </ul>

      <ul className='absolute top-0 h-full -left-24 -translate-x-full 932:relative 932:left-0 932:transform-none flex flex-col justify-between 932:m-0 932:mt-24 932:flex 932:flex-row'>
        {hours.map((hour, index) => (
          <Hour key={index}>{hour}</Hour>
        ))}
      </ul>

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
        {/* <Pagination pages={[
          { name: '12:00 - 14:00', url: '' },
          { name: '14:00 - 16:00', url: '' },
          { name: '16:00 - 18:00', url: '' },
          { name: '18:00 - 20:00', url: '' },
          { name: '20:00 - 22:00', url: '' },
          { name: '20:00 - 22:00', url: '' },
        ]} /> */}
        <Pagination pages={[
          { name: '0 - 2 hrs', url: '' },
          { name: '2 - 4 hrs', url: '' },
          { name: '4 - 6 hrs', url: '' },
          { name: '6 - 8 hrs', url: '' },
          { name: '8 - 10 hrs', url: '' },
          { name: '10 - 12 hrs', url: '' },
        ]} />
        {/* <Pagination pages={[
          { name: '12 PM - 2 PM', url: '' },
          { name: '2 PM - 4 PM', url: '' },
          { name: '4 PM - 6 PM', url: '' },
          { name: '6 PM - 8 PM', url: '' },
          { name: '8 PM - 10 PM', url: '' },
          { name: '10 PM - AM PM', url: '' }
        ]} /> */}
        <Pagination pages={[
          { name: '2 hours', url: '' },
          { name: '4 hours', url: '' },
        ]} />
      </div>

    </div>
  );
}

Timeline.propTypes = {
  intervals: PropTypes.array,
  hours: PropTypes.array,
  showArrow: PropTypes.bool
};

function Hour({ children, invisible }) {
  let baseStyle = 'body-med text-gray-400';

  const invisibleStyle = invisible ? 'hidden 932:block 932:invisible' : '';

  return (
    <li className={`${baseStyle} ${invisibleStyle}`}>{children}</li>
  );
}

Hour.propTypes = {
  invisible: PropTypes.bool
};

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

function Pagination({ pages }) {
  return (
    <ul className='flex'>
      {pages.map((page, index) => (
        <Tab
          key={page.url}
          type={tabTypes.pagination}
          first={index === 0}
          active={index === 0}
          last={index === pages.length - 1}
          url={page.url}
        >
          {page.name}
        </Tab>
      ))}
    </ul>
  );
}

export default Timeline;