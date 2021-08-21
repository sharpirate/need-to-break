import Tab from '../atoms/Tab';

const tabs = ['Sign Up', 'Login'];

function AuthNav() {
  return (
    <ul className={`inline-grid grid-cols-${tabs.length}`}>
      {tabs.map((tab, index) => (
        <Tab key={tab} type='auth' first={index === 0} selected={index === 1} last={index === tabs.length - 1}>
          {tab}
        </Tab>
      ))}
    </ul>
  );
}

export default AuthNav;