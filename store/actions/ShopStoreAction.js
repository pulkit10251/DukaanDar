import StoreModel from "../../models/StoreModel";
import CartItem from "../../models/CartItem";

export const ADD_STORE = "ADD_STORE";
export const REMOVE_STORE = "REMOVE_STORE";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const PLACE_ORDER = "PLACE_ORDER";
export const FETCH_CUSTOMER_DATA = "FETCH_CUSTOMER_DATA";

export const addStore = (shopId) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_STORE,
      shopId: shopId,
    });
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

export const addCustomerData = () => {
  return async (dispatch, getState) => {
    const customerData = getState().store.shops;
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      }
    );

    const resData = await response.json();
  };
};

export const fetchCustomerData = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}.json?auth=${token}`
    );

    const resData = await response.json();
    const customerData = {};

    for (const key in resData) {
      var orders;
      if (resData[key].YourOrders === undefined) {
        orders = [];
      } else {
        orders = resData[key].YourOrders;
      }
      var cartItems;
      if (resData[key].cartItems === undefined) {
        cartItems = {};
      } else {
        cartItems = resData[key].cartItems;
      }

      customerData[key] = new StoreModel(
        key,
        cartItems,
        orders,
        resData[key].TotalAmount,
        resData[key].TotalMrp
      );
    }
    dispatch({
      type: FETCH_CUSTOMER_DATA,
      customerData: customerData,
    });
  };
};
