import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import Colors from "../../constants/Colors";

const OrderBox = (props) => {
  const percentage =
    100 - (props.product.prod_Price * 100) / props.product.prod_Mrp;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.product.prod_ImageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{props.product.prod_Price}</Text>
          {props.price === props.mrp ? (
            <Text></Text>
          ) : (
            <Text style={styles.mrp}>₹{props.product.prod_Mrp}</Text>
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
        <Text style={styles.text}>{props.product.prod_Name}</Text>
        <View style={styles.boxContainer}>
          <View style={styles.priceAddContainer}>
            <Text style={styles.QuantityText}>
              {props.product.prod_Quantity} {props.product.prod_Unit}
            </Text>
          </View>
          <View style={styles.qtyBox}>
            <Text style={styles.BoxText}>{props.quantity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: Dimensions.get("screen").height * 0.2,
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 5,
    borderWidth:2,
    borderRadius:10,
    borderColor: Colors.primary,
  },
  imageContainer: {
    width: "35%",
    height: "90%",
    marginHorizontal: 10,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  priceContainer: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    padding: 5,
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
  text: {
    fontFamily: "open-sans",
    fontSize: Dimensions.get("screen").height * 0.025,
  },
  priceAddContainer: {
    width: "45%",
    flexDirection: "row",
    marginBottom: "auto",
    marginVertical: 10,
  },
  QuantityText: {
    fontSize: Dimensions.get("screen").height * 0.025,
    fontFamily: "open-sans",
  },
  boxContainer: {
    marginTop: "auto",
    flexDirection: "row",
    flex: 1,
  },
  qtyBox: {
    borderWidth: 3,
    width: "40%",
    aspectRatio: 1,
    marginVertical: 10,
    marginLeft: "auto",
    borderRadius: 10,
    borderColor: Colors.primary,
    justifyContent: "center",
  },
  BoxText: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 40,
    color: Colors.primary,
  },
});

export default OrderBox;
