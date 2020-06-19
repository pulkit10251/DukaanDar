import ADD_TO_CART from "../actions/CartAction";
import CartItem from "../../models/CartItem";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const addedProduct = action.product;
      const prodPrice = addedProduct.prod_Price;

      let updatedOrnewCartItem;

      if (state.items[addedProduct.prod_Id]) {
        updatedOrnewCartItem = new CartItem(
          state.items[addedProduct.prod_Id].quantity + 1,
          addedProduct,
          state.items[addedProduct.prod_Id].sum + prodPrice
        );
      } else {
        updatedOrnewCartItem = new CartItem(1, addedProduct, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.prod_Id]: updatedOrnewCartItem },
        totalAmount: state.totalAmount + prodPrice,
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
          selectedCartItem.sum - selectedCartItem.product.prod_Price
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
      };
    }
  }
  return state;
};
