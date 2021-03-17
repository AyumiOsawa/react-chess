import { configureStore } from '@reduxjs/toolkit';
import boardSliceReducer from '../features/Board/BoardSlice';

const reducer = {
  board: boardSliceReducer
};

export default configureStore({
  reducer
})
