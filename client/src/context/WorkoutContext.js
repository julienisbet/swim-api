import { createContext, useContext, useEffect, useState } from 'react';
import { useWorkout } from '../hooks/useWorkout';
import { useParams } from 'react-router-dom';
import { fetchWorkout } from '../services/workouts';

const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {
  const [workout, setWorkout] = useState({});
  const [sets, setSets] = useState([]);

  return (
    <WorkoutContext.Provider value={{ workout, sets, setSets, setWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutProvider };
