import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ShopStoreAction from "../../store/actions/ShopStoreAction";

const CheckoutScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const cartItems = props.navigation.getParam("cartItems");
  const totalAmount = props.navigation.getParam("totalAmount");
  const totalMrp = props.navigation.getParam("totalMrp");
  const shopId = props.navigation.getParam("shopId");
  const paymentStatus = false;
  const paymentMethod = "PAY ON SHOP";

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.paymentOptions}></View>
      <View style={styles.Order}>
        <TouchableCmp
          onPress={() => {
            dispatch(
              ShopStoreAction.placeOrder(
                shopId,
                cartItems,
                totalAmount,
                totalMrp,
                paymentStatus,
                paymentMethod
              )
            );
            props.navigation.navigate("All");
          }}
        >
          <View style={styles.button}>
            <Text style={styles.ButtonText}>Place Order</Text>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Order: {
    marginTop: "auto",
    margin: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 5,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default CheckoutScreen;
