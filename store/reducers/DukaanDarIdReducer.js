const initialState = {
  shopId: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_SHOP_ID_DUKAANDAR":
      const shopId = action.shopId;
      return {
        shopId: shopId,
      };
  }
  return state;
};
