class StoreModel {
  constructor(
    shopId,
    cartItems,
    YourOrders,
    TotalAmount,
    TotalMrp
  ) {
    this.shopId = shopId;
    this.cartItems = cartItems;
    this.YourOrders = YourOrders;
    this.TotalAmount = TotalAmount;
    this.TotalMrp = TotalMrp;
  }
}

export default StoreModel;
