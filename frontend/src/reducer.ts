import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';

export type ProgressItem = {
  lastStudy: Date,
  progress: 0 | 1 | 2,
};

const initialState = {
  items: {} as {[key: string]: ProgressItem|null},
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setProgress(state, {payload: {key, item}}: PayloadAction<{
      key: string
      item: null|ProgressItem
    }>) {
      state.items[key] = item;
    },
    setAllProgress(state, {payload}: PayloadAction<typeof state.items>) {
      state.items = payload;
    },
  },
});

export const mainReducer = mainSlice.reducer;
export const {setProgress, setAllProgress} = mainSlice.actions;
export const selectProgress = (state: RootState) => state.main.items;
