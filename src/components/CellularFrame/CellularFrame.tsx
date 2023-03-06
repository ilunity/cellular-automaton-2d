import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { CellularFrameProps } from './CellularFrame.types';
import { CellularAutomaton } from '../../utils';
import { CellularRow } from '../CellularRow';
import { CellularDataAction, cellularDataReducer } from './reducer';
import { Button, Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const size = 20;
export const CellularFrame: React.FC<CellularFrameProps> = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [cellularData, cellularDataDispatch] = useReducer<Reducer<CellularAutomaton, CellularDataAction>>(cellularDataReducer, new CellularAutomaton(size));

  const toggleActive = () => {
    setIsActive(prevState => !prevState);
  };

  const getRows = () => {
    const rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(
        <CellularRow
          key={ uuidv4() }
          cellularAutomaton={ cellularData }
          row={ i }
          size={ size }
          frameDispatch={ cellularDataDispatch }
        />,
      );
    }

    return rows;
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      cellularDataDispatch({
        type: 'update',
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isActive, cellularData]);

  return (
    <Stack direction={ 'column' }>
      <Button
        variant={ 'contained' }
        onClick={ toggleActive }
        sx={ { my: 5 } }
      >
        { isActive ? 'Stop' : 'Start' }
      </Button>
      { getRows() }
    </Stack>
  );
};
