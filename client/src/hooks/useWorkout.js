import { useEffect, useState } from 'react';
import { createWorkout, fetchWorkout } from '../services/workouts';
import { useNavigate } from 'react-router-dom';

export const useWorkout = (id) => {
  const [workout, setWorkout] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetchWorkout(id);
      setWorkout(resp);
    };
    if (id) fetchData();
  }, [id]);
  const navigate = useNavigate();
  const add = async (val) => {
    try {
      const resp = await createWorkout(val);
      navigate(`/workouts/${resp.id}/edit`);
    } catch (e) {
      console.error(e);
    }
  };

  return { add, workout };
};
