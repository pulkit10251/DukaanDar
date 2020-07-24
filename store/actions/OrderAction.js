import OrderModelAdmin from "../../models/OrderModelAdmin";

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
    var active = resData.active;
    var activeData = [];
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
        );
        activeData.push(newOrder);
      }
    }

    var delivered = resData.delivered;
    var deliveredData = [];
    if (delivered !== undefined) {
      for (const key in delivered) {
        deliveredData.push(delivered[key]);
      }
    }

    dispatch({
      type: "FETCH_ORDERS",
      active: activeData,
      delivered: deliveredData,
    });
  };
};
