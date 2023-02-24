import { Box, Button, Form, FormField, TextInput, Select } from 'grommet';
import { Add, AddCircle } from 'grommet-icons';
import { useState } from 'react';
import { useWorkout } from '../../hooks/useWorkout';

export default function PartForm({ setId }) {
  const [partDetail, setPartDetail] = useState({ id: Date.now() });
  const { addPartToSet } = useWorkout();
  return (
    <Form
      onChange={(nextValue) =>
        setPartDetail((prev) => ({ ...prev, ...nextValue }))
      }
      onReset={() => {
        if (!partDetail.qty) return;
        setPartDetail({ id: Date.now() });
      }}
    >
      <Box direction="row-responsive" gap="small" align="center">
        <Box width="small">
          <TextInput
            placeholder="Quantity"
            type="number"
            name="qty"
            size="xsmall"
          />
        </Box>
        <Select
          placeholder="Distance"
          size="small"
          options={[
            '25',
            '50',
            '100',
            '150',
            '200',
            '250',
            '300',
            '500',
            '1000',
          ]}
          name="distance"
          value={partDetail.distance}
        />
        <Select
          placeholder="Stroke"
          size="small"
          options={['Fly', 'Back', 'Breast', 'Free', 'Kick', 'Drill']}
          name="stroke"
          value={partDetail.stroke}
        />
        <Select
          placeholder="Base"
          size="small"
          options={[
            'base-20',
            'base-10',
            'base-5',
            'base',
            'base+5',
            'base+10',
            'base+20',
            'base+30',
            'kick base',
          ]}
          name="base"
        />
        <Box width="small">
          <TextInput placeholder="Detail" name="detail" size="xsmall" />
        </Box>
        <Button
          type="reset"
          icon={<AddCircle />}
          hoverIndicator
          onClick={() => {
            addPartToSet(setId, partDetail);
          }}
        />
      </Box>
    </Form>
  );
}
