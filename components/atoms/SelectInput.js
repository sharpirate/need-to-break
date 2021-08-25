import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SelectItem from './SelectItem';

function Icon({ active }) {
  const wrapperStyle = active ? 'transform rotate-180' : '';
  const iconStyle = active ? 'text-primary-500' : 'text-gray-400';

  return (
    <span className="pt-4 absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
      <svg className={`w-13 h-13 420:w-16 420:h-16 ${wrapperStyle}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={`fill-current group-hover:text-primary-500 group-focus:text-primary-500 ${iconStyle}`} fillRule="evenodd" clipRule="evenodd" d="M16 3.38117L8 12.6188L0 3.38117H2.87253L8.00009 9.30197L13.1277 3.38117H16Z"/>
      </svg>
    </span>
  );
};

Icon.propTypes = {
  active: PropTypes.bool
};

// const options = [
//   { name: '30 min', value: 30 },
//   { name: '35 min', value: 35 },
//   { name: '40 min', value: 40 },
//   { name: '45 min', value: 45 },
//   { name: '50 min', value: 50 },
// ];
const options = [
  { name: '00', value: 0 },
  { name: '01', value: 1 },
  { name: '02', value: 2 },
  { name: '03', value: 3 },
  { name: '04', value: 4 },
  { name: '05', value: 5 },
  { name: '06', value: 6 },
  { name: '07', value: 7 },
  { name: '08', value: 8 },
  { name: '09', value: 9 },
  { name: '10', value: 10 },
  { name: '11', value: 11 },
  { name: '12', value: 12 },
  { name: '13', value: 13 },
  { name: '14', value: 14 },
  { name: '15', value: 15 },
  { name: '16', value: 16 },
  { name: '17', value: 17 },
  { name: '18', value: 18 },
  { name: '19', value: 19 },
  { name: '20', value: 20 },
  { name: '21', value: 21 },
  { name: '22', value: 22 },
  { name: '23', value: 23 },

];

function SelectInput() {
  const [active, setActive] = useState(false);
  // manage the focused item by index
  const [focused, setFocused] = useState(0);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef(null);

  useEffect(() => {
    if (active) {
      // detect outside click when dropdown is open
      document.addEventListener('click', () => {
        exitMenu(true);
      })
    }
  }, [active]);

  function handleMenuKeyPress(e) {
    if (e.key === 'Enter') {
      setActive(true);
    }
  }

  function exitMenu(blur = false) {
    setFocused(0);
    setActive(false);
    
    if (ref && ref.current) {
      
      if (blur) {
        ref.current.blur();
      } else {
        ref.current.focus();
      }
    }
  }

  function handleItemKeyDown(e, value) {
    let newFocusedIndex;

    switch (e.key) {
      case 'ArrowDown':
        newFocusedIndex = focused + 1 === options.length - 1 ? 0 : focused + 1;
        setFocused(newFocusedIndex);
        break;
      case 'ArrowUp':
        newFocusedIndex = focused - 1 === -1 ? options.length - 2 : focused - 1;
        setFocused(newFocusedIndex);
        break;
      case 'Escape':
      case 'Tab':
        exitMenu();
        break;
      case 'Enter':
        setSelected(options.find(option => option.value === value));
        exitMenu();
      default:
        break;
    }
  }

  function handleItemClick(value) {
    setSelected(options.find(option => option.value === value));
    exitMenu(true);
  }

  function getRootItemStyle(active) {
    const baseStyle = 'group relative p-8 border-2 focus:outline-none focus:border-primary-500 hover:border-primary-500';
    const activeStyle = active ? 'rounded-t-4 border-primary-500 border-b-0' : 'border-gray-400 rounded-4';

    return `${baseStyle} ${activeStyle}`;
  }

  return (
    <ul onClick={e => e.stopPropagation()} className="select-none cursor-default w-96 font-base font-reg text-13 420:text-16 text-gray-600">
      <li
        tabIndex="0"
        ref={ref}
        onClick={() => active ? exitMenu(true) : setActive(true)}
        onKeyDown={handleMenuKeyPress}
        className={getRootItemStyle(active)}
      >
        {selected.name}
        <Icon active={active} />
      </li>

      {active ? 
        (<li className="relative">
          <ul className="absolute w-full border-primary-500">
            {options.filter(option => option.value !== selected.value).map((option, index) => (
              <SelectItem
                key={option.value}
                value={option.value}
                focused={index === focused}
                handleKeyDown={handleItemKeyDown}
                handleClick={handleItemClick}
              >
                {option.name}
              </SelectItem>
            ))}
          </ul>
        </li>) : null}
    </ul>
  );
}

SelectInput.propTypes = {
  options: PropTypes.array
};

export default SelectInput;