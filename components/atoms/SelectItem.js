import React, { useRef, useEffect } from "react";

function SelectItem({ value, children, focused, handleKeyDown, handleClick }) {
  const ref = useRef(null);

  useEffect(() => {
    if (focused) {
      ref.current.focus();
    }
  }, [focused]);

  return (
    <li
      tabIndex={focused ? "0" : "-1"}
      className="relative z-10 bg-white p-8 hover:text-white hover:bg-primary-500 focus:outline-none focus-visible:bg-primary-500 focus-visible:text-white"
      ref={ref}
      onKeyDown={(e) => handleKeyDown(e, value)}
      onClick={() => handleClick(value)}
    >
      {children}
    </li>
  );
}

export default SelectItem;
