import moment from "moment";

class OrderModel {
  constructor(id, items, totalAmount, date, paymentStatus, paymentMethod) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
    this.paymentStatus = paymentStatus;
    this.paymentMethod = paymentMethod;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default OrderModel;
