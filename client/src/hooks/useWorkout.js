import { useContext, useEffect } from 'react';
import { createWorkout, fetchWorkout } from '../services/workouts';
import { useNavigate, useParams } from 'react-router-dom';
import { createSet, deleteSet } from '../services/sets';
import { WorkoutContext } from '../context/WorkoutContext';
import { createPart, deletePart } from '../services/parts';

export const useWorkout = () => {
  // State from Context
  const workoutContext = useContext(WorkoutContext);
  if (!workoutContext)
    throw new Error('WorkoutContext must be used within a Workout Provider');
  const { workout, setWorkout, setSets, sets } = workoutContext;

  // State from Router
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { sets, ...workout } = await fetchWorkout(id);
      setWorkout(workout);
      setSets(sets);
    };
    if (id) fetchData();
  }, [id, setWorkout, setSets]);

  const add = async (val) => {
    try {
      const resp = await createWorkout(val);
      navigate(`/workouts/${resp.id}/edit`);
    } catch (e) {
      // TODO error handling
      console.error(e);
    }
  };

  const addSet = async (description) => {
    try {
      const resp = await createSet(workout.id, { description });
      setSets((prev) => [...prev, resp]);
    } catch (e) {
      // TODO error handling
      console.error(e);
    }
  };

  const removeSet = async (id) => {
    try {
      await deleteSet(workout.id, id);
      setSets((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      // TODO error handling
      console.error(e);
    }
  };

  const addPartToSet = async (setId, partDetail) => {
    const resp = await createPart(setId, partDetail);
    setSets((prev) => {
      return prev.map((s) => {
        return s.id === setId ? { ...s, parts: [...s.parts, resp] } : { ...s };
      });
    });
  };

  const removePart = async (setId, partId) => {
    console.log(partId);
    try {
      await deletePart(partId);
      setSets((prev) => {
        return prev.map((s) => {
          return s.id === setId
            ? { ...s, parts: s.parts.filter((p) => p.id !== partId) }
            : { ...s };
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  return { add, workout, sets, addSet, addPartToSet, removePart, removeSet };
};
