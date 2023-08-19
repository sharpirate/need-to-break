import React from "react";

function InputCard({ children, useExtraPadding }) {
  const paddingStyle = useExtraPadding
    ? "pt-16 pb-32 420:pt-24 pb-48"
    : "py-16 420:py-24";
  return (
    <div
      className={`bg-white  rounded-8 h-full px-32 420:px-48 ${paddingStyle}`}
    >
      <div className="max-w-[208px] 420:max-w-[280px] inline-flex flex-col justify-start items-center">
        {children}
      </div>
    </div>
  );
}

export default InputCard;
