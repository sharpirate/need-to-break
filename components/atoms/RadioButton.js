import React from 'react';
import PropTypes from 'prop-types';

function RadioButton({ name, id, label }) {
  return (
    <div className="flex gap-6 420:gap-8 justify-center items-center">
      <div className="relative">
        <input className="outline-none peer appearance-none block w-20 h-20 420:w-24 420:h-24 rounded-20 bg-white ring-[2.5px] 420:ring-[3px] ring-inset ring-gray-400 focus-visible:ring-primary-600 checked:ring-primary-500" type="radio" name={name} id={id} />
        <span className="pointer-events-none peer-checked:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[7.5px] h-[7.5px] 420:w-[9px] 420:h-[9px] rounded-20 bg-primary-500 peer-focus-visible:bg-primary-600"/>
      </div>
      <label className="body-med text-gray-500" htmlFor={id}>{label}</label>
    </div>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};

export default RadioButton;