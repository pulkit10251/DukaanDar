const initialState = {
  active: {},
  Delivered: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      const activeData = action.active;
      const deliveredData = action.delivered;

      return {
        active: activeData,
        delivered: deliveredData,
      };

    
    default:
      return state;
  }
};
