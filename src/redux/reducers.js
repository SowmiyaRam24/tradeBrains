const initialState = {
    watchlist: [],
  };
  
  const watchlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_WATCHLIST':
        return {
          ...state,
          watchlist: [...state.watchlist, action.payload],
        };
  
      case 'REMOVE_FROM_WATCHLIST':
        return {
          ...state,
          watchlist: state.watchlist.filter(
            (company) => company['1. symbol'] !== action.payload['1. symbol']
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default watchlistReducer;
  