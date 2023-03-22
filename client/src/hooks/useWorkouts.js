import { useEffect, useState } from 'react';
import { fetchWorkouts } from '../services/workouts';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchWorkouts();
      setWorkouts(data);
    };
    loadData();
  }, []);
  return workouts;
};
