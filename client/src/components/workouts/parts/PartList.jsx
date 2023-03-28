import { Box, Button } from 'grommet';
import { Drag, FormTrash } from 'grommet-icons';
import { useState } from 'react';
import { useWorkout } from '../../../hooks/useWorkout';
import './PartList.css';

export default function PartList({ id, parts, isEditing }) {
  const { removePart, reorderParts } = useWorkout();

  const [dragging, setDragging] = useState(null);
  const [hover, setHover] = useState(null);
  const getClassnames = (orderNum) => {
    const classes = [];
    if (dragging && orderNum !== dragging) classes.push('droppable');
    if (orderNum === dragging) classes.push('dragging-active');
    if (orderNum === hover) classes.push('target');
    return classes.join(' ');
  };
  const handleDrop = (targetOrder) => {
    if (!dragging) return;
    if (dragging === targetOrder) return;

    const updatedOrders = parts.reduce((acc, part) => {
      if (part.orderNum === dragging) {
        acc.push({ partId: part.id, newOrder: targetOrder });
      } else if (
        targetOrder > dragging &&
        part.orderNum <= targetOrder &&
        part.orderNum >= dragging
      ) {
        acc.push({ partId: part.id, newOrder: part.orderNum - 1 });
      } else if (
        targetOrder < dragging &&
        part.orderNum >= targetOrder &&
        part.orderNum <= dragging
      ) {
        acc.push({ partId: part.id, newOrder: part.orderNum + 1 });
      }
      return acc;
    }, []);
    reorderParts(id, updatedOrders);
    setDragging(null);
  };

  return (
    <Box className="dragAndDrop">
      {parts &&
        parts.map((part) => (
          <Box
            className={getClassnames(part.orderNum)}
            pad={'small'}
            key={part.id}
            direction="row"
            align="center"
            id={part.orderNum}
            draggable="true"
            onDragStart={(e) => {
              setDragging(parseInt(e.target.id));
            }}
            onDragOver={(e) => {
              setHover(parseInt(e.currentTarget.id));
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDrop(parseInt(e.currentTarget.id));
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
