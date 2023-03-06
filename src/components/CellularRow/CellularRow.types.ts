import { Dispatch } from 'react';
import { CellularDataAction } from '../CellularFrame/reducer';
import { CellularAutomaton } from '../../utils';

export interface CellularRowProps {
  row: number;
  size: number;
  cellularAutomaton: CellularAutomaton;
  frameDispatch: Dispatch<CellularDataAction>;
}
