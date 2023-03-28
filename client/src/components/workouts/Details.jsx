import { Box, Button, Page, PageContent, PageHeader, TextInput } from 'grommet';
import { useState } from 'react';
import { useWorkout } from '../../hooks/useWorkout';
import { AddCircle } from 'grommet-icons';
import SetDisplay from './SetDisplay';
import { Link } from 'react-router-dom';

export default function Details({ isEditing = false }) {
  const { workout, sets, addSet } = useWorkout();

  const [newSet, setNewSet] = useState('');

  return (
    <Page kind="narrow">
      <PageContent>
        <PageHeader
          title={workout.name}
          subtitle={workout.description}
          parent={<Link to="/">Home</Link>}
        />
        {!isEditing && (
          <Link to={`/workouts/${workout.id}/edit`}>
            <Button primary label="Edit" color="dark-1" size="small" />
          </Link>
        )}
        {isEditing && (
          <Link to={`/workouts/${workout.id}`}>
            <Button primary label="Save" color="status-ok" size="small" />
          </Link>
        )}
        {isEditing && (
          <Box direction="row" align="center" gap="small" margin="medium">
            <TextInput
              placeholder="Add a set..."
              name="description"
              value={newSet}
              onChange={(e) => {
                setNewSet(e.target.value);
              }}
            />
            <AddCircle
              size="medium"
              onClick={() => {
                setNewSet('');
                addSet(newSet);
              }}
            />
          </Box>
        )}
        {sets &&
          sets.map((set) => (
            <SetDisplay key={set.id} {...set} isEditing={isEditing} />
          ))}
      </PageContent>
    </Page>
  );
}
