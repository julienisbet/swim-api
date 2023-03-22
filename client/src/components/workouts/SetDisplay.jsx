import { Box, Button } from 'grommet';
import PartForm from './PartForm';
import { AddCircle, FormTrash, SubtractCircle } from 'grommet-icons';
import { useState } from 'react';
import { useWorkout } from '../../hooks/useWorkout';
import PartList from './parts/PartList';

export default function SetDisplay({ id, description, parts, isEditing }) {
  const [addPart, setAddPart] = useState(!parts.length);
  const { removeSet } = useWorkout();

  return (
    <div>
      <Box direction="row" gap="small" align="center">
        <h3>{description}</h3>
        {isEditing && (
          <>
            {!addPart && (
              <AddCircle onClick={() => setAddPart((prev) => !prev)} />
            )}
            {addPart && (
              <SubtractCircle onClick={() => setAddPart((prev) => !prev)} />
            )}
            <Button
              icon={<FormTrash color="status-error" />}
              onClick={() => removeSet(id)}
            />
          </>
        )}
      </Box>
      {addPart && isEditing && <PartForm setId={id} />}
      {<PartList {...{ isEditing, parts, id }} />}
    </div>
  );
}
