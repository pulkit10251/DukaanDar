class Shop {
  constructor(
    shop_Id,
    shop_Name,
    shop_ShopkeeperName,
    shop_ShopImage,
    shop_ShopkeeperImage,
    shop_Location,
    shop_Description,
    shop_Categories,
    shop_OpenDays,
    shop_OpenTimings,
    shop_ClosedTimings,
    shop_BreakTimings,
  ) {
    this.shop_Id = shop_Id;
    this.shop_Name = shop_Name;
    this.shop_ShopkeeperName = shop_ShopkeeperName;
    this.shop_ShopImage = shop_ShopImage;
    this.shop_ShopkeeperImage = shop_ShopkeeperImage;
    this.shop_Location = shop_Location;
    this.shop_Description = shop_Description;
    this.shop_Categories = shop_Categories;
    this.shop_OpenDays = shop_OpenDays;
    this.shop_OpenTimings = shop_OpenTimings;
    this.shop_ClosedTimings = shop_ClosedTimings;
    this.shop_BreakTimings = shop_BreakTimings;
  }
}

export default Shop;
