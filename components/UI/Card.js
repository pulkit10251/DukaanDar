import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const Card = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableCmp
        onPress={() => {
          setIsExpanded((prevState) => !prevState);
        }}
        useForeground
      >
        <View style={styles.touchable}>
          <View>
            <View style={styles.cardStyle}>
              <Ionicons
                name="md-create"
                size={Dimensions.get("screen").height * 0.03}
                style={styles.iconStyle}
              />
              <Text style={styles.cardText}>{props.shopName}</Text>
              <Ionicons
                name={
                  isExpanded
                    ? Platform.OS === "android"
                      ? "md-arrow-dropup"
                      : "ios-arrow-dropup"
                    : Platform.OS === "android"
                    ? "md-arrow-dropdown"
                    : "ios-arrow-dropdown"
                }
                style={styles.ArrowStyle}
                size={Dimensions.get("screen").height * 0.03}
              />
            </View>
          </View>
          {isExpanded && (
            <View style={styles.ExpandedView}>
              <View style={styles.trash}>
                <TouchableCmp onPress={props.deleteShop}>
                  <View style={styles.deletebutton}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </View>
                </TouchableCmp>
              </View>
              <View style={styles.Details}>
                <TouchableCmp onPress={props.GotoShopping}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Go to Store</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>
          )}
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    width: "95%",
  },
  cardStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  touchable: {
    borderRadius: 10,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  iconStyle: {
    margin: 10,
  },
  cardText: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("screen").height * 0.025,
    padding: 10,
  },
  ArrowStyle: {
    justifyContent: "flex-end",
    marginLeft: "auto",
    marginRight: 30,
  },
  ExpandedView: {
    flexDirection: "row",
    marginBottom: 30,
    justifyContent: "space-around",
  },
  Details: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    padding: 8,
    width: 100,
  },
  deletebutton: {
    marginLeft: "auto",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "red",
    padding: 8,
    width: 100,
  },
  trash: {
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Card;
