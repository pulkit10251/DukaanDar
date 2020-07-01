import ShopData from "../../data/Dummy_data";
import * as ShopAction from "../actions/ShopAction";
import CategoryGlobal from "../../models/CategoryGlobal";
import Shop from "../../models/Shop";
import { useSelector } from "react-redux";
import CategoryLocal from "../../models/CategoryLocal";

const initialState = {
  ShopData: ShopData,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_GLOBAL_CATEGORY": {
      const catId = action.catId;
      const shop = state.ShopData.find(
        (item) => item.shop_Id === action.shopId
      );
      const shop_GC = shop.shop_Categories;
      const updatedGC = shop_GC.filter((item) => item.category_Id !== catId);

      const updatedStore = new Shop(
        shop.shop_Id,
        shop.shop_Name,
        shop.shop_ShopkeeperName,
        shop.shop_ShopImage,
        shop.shop_ShopkeeperImage,
        shop.shop_Location,
        shop.shop_Description,
        updatedGC,
        shop.shop_OpenDays,
        shop.shop_OpenTimings,
        shop.shop_ClosedTimings,
        shop.shop_BreakTimings,
        shop.shop_Offers,
        shop.shop_Front
      );

      const ShopData = state.ShopData;
      const shopIndex = ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData,
      };
    }
    case "REMOVE_LOCAL_CATEGORY": {
      const catId = action.catId;
      const shopId = action.shopId;
      const LocId = action.LocId;
      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );

      const globalCategory = selectedStore.shop_Categories.find(
        (item) => item.category_Id === catId
      );

      const localCategories = globalCategory.category_Local.filter(
        (item) => item.Local_Id != LocId
      );

      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      const catIndex = selectedStore.shop_Categories.findIndex(
        (item) => item.category_Id === catId
      );

      const UpdatedGlobalCategory = new CategoryGlobal(
        globalCategory.category_Name,
        globalCategory.category_Image,
        globalCategory.category_Id,
        localCategories
      );

      var globalCategories = selectedStore.shop_Categories;
      globalCategories[catIndex] = UpdatedGlobalCategory;

      const updatedStore = new Shop(
        selectedStore.shop_Id,
        selectedStore.shop_Name,
        selectedStore.shop_ShopkeeperName,
        selectedStore.shop_ShopImage,
        selectedStore.shop_ShopkeeperImage,
        selectedStore.shop_Location,
        selectedStore.shop_Description,
        globalCategories,
        selectedStore.shop_OpenDays,
        selectedStore.shop_OpenTimings,
        selectedStore.shop_ClosedTimings,
        selectedStore.shop_BreakTimings,
        selectedStore.shop_Offers,
        selectedStore.shop_Front
      );
      const ShopData = state.ShopData;

      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData.slice(),
      };
    }
    case "REMOVE_PRODUCT": {
      const catId = action.catId;
      const shopId = action.shopId;
      const LocId = action.LocId;
      const prodId = action.prodId;

      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );

      var globalCategory = selectedStore.shop_Categories.find(
        (item) => item.category_Id === catId
      );

      var localCategory = globalCategory.category_Local.find(
        (item) => item.Local_Id === LocId
      );

      const products = localCategory.category_Products.filter(
        (item) => item.prod_Id != prodId
      );

      localCategory.category_Products = products;

      const local_Index = globalCategory.category_Local.findIndex(
        (item) => item.Local_Id === LocId
      );

      globalCategory.category_Local[local_Index] = localCategory;

      const catIndex = selectedStore.shop_Categories.findIndex(
        (item) => item.category_Id === catId
      );

      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );

      var globalCategories = selectedStore.shop_Categories;
      globalCategories[catIndex] = globalCategory;

      const updatedStore = new Shop(
        selectedStore.shop_Id,
        selectedStore.shop_Name,
        selectedStore.shop_ShopkeeperName,
        selectedStore.shop_ShopImage,
        selectedStore.shop_ShopkeeperImage,
        selectedStore.shop_Location,
        selectedStore.shop_Description,
        globalCategories,
        selectedStore.shop_OpenDays,
        selectedStore.shop_OpenTimings,
        selectedStore.shop_ClosedTimings,
        selectedStore.shop_BreakTimings,
        selectedStore.shop_Offers,
        selectedStore.shop_Front
      );
      const ShopData = state.ShopData;

      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData.slice(),
      };
    }
  }

  return state;
};
