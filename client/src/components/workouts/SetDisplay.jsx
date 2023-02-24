import { Box } from 'grommet';
import PartForm from './PartForm';
import { AddCircle, SubtractCircle } from 'grommet-icons';
import { useState } from 'react';

export default function SetDisplay({ id, description, parts }) {
  const [addPart, setAddPart] = useState(!parts.length);
  return (
    <div>
      <Box direction="row" gap="small" align="center">
        <h3>{description}</h3>
        {!addPart && <AddCircle onClick={() => setAddPart((prev) => !prev)} />}
        {addPart && (
          <SubtractCircle onClick={() => setAddPart((prev) => !prev)} />
        )}
      </Box>
      {addPart && <PartForm setId={id} />}
      {parts.map((part) => (
        <ul key={part.id}>
          <li>
            {part.qty} x {part.distance} {part.stroke} @ {part.base}
            {part.detail && <>({part.detail})</>}
          </li>
        </ul>
      ))}
    </div>
  );
}
