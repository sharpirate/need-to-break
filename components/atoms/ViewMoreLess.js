import React from 'react';
import PropTypes from 'prop-types';
import useClientWidth from '../../utils/useClientWidth';
import { isBelowBreakpoint } from '../../utils/tailwindUtil';
import Arrow, { arrowTypes } from './Arrow';
import { AnimatePresence, motion } from 'framer-motion';
import { TRANSITIONS } from '../../utils/constants';

const variants = {
  initial: {
    height: 0,
  },
  enter: {
    height: "auto",
    transition: TRANSITIONS.spring500
  },
  exit: {
    height: 0,
    transition: TRANSITIONS.spring500
  }
}
function ViewMoreLess({ viewMoreText, viewLessText, children, isTimeline, handleClick, active }) {
  const clientWidth = useClientWidth();
  const isMobile = isBelowBreakpoint(clientWidth, '932');

  const buttonStyle = `${isTimeline ? '932:hidden' : ''}`;

  let content;

  if (!isTimeline || (isTimeline && isMobile)) {
    content = active ? (
      <motion.div
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="overflow-hidden w-full"
      >
        {children}
      </motion.div>
    ) : null;
  } else if (isTimeline && !isMobile) {
    content = children;
  }

  return (
    <>
      <button 
        className={`flex justify-center items-center gap-6 420:gap-8 body-sbold text-primary-500 focus-visible:text-primary-600 group outline-none ${buttonStyle}`}
        onClick={handleClick}
        type="button"
        >
        {active ? viewLessText : viewMoreText}
        <div className="pt-4">
          <Arrow type={active ? arrowTypes.up : arrowTypes.down} size={arrowTypes.small} state={arrowTypes.active} />
        </div>
      </button>

      <AnimatePresence>
        {content}
      </AnimatePresence>
    </>
  );
}

ViewMoreLess.propTypes = {
  viewMoreText: PropTypes.string,
  viewLessText: PropTypes.string,
  isTimeline: PropTypes.bool
};

export default ViewMoreLess;