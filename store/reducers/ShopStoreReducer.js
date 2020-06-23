import ShopData from "../../data/Dummy_data";
import StoreModel from "../../models/StoreModel";
import CartItem from "../../models/CartItem";

const initialState = {
  shops: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STORE": {
      const shopId = action.shopId;
      const shop = ShopData.find((props) => props.shop_Id === shopId);
      const shopName = shop.shop_Name;

      let NewShop;
      if (state.shops[shopId]) {
        return state;
      } else {
        const cartItems = {};
        // shop is not present in the store
        NewShop = new StoreModel(shopName, shopId, shop, cartItems, 0, 0);
      }

      return {
        ...state,
        shops: { ...state.shops, [shopId]: NewShop },
      };
    }
    case "REMOVE_STORE": {
      const shopId1 = action.shopId;
      const UpdatedStore = { ...state.shops };
      delete UpdatedStore[shopId1];
      return {
        ...state,
        shops: UpdatedStore,
      };
    }

    case "ADD_TO_CART": {
      const addedProduct = action.product;
      const prodPrice = addedProduct.prod_Price;
      const prodMrp = addedProduct.prod_Mrp;
      const catList = action.categoryList;
      const shopId2 = action.shopId;
      const cartItems = { ...state.shops[shopId2].cartItems };
      const store = state.shops[shopId2];

      let updatedOrnewCartItem;

      if (cartItems[addedProduct.prod_Id]) {
        updatedOrnewCartItem = new CartItem(
          cartItems[addedProduct.prod_Id].quantity + 1,
          addedProduct,
          cartItems[addedProduct.prod_Id].sum + prodPrice,
          catList
        );
      } else {
        updatedOrnewCartItem = new CartItem(
          1,
          addedProduct,
          prodPrice,
          catList
        );
      }
      const updatedCartItems = {
        ...cartItems,
        [addedProduct.prod_Id]: updatedOrnewCartItem,
      };
      const updatedShop = new StoreModel(
        store.shopName,
        store.shopId,
        store.shopData,
        updatedCartItems,
        store.TotalAmount + prodPrice,
        store.TotalMrp + prodMrp
      );
      return {
        ...state,
        shops: { ...state.shops, [shopId2]: updatedShop },
      };
    }

    case "REMOVE_FROM_CART": {
      const shopId3 = action.shopId;
      const prodId = action.pid;
      const selectedStore = state.shops[shopId3];
      const CartItems = selectedStore.cartItems ;
      const selectedCartItem = CartItems[prodId];
      const CurrentQuantity = selectedCartItem.quantity;

      let updatedCartItems;

      if (CurrentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.product,
          selectedCartItem.sum - selectedCartItem.product.prod_Price,
          selectedCartItem.catList
        );
        updatedCartItems = { ...CartItems, [prodId]: updatedCartItem };
        
      } else {
        updatedCartItems = { ...CartItems };
        delete updatedCartItems[prodId];
      }

      const updatedShop = new StoreModel(
        selectedStore.shopName,
        selectedStore.shopId,
        selectedStore.shopData,
        updatedCartItems,
        selectedStore.TotalAmount - selectedCartItem.product.prod_Price,
        selectedStore.TotalMrp - selectedCartItem.product.prod_Mrp
      );

      return {
        ...state,
        shops: { ...state.shops, [shopId3]: updatedShop },
      };
    }
  }

  return state;
};
