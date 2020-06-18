import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const Header = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.header}>
      <TouchableCmp onPress={() => props.CategoryNavigate(props.id)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Categories</Text>
        </View>
      </TouchableCmp>
      <TouchableCmp onPress={() => props.SearchNavigate(props.shopCategories)}>
        <View style={styles.searchBar}>
          <Ionicons
            name={Platform.OS === "android" ? "md-search" : "ios-search"}
            size={16}
            color="#888"
            style={styles.iconStyle}
          />
          <Text style={styles.searchText}>Search for products</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    elevation: 0.2,
    flexDirection: "row",
  },
  button: {
    width: "27%",
    height: 35,
    backgroundColor: "white",
    margin: 7,
    borderRadius: 2,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: Dimensions.get("screen").width * 0.04,
    fontFamily: "open-sans-bold",
  },
  searchBar: {
    width: "65%",
    height: 35,
    backgroundColor: "white",
    borderRadius: 2,
    marginVertical: 7,
    marginRight: 7,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  iconStyle: {
    marginHorizontal: 10,
    opacity: 0.6,
  },
  searchText: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 14,
  },
});

export default Header;
