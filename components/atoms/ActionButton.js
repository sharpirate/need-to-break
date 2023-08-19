import PropTypes from "prop-types";

const types = {
  add: "add",
  remove: "remove",
};

export { types as actionButtonTypes };

function ActionButton({ type, handleClick }) {
  return getStyledButton(type, handleClick);
}

ActionButton.propTypes = {
  type: PropTypes.string,
};

function getStyledButton(type, handleClick) {
  let colorStyle = "";
  let baseStyle = "w-20 h-20 420:w-24 420:h-24";

  switch (type) {
    case types.add:
      colorStyle = "fill-primary-500 group-focus-visible:fill-primary-600";
      break;
    case types.remove:
      colorStyle = "fill-support-error group-focus-visible:fill-blocked-600";
      baseStyle += " rotate-45";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={() => handleClick(type)}
      className="appearance-none outline-none group"
    >
      <svg
        className={baseStyle}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className={colorStyle} cx="12" cy="12" r="12" />
        <path
          className="fill-white"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.6252 10.375V5.5L10.3752 5.5L10.3752 10.375H5.50024V13.625H10.3752L10.3752 18.5H13.6252V13.625H18.5002V10.375H13.6252Z"
        />
      </svg>
    </button>
  );
}

ActionButton.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
};

export default ActionButton;
