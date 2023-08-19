import { useEffect, useLayoutEffect } from "react";
import isBrowser from "./isBrowser";

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
