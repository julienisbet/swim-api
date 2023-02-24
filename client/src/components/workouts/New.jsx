import { Button, Form, FormField, TextInput } from 'grommet';
import { useState } from 'react';
import { useWorkout } from '../../hooks/useWorkout';

export default function New() {
  const [workoutDetails, setWorkoutDetails] = useState({});
  const { add } = useWorkout();
  return (
    <div>
      <Form onChange={(nextValue) => setWorkoutDetails(nextValue)}>
        <FormField label="Workout Name">
          <TextInput placeholder="Enter a name..." name="name" />
        </FormField>
        <FormField label="Workout Description">
          <TextInput placeholder="Enter a description..." name="description" />
        </FormField>
      </Form>
      <Button primary onClick={() => add(workoutDetails)} label="Save" />
    </div>
  );
}
