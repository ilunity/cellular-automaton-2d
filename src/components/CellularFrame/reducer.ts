import { CellularAutomaton } from '../../utils';

export type CellularDataAction = {
  type: 'setCellularData';
  payload: CellularAutomaton;
} | {
  type: 'toggleCell';
  payload: {
    row: number;
    column: number;
  }
} | {
  type: 'update';
}

export const cellularDataReducer = (state: CellularAutomaton, action: CellularDataAction) => {
  switch (action.type) {
    case 'setCellularData':
      return action.payload;
    case 'toggleCell': {
      const { row, column } = action.payload;
      return state.getFrameWithToggledElement(row, column);
    }
    case 'update':
      const newCellularData = state.getTransformedFrame();
      return newCellularData;
  }
};
