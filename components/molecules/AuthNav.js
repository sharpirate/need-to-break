import Tab, { tabTypes } from '../atoms/Tab';

function AuthNav({ tabs, active, handlePageChange }) {
  return (
    <nav className="flex w-full justify-center items-center p-24 pb-0 420:p-32 420:pb-0 932:p-48 932:pb-0">
      <ul className={`inline-grid grid-cols-2`}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.name}
            active={tab.url === active}
            type={tabTypes.authNav}
            first={index === 0}
            last={index === tabs.length - 1}
            value={tab.url}
            handleClick={handlePageChange}
          >
            {tab.name}
          </Tab>
        ))}
      </ul>
    </nav>
  );
}

export default AuthNav;