export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

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
