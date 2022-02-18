export default function useWorkerInterval(callback, delay) {
  const worker = new Worker(new URL("./workerInterval.js", import.meta.url));

  // start the interval
  worker.postMessage({ delay: delay });

  // call the callback with Date.now() from the worker
  worker.onmessage = ({ data }) => callback(data);

  // use this function to clear the interval
  return () => worker.postMessage({ clear: true });
}