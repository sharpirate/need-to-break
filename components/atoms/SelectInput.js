import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectItem from "./SelectItem";
import Label, { labelTypes } from "./Label";

function Icon({ active, hasSuccess }) {
  const wrapperStyle = active ? "rotate-180" : "";

  let iconStyle;

  if (active) {
    iconStyle = "fill-primary-500";
  } else if (hasSuccess) {
    iconStyle = "fill-support-success";
  } else {
    iconStyle = "fill-gray-400";
  }

  return (
    <span className="pt-4 absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg
        className={`w-13 h-13 420:w-16 420:h-16 ${wrapperStyle}`}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={`group-hover:fill-primary-500 group-focus:fill-primary-500 ${iconStyle}`}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 3.38117L8 12.6188L0 3.38117H2.87253L8.00009 9.30197L13.1277 3.38117H16Z"
        />
      </svg>
    </span>
  );
}

Icon.propTypes = {
  active: PropTypes.bool,
};

function SelectInput({
  name,
  options,
  bigLabel,
  smallLabel,
  centerBig,
  centerSmall,
  widthStyle,
  disableFocus,
  selected,
  handleSelect,
  hasSuccess,
}) {
  const [active, setActive] = useState(false);
  // manage the focused item by index
  const [focused, setFocused] = useState(0);
  const [sortedOptions, setSortedOptions] = useState(options);
  const ref = useRef(null);

  useEffect(() => {
    setSortedOptions(options);
  }, [options]);

  useEffect(() => {
    const selectedIndex = options.findIndex(
      (option) => option.value === selected,
    );
    const firstHalf = options.slice(0, selectedIndex);
    const secondHalf = options.slice(selectedIndex + 1);

    setSortedOptions([...secondHalf, ...firstHalf]);
  }, [selected]);

  useEffect(() => {
    if (active) {
      // detect outside click when dropdown is open
      document.addEventListener("click", () => {
        exitMenu(true);
      });
    }
  }, [active]);

  function handleMenuKeyPress(e) {
    if (e.key === "Enter") {
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
      case "ArrowDown":
        newFocusedIndex =
          focused + 1 === sortedOptions.length - 1 ? 0 : focused + 1;
        setFocused(newFocusedIndex);
        break;
      case "ArrowUp":
        newFocusedIndex =
          focused - 1 === -1 ? sortedOptions.length - 2 : focused - 1;
        setFocused(newFocusedIndex);
        break;
      case "Escape":
      case "Tab":
        exitMenu();
        break;
      case "Enter":
        handleSelect(
          sortedOptions.find((option) => option.value === value).value,
        );
        exitMenu();
      default:
        break;
    }
  }

  function handleItemClick(value) {
    handleSelect(sortedOptions.find((option) => option.value === value).value);
    exitMenu(true);
  }

  function getRootItemStyle(active, hasSuccess) {
    const baseStyle =
      "group relative p-8 border-2 focus:outline-none focus:border-primary-500 hover:border-primary-500";
    const activeStyle = active ? "rounded-t-6" : "rounded-6";

    let colorStyle = "";

    if (active) {
      colorStyle = "border-primary-500";
    } else if (hasSuccess) {
      colorStyle = "border-support-success";
    } else {
      colorStyle = "border-gray-400";
    }

    return `${baseStyle} ${activeStyle} ${colorStyle}`;
  }

  const renderBigLabel = bigLabel ? (
    <Label
      center={centerBig}
      as={labelTypes.label}
      size={labelTypes.big}
      fieldId={name}
    >
      {bigLabel}
    </Label>
  ) : null;

  const renderSmallLabel = smallLabel ? (
    <Label
      center={centerSmall}
      as={labelTypes.label}
      size={labelTypes.small}
      fieldId={name}
    >
      {smallLabel}
    </Label>
  ) : null;

  return (
    <div className="flex flex-col justify-center items-center">
      {renderBigLabel}
      {renderSmallLabel}
      <ul
        id={name}
        onClick={(e) => e.stopPropagation()}
        className={`text-left select-none cursor-default ${widthStyle} font-base font-reg text-13 420:text-16 text-gray-600`}
      >
        <li
          tabIndex={disableFocus ? "-1" : "0"}
          ref={ref}
          onClick={() => (active ? exitMenu(true) : setActive(true))}
          onKeyDown={handleMenuKeyPress}
          className={getRootItemStyle(active, hasSuccess)}
        >
          {options.find((option) => option.value === selected).name}
          <Icon active={active} hasSuccess={hasSuccess} />
        </li>

        {active ? (
          <li className="relative z-10">
            <ul className="absolute w-full max-h-200 overflow-y-auto border-2 border-t-0 rounded-b-6 border-primary-500 hide-scrollbar">
              {sortedOptions.map((option, index) => (
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
          </li>
        ) : null}
      </ul>
    </div>
  );
}

SelectInput.propTypes = {
  options: PropTypes.array,
  bigLabel: PropTypes.string,
  smallLabel: PropTypes.string,
  name: PropTypes.string,
  centerBig: PropTypes.bool,
  centerSmall: PropTypes.bool,
  widthStyle: PropTypes.string,
  disableFocus: PropTypes.bool,
};

export default SelectInput;
