import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import AddInitial from "./AddInitial";
import AddLater from "./AddLater";

const ProductsCard = (props) => {
  const percentage = 100 - (props.price * 100) / props.mrp;

  const cartItems = props.cartItems;

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
    <TouchableCmp
      onPress={() => props.navigate(props.product, props.catList, props.shopId)}
      useForeground
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{props.price}</Text>
            {props.price === props.mrp ? (
              <Text></Text>
            ) : (
              <Text style={styles.mrp}>₹{props.mrp}</Text>
            )}
            {percentage === 0 ? (
              <View></View>
            ) : (
              <View style={styles.percentage}>
                <Text style={styles.percentText}>
                  {percentage.toFixed(1)}% OFF
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.text}>{props.product_Name}</Text>
          <View style={styles.priceAddContainer}>
            <Text style={styles.QuantityText}>
              {props.qty} {props.unit}
            </Text>
            {props.Avail ? (
              <View style={styles.addContainer}>
                {currentQuantity == 0 ? (
                  <AddInitial
                    dispatch={props.dispatch}
                    val={currentQuantity}
                    product={props.product}
                    shopId={props.shopId}
                    categoryList={props.catList}
                  />
                ) : (
                  <AddLater
                    dispatch={props.dispatch}
                    val={currentQuantity}
                    shopId={props.shopId}
                    categoryList={props.catList}
                    product={props.product}
                  />
                )}
              </View>
            ) : (
              <View style={styles.OutStock}>
                <Text style={styles.stockText}>Out of Stock</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: "white",
    margin: Dimensions.get("screen").width * 0.015,
  },
  imageContainer: {
    width: Dimensions.get("screen").width * 0.32,
    height: Dimensions.get("screen").height * 0.2,
    margin: 5,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  priceContainer: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
  },
  price: {
    marginRight: 10,
    fontSize: Dimensions.get("screen").height * 0.025,
    fontFamily: "open-sans-bold",
  },
  mrp: {
    textDecorationLine: "line-through",
    fontSize: Dimensions.get("screen").height * 0.025,
    fontFamily: "open-sans",
    color: "#888",
  },
  percentage: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: "auto",
    marginHorizontal: 10,
    justifyContent: "center",
  },
  percentText: {
    textAlign: "center",
    color: "white",
    margin: 3,
    fontSize: Dimensions.get("screen").height * 0.015,
    fontFamily: "open-sans",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: Dimensions.get("screen").height * 0.025,
  },
  priceAddContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  QuantityText: {
    fontSize: Dimensions.get("screen").height * 0.025,
    fontFamily: "open-sans",
  },
  addContainer: {
    height: Dimensions.get("screen").height * 0.045,
    width: Dimensions.get("screen").width * 0.26,
    marginLeft: "auto",
    borderRadius: 5,
    marginRight: 10,
    overflow: "hidden",
  },
  OutStock: {
    marginLeft: "auto",
    marginRight: 10,
  },
  stockText: {
    fontSize: Dimensions.get("screen").width * 0.05,
    fontFamily: "open-sans-bold",
    color: "red",
  },
});

export default ProductsCard;
