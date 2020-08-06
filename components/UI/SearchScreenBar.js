import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import Product from "../../models/Product";
import { normalize } from "react-native-elements";

const SearchScreenBar = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp
      onPress={() => props.navigate(props.product, props.catList, props.shopId)}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.name} in </Text>
          <Text style={styles.categoryText}>{props.categoryName}</Text>
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    height: 50,
    alignItems: "center",
    elevation: 2,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  imageContainer: {
    width: "10%",
    height: "95%",
    marginHorizontal: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    width: "80%",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: normalize(12),
  },
  categoryText: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
    fontSize: normalize(12),
  },
});

export default SearchScreenBar;
