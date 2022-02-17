import PropTypes from 'prop-types';

const types = {
  primary: 'primary',
  outline: 'outline',
  delete: 'delete'
};

export { types as buttonTypes };

function Button({ type, children, disabled, handleClick, isSubmit }) {
  let style;

  switch (type) {
    case types.primary:
      style = 'text-white bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 focus-visible:bg-primary-600';
      break;
    case types.outline:
      style = 'text-primary-500 bg-white ring-5/2 ring-inset ring-primary-500 hover:text-primary-600 hover:ring-primary-600 disabled:ring-gray-300 disabled:text-gray-300 focus-visible:ring-primary-600';
      break;
    case types.delete:
      style = 'text-white bg-blocked-500 hover:bg-blocked-600 disabled:bg-gray-300 focus-visible:bg-blocked-600';
      break;
    default:
      return null;
  }

  return (
    <button type={isSubmit ? "submit" : "button"} onClick={handleClick} disabled={disabled} className={'select-none px-24 420:px-32 py-8 body-sbold rounded-4 outline-none active:scale-90' + ' ' + style}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func
};

export default Button;