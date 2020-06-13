import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BoxView from "./BoxView";

const CategoriesCard = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const categoryList = props.catList;

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableCmp
        onPress={() => {
          setIsExpanded((prevState) => !prevState);
        }}
        useForeground
      >
        <View style={styles.box}>
          <Image source={{ uri: props.catImage }} style={styles.image} />
          <Text style={styles.text}>{props.category}</Text>
          <Ionicons
            name={isExpanded ? "ios-arrow-dropup" : "ios-arrow-dropdown"}
            size={Dimensions.get("screen").width * 0.1}
            style={styles.icon}
          />
        </View>
      </TouchableCmp>
      {isExpanded && (
        <View style={styles.expandedView}>
          <BoxView
            data={categoryList}
            products={props.products}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: "white",
    marginVertical: 10,
  },
  box: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    padding: 10,
    alignItems: "center",
  },
  touchable: {
    borderRadius: 10,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    height: Dimensions.get("screen").height * 0.15,
    width: Dimensions.get("screen").height * 0.15,
    alignItems: "flex-start",
    marginVertical: 10,
    marginRight: 10,
  },
  text: {
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: Dimensions.get("screen").width * 0.045,
  },
  icon: {
    marginLeft: "auto",
  },
  expandedView: {
    width: "100%",
  },
});

export default CategoriesCard;
