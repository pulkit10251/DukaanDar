export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const addToCart = (product, quantity, categoryList, shopId) => {
  return {
    type: ADD_TO_CART,
    product: product,
    quantity: quantity,
    categoryList: categoryList,
    shopId: shopId,
  };
};

export const removeFromCart = (productId, quantity, shopId) => {
  return {
    type: REMOVE_FROM_CART,
    pid: productId,
    quantity: quantity,
    shopId: shopId,
  };
};
