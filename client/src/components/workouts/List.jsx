import { Anchor, Box } from 'grommet';
import { useWorkouts } from '../../hooks/useWorkouts';

export default function List() {
  const workouts = useWorkouts();
  return (
    <Box direction="column">
      {workouts.map((workout) => (
        <Anchor key={workout.id} href={`/workouts/${workout.id}`}>
          {workout.name}
        </Anchor>
      ))}
    </Box>
  );
}
