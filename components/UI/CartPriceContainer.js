import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const CartPriceContainer = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>MRP</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.amount}>₹ {props.totalMrp}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Products Discount</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.discount}>
            - ₹ {props.totalMrp - props.totalAmount}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>Sub total</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.amount}>₹ {props.totalAmount}</Text>
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
    backgroundColor:'white'
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 15,
  },
  textContainer: {
    width: "50%",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "open-sans",
    textAlign: "left",
    fontSize: 14,
  },
  textBold: {
    fontFamily: "open-sans-bold",
    textAlign: "left",
    fontSize: 16,
  },
  amount: {
    textAlign: "right",
    fontFamily: "open-sans",
  },
  discount: {
    textAlign: "right",
    color: "green",
  },
  line: {
    width: "95%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#D5D5D5",
    marginTop: 5,
  },
});

export default CartPriceContainer;
