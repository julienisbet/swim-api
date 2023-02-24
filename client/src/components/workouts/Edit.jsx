import { useParams } from 'react-router-dom';
import { useWorkout } from '../../hooks/useWorkout';

export default function Edit() {
  const { id } = useParams();
  const { workout } = useWorkout(id);
  return <div>Edit</div>;
}
