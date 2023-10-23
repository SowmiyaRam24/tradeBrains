import { createStore, combineReducers } from 'redux';
import watchlistReducer from './reducers';

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
});

const store = createStore(rootReducer);

export default store;
