export const ADD_STORE = "ADD_STORE";
export const REMOVE_STORE = "REMOVE_STORE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addStore = (shopId) => {
  return {
    type: ADD_STORE,
    shopId: shopId,
  };
};

export const removeStore = (shopId) => {
  return {
    type: REMOVE_STORE,
    shopId: shopId,
  };
};

export const addToCart = (product, quantity, categoryList) => {
  return {
    type: ADD_TO_CART,
    product: product,
    quantity: quantity,
    categoryList: categoryList,
  };
};

export const removeFromCart = (productId, quantity) => {
  return {
    type: REMOVE_FROM_CART,
    pid: productId,
    quantity: quantity,
  };
};
