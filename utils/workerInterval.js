let intervalId;

onmessage = ({ data }) => {
  if (data.delay) {
    postMessage(Date.now());

    intervalId = setInterval(() => {
      postMessage(Date.now());
    }, data.delay);
  } else if (data.clear) {
    clearInterval(intervalId);
    close();
  }
};
