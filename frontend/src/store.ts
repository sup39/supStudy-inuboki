import {configureStore} from '@reduxjs/toolkit';
import {mainReducer} from './reducer';
import * as Redux from 'react-redux';

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useDispatch = () => Redux.useDispatch<typeof store.dispatch>();
export const useSelector: Redux.TypedUseSelectorHook<RootState> = Redux.useSelector;
export default store;
