import { createSlice } from '@reduxjs/toolkit';

import constants from '../../shared/constants';

const initialStateSelected = {
                                isSelected: false,
                                row: null,
                                column: null
                              };
const SelectedSlice = createSlice({
  name: 'selected',
  initialState: initialStateSelected,
  reducers: {
    selectCell(state, action) {
      const {colNum, rowNum} = action.payload;
      // re-selection of the same cell cancells the seceltion
      if (state.column === colNum && state.row === rowNum) {
        state.isSelected  = initialStateSelected.isSelected;
        state.row         = initialStateSelected.row;
        state.column      = initialStateSelected.column;
      } else {
        state.isSelected  = true;
        state.row         = rowNum;
        state.column      = colNum;
      }
    }
  }
});


export const { selectCell } = SelectedSlice.actions;

export const selectSelected = state => state.selected;

export default SelectedSlice.reducer;
