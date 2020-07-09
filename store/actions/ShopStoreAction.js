export const ADD_STORE = "ADD_STORE";
export const REMOVE_STORE = "REMOVE_STORE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const PLACE_ORDER = "PLACE_ORDER";

export const addStore = (shopId, ShopData) => {
  return {
    type: ADD_STORE,
    shopId: shopId,
    ShopData: ShopData,
  };
};

export const removeStore = (shopId) => {
  return {
    type: REMOVE_STORE,
    shopId: shopId,
  };
};

export const addToCart = (product, quantity, categoryList, shopId) => {
  return {
    type: ADD_TO_CART,
    product: product,
    quantity: quantity,
    categoryList: categoryList,
    shopId: shopId,
  };
};

export const removeFromCart = (productId, shopId) => {
  return {
    type: REMOVE_FROM_CART,
    pid: productId,
    shopId: shopId,
  };
};

export const placeOrder = (
  shopId,
  cartItems,
  totalAmount,
  totalMrp,
  paymentStatus,
  paymentMethod
) => {
  return {
    type: PLACE_ORDER,
    shopId: shopId,
    orderData: {
      cartItems: cartItems,
      totalAmount: totalAmount,
      totalMrp: totalMrp,
    },
    paymentDetails: {
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus,
    },
  };
};
