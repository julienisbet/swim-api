import {
  Box,
  Button,
  Form,
  FormField,
  Page,
  PageContent,
  PageHeader,
  Select,
  TextInput,
} from 'grommet';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWorkout } from '../../hooks/useWorkout';
import { AddCircle } from 'grommet-icons';
import PartForm from './PartForm';
import SetDisplay from './SetDisplay';

export default function Edit() {
  const { workout, sets, addSet } = useWorkout();

  const [newSet, setNewSet] = useState('');
  const [partDetail, setPartDetail] = useState({ id: Date.now() });
  const [parts, setParts] = useState([]);
  const [setDetail, setSetDetail] = useState({ id: Date.now() });

  return (
    <div>
      <Page kind="narrow">
        <PageContent>
          <PageHeader title={workout.name} subtitle={workout.description} />
          <Box direction="row" align="center" gap="small">
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

          {sets && sets.map((set) => <SetDisplay key={set.id} {...set} />)}
        </PageContent>
      </Page>
    </div>
  );
}
