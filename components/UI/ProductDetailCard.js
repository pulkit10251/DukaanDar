import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import AddInitial from "../../components/UI/AddInitial";
import AddLater from "../../components/UI/AddLater";

const ProductDetailCard = (props) => {
  const percentage = 100 - (props.Price * 100) / props.Mrp;

  const cartItems = props.cartItem;
  var currentQuantity;
  if (cartItems[props.product.prod_Id]) {
    currentQuantity = cartItems[props.product.prod_Id].quantity;
  } else {
    currentQuantity = 0;
  }

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.NameContainer}>
        <Text style={styles.Name}>{props.Name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{props.Price}</Text>
        {props.Price === props.Mrp ? (
          <Text></Text>
        ) : (
          <Text style={styles.mrp}>₹{props.Mrp}</Text>
        )}
        {percentage === 0 ? (
          <View></View>
        ) : (
          <View style={styles.percentage}>
            <Text style={styles.percentText}>{percentage.toFixed(1)}% OFF</Text>
          </View>
        )}
        {props.Avail && (
          <View style={styles.priceAddContainer}>
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
                  product={props.product}
                  dispatch={props.dispatch}
                  categoryList={props.catList}
                />
              )}
            </View>
          </View>
        )}
      </View>
      {props.Avail ? (
        <View style={styles.Stock}>
          <Text style={styles.inStock}>In Stock</Text>
        </View>
      ) : (
        <View style={styles.Stock}>
          <Text style={styles.OutStock}>Out of Stock</Text>
        </View>
      )}
      <View
        style={{
          marginTop: 20,
          borderBottomColor: "#D3D3D3",
          borderBottomWidth: 2,
        }}
      />
      <View style={styles.Mfdcontainer}>
        <Text style={styles.heading}>Unit : </Text>
        <Text style={styles.text}>
          {props.Qty} {props.Unit}
        </Text>
      </View>
      <View style={styles.Mfdcontainer}>
        <Text style={styles.heading}>Manufacturing Date : </Text>
        <Text style={styles.text}>{props.Mfd}</Text>
      </View>
      <View style={styles.Mfdcontainer}>
        <Text style={styles.heading}>Shelf Life : </Text>
        <Text style={styles.text}>{props.Shelf}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: "white",
    padding: 10,
  },
  NameContainer: {
    marginVertical: 5,
  },
  Name: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("screen").height * 0.025,
  },
  priceContainer: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  price: {
    marginRight: 10,
    fontSize: Dimensions.get("screen").height * 0.025,
    fontFamily: "open-sans-bold",
    textAlign: "center",
    marginTop: "auto",
  },
  mrp: {
    textDecorationLine: "line-through",
    fontSize: Dimensions.get("screen").height * 0.025,
    fontFamily: "open-sans",
    color: "#888",
    marginTop: "auto",
  },
  percentage: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginHorizontal: 10,
    width: Dimensions.get("screen").width * 0.2,
    height: Dimensions.get("screen").height * 0.035,
    justifyContent: "center",
    marginTop: "auto",
  },
  percentText: {
    textAlign: "center",
    color: "white",
    margin: 3,
    fontSize: Dimensions.get("screen").height * 0.018,
    fontFamily: "open-sans",
  },
  priceAddContainer: {
    marginLeft: "auto",
    flexDirection: "row",
  },
  QuantityText: {
    fontSize: Dimensions.get("screen").width * 0.05,
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
  heading: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("screen").width * 0.05,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: Dimensions.get("screen").width * 0.05,
  },
  Mfdcontainer: {
    flexDirection: "row",
    margin: 10,
  },
  Stock: {
    marginTop: 10,
  },
  inStock: {
    fontFamily: "open-sans-bold",
    color: "green",
    fontSize: Dimensions.get("screen").height * 0.025,
  },
  OutStock: {
    fontFamily: "open-sans-bold",
    color: "red",
    fontSize: Dimensions.get("screen").height * 0.025,
  },
});

export default ProductDetailCard;
