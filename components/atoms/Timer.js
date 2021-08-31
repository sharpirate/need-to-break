import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Timer() {
  const [arc, setArc] = useState(439.6);

  return (
    <div className="relative">
      <svg className="w-160 h-160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className="stroke-current text-primary-300" fill="none" cx="80" cy="80" r="70" strokeWidth="20"/>
        <circle style={{ strokeDasharray: `${arc}, 439.6` }} className="stroke-current text-primary-500 origin-center transform -scale-y-1 rotate-90" fill="none" cx="80" cy="80" r="70" strokeWidth="20"/>
      </svg>
    </div>
  );
}

Timer.propTypes = {

};

export default Timer;