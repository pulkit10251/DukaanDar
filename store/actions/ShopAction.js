export const ADD_GLOBAL_CATEGORY = "ADD_GLOBAL_CATEGORY";
export const REMOVE_GLOBAL_CATEGORY = "REMOVE_GLOBAL_CATEGORY";
export const REMOVE_LOCAL_CATEGORY = "REMOVE_LOCAL_CATEGORY";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

export const addGlobal = (shopId) => {
  return {
    type: ADD_GLOBAL_CATEGORY,
    shopId: shopId,
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
