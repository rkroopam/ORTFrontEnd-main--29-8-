import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
// import storage from 'redux-persist/lib/storage/session'
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: rootReducer,
  // reducer: persistedReducer,
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
