import PropTypes from 'prop-types';
import Link from 'next/link';

export const types = {
  auth: 'auth',
  main: 'main'
};

function Tab({ children, type, selected, first, last }) {
  return (
    <li>
      <Link href="/">
        <a className={getStyle(type, selected, first, last)}>{children}</a>
      </Link>
    </li>
  );
}

Tab.propTypes = {
  type: PropTypes.string,
  selected: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool
};

function getStyle(type, selected, first, last) {
  switch (type) {
    case types.auth:
      return getAuthStyle(selected, first, last);
    case types.main:
      return getMainStyle(selected, first, last);
    default:
      return '';
  }
}

function getAuthStyle(selected, first, last) {
  let baseStyle = 'block text-center text-13 360:text-16 font-base font-sbold tracking-2 py-8 px-24 360:px-32 border-t-2 border-b-2 border-r-2 border-primary-500';

  let selectedStyle = '';
  
  if (selected) {
    selectedStyle = 'bg-primary-500 text-white';
  } else {
    selectedStyle = 'bg-white text-primary-500';
  }

  let borderStyle = '';

  if (first) {
    borderStyle = 'border-2 rounded-l-20';
  } else if (last) {
    borderStyle = 'border-2 border-l-0 rounded-r-20';
  }

  return `${baseStyle} ${selectedStyle} ${borderStyle}`;
}

function getMainStyle(selected, first, last) {
  let baseStyle = 'block text-center text-13 text-white font-base font-med tracking-2 p-6 border-b border-white 420:p-8 420:text-16 732:font-sbold 732:py-8 732:px-32 732:border-t-2 732:border-b-2 732:border-r-2 732:border-primary-500';

  let selectedStyle = '';
  
  if (selected) {
    selectedStyle = 'border-opacity-100 732:bg-primary-500 732:text-white';
  } else {
    selectedStyle = 'border-opacity-0 732:border-opacity-100 732:bg-white 732:text-primary-500';
  }
  
  let borderStyle = '';

  if (first) {
    borderStyle = '732:border-2 732:rounded-l-20';
  } else if (last) {
    borderStyle = '732:border-2 732:border-l-0 732:rounded-r-20';
  }

  return `${baseStyle} ${selectedStyle} ${borderStyle}`;
}

export default Tab;