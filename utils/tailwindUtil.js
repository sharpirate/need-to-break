import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';

const config = resolveConfig(tailwindConfig);

export function getIsMobileTimeline() {
  if (typeof window !== "undefined") {
    console.log(window.innerWidth <= 1024)
    return window.innerWidth <= 1024;
  }
  return false;
}