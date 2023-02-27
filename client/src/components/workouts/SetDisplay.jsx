import { Box, Button } from 'grommet';
import PartForm from './PartForm';
import { AddCircle, FormTrash, SubtractCircle } from 'grommet-icons';
import { useState } from 'react';
import { useWorkout } from '../../hooks/useWorkout';

export default function SetDisplay({ id, description, parts }) {
  const [addPart, setAddPart] = useState(!parts.length);
  const { removeSet, removePart } = useWorkout();
  return (
    <div>
      <Box direction="row" gap="small" align="center">
        <h3>{description}</h3>
        {!addPart && <AddCircle onClick={() => setAddPart((prev) => !prev)} />}
        {addPart && (
          <SubtractCircle onClick={() => setAddPart((prev) => !prev)} />
        )}
        <Button
          icon={<FormTrash color="status-error" />}
          onClick={() => removeSet(id)}
        />
      </Box>
      {addPart && <PartForm setId={id} />}
      {parts &&
        parts.map((part) => (
          <ul key={part.id}>
            <li>
              <Box direction="row" align="center">
                {part.qty} x {part.distance} {part.stroke}
                {part.base && <>@ {part.base}</>}
                {part.detail && <> ({part.detail})</>}
                <Button
                  icon={<FormTrash size="medium" color="status-error" />}
                  onClick={() => removePart(id, part.id)}
                />
              </Box>
            </li>
          </ul>
        ))}
    </div>
  );
}
