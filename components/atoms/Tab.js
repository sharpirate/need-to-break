import PropTypes from 'prop-types';
import Link from 'next/link';

const types = {
  authNav: 'authNav',
  mainNav: 'mainNav',
  pagination: 'pagination'
};

export { types as tabTypes };
function Tab({ children, type, active, first, last, url, handleClick }) {
  let tab;

  if (type === types.pagination) {
    tab = (
      <li>
        <button className={getStyle(type, active, first, last)} onClick={handleClick}>{children}</button>
      </li>
    );
  } else {
    tab = (
      <li>
        <Link href={url}>
          <a className={getStyle(type, active, first, last)}>{children}</a>
        </Link>
      </li>
    );
  }

  return tab;
}

Tab.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  url: PropTypes.string,
  handleClick: PropTypes.func
};

function getStyle(type, active, first, last) {
  switch (type) {
    case types.authNav:
      return getAuthNavStyle(active, first, last);
    case types.mainNav:
      return getMainNavStyle(active, first, last);
    case types.pagination:
      return getPaginationStyle(active, first, last);
    default:
      return '';
  }
}

function getAuthNavStyle(active, first, last) {
  let baseStyle = 'block outline-none text-center body-sbold py-8 px-24 420:px-32 border-t-2 border-b-2 border-r-2 border-primary-500 focus-visible:bg-primary-600 focus-visible:text-white';

  let activeStyle = '';
  
  if (active) {
    activeStyle = 'bg-primary-500 text-white';
  } else {
    activeStyle = 'bg-white text-primary-500';
  }

  let borderStyle = '';

  if (first) {
    borderStyle = 'border-2 rounded-l-20';
  } else if (last) {
    borderStyle = 'border-2 border-l-0 rounded-r-20';
  }

  return `${baseStyle} ${activeStyle} ${borderStyle}`;
}

function getMainNavStyle(active, first, last) {
  let baseStyle = 'block outline-none text-center text-white body-med p-6 border-b border-white 420:p-8 420:text-16 732:font-sbold 732:py-8 732:px-32 732:border-t-2 732:border-b-2 732:border-r-2 732:border-primary-500 732:focus-visible:bg-primary-600 732:focus-visible:text-white';

  let activeStyle = '';
  
  if (active) {
    activeStyle = 'border-opacity-100 732:bg-primary-500 732:text-white';
  } else {
    activeStyle = 'border-opacity-0 732:border-opacity-100 732:bg-white 732:text-primary-500';
  }
  
  let borderStyle = '';

  if (first) {
    borderStyle = '732:border-2 732:rounded-l-20';
  } else if (last) {
    borderStyle = '732:border-2 732:border-l-0 732:rounded-r-20';
  }

  return `${baseStyle} ${activeStyle} ${borderStyle}`;
}

function getPaginationStyle(active, first, last) {
  let baseStyle = 'block outline-none text-center body-sbold py-2 420:py-0 px-8 border-t-2 border-b-2 border-r-2 border-primary-500 focus-visible:bg-primary-600 focus-visible:text-white';

  let activeStyle = '';
  
  if (active) {
    activeStyle = 'bg-primary-500 text-white';
  } else {
    activeStyle = 'bg-white text-primary-500';
  }

  let borderStyle = '';

  if (first) {
    borderStyle = 'border-2 rounded-l-4';
  } else if (last) {
    borderStyle = 'border-2 border-l-0 rounded-r-4';
  }

  return `${baseStyle} ${activeStyle} ${borderStyle}`;
}

export default Tab;