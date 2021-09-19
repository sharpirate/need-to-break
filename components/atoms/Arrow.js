import PropTypes from 'prop-types';

const types = {
  down: 'down',
  left: 'left',
  right: 'right',
  up: 'up',

  small: '50',
  reg: '100',

  active: 'active',
  default: 'default',
  disabled: 'disabled'
};

export { types as arrowTypes };

function Arrow({ type, size, state }) {
  return resolveArrow(type, size, state);
}

Arrow.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  state: PropTypes.string,
};

function resolveArrow(type, size, state) {
  let sizeStyle = '';

  switch (size) {
    case types.small:
      sizeStyle = 'w-13 h-13 420:w-16 420:h-16';
      break
      case types.reg:
      sizeStyle = 'w-16 h-16 420:w-24 420:h-24';
      break;
    default:
      return null;
  }

  let typeStyle = '';

  switch (type) {
    case types.down:
      break;
    case types.left:
      typeStyle = 'transform rotate-90'
      break;
    case types.right:
      typeStyle = 'transform -rotate-90'
      break;
    case types.up:
      typeStyle = 'transform rotate-180'
      break;
    default:
      return null;
  }

  let colorStyle = '';

  switch (state) {
    case types.active:
      colorStyle = 'fill-current text-primary-500 group-focus-visible:text-primary-600'
      break;
    case types.default:
      colorStyle = 'fill-current text-gray-400'
      break;
    case types.disabled:
      colorStyle = 'fill-current text-gray-300'
      return null;
  }

  return (
    <svg className={sizeStyle + ' ' + typeStyle} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={colorStyle} fillRule="evenodd" clipRule="evenodd" d="M16 3.38117L8 12.6188L0 3.38117H2.87253L8.00009 9.30197L13.1277 3.38117H16Z"/>
    </svg>
  );
}

export default Arrow;