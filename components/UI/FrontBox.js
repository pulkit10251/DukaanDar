import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";

const FrontBox = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp onPress={() => props.navigation(props.prod, props.data)}>
      <View style={styles.box}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.url }}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  box: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderRadius: 10,
    margin: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    backgroundColor: Colors.primary,
  },
  imageContainer: {
    width: "90%",
    height: "70%",
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    flex: 1,
  },
  text: {
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: "auto",
    textAlign: "center",
    paddingHorizontal: 5,
    marginBottom: 20,
    fontFamily: "open-sans-bold",
    color: "white",
  },
});

export default memo(FrontBox);
