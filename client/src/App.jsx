import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch('/api/v1/workouts/');
      const respData = await resp.json();
      setData(respData);
    };
    fetchData();
  }, []);
  return <div>Hello {data.hello}</div>;
}
