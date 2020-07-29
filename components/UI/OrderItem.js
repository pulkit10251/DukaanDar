import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { format } from "date-fns";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";

const OrderItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }


  const status = props.orderStatus;
  const Date = moment(props.date).format("MMMM Do YYYY, hh:mm A");

  return (
    <View style={styles.container}>
      <View style={styles.TextContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.boldText}>{Date}</Text>
        </View>
        <View style={styles.IdContainer}>
          <Text style={styles.boldText}>Order Id : </Text>
          <Text style={styles.Text}>{props.id}</Text>
        </View>
        <View style={styles.IdContainer}>
          <Text style={styles.boldText}>Payment Method : </Text>
          <Text style={styles.Text}>{props.paymentMethod}</Text>
        </View>
        <View style={styles.IdContainer}>
          <Text style={styles.boldText}>Payment Status : </Text>
          <Text
            style={{
              ...styles.Textcolor,
              color: props.paymentStatus ? "green" : "red",
            }}
          >
            {props.paymentStatus ? "DONE" : "PENDING"}
          </Text>
        </View>
        <View style={styles.IdContainer}>
          <Text style={styles.boldText}>Order Status : </Text>
          <Text
            style={{
              ...styles.Textcolor,
              color: status === "PACKED" ? "green" : "red",
            }}
          >
            {status}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableCmp onPress={props.navigate}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>View Details</Text>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    width: "95%",
    alignSelf: "center",
    height: 230,
    elevation: 2,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  TextContainer: {
    width: "100%",
    height: "70%",
  },
  buttonContainer: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "red",
    height: 40,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "open-sans",
    fontSize: 16,
  },
  dateContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  Text: {
    fontFamily: "open-sans",
  },
  IdContainer: {
    flexDirection: "row",
    margin: 5,
  },
  boldText: {
    fontFamily: "open-sans-bold",
  },
});

export default OrderItem;
