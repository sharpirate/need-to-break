import React from "react";

function InputCard({ children }) {
  return (
    <div className="bg-white px-32 py-16 420:px-48 420:py-24 rounded-8 h-full">
      <div className="max-w-[208px] 420:max-w-[260px] inline-flex flex-col justify-start items-center">
        {children}
      </div>
    </div>
  );
}

export default InputCard;