import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';

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

      <ul className='absolute top-0 h-full -left-24 transform -translate-x-full 932:relative 932:left-0 932:transform-none  flex flex-col justify-between 932:m-0 932:mt-24 932:flex 932:flex-row'>
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
    <div className="absolute h-full right-0 transform translate-x-full 932:relative 932:translate-x-0">
      <svg className="relative top-64 932:top-0 932:left-64 w-16 h-16 ml-8 932:m-0 932:mb-8 420:w-20 420:h-20 932:transform 932:-rotate-90" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  )
}

Arrow.propTypes = {
  type: PropTypes.string
};

export default Timeline;