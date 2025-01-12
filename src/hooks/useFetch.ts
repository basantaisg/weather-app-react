import { useEffect, useState } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = fetch(url);
    const json = JSON.stringify(fetchData);
    setData(json);
  }, [url]);

  return [data];
};

export default useFetch;
