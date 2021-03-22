import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/Board/BoardSlice';

const reducer = {
  board: boardReducer
};

export default configureStore({
  reducer
})
