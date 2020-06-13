class Product {
  constructor(
    prod_Name,
    prod_Id,
    prod_ImageUrl,
    prod_Price,
    prod_Mrp,
    prod_Quantity,
    prod_Unit,
    prod_MfdDate,
    prod_ShelfLife,
    prod_categoryId,
    prod_Availability
  ) {
    this.prod_Name = prod_Name;
    this.prod_Id = prod_Id;
    this.prod_ImageUrl = prod_ImageUrl;
    this.prod_Price = prod_Price;
    this.prod_Mrp = prod_Mrp;
    this.prod_Quantity = prod_Quantity;
    this.prod_Unit = prod_Unit;
    this.prod_MfdDate = prod_MfdDate;
    this.prod_ShelfLife = prod_ShelfLife;
    this.prod_categoryId = prod_categoryId;
    this.prod_Availability = prod_Availability;
  }
}

export default Product;
