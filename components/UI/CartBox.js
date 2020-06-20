import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const CartBox = (props) => {
  const percentage = 100 - (props.price * 100) / props.mrp;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.detailContainer}>
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
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
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
                  categoryList={props.catList}
                />
              ) : (
                <AddLater
                  dispatch={props.dispatch}
                  val={currentQuantity}
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: 5,
    elevation: 2,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
  },
  imageContainer: {
    width: "35%",
    height: 120,
    margin: 10,
  },
  detailContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  nameContainer: {
    marginVertical: 10,
  },
  name: {
    fontFamily: "open-sans",
    fontSize: 18,
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
    backgroundColor: Colors.primary,
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
  priceContainer: {
    flexDirection: "row",
  },
});

export default CartBox;
