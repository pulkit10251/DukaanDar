import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";

var isNew = false;

const CreateShopScreen = (props) => {
  const shopId = "15C5GT";
  const shopData = useSelector((state) => state.shops.ShopData);

  const shop = shopData.find((item) => item.shop_Id === shopId);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const AddNavigate = (shopId) => {
    props.navigation.navigate("AddShop", { shopId: shopId });
  };

  if (shop === undefined) {
    isNew = false;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hey! Thanks for choosing our platform.</Text>
        <Text style={styles.text}>
          You have not created your shop till now.
        </Text>
        <Text style={styles.text}>Hurry and set up your shop</Text>
        <TouchableCmp onPress={() => AddNavigate(shopId)}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Create Shop Now!</Text>
          </View>
        </TouchableCmp>
      </View>
    );
  } else {
    isNew = true;
  }

  return (
    <View>
      <Text>create Screen</Text>
    </View>
  );
};

CreateShopScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "Your Shop",
    headerTitleStyle: {
      textAlign: "center",
    },
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
  },
  ImageContainer: {
    width: "90%",
    aspectRatio: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    height: 40,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    alignContent: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default CreateShopScreen;
