import "../styles/globals.css";
import MainNav from "../components/molecules/MainNav";
import AuthNav from "../components/molecules/AuthNav";
import { useRouter } from "next/dist/client/router";
import Modal from "react-modal";
import Head from "next/head";
import { SettingsProvider } from "../context/Settings";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TRANSITIONS } from "../utils/constants";
import { useAuth } from "../firebase/Firebase";
import { PRE_LOGIN_PAGES, PROTECTED_PAGES, DIRECTIONS } from "../utils/constants";
import { PresetsProvider } from "../context/Presets";

Modal.setAppElement('#__next');

const pageVariants = {
  initial: direction => {
    switch(direction) {
      case DIRECTIONS.left:
        return {
          x: "-100vw"
        }
      case DIRECTIONS.right:
        return {
          x: "100vw"
        }
      case DIRECTIONS.vertical:
        return {
          y: "100vh"
        }
      case DIRECTIONS.none:
      default:
        return false;
    }
  },
  center: {
    x: 0,
    y: 0,
    transition: TRANSITIONS.spring500
  },
  exit: direction => {
    switch(direction) {
      case DIRECTIONS.left:
        return {
          x: "100vw"
        }
      case DIRECTIONS.right:
        return {
          x: "-100vw"
        }
      case DIRECTIONS.vertical:
        return {
          y: "100vh"
        }
      case DIRECTIONS.none:
      default:
        return false;
    }
  }
};

export function isProtectedPage(url) {
  return Boolean(PROTECTED_PAGES.find(page => page.url === url))
}

export function isPreLoginPage(url) {
  return Boolean(PRE_LOGIN_PAGES.find(page => page.url === url))
}

function getPagesByUrl(url) {
  if (isProtectedPage(url)) {
    return PROTECTED_PAGES;
  } else if (isPreLoginPage(url)) {
    return PRE_LOGIN_PAGES;
  } else {
    return null;
  }
}

function isSameContext(prevUrl, nextUrl) {
  return isProtectedPage(prevUrl) === isProtectedPage(nextUrl) || isPreLoginPage(prevUrl) === isPreLoginPage(nextUrl);
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const url = router.pathname;
  const [page, setPage] = useState({ direction: DIRECTIONS.vertical, url: url });
  const { user, userLoading } = useAuth();

  useEffect(() => {
    if (page.url) {
      router.push(page.url);
    }
  }, [page]);

  useEffect(() => {
    // if user is not logged in and tries to access a protected page redirect him to login
    if (!userLoading && !user && isProtectedPage(url)) {
      pushPage('/login')
    }
  }, [user, userLoading]);
  
  function pushPage(targetUrl) {
    let direction;
    
    if (!isSameContext(url, targetUrl)) {
      direction = DIRECTIONS.none;
    } else {
      const pages = getPagesByUrl(targetUrl);
  
      const currentIndex = pages.findIndex(page => page.url === url);
      const nextIndex = pages.findIndex(page => page.url === targetUrl);
  
      direction = (nextIndex - currentIndex) > 0 ? DIRECTIONS.right : DIRECTIONS.left;  
    }
  
    setPage({
      url: targetUrl,
      direction
    });
  }

  return (
    <PresetsProvider>
      <SettingsProvider>
        <Head>
          <title>Need To Break</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        {user || !isProtectedPage(url) ? (
          <div className="flex flex-col justify-start items-center">

          {!isProtectedPage(url) ? (
            <AuthNav tabs={PRE_LOGIN_PAGES} active={url} handlePageChange={pushPage} />
          ) : (
            <MainNav tabs={PROTECTED_PAGES} active={url} handlePageChange={pushPage} />
          )}
    
            <div className="relative w-full max-w-[1600px]">
              <AnimatePresence onExitComplete={() => setPage({ direction: DIRECTIONS.vertical })}>
                <motion.div
                  key={url}
                  variants={pageVariants}
                  custom={page.direction}
                  initial="initial"
                  animate="center"
                  exit="exit"
                  className="absolute top-0 left-0 w-full flex flex-col justify-start items-center p-24 420:p-32 932:p-48"
                >
                  <Component {...pageProps} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : null}
      </SettingsProvider>
    </PresetsProvider>
  );
}

export default MyApp;