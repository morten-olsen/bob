const formatTime = (time: number) => {
  const toUtc = new Date(time).toUTCString();
  return toUtc.slice(17, 22);
};

export { formatTime };
