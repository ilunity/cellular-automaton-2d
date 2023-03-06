import React from 'react';
import { CellularRowProps } from './CellularRow.types';
import { Stack } from '@mui/material';
import { Cell } from './CellularRow.styles';
import { v4 as uuidv4 } from 'uuid';

export const CellularRow: React.FC<CellularRowProps> = (
  {
    row,
    size,
    cellularAutomaton,
    frameDispatch,
  },
) => {
  const toggleCell = (row: number, column: number) => {
    frameDispatch({
      type: 'toggleCell',
      payload: { row, column },
    });
  };

  const getCells = () => {
    const cells = [];
    for (let i = 0; i < size; i++) {
      cells.push(
        <Cell
          key={ uuidv4() }
          isActive={ cellularAutomaton.getElement(row, i) }
          onClick={ () => toggleCell(row, i) }
        />,
      );
    }

    return cells;
  };

  return (
    <Stack direction={ 'row' }>
      { getCells() }
    </Stack>
  );
};
