import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import filtersSlice from '../features/filters/filtersSlice';
import todoListSlice from '../features/todo/todoSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  todoList: todoListSlice,
  filters: filtersSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;

export const persistor = persistStore(store);
