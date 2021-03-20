import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/Board/BoardSlice';
import selectedReducer from '../features/Cell/CellSlice';

const reducer = {
  board: boardReducer,
  selected: selectedReducer
};

export default configureStore({
  reducer
})
