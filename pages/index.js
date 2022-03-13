import Link from "next/link";
import Button, { buttonTypes } from "../components/atoms/Button";
import Logo from "../components/atoms/Logo";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-landing p-24 420:p-32 932:p-48 flex flex-col w-screen h-screen">
      <div className="flex justify-between items-start gap-32">

        {/* Logo */}
        <div className="hidden 640:block">
          <Logo />
        </div>

        {/* Main */}
        <div className="w-full h-full flex flex-col justify-start items-center">
          <div className="flex flex-col gap-24">
            <h1 className="flex flex-col justify-center items-center heading-landing pt-16 420:pt-24 640:pt-0 text-center uppercase text-white">
              <span>
              Take Your Productivity
              </span>
              <span>
                To The
              </span>
              <span className="text-primary-500 bg-white px-16 py-0 rounded-8">
                Next Level  
              </span>
            </h1>
            <h2 className="flex flex-col gap-4 420:gap-8 subheading-landing text-center text-white">
              <span>The Smart Way to manage your screen time</span>
              <span>While staying Productive</span> 
            </h2>
          </div>
          <div className="py-48">
            <Button type={buttonTypes.callToAction} handleClick={() => router.push('/signup')}>Try It Now</Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-16 right-16 420:top-24 420:right-24 640:relative 640:top-0 640:right-0">
          <Link href="/login">
            <a className="body-med text-white outline-none focus-visible:text-support-attention">Login</a>
          </Link>
        </nav>
      </div>

      {/* Devices Image */}
      <div className="devices-landing h-full w-full" />
    </main>
  );
}