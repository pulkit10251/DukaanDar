import React from "react";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";
import Colors from "../../constants/Colors";
import { normalize } from "react-native-elements";

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
        <View style={{ height: 50, marginBottom: 10 }}>
          <Text style={styles.text}>{props.product.prod_Name}</Text>
        </View>
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
    height: 200,
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  imageContainer: {
    width: "33%",
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
    justifyContent: "space-between",
  },
  price: {
    marginRight: 10,
    fontSize: normalize(16),
    fontFamily: "open-sans-bold",
  },
  mrp: {
    textDecorationLine: "line-through",
    fontSize: normalize(16),
    fontFamily: "open-sans",
    color: "#888",
  },
  percentage: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: "auto",
    marginHorizontal: 0,
    justifyContent: "center",
  },
  percentText: {
    textAlign: "center",
    color: "white",
    margin: 3,
    fontSize: normalize(10),
    fontFamily: "open-sans",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: normalize(16),
  },
  priceAddContainer: {
    width: "45%",
    flexDirection: "row",
    marginBottom: "auto",
    marginVertical: 10,
  },
  QuantityText: {
    fontSize: normalize(20),
    fontFamily: "open-sans",
  },
  boxContainer: {
    marginTop: 0,
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
    fontSize: normalize(40),
    color: Colors.other,
  },
});

export default OrderBox;
