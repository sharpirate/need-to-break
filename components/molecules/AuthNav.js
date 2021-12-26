import Tab, { tabTypes } from '../atoms/Tab';
import { useRouter } from 'next/dist/client/router';

const tabs = [
  { name: 'Sign Up', url: '/signup' },
  { name: 'Login', url: '/login' }
];

function AuthNav() {
  const router = useRouter();

  return (
    <nav className="flex w-full justify-center items-center p-24 pb-0 420:p-32 420:pb-0 932:p-48 932:pb-0">
      <ul className={`inline-grid grid-cols-2`}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.url}
            type={tabTypes.authNav}
            first={index === 0}
            active={router.pathname === tab.url}
            last={index === tabs.length - 1}
            url={tab.url}
          >
            {tab.name}
          </Tab>
        ))}
      </ul>
    </nav>
  );
}

export default AuthNav;