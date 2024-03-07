import "../styles/globals.css";
import NavBar from "../components/molecules/NavBar";
import { useRouter } from "next/dist/client/router";
import Modal from "react-modal";
import Head from "next/head";
import { SettingsProvider } from "../context/Settings";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { APP_PAGES, TRANSITIONS } from "../utils/constants";
import { DIRECTIONS } from "../utils/constants";
import { PresetsProvider } from "../context/Presets";
// import { Analytics } from "@vercel/analytics/react";
Modal.setAppElement("#__next");

const pageVariants = {
  initial: (direction) => {
    switch (direction) {
      case DIRECTIONS.left:
        return {
          x: "-100vw",
        };
      case DIRECTIONS.right:
        return {
          x: "100vw",
        };
      case DIRECTIONS.vertical:
        return {
          y: "100vh",
        };
      case DIRECTIONS.none:
      default:
        return false;
    }
  },
  center: {
    x: 0,
    y: 0,
    transition: TRANSITIONS.spring500,
  },
  exit: (direction) => {
    switch (direction) {
      case DIRECTIONS.left:
        return {
          x: "100vw",
        };
      case DIRECTIONS.right:
        return {
          x: "-100vw",
        };
      case DIRECTIONS.vertical:
        return {
          y: "100vh",
        };
      case DIRECTIONS.none:
      default:
        return false;
    }
  },
};

export function isAppPage(url) {
  return Boolean(APP_PAGES.find((page) => page.url === url));
}

function PageHead() {
  return (
    <Head>
      <title>Need To Break</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const url = router.pathname;
  const [page, setPage] = useState({
    direction: DIRECTIONS.vertical,
    url: url,
  });

  useEffect(() => {
    if (page.url) {
      router.push(page.url);
    }
  }, [page]);

  function pushPage(targetUrl) {
    let direction;

    const currentIndex = APP_PAGES.findIndex((page) => page.url === url);
    const nextIndex = APP_PAGES.findIndex((page) => page.url === targetUrl);

    direction =
      nextIndex - currentIndex > 0 ? DIRECTIONS.right : DIRECTIONS.left;

    setPage({
      url: targetUrl,
      direction,
    });
  }

  function renderAppPage() {
    return (
      <PresetsProvider>
        <SettingsProvider>
          <PageHead />
          <div className="flex flex-col justify-start items-center">
            <NavBar tabs={APP_PAGES} active={url} handlePageChange={pushPage} />
            <div className="relative w-full max-w-1600">
              <AnimatePresence
                onExitComplete={() =>
                  setPage({ direction: DIRECTIONS.vertical })
                }
              >
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
                  {/* <Analytics /> */}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </SettingsProvider>
      </PresetsProvider>
    );
  }

  function renderGenericPage() {
    return (
      <>
        <PageHead />

        <Component {...pageProps} />
      </>
    );
  }

  if (isAppPage(url)) {
    return renderAppPage();
  } else {
    return renderGenericPage();
  }
}

export default MyApp;
