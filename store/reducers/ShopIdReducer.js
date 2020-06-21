const initialState = {
  shopId: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOP_ID":

      const shopId = action.shopId;
      return {
        shopId: shopId,
      };
  }
  return state;
};
