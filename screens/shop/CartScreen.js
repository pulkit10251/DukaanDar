import React from "react";
import { Text, View, StyleSheet, Flatlist } from "react-native";
import { useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";

const CartScreen = (props) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state) => {
    const cartItems = [];
    for (const key in state.cart.items) {
      cartItems.push({
        product: state.cart.items[key].product,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return cartItems;
  });

  console.log(items[0].product.prod_Name, items[0].quantity);
  return (
    <View>
      <Text>Cart Screen </Text>
      <Text>{totalAmount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
