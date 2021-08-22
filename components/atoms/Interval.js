import PropTypes from 'prop-types';

function Interval({ type, first, last }) {
  return <li className={getStyle(type, first, last)} />
}

function getStyle(type, first, last) {
  let baseStyle = 'block h-full w-32 420:w-40 900:w-full 900:h-32 1172:h-40';

  let colorStyle = '';

  switch (type) {
    case 'work':
      colorStyle = 'bg-primary-500';
      break;
    case 'break':
      colorStyle = 'bg-primary-400';
      break;
    case 'blocked':
      colorStyle = 'bg-blocked-500';
      break;
    case 'floating':
      colorStyle = 'bg-blocked-400';
      break;
    default:
      break;
  }

  let borderStyle = '';

  if (first) {
    borderStyle = 'rounded-t-20 900:rounded-0 900:rounded-l-20';
  } else if (last) {
    borderStyle = 'rounded-b-20 900:rounded-0 900:rounded-r-20 ';
  }

  return `${baseStyle} ${colorStyle} ${borderStyle}`;
}

Interval.propTypes = {
  type: PropTypes.string,
  first: PropTypes.bool,
  last: PropTypes.bool
};

export default Interval;