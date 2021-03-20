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
      console.log('same?',state.column === colNum && state.row === rowNum);

      console.log('col', colNum);
      console.log("row", rowNum);
      console.log('state.col', state.column);
      console.log("state.row", state.row);
      if (state.column === colNum && state.row === rowNum) {
        state = initialStateSelected;
      } else {
        state.isSelected = true;
        state.row = rowNum;
        state.column = colNum;
      }

      // console.log('sel?',state.selected);
      // console.log('col', state.column);
      // console.log("row",state.row);
    }
    // unselect: function(state, action) {
    //   const {colNum, rowNum} = action.payload;
    //   state[rowNum][colNum].selected = false;
    // }
  }
});


export const { selectCell } = SelectedSlice.actions;

export const selectSelected = state => state.selected;

export default SelectedSlice.reducer;
