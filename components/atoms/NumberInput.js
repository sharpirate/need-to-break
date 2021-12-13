import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Label, { labelTypes } from './Label';


const types = {
  minus: 'minus',
  plus: 'plus'
};

export { types as numberInputTypes };


const valueToString = value => {
  return value.unit ? `${value.number} ${value.unit}` : `${value.number}`;
}
function NumberInput({ name, initial, step, min, max, unit, widthStyle, bigLabel, smallLabel, centerBig, centerSmall }) {
  const [value, setValue] = useState({ number: initial, unit: unit });
  const [stringValue, setStringValue] = useState(valueToString(value));

  useEffect(() => {
    setStringValue(valueToString(value));
  }, [value.number, value.unit])

  const handleClick = (type, step, min, max) => {
    if (type === types.plus) {
      if ((value.number + step) <= max) {
        setValue({ ...value, number: value.number + step });
      }
    } else {
      if (value.number - step >= min) {
        setValue({ ...value, number: value.number - step });
      }
    }
  }

  const handleInput = e => {
    const newValue = Number(e.target.value);

    if (!isNaN(newValue)) {
      setValue({ unit: null, number: Number(newValue) });
    }
  }

  const handleBlur = (min, max) => {
    let normalizedValue = value.number;

    if (value.number < min) {
      normalizedValue = min;
    } else if (value.number > max) {
      normalizedValue = max;
    }

    setValue({ number: normalizedValue, unit: unit })
  }

  const renderBigLabel = bigLabel ? <Label center={centerBig} as={labelTypes.label} size={labelTypes.big} fieldId={name}>{bigLabel}</Label> : null;

  const renderSmallLabel = smallLabel ? <Label center={centerSmall} as={labelTypes.label} size={labelTypes.small} fieldId={name}>{smallLabel}</Label> : null;

  return (
    <div className="inline-flex flex-col">
      {renderBigLabel}
      {renderSmallLabel}
      <div className="flex">
        <Button handleClick={() => handleClick(types.minus, step, min, max)} type={types.minus} />
        <input
          className={`font-base font-reg text-13 420:text-16 text-gray-600 text-center ${widthStyle} h-32 420:h-40 border-t-3 border-b-3 border-primary-500 outline-none`}
          type="text"
          name={name}
          id={name}
          value={stringValue}
          onChange={e => handleInput(e)}
          onBlur={() => handleBlur(min, max)}
        />
        <Button handleClick={() => handleClick(types.plus, step, min, max)} type={types.plus} />
      </div>
    </div>
  );
}

NumberInput.propTypes = {
  name: PropTypes.string,
  initial: PropTypes.number,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  unit: PropTypes.string,
  widthStyle: PropTypes.string,
  smallLabel: PropTypes.string,
  bigLabel: PropTypes.string,
  centerBig: PropTypes.bool,
  centerSmall: PropTypes.bool,
};

function Button({ type, handleClick }) {
  const baseStyle = 'flex justify-center items-center align-center w-32 h-32 420:w-40 420:h-40 bg-primary-500 outline-none focus-visible:bg-primary-600';

  let typeStyle = '';
  switch (type) {
    case types.minus:
      typeStyle = 'rounded-l-4';
      break;
    case types.plus:
      typeStyle = 'rounded-r-4';
      break;
    default:
      break;
  }

  return (
    <button onClick={handleClick} className={`${baseStyle} ${typeStyle}`}>
      <Icon type={type} />
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func
};

function Icon({ type }) {
  switch (type) {
    case types.plus:
      return (
        <svg className="w-13 h-13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect className="fill-white" y="5.25" width="14" height="3.5"/>
          <rect className="fill-white" x="8.75" width="14" height="3.5" transform="rotate(90 8.75 0)"/>
        </svg>
      );
    case types.minus:
      return (
        <svg className="w-13 h-13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect className="fill-white" width="14" height="3.5" transform="matrix(-1 0 0 1 14 5.25)"/>
        </svg> 
      );
    default:
      return null;
  }
}

Icon.propTypes = {
  type: PropTypes.string
};

export default NumberInput;