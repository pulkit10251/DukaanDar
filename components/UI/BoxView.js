import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

const BoxView = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }


  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={props.data}
        keyExtractor={(item) => String(item.Local_Id)}
        renderItem={(itemData) => (
          <TouchableCmp
            onPress={() => {
              props.products(
                itemData.item.category_Name,
                itemData.item.category_Products,
                props.shopId
              );
            }}
          >
            <View style={styles.box}>
              <View style={styles.imageBox}>
                <Image
                  source={{ uri: itemData.item.CatLocImage }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.text}>{itemData.item.category_Name}</Text>
            </View>
          </TouchableCmp>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  box: {
    width: Dimensions.get("screen").width * 0.45,
    height: Dimensions.get("screen").height * 0.15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    borderColor: "#888",
    margin: "2.5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageBox: {
    width: "40%",
    height: "80%",
    marginHorizontal: Dimensions.get("screen").width * 0.015,
    marginBottom: Dimensions.get("screen").width * 0.03,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    textAlign: "center",
    flex: 1,
    flexWrap: "wrap",
  },
});

export default BoxView;
