import { Anchor } from 'grommet';
import { useWorkouts } from '../../hooks/useWorkouts';

export default function List() {
  const workouts = useWorkouts();
  return (
    <div>
      {workouts.map((workout) => (
        <Anchor key={workout.id} href={`/workouts/${workout.id}`}>
          {workout.name}
        </Anchor>
      ))}
    </div>
  );
}
