import { useState, useEffect } from "react";
import isBrowser from "./isBrowser";

export default function useClientWidth() {
  if (!isBrowser) {
    return 0;
  }

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
