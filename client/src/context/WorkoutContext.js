import { createContext, useEffect, useState } from 'react';
import { fetchWorkout } from '../services/workouts';
import { useParams } from 'react-router-dom';

const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {
  const [workout, setWorkout] = useState({});
  const [sets, setSets] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { sets: setsData, ...workout } = await fetchWorkout(id);
      setWorkout(workout);
      setSets(setsData);
    };
    if (id) {
      fetchData();
    }
  }, [id, setWorkout, setSets]);
  return (
    <WorkoutContext.Provider
      value={{ workout, sets, setSets, setWorkout, setId }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutProvider };
