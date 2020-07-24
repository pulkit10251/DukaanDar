import moment from "moment";

class OrderModel {
  constructor(
    id,
    cartItems,
    totalAmount,
    totalMrp,
    date,
    paymentStatus,
    paymentMethod,
    customerName,
    customerContact,
    customerEmail
  ) {
    this.id = id;
    this.cartItems = cartItems;
    this.totalAmount = totalAmount;
    this.totalMrp = totalMrp;
    this.date = date;
    this.paymentStatus = paymentStatus;
    this.paymentMethod = paymentMethod;
    this.customerContact = customerContact;
    this.customerEmail = customerEmail;
    this.customerName = customerName;
  }

  get readableDate() {
    return moment(this.date).format("MMM Do YYYY, hh:mm A");
  }
}

export default OrderModel;
