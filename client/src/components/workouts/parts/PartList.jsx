import { Box, Button } from 'grommet';
import { BladesVertical, Drag, FormTrash } from 'grommet-icons';
import { useState } from 'react';
import { useWorkout } from '../../../hooks/useWorkout';

export default function PartList({ id, parts, isEditing }) {
  const { removePart } = useWorkout();
  const [displayParts, setDisplayParts] = useState(
    parts.map((part, i) => ({ ...part, order: i }))
  );
  const [dragging, setDragging] = useState(null);
  const reorderParts = (targetOrder) => {
    // targetOrder 4
    // dragging 1
    // 1  4
    // 2  1
    // 3  2
    // 4  3

    // targetOrder 1
    // dragging 4
    // 1  2
    // 2  3
    // 3  4
    // 4  1

    // targetOrder 2
    // dragging 4
    // 1  1
    // 2  3
    // 3  4
    // 4  2
    // 5  5

    // targetOrder 2
    // dragging 3
    // 1 1
    // 2 3
    // 3 2
    // 4 4
    // 5

    // if part.order === dragging then part.order = targetOrder
    // else if targetOrder > dragging && part.order <= targetOrder && part.order >= dragging then part.order = part.order - 1
    // else if targetOder < dragging && part.order >= targetOrder && part.order <=dragging then part.order = part.order + 1
    setDisplayParts((prev) => {
      console.log({ dragging, targetOrder });
      const updatedOrders = prev.map((part) => {
        if (part.order === dragging) {
          return { ...part, order: targetOrder };
        } else if (
          targetOrder > dragging &&
          part.order <= targetOrder &&
          part.order >= dragging
        ) {
          return { ...part, order: part.order - 1 };
        } else if (
          targetOrder < dragging &&
          part.order >= targetOrder &&
          part.order <= dragging
        ) {
          return { ...part, order: part.order + 1 };
        } else {
          return { ...part };
        }
      });
      console.log({ updatedOrders });
      return updatedOrders.sort((a, b) => a.order - b.order);
    });
    setDragging(null);
  };

  return (
    <Box className="dragAndDrop">
      {displayParts &&
        displayParts.map((part) => (
          <Box
            pad={'small'}
            key={part.order}
            direction="row"
            align="center"
            id={part.order}
            draggable="true"
            onDragStart={(e) => {
              console.log('dragging', e.currentTarget.id);
              setDragging(parseInt(e.target.id));
            }}
            onDragOver={(e) => {
              console.log('dragover', e.currentTarget.id);
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('dropping', e.currentTarget);
              reorderParts(parseInt(e.currentTarget.id));
            }}
          >
            {isEditing && <Drag />}
            {part.qty} x {part.distance} {part.stroke}
            {part.base && <>@ {part.base}</>}
            {part.detail && <> ({part.detail})</>}
            {isEditing && (
              <Button
                icon={<FormTrash size="medium" color="status-error" />}
                onClick={() => removePart(id, part.id)}
              />
            )}
          </Box>
        ))}
    </Box>
  );
}
