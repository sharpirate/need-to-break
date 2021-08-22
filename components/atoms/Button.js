import PropTypes from 'prop-types';

export const types = {
  primary: 'primary',
  outline: 'outline',
};

function Button({ type, children, disabled }) {
  let style;

  switch (type) {
    case types.primary:
      style = 'text-white bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300';
      break;
      case types.outline:
      style = 'text-primary-500 bg-white ring ring-primary-500 hover:text-primary-600 hover:ring-primary-600 disabled:ring-gray-300 disabled:text-gray-300';
      break;
    default:
      return null;
  }

  return (
    <button disabled={disabled} className={'px-24 360:px-32 py-8 font-base font-sbold text-13 360:text-16 rounded-4 tracking-2 focus:outline-none focus:ring focus:ring-primary-600 ring-inset active:transform active:scale-90' + ' ' + style}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;