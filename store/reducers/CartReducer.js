import ADD_TO_CART from "../actions/CartAction";
import CartItem from "../../models/CartItem";

const initialState = {
  items: {},
  totalAmount: 0,
  totalAmountMRP:0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const addedProduct = action.product;
      const prodPrice = addedProduct.prod_Price;
      const prodMrp = addedProduct.prod_Mrp;
      const catList = action.categoryList;

      let updatedOrnewCartItem;

      if (state.items[addedProduct.prod_Id]) {
        updatedOrnewCartItem = new CartItem(
          state.items[addedProduct.prod_Id].quantity + 1,
          addedProduct,
          state.items[addedProduct.prod_Id].sum + prodPrice,
          catList,
        );
      } else {
        updatedOrnewCartItem = new CartItem(1, addedProduct, prodPrice,catList);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.prod_Id]: updatedOrnewCartItem },
        totalAmount: state.totalAmount + prodPrice,
        totalAmountMRP : state.totalAmountMRP + prodMrp,
      };
    }

    case "REMOVE_FROM_CART": {
      const selectedCartItem = state.items[action.pid];
      const currentQuantity = selectedCartItem.quantity;

      let updatedCartItems;

      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.product,
          selectedCartItem.sum - selectedCartItem.product.prod_Price,
          selectedCartItem.catList,
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.product.prod_Price,
        totalAmountMRP : state.totalAmountMRP - selectedCartItem.product.prod_Mrp,
      };
    }
  }
  return state;
};
