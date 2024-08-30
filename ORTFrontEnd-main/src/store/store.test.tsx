import { store } from './store';
import type { RootState, AppDispatch } from './store';

// Basic test to ensure the store is created successfully
describe('Redux Store', () => {
  it('should create a store with rootReducer', () => {
    const state = store.getState();
    expect(state).toBeDefined();
  });

  // it('should have the correct initial state for all slices', () => {
  //   const initialState = rootReducer(undefined, { type: '@@INIT' });

  //   // Here we test the initial state of each slice; 
  //   // update these expectations according to your reducers' initial states.
  //   expect(initialState.auth).toEqual({
  //     user: null,
  //     token: null,
  //   });
  //   expect(initialState.user).toEqual({
  //     users: [],
  //     currentUser: null,
  //   });
  //   expect(initialState.menu).toEqual({
  //     openItem: [],
  //     defaultId: '',
  //     openComponent: '',
  //     drawerOpen: false,
  //     componentDrawerOpen: false,
  //   });
  // });

  it('should have correct RootState type', () => {
    const state: RootState = store.getState();
    expect(state).toBeDefined();
    expect(state.auth).toBeDefined();
    expect(state.user).toBeDefined();
    expect(state.menu).toBeDefined();
  });

  it('should have correct AppDispatch type', () => {
    const dispatch: AppDispatch = store.dispatch;
    expect(dispatch).toBeDefined();
  });
});
