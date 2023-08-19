import React, { useState } from "react";
import PropTypes from "prop-types";
import Tab, { tabTypes } from "../atoms/Tab";
import SettingsModal from "./cards/SettingsModal";
import LogoutModal from "./cards/LogoutModal";

const forTypes = {
  desktop: "desktop",
  mobile: "mobile",
};

const types = {
  settings: "settings",
  logout: "logout",
};

function NavBar({ tabs, active, handlePageChange }) {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [logoutIsOpen, setLogoutIsOpen] = useState(false);

  return (
    <nav className="flex w-full justify-between 732:p-32 732:pb-0 932:p-48 932:pb-0">
      <NavButton
        handleClick={() => setLogoutIsOpen(true)}
        forType={forTypes.desktop}
        type={types.logout}
      />
      <ul
        className={`p-12 420:px-16 bg-primary-600 flex justify-between w-full 732:w-auto 732:p-0 732:bg-transparent 732:inline-grid 732:grid-cols-2`}
      >
        <NavButton
          handleClick={() => setLogoutIsOpen(true)}
          forType={forTypes.mobile}
          type={types.logout}
        />
        {tabs.map((tab, index) => (
          <Tab
            key={tab.name}
            active={tab.url === active}
            type={tabTypes.navBar}
            first={index === 0}
            last={index === tabs.length - 1}
            value={tab.url}
            handleClick={handlePageChange}
          >
            {tab.name}
          </Tab>
        ))}
        <NavButton
          handleClick={() => setSettingsIsOpen(true)}
          forType={forTypes.mobile}
          type={types.settings}
        />
      </ul>
      <NavButton
        handleClick={() => setSettingsIsOpen(true)}
        forType={forTypes.desktop}
        type={types.settings}
      />

      <LogoutModal isOpen={logoutIsOpen} setIsOpen={setLogoutIsOpen} />

      <SettingsModal isOpen={settingsIsOpen} setIsOpen={setSettingsIsOpen} />
    </nav>
  );
}

function NavButton({ invisible, forType, handleClick, type }) {
  let forStyle = "";

  switch (forType) {
    case forTypes.desktop:
      forStyle = "hidden 732:block group outline-none";
      break;
    case forTypes.mobile:
      forStyle = "block 732:hidden";
      break;
    default:
      forStyle = "block";
      break;
  }

  let icon;
  switch (type) {
    case types.settings:
      icon = <SettingsIcon />;
      break;
    case types.logout:
      icon = <LogoutIcon />;
      break;
    default:
      return null;
  }

  let invisibleStyle = invisible ? "invisible" : "";

  return (
    <button onClick={handleClick} className={forStyle + " " + invisibleStyle}>
      {icon}
    </button>
  );
}

function SettingsIcon() {
  return (
    <svg
      className="w-20 h-20 420:w-24 420:h-24 732:w-32 732:h-32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-white 732:fill-primary-500 732:group-focus-visible:fill-primary-600"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5756 11.4537C5.51854 11.5827 5.46379 11.7129 5.41138 11.8444L1.08727 13.4002C0.435022 13.6349 0.00012207 14.2535 0.00012207 14.9467V17.0531C0.00012207 17.7463 0.435022 18.365 1.08727 18.5997L5.31933 20.1223C5.38509 20.2987 5.45506 20.473 5.5291 20.6451L3.61692 24.7066C3.32165 25.3337 3.4516 26.0787 3.94175 26.5689L5.4312 28.0583C5.92136 28.5485 6.66635 28.6784 7.2935 28.3832L11.2319 26.5289C11.4608 26.636 11.6938 26.7358 11.9306 26.828L13.4003 30.9127C13.635 31.565 14.2536 31.9999 14.9468 31.9999H17.0532C17.7464 31.9999 18.3651 31.565 18.5997 30.9127L20.0372 26.9175C20.3201 26.8146 20.5979 26.7008 20.87 26.5768L24.7068 28.3832C25.3339 28.6785 26.0789 28.5485 26.569 28.0584L28.0585 26.5689C28.5487 26.0787 28.6786 25.3338 28.3833 24.7066L26.5769 20.8698C26.7009 20.5978 26.8147 20.32 26.9176 20.0371L30.9129 18.5997C31.5651 18.365 32 17.7463 32 17.0531V14.9467C32 14.2535 31.5651 13.6349 30.9129 13.4002L26.8281 11.9305C26.7359 11.6937 26.6362 11.4608 26.5291 11.2319L28.3834 7.29331C28.6786 6.66615 28.5487 5.92116 28.0585 5.43101L26.5691 3.94156C26.0789 3.4514 25.3339 3.32146 24.7068 3.61673L20.6451 5.52898C20.473 5.45494 20.2988 5.38499 20.1224 5.31923L18.5997 1.08715C18.3651 0.434899 17.7464 0 17.0532 0H14.9468C14.2536 0 13.635 0.434899 13.4003 1.08715L11.8445 5.41129C11.713 5.46368 11.5828 5.51842 11.4539 5.57546L7.29346 3.61672C6.6663 3.32145 5.92131 3.45139 5.43116 3.94155L3.94171 5.431C3.45155 5.92115 3.32161 6.66614 3.61688 7.29329L5.5756 11.4537ZM16.0251 21.7776C19.2022 21.7776 21.7777 19.2021 21.7777 16.025C21.7777 12.848 19.2022 10.2724 16.0251 10.2724C12.8481 10.2724 10.2726 12.848 10.2726 16.025C10.2726 19.2021 12.8481 21.7776 16.0251 21.7776Z"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      className="w-20 h-20 420:w-24 420:h-24 732:w-32 732:h-32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-white 732:fill-primary-500 732:group-focus-visible:fill-primary-600"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 0C14.8954 0 14 0.89543 14 2V16C14 17.1046 14.8954 18 16 18C17.1046 18 18 17.1046 18 16V2C18 0.895431 17.1046 0 16 0ZM7.51769 7.41124C8.2971 6.62856 8.29444 5.36223 7.51176 4.58282C6.72907 3.80341 5.46274 3.80607 4.68334 4.58876C2.44633 6.83517 0.923854 9.69625 0.307131 12.8098C-0.309583 15.9232 0.00686145 19.1505 1.2168 22.0839C2.42677 25.0173 4.47635 27.5259 7.10765 29.2914C9.73905 31.0571 12.8336 32 16 32C19.1664 32 22.2609 31.0571 24.8923 29.2914C27.5236 27.5259 29.5732 25.0173 30.7832 22.0839C31.9931 19.1505 32.3096 15.9232 31.6929 12.8098C31.0761 9.69626 29.5537 6.83517 27.3167 4.58876C26.5373 3.80607 25.2709 3.80342 24.4882 4.58282C23.7056 5.36223 23.7029 6.62856 24.4823 7.41125C26.1612 9.09717 27.3054 11.2462 27.7691 13.587C28.2328 15.9278 27.9947 18.3541 27.0854 20.5586C26.1761 22.763 24.6369 24.6458 22.6636 25.9699C20.6904 27.2939 18.3715 28 16 28C13.6285 28 11.3096 27.2938 9.33638 25.9699C7.36311 24.6458 5.82386 22.763 4.91458 20.5586C4.00527 18.3541 3.76722 15.9278 4.2309 13.587C4.69456 11.2462 5.83883 9.09717 7.51769 7.41124Z"
      />
    </svg>
  );
}

NavButton.propTypes = {
  type: PropTypes.string,
  invisible: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default NavBar;
