const initialState = {
  OrderStatus: "PENDING",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_STATUS":
      const OrderStatus = action.status;
      return {
        OrderStatus: OrderStatus,
      };
  }
  return state;
};
