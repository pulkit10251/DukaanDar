import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = (props) => {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={Platform.OS === "android" ? "md-search" : "ios-search"}
          style={styles.iconStyle}
          size={18}
        />
      </View>
      <View style={styles.inputTextContainer}>
        <TextInput
          placeholder="search for products"
          value={value}
          onChangeText={(text) => {
            setValue(text);
          }}
          maxLength={22}
          onSubmitEditing={() => props.setData(value)}
        />
      </View>
      {value != "" && (
        <View style={styles.iconContainer}>
          <Ionicons
            name={Platform.OS === "android" ? "md-close" : "ios-close"}
            style={styles.iconStyle}
            onPress={() => {
              setValue("");
            }}
            size={18}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.7,
    justifyContent: "flex-start",
    backgroundColor: "white",
    height: 40,
    borderRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    color: "#888",
    opacity: 0.6,
    alignSelf: "center",
  },
  inputTextContainer: {
    width: "70%",
    justifyContent: "center",
  },
});

export default SearchBar;
