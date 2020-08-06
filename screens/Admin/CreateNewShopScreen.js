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
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const CreateNewShopScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  // const shopId = useSelector((state) => state.dukanId.shopId);
  const shopId = "15C5GS";

  const AddNavigate = (shopId) => {
    props.navigation.navigate("AddShop", { shopId: shopId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hey! Thanks for choosing our platform.</Text>
      <Text style={styles.text}>You have not created your shop till now.</Text>
      <Text style={styles.text}>Hurry and set up your shop</Text>
      <TouchableCmp onPress={() => AddNavigate(shopId)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create Shop Now!</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

CreateNewShopScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "Your Shop",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            NavData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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

export default CreateNewShopScreen;
