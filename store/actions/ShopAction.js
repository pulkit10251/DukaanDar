export const ADD_GLOBAL_CATEGORY = "ADD_GLOBAL_CATEGORY";
export const ADD_LOCAL_CATEGORY = "ADD_LOCAL_CATEGORY";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_GLOBAL_CATEGORY = "REMOVE_GLOBAL_CATEGORY";
export const REMOVE_LOCAL_CATEGORY = "REMOVE_LOCAL_CATEGORY";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

export const addGlobal = (shopId, Name, ImageUrl) => {
  return {
    type: ADD_GLOBAL_CATEGORY,
    shopId: shopId,
    Name: Name,
    ImageUrl: ImageUrl,
  };
};

export const addLocal = (shopId, Name, ImageUrl, GlobalId) => {
  return {
    type: ADD_LOCAL_CATEGORY,
    shopId: shopId,
    Name: Name,
    ImageUrl: ImageUrl,
    GlobalId: GlobalId,
  };
};

export const addProduct = (
  shopId,
  GlobalId,
  prod_Name,
  prod_CategoryId,
  prod_ImageUrl,
  prod_Quantity,
  prod_Unit,
  prod_MfdDate,
  prod_ShelfLife,
  prod_Price,
  prod_Mrp,
  prod_Availability
) => {
  return {
    type: ADD_PRODUCT,
    shopId: shopId,
    GlobalId: GlobalId,
    prod_Name: prod_Name,
    prod_CategoryId: prod_CategoryId,
    prod_ImageUrl: prod_ImageUrl,
    prod_Quantity: prod_Quantity,
    prod_Unit: prod_Unit,
    prod_MfdDate: prod_MfdDate,
    prod_ShelfLife: prod_ShelfLife,
    prod_Price: prod_Price,
    prod_Mrp: prod_Mrp,
    prod_Availability: prod_Availability,
  };
};

export const removeGlobal = (shopId, catId) => {
  return {
    type: REMOVE_GLOBAL_CATEGORY,
    shopId: shopId,
    catId: catId,
  };
};

export const removeLocal = (shopId, catId, LocId) => {
  return {
    type: REMOVE_LOCAL_CATEGORY,
    shopId: shopId,
    catId: catId,
    LocId: LocId,
  };
};

export const removeProduct = (shopId, catId, LocId, prodId) => {
  return {
    type: REMOVE_PRODUCT,
    shopId: shopId,
    catId: catId,
    LocId: LocId,
    prodId: prodId,
  };
};
