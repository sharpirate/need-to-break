import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Arrow, { arrowTypes } from './Arrow';

function ViewMore({ activeText, inactiveText, children }) {
  const [active, setActive] = useState(false);

  return (
    <>
      <button 
        className="flex justify-center items-center gap-6 420:gap-8 font-base text-13 420:text-16 font-sbold tracking-2 text-primary-500 outline-none "
        onClick={() => setActive(!active)}
        >
        {active ? activeText : inactiveText}
        <div className="pt-4">
          <Arrow type={active ? arrowTypes.up : arrowTypes.down} size={arrowTypes.small} state={arrowTypes.active} />
        </div>
      </button>
      {active ? children : null}
    </>
  );
}

ViewMore.propTypes = {
  activeText: PropTypes.string,
  inactiveText: PropTypes.string
};

export default ViewMore;