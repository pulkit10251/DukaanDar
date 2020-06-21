export const SHOP_ID = "SHOP_ID";

export const shopId = (Id) => {
  return {
    type: SHOP_ID,
    shopId: Id,
  };
};
