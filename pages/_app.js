import "../styles/globals.css";
import MainNav from "../components/molecules/MainNav";
import AuthNav from "../components/molecules/AuthNav";
import { useRouter } from "next/dist/client/router";
import Modal from "react-modal";
import Head from "next/head";

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const url = router.pathname;

  return (
    <>
      <Head>
        <title>Need To Break</title>
      </Head>
      
      <div className="flex flex-col justify-start items-center">
        {url === '/login' || url === '/signup' ? <AuthNav /> : <MainNav />}
        <div className="w-full max-w-[1600px] flex flex-col justify-start items-center p-24 420:p-48">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;