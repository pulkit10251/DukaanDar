import ShopData from "../../data/Dummy_data";
import CategoryGlobal from "../../models/CategoryGlobal";
import Shop from "../../models/Shop";
import CategoryLocal from "../../models/CategoryLocal";
import Product from "../../models/Product";

const initialState = {
  ShopData: {},
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

      const category = shop_GC.find((item) => item.category_Id === catId);
      const localCat = category.category_Local;

      var shop_Front = shop.shop_Front;

      for (var i = 0; i < localCat.length; i++) {
        const LocId = localCat[i].Local_Id;
        shop_Front = shop_Front.filter((item) => item.Local_Id != LocId);
      }

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
        shop_Front
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

      var shop_Front = selectedStore.shop_Front;

      shop_Front = shop_Front.filter((item) => item.Local_Id != LocId);

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
        shop_Front
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
        (item) => item.Local_Id != LocId
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
    case "ADD_GLOBAL_CATEGORY": {
      const shopId = action.shopId;
      const Name = action.Name;
      const ImageUrl = action.ImageUrl;

      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );
      var globalCategories = selectedStore.shop_Categories;

      var Ids = [];
      for (var i = 0; i < globalCategories.length; i++) {
        Ids.push(globalCategories[i].category_Id);
      }

      var max;
      if (Ids.length === 0) {
        max = 0;
      } else {
        max = Math.max(...Ids);
      }

      const Id = max + 1;

      const Globalcategory = new CategoryGlobal(Name, ImageUrl, Id, []);

      globalCategories.push(Globalcategory);

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

      var ShopData = state.ShopData;
      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData,
      };
    }
    case "ADD_LOCAL_CATEGORY": {
      const shopId = action.shopId;
      const Name = action.Name;
      const ImageUrl = action.ImageUrl;
      const GlobalId = action.GlobalId;

      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );

      var globalCategories = selectedStore.shop_Categories;
      let list = [];
      for (var i = 0; i < globalCategories.length; i++) {
        const local = globalCategories[i].category_Local;
        list = [...list, ...local];
      }

      var Ids = [];

      for (var i = 0; i < list.length; i++) {
        Ids.push(list[i].Local_Id);
      }

      var max;
      if (Ids.length === 0) {
        max = 0;
      } else {
        max = Math.max(...Ids);
      }

      const Local_Id = max + 1;

      const globalCategory = globalCategories.find(
        (item) => item.category_Id === GlobalId
      );

      const catIndex = globalCategories.findIndex(
        (item) => item.category_Id === GlobalId
      );

      const newLocalCategory = new CategoryLocal(
        Name,
        ImageUrl,
        Local_Id,
        GlobalId,
        []
      );

      globalCategory.category_Local.push(newLocalCategory);

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

      var ShopData = state.ShopData;
      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData.slice(),
      };
    }
    case "ADD_PRODUCT": {
      const shopId = action.shopId;
      const GlobalId = action.GlobalId;
      const prod_Name = action.prod_Name;
      const prod_CategoryId = action.prod_CategoryId;
      const prod_ImageUrl = action.prod_ImageUrl;
      const prod_Quantity = action.prod_Quantity;
      const prod_Unit = action.prod_Unit;
      const prod_MfdDate = action.prod_MfdDate;
      const prod_ShelfLife = action.prod_ShelfLife;
      const prod_Price = action.prod_Price;
      const prod_Mrp = action.prod_Mrp;
      const prod_Availability = action.prod_Availability;

      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );

      var globalCategories = selectedStore.shop_Categories;

      var globalCategory = globalCategories.find(
        (item) => item.category_Id === GlobalId
      );

      const localCategory = globalCategory.category_Local.find(
        (item) => item.Local_Id === prod_CategoryId
      );

      var Ids = [];

      for (var i = 0; i < localCategory.category_Products.length; i++) {
        const id = localCategory.category_Products[i].prod_Id;
        var Id = id.split("-");
        Ids.push(Number(Id[1]));
      }
      var max;
      if (Ids.length === 0) {
        max = 0;
      } else {
        max = Math.max(...Ids);
      }
      const prod_Id = prod_CategoryId + "-" + String(max + 1);

      const newProduct = new Product(
        prod_Name,
        prod_Id,
        prod_ImageUrl,
        Number(prod_Price),
        Number(prod_Mrp),
        Number(prod_Quantity),
        prod_Unit,
        prod_MfdDate,
        prod_ShelfLife,
        prod_CategoryId,
        prod_Availability
      );
      localCategory.category_Products.push(newProduct);

      const locIndex = globalCategory.category_Local.findIndex(
        (item) => item.Local_Id === prod_CategoryId
      );

      globalCategory.category_Local[locIndex] = localCategory;

      const catIndex = globalCategories.findIndex(
        (item) => item.category_Id === GlobalId
      );

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

      var ShopData = state.ShopData;
      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData.slice(),
      };
    }

    case "EDIT_GLOBAL_CATEGORY": {
      const shopId = action.shopId;
      const GlobalId = action.GlobalId;
      const Name = action.Name;
      const ImageUrl = action.ImageUrl;

      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );

      const globalCategories = selectedStore.shop_Categories;

      const globalIndex = globalCategories.findIndex(
        (item) => item.category_Id === GlobalId
      );
      globalCategories[globalIndex].category_Name = Name;
      globalCategories[globalIndex].category_Image = ImageUrl;

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

      var ShopData = state.ShopData;
      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData.slice(),
      };
    }
    case "EDIT_LOCAL_CATEGORY": {
      const shopId = action.shopId;
      const Name = action.Name;
      const ImageUrl = action.ImageUrl;
      const GlobalId = action.GlobalId;
      const LocalId = action.LocalId;

      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );

      const globalCategories = selectedStore.shop_Categories;

      const globalIndex = globalCategories.findIndex(
        (item) => item.category_Id === GlobalId
      );

      const localCategories = globalCategories[globalIndex].category_Local;

      const localIndex = localCategories.findIndex(
        (item) => item.Local_Id === LocalId
      );

      localCategories[localIndex].category_Name = Name;
      localCategories[localIndex].CatLocImage = ImageUrl;

      globalCategories[globalIndex].CategoryLocal = localCategories;

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

      var ShopData = state.ShopData;
      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData.slice(),
      };
    }
    case "EDIT_PRODUCT": {
      const shopId = action.shopId;
      const prod_Id = action.prod_Id;
      const GlobalId = action.GlobalId;
      const prod_Name = action.prod_Name;
      const prod_CategoryId = action.prod_CategoryId;
      const prod_ImageUrl = action.prod_ImageUrl;
      const prod_Quantity = action.prod_Quantity;
      const prod_Unit = action.prod_Unit;
      const prod_MfdDate = action.prod_MfdDate;
      const prod_ShelfLife = action.prod_ShelfLife;
      const prod_Price = action.prod_Price;
      const prod_Mrp = action.prod_Mrp;
      const prod_Availability = action.prod_Availability;

      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );

      const globalCategories = selectedStore.shop_Categories;

      const globalIndex = globalCategories.findIndex(
        (item) => item.category_Id === GlobalId
      );
      const localCategories = globalCategories[globalIndex].category_Local;

      const localIndex = localCategories.findIndex(
        (item) => item.Local_Id === prod_CategoryId
      );

      const products = localCategories[localIndex].category_Products;

      const prodIndex = products.findIndex((item) => item.prod_Id === prod_Id);

      products[prodIndex].prod_Name = prod_Name;
      products[prodIndex].prod_ImageUrl = prod_ImageUrl;
      products[prodIndex].prod_Quantity = Number(prod_Quantity);
      products[prodIndex].prod_Unit = prod_Unit;
      products[prodIndex].prod_Price = Number(prod_Price);
      products[prodIndex].prod_Mrp = Number(prod_Mrp);
      products[prodIndex].prod_MfdDate = prod_MfdDate;
      products[prodIndex].prod_ShelfLife = prod_ShelfLife;
      products[prodIndex].prod_Availability = prod_Availability;

      localCategories[localIndex].category_Products = products;
      globalCategories[globalIndex].category_Local = localCategories;

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

      var ShopData = state.ShopData;
      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData.slice(),
      };
    }
    case "EDIT_SHOP": {
      const shopId = action.shopId;
      const shopName = action.shopName;
      const shopImage = action.shopImage;
      const shopkeeperName = action.shopkeeperName;
      const shopkeeperImage = action.shopkeeperImage;
      const shopLocation = action.shopLocation;
      const shopDesc = action.shopDesc;
      const shopOffers = action.shopOffer;
      const shopFront = action.shopFront;
      const openDays = action.openDays;
      const openTimings = action.openTimings;
      const closeTimings = action.closeTimings;
      const breakTimings = action.breakTimings;

      const selectedStore = state.ShopData.find(
        (item) => item.shop_Id === shopId
      );

      const updatedStore = new Shop(
        shopId,
        shopName,
        shopkeeperName,
        shopImage,
        shopkeeperImage,
        shopLocation,
        shopDesc,
        selectedStore.shop_Categories,
        openDays,
        openTimings,
        closeTimings,
        breakTimings,
        shopOffers,
        shopFront
      );

      var ShopData = state.ShopData;
      const shopIndex = state.ShopData.findIndex(
        (item) => item.shop_Id === action.shopId
      );
      ShopData[shopIndex] = updatedStore;

      return {
        ...state,
        ShopData: ShopData.slice(),
      };
    }
    case "ADD_SHOP": {
      const shopId = action.shopId;
      const shopName = action.shopName;
      const shopImage = action.shopImage;
      const shopkeeperName = action.shopkeeperName;
      const shopkeeperImage = action.shopkeeperImage;
      const shopLocation = action.shopLocation;
      const shopDesc = action.shopDesc;
      const shopOffers = action.shopOffer;
      const shopFront = action.shopFront;
      const openDays = action.openDays;
      const openTimings = action.openTimings;
      const closeTimings = action.closeTimings;
      const breakTimings = action.breakTimings;

      const newStore = new Shop(
        shopId,
        shopName,
        shopkeeperName,
        shopImage,
        shopkeeperImage,
        shopLocation,
        shopDesc,
        [],
        openDays,
        openTimings,
        closeTimings,
        breakTimings,
        shopOffers,
        shopFront
      );

      const shopData = [...state.ShopData, newStore];

      return {
        ...state,
        ShopData: shopData.slice(),
      };
    }
    case "FETCH_SHOP": {
      const shopData = action.shopData;
      return {
        ...state,
        ShopData: shopData,
      };
    }
  }

  return state;
};
