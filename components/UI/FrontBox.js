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
import { normalize } from "react-native-elements";

const FrontBox = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp
      onPress={() => props.navigation(props.prod, props.data, props.shopId)}
    >
      <View style={styles.box}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.url }}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            height: "26%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.text}>{props.name}</Text>
        </View>
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
    marginVertical: 5,

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
    textAlign: "center",
    paddingHorizontal: 5,
    marginBottom: 10,
    fontFamily: "open-sans-bold",
    fontSize: normalize(12),
    color: "white",
  },
});

export default memo(FrontBox);
