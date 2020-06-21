class StoreModel {
  constructor(shopName, shopId, shopData, cartItems, TotalAmount, TotalMrp) {
    this.shopName = shopName;
    this.shopId = shopId;
    this.shopData = shopData;
    this.cartItems = cartItems;
    this.TotalAmount = TotalAmount;
    this.TotalMrp = TotalMrp;
  }
}

export default StoreModel;
