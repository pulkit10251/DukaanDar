import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ShopActions from "../../store/actions/ShopAction";

var isNew = false;

const CreateShopScreen = (props) => {
  const shopId = useSelector(state => state.shopId.shopId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShopActions.fetchShop());
}, [dispatch]);

  const shopData = useSelector((state) => state.shops.ShopData);

  const shop = shopData.find((item) => item.shop_Id === shopId);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const AddNavigate = (shopId) => {
    props.navigation.navigate("AddShop", { shopId: shopId });
  };


  useEffect(() => {
    dispatch(ShopActions.addServer(shopData));
  }, [dispatch,shopData]);

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
      <View style={styles.IntroContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: shop.shop_ShopkeeperImage }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>Welcome,</Text>
          <Text style={styles.Text}>{shop.shop_ShopkeeperName}</Text>
          <Text style={styles.Text}>Lets Manage your shop</Text>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableCmp
          onPress={() => props.navigation.navigate("Main", { shopId: shopId })}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Make Changes</Text>
          </View>
        </TouchableCmp>
      </View>
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
  IntroContainer: {
    width: "90%",
    height: "50%",
    marginVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "center",
    padding: 5,
    flexDirection: "row",
  },
  imageContainer: {
    width: "45%",
    aspectRatio: 1,
    borderRadius: 200,
    borderWidth: 1,
    overflow: "hidden",
    alignSelf: "center",
    marginHorizontal: 10,
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
  welcome: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    textAlign: "center",
  },
  Text: {
    fontSize: 14,
    fontFamily: "open-sans",
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateShopScreen;
