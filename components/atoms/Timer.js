import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { intervalTypes } from '../atoms/Interval';
function Timer({ type }) {
  const [arc, setArc] = useState(439.6 * .75);

  let ringColor = '';
  let primaryColor = '';
  let accentColor = '';

  switch (type) {
    case intervalTypes.work:
      primaryColor = 'stroke-primary-500';
      accentColor = 'text-primary-600';
      ringColor = 'stroke-primary-300';
      break;
    case intervalTypes.break:
      primaryColor = 'stroke-primary-400';
      accentColor = 'text-primary-600';
      ringColor = 'stroke-primary-300';
      break;
    case intervalTypes.blocked:
      primaryColor = 'stroke-blocked-500';
      accentColor = 'text-blocked-600';
      ringColor = 'stroke-blocked-300';
      break;
    case intervalTypes.floating:
      primaryColor = 'stroke-blocked-400';
      accentColor = 'text-blocked-600';
      ringColor = 'stroke-blocked-300';
      break;
    default:
      break;
  }

  return (
    <div className="relative inline-block">
      <svg className="w-130 h-130 420:w-160 420:h-160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className={ringColor} fill="none" cx="80" cy="80" r="70" strokeWidth="20"/>
        <circle style={{ strokeDasharray: `${arc}, 439.6` }} className={`${primaryColor} origin-center -scale-y-1 rotate-90`} fill="none" cx="80" cy="80" r="70" strokeWidth="20"/>
      </svg>
      <div className="absolute flex flex-col justify-center align-middle select-none text-center w-100 420:w-120 h-100 420:h-120 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <span className={`font-display text-50 420:text-64 tracking-2 ${accentColor}`}>45</span>
        <span className={`absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-3/7 font-bold text-16 420:text-20 tracking-2 ${accentColor}`}>MIN</span>
      </div>
    </div>
  );
}

Timer.propTypes = {
  type: PropTypes.string
};

export default Timer;