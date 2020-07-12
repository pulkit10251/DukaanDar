import Shop from "../../models/Shop";
import CategoryLocal from "../../models/CategoryLocal";
import CategoryGlobal from "../../models/CategoryGlobal";

export const ADD_GLOBAL_CATEGORY = "ADD_GLOBAL_CATEGORY";
export const ADD_LOCAL_CATEGORY = "ADD_LOCAL_CATEGORY";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_GLOBAL_CATEGORY = "REMOVE_GLOBAL_CATEGORY";
export const REMOVE_LOCAL_CATEGORY = "REMOVE_LOCAL_CATEGORY";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const EDIT_GLOBAL_CATEGORY = "EDIT_GLOBAL_CATEGORY";
export const EDIT_LOCAL_CATEGORY = "EDIT_LOCAL_CATEGORY";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const EDIT_SHOP = "EDIT_SHOP";
export const ADD_SHOP = "ADD_SHOP";
export const ADD_SERVER = "ADD_SERVER";
export const FETCH_SHOP = "FETCH_SHOP";

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

export const editGlobal = (shopId, Name, ImageUrl, GlobalId) => {
  return {
    type: EDIT_GLOBAL_CATEGORY,
    shopId: shopId,
    Name: Name,
    ImageUrl: ImageUrl,
    GlobalId: GlobalId,
  };
};

export const editLocal = (shopId, Name, ImageUrl, GlobalId, LocalId) => {
  return {
    type: EDIT_LOCAL_CATEGORY,
    shopId: shopId,
    Name: Name,
    ImageUrl: ImageUrl,
    GlobalId: GlobalId,
    LocalId: LocalId,
  };
};

export const editProduct = (
  shopId,
  GlobalId,
  prod_Id,
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
    type: EDIT_PRODUCT,
    shopId: shopId,
    GlobalId: GlobalId,
    prod_Id: prod_Id,
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

export const editShop = (
  shopId,
  shopName,
  shopImage,
  shopkeeperName,
  shopkeeperImage,
  shopLocation,
  shopOffer,
  shopFront,
  shopDesc,
  openDays,
  openTimings,
  closeTimings,
  breakTimings
) => {
  return async (dispatch) => {
    dispatch({
      type: EDIT_SHOP,
      shopId: shopId,
      shopName: shopName,
      shopImage: shopImage,
      shopkeeperName: shopkeeperName,
      shopkeeperImage: shopkeeperImage,
      shopLocation: shopLocation,
      shopOffer: shopOffer,
      shopFront: shopFront,
      shopDesc: shopDesc,
      openDays: openDays,
      openTimings: openTimings,
      closeTimings: closeTimings,
      breakTimings: breakTimings,
    });
  };
};

export const addShop = (
  shopId,
  shopName,
  shopImage,
  shopkeeperName,
  shopkeeperImage,
  shopLocation,
  shopOffer,
  shopFront,
  shopDesc,
  openDays,
  openTimings,
  closeTimings,
  breakTimings
) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_SHOP,
      shopId: shopId,
      shopName: shopName,
      shopImage: shopImage,
      shopkeeperName: shopkeeperName,
      shopkeeperImage: shopkeeperImage,
      shopLocation: shopLocation,
      shopOffer: shopOffer,
      shopFront: shopFront,
      shopDesc: shopDesc,
      openDays: openDays,
      openTimings: openTimings,
      closeTimings: closeTimings,
      breakTimings: breakTimings,
    });
  };
};

export const addServer = (shopData) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://dukaandar-e4590.firebaseio.com/ShopData.json",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shopData }),
      }
    );
    const resData = await response.json();
  };
};

export const fetchShop = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://dukaandar-e4590.firebaseio.com/ShopData.json"
    );

    const resData = await response.json();

    var shopData = [];


    for (var i = 0; i < resData.shopData.length; i++) {
      const shop = resData.shopData[i];
      const categories =
        shop.shop_Categories === undefined ? [] : shop.shop_Categories;
      const front = shop.shop_Front === undefined ? [] : shop.shop_Front;
      const offers = shop.shop_Offers === undefined ? [] : shop.shop_Offers;

      var shop_Categories = [];

      for (var j = 0; j < categories.length; j++) {
        const local_Categories =
          categories[j].category_Local === undefined
            ? []
            : categories[j].category_Local;

        var shopLocal = [];

        for (var k = 0; k < local_Categories.length; k++) {
          const products =
            local_Categories[k].category_Products === "undefined"
              ? []
              : local_Categories[k].category_Products;

          shopLocal.push(
            new CategoryLocal(
              local_Categories[k].category_Name,
              local_Categories[k].CatLocImage,
              local_Categories[k].Local_Id,
              local_Categories[k].Global_Id,
              products
            )
          );
        }

        shop_Categories.push(
          new CategoryGlobal(
            categories[j].category_Name,
            categories[j].category_Image,
            categories[j].category_Id,
            shopLocal
          )
        );
      }

      shopData.push(
        new Shop(
          shop.shop_Id,
          shop.shop_Name,
          shop.shop_ShopkeeperName,
          shop.shop_ShopImage,
          shop.shop_ShopkeeperImage,
          shop.shop_Location,
          shop.shop_Description,
          shop_Categories,
          shop.shop_OpenDays,
          shop.shop_OpenTimings,
          shop.shop_ClosedTimings,
          shop.shop_BreakTimings,
          offers,
          front
        )
      );
    }


    dispatch({
      type: FETCH_SHOP,
      shopData: shopData,
    });
  };
};
