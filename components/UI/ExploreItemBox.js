import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import AddInitial from "../../components/UI/AddInitial";
import AddLater from "../../components/UI/AddLater";

const ExploreItemBox = (props) => {
  const cartItems = props.cartItem;
  var currentQuantity;
  if (cartItems[props.product.prod_Id]) {
    currentQuantity = cartItems[props.product.prod_Id].quantity;
  } else {
    currentQuantity = 0;
  }

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={() => props.navigate(props.product, props.list)}>
      <View style={styles.container}>
        <Image
          source={{ uri: props.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.textStyle}>{props.title}</Text>
        {props.Avail ? (
          <View style={styles.addContainer}>
            {currentQuantity == 0 ? (
              <AddInitial
                val={currentQuantity}
                product={props.product}
                dispatch={props.dispatch}
                categoryList={props.catList}
              />
            ) : (
              <AddLater
                val={currentQuantity}
                dispatch={props.dispatch}
                product={props.product}
                categoryList={props.catList}
              />
            )}
          </View>
        ) : (
          <View style={styles.OutStock}>
            <Text style={styles.stockText}>Unavailable</Text>
          </View>
        )}
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 220,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "open-sans",
  },
  priceAddContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
  addContainer: {
    height: Dimensions.get("screen").height * 0.045,
    width: Dimensions.get("screen").width * 0.26,
    borderRadius: 5,
    justifyContent: "center",
    marginTop: "auto",
    overflow: "hidden",
  },
  OutStock: {
    marginTop: "auto",
    alignItems: "center",
  },
  stockText: {
    fontSize: Dimensions.get("screen").width * 0.045,
    fontFamily: "open-sans-bold",
    color: "red",
    textAlign: "center",
  },
});

export default ExploreItemBox;
