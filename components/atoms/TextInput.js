import PropTypes from 'prop-types';
import Label, { types as labelTypes } from './Label';

const types = {
  text: 'text',
  password: 'password',
  email: 'email'
}

export { types as textInputTypes };
function TextInput({ name, type, bigLabel, smallLabel, successLabel, errorLabel, children, value, disabled }) {
  const renderBigLabel = bigLabel ? <Label as={labelTypes.label} size={labelTypes.big} fieldId={name}>{bigLabel}</Label> : null;

  const renderSmallLabel = smallLabel ? <Label as={labelTypes.label} size={labelTypes.small} fieldId={name}>{smallLabel}</Label> : null;

  const renderSuccessLabel = successLabel ? <Label as={labelTypes.label} size={labelTypes.status} type={labelTypes.success} fieldId={name}>{successLabel}</Label> : null;

  const renderErrorLabel = errorLabel ? <Label as={labelTypes.label} size={labelTypes.status} type={labelTypes.error} fieldId={name}>{errorLabel}</Label> : null;

  return (
    <div className='flex flex-col'>
      {renderBigLabel}
      {renderSmallLabel}
      <input disabled={disabled} className={getStyle(false, false)} placeholder={children} type={type} id={name} name={name} value={value} />
      {renderSuccessLabel}
      {renderErrorLabel}
    </div>
  );
}

function getStyle(error, success) {
  const baseStyle = 'tracking-2 text-gray-600 placeholder-gray-400 font-base font-reg text-13 420:text-16 w-220 p-8 ring-2 ring-inset rounded-4';
  const focusStyle = 'focus:outline-none focus:ring-primary-500';
  const disabledStyle = 'disabled:bg-white disabled:ring-gray-300 disabled:placeholder-gray-300';

  let ringColor = '';

  if (error) {
    ringColor = 'ring-support-error';
  } else if (success) {
    ringColor = 'ring-support-success';
  } else {
    ringColor = 'ring-gray-400';
  }

  return `${baseStyle} ${ringColor} ${focusStyle} ${disabledStyle}`;
}

TextInput.propTypes = {
  name: PropTypes.string,
  bigLabel: PropTypes.string,
  smallLabel: PropTypes.string,
  successLabel: PropTypes.string,
  errorLabel: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool
}

export default TextInput;