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

Modal.setAppElement('#__next');

const pageVariants = {
  initial: direction => ({
    x: direction < 0 ? "-100vw" : "100vw",
  }),
  center: {
    x: "0",
    transition: TRANSITIONS.spring500
  },
  exit: direction => ({
    x: direction > 0 ? "-100vw" : "100vw",
    transition: TRANSITIONS.spring500
  })
};

const pages = [
  { name: 'Active', url: '/active' },
  { name: 'Full Time', url: '/fulltime' },
  { name: 'Flexible', url: '/flexible' },
  { name: 'Presets', url: '/presets' }
];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const url = router.pathname;
  const [newPage, setNewPage] = useState({ direction: 0, url: "" });

  function handlePageChange(value) {
    const oldPageIndex = pages.findIndex(page => page.url === url);
    const newPageIndex = pages.findIndex(page => page.url === value);

    setNewPage({
      direction: newPageIndex - oldPageIndex,
      url: value 
    });
  }

  useEffect(() => {
    router.push(newPage.url);
  }, [newPage]);

  return (
    <SettingsProvider>
      <Head>
        <title>Need To Break</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <div className="flex flex-col justify-start items-center">

        <MainNav tabs={pages} active={url} handlePageChange={handlePageChange} />

        <div className="relative w-full max-w-[1600px]">
          <AnimatePresence>
            <motion.div
              key={url}
              variants={pageVariants}
              custom={newPage.direction}
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
    </SettingsProvider>
  );
}

export default MyApp;