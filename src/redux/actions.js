export const addToWatchlist = (company) => {
    return {
      type: 'ADD_TO_WATCHLIST',
      payload: company,
    };
  };
  
  export const removeFromWatchlist = (company) => {
    return {
      type: 'REMOVE_FROM_WATCHLIST',
      payload: company,
    };
  };
  