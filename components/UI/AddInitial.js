import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as CartActions from "../../store/actions/CartAction";

const AddInitial = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp
      onPress={() => {
        // props.increment();
        props.dispatch(
          CartActions.addToCart(
            props.product,
            props.val + 1,
            props.categoryList,
          )
        );
      }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>ADD</Text>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="ios-add" color="white" size={25} />
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    width: "66.9%",
    height: "100%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  iconContainer: {
    width: "33.4%",
    height: "100%",
    backgroundColor: "#C30000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddInitial;
