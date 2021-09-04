import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';

function Timeline({ intervals, hours, showArrow }) {
  return (
    <div className='flex flex-row-reverse 900:flex-col'>
      {showArrow ? <Arrow type='blocked' /> : null}

      <ul className='inline-flex flex-col py-8 420:py-12 h-1472 900:p-0 900:px-sch 900:flex 900:flex-row 900:h-auto 900:w-full'>
        <Hour invisible>12</Hour>
        {intervals.map((interval, index) => (
          <Interval key={index} type={interval.type} first={index === 0} last={index === intervals.length - 1} />
          ))}
        <Hour invisible>00</Hour>
      </ul>

      <ul className='flex flex-col mr-24 justify-between 900:m-0 900:mt-24 900:flex 900:flex-row'>
        {hours.map((hour, index) => (
          <Hour key={index}>{hour}</Hour>
        ))}
      </ul>
    </div>
  );
}

Timeline.propTypes = {
  intervals: PropTypes.array,
  hours: PropTypes.array,
  showArrow: PropTypes.bool
};

function Hour({ children, invisible }) {
  let baseStyle = 'tracking-2 font-base font-med text-gray-400 text-13 420:text-16';

  const invisibleStyle = invisible ? 'hidden 900:block 900:invisible' : '';

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
      colorStyle = 'fill-current text-primary-500';
      break;
    case intervalTypes.blocked:
    case intervalTypes.floating:
    colorStyle = 'fill-current text-blocked-500';
      break;
    default:
      break;
  }

  return (
    <svg className="relative top-64 900:top-0 900:left-64 w-16 h-16 ml-8 900:m-0 900:mb-8 420:w-20 420:h-20 900:transform 900:-rotate-90" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
    </svg>
  )
}

Arrow.propTypes = {
  type: PropTypes.string
};

export default Timeline;