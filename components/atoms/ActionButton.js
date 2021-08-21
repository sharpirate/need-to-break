import PropTypes from 'prop-types';

function ActionButton({ type }) {
  return getStyledButton(type);
}

function getStyledButton(type) {
  let colorStyle = '';
  let baseStyle = 'w-20 h-20 420:w-24 420:h-24';

  switch (type) {
    case 'add':
      colorStyle = "fill-current text-primary-500";
      break;
      case 'remove':
      colorStyle = "fill-current text-support-error";
      baseStyle += " transform rotate-45";
      break;
    default:
      break;
  }

  return (
    <svg className={baseStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle className={colorStyle} cx="12" cy="12" r="12"/>
    <path className="fill-current text-white" fillRule="evenodd" className="fill-current text-white" clipRule="evenodd" d="M13.6252 10.375V5.5L10.3752 5.5L10.3752 10.375H5.50024V13.625H10.3752L10.3752 18.5H13.6252V13.625H18.5002V10.375H13.6252Z"/>
    </svg>
  );
}

ActionButton.propTypes = {
  type: PropTypes.string
};

export default ActionButton;