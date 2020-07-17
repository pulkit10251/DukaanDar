import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as CartActions from "../../store/actions/CartAction";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";
import { useSelector } from "react-redux";

const AddLater = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const shopId = useSelector((state) => state.shopId.shopId);
  return (
    <View style={styles.container}>
      <TouchableCmp
        onPress={() => {
          // props.decrement();
          props.dispatch(
            ShopStoreActions.removeFromCart(props.product.prod_Id, shopId)
          );
          props.dispatch(ShopStoreActions.addCustomerData());
        }}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="ios-remove" color="white" size={25} />
        </View>
      </TouchableCmp>
      <View style={styles.textContainer}>
        <Text>{props.val}</Text>
      </View>
      <TouchableCmp
        onPress={() => {
          // props.increment();
          props.dispatch(
            ShopStoreActions.addToCart(
              props.product,
              props.val,
              props.categoryList,
              shopId
            )
          );
          props.dispatch(ShopStoreActions.addCustomerData());
        }}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="ios-add" color="white" size={25} />
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: "33.3%",
    height: "100%",
    backgroundColor: "#C30000",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "33.4%",
    alignItems: "center",
  },
});

export default AddLater;
