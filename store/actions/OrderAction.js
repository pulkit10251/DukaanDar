import OrderModelAdmin from "../../models/OrderModelAdmin";
import ShopStoreReducer from "../reducers/ShopStoreReducer";

export const fetchOrders = (shopId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://dukaandar-e4590.firebaseio.com/shopOrders/${shopId}.json?auth=${token}`
    );

    if (!response.ok) {
      console.log("No orders to fetch");
    }

    const resData = await response.json();
    
    var deliveredData = [];
    var activeData = [];

    if (resData !== null) {
      var active = resData.active;
      if (active !== undefined) {
        for (const key in active) {
          const newOrder = new OrderModelAdmin(
            active[key].Id,
            active[key].orderData.cartItems,
            active[key].orderData.totalAmount,
            active[key].orderData.totalMrp,
            active[key].Date,
            active[key].paymentDetails.paymentStatus,
            active[key].paymentDetails.paymentMethod,
            active[key].CustomerName,
            active[key].CustomerMobileNumber,
            active[key].CustomerEmail,
            active[key].OrderStatus,
            active[key].expoToken,
            active[key].userId
          );
          activeData.push(newOrder);
        }
      }

      var delivered = resData.delivered;
      if (delivered !== undefined) {
        for (const key in delivered) {
          const newOrder = new OrderModelAdmin(
            delivered[key].Id,
            delivered[key].orderData.cartItems,
            delivered[key].orderData.totalAmount,
            delivered[key].orderData.totalMrp,
            delivered[key].Date,
            delivered[key].paymentDetails.paymentStatus,
            delivered[key].paymentDetails.paymentMethod,
            delivered[key].CustomerName,
            delivered[key].CustomerMobileNumber,
            delivered[key].CustomerEmail,
            delivered[key].OrderStatus,
            delivered[key].expoToken,
            delivered[key].userId
          );
          deliveredData.push(newOrder);
        }
      }
    }

    dispatch({
      type: "FETCH_ORDERS",
      active: activeData,
      delivered: deliveredData,
    });
  };
};

export const sendPushNotification = (userId) => {
  return async (dispatch, getState) => {
    const expoToken = await fetch(``);
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
};

export const changePaymentStatus = (userId, shopId, orderId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const shopResponse = await fetch(
      `https://dukaandar-e4590.firebaseio.com/shopOrders/${shopId}/active/${orderId}/paymentDetails.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentStatus: true,
        }),
      }
    );

    const customerResponse = await fetch(
      `https://dukaandar-e4590.firebaseio.com/Customers/${userId}/${shopId}/YourOrders/${orderId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentStatus: true,
        }),
      }
    );

    const order = await fetch(
      `https://dukaandar-e4590.firebaseio.com/shopOrders/${shopId}/active/${orderId}.json?auth=${token}`
    );

    const orderData = await order.json();

    const delivered = await fetch(
      `https://dukaandar-e4590.firebaseio.com/shopOrders/${shopId}/delivered/${orderId}.json?auth=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    const deleteData = await fetch(
      `https://dukaandar-e4590.firebaseio.com/shopOrders/${shopId}/active/${orderId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
  };
};
