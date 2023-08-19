import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";

const config = resolveConfig(tailwindConfig);

export function isBelowBreakpoint(clientWidth, breakpoint) {
  if (clientWidth === 0) {
    return null;
  }
  // remove px from the end and convert to a number
  return clientWidth <= parseInt(config.theme.screens[breakpoint].slice(0, -2));
}
