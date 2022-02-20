import isBrowser from "./isBrowser";

export default function useWorkerInterval(callback) {
  if (isBrowser) {
    const worker = new Worker(new URL("./workerInterval.js", import.meta.url));

    function start(delay) {
      // start the interval
      worker.postMessage({ delay: delay });
    }
  
    function end() {
      // use this function to clear the interval
      worker.postMessage({ clear: true });
    }
  
    // call the callback with Date.now() from the worker
    worker.onmessage = ({ data }) => callback(data);
  
    return [start, end];
  } else {
    return [null, null];
  }
}