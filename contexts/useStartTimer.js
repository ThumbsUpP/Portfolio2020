import { useEffect, useState } from 'react';

export default (delay = 500, step = 100) => {
  const [_delay, setDelay] = useState(delay);
  const handleInterval = () => setDelay(d => (d > 0 ? d - step : d));
  const resetTimer = () => setDelay(delay);

  useEffect(() => {
    const scrollInterval = setInterval(handleInterval, step);
    return () => clearInterval(scrollInterval);
  }, []);

  return [_delay > 0, resetTimer];
};
