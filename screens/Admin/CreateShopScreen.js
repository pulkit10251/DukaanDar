import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ShopActions from "../../store/actions/ShopAction";
import * as OrderActions from "../../store/actions/OrderAction";
import Colors from "../../constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import OrderItem from "../../components/UI/OrderItem";

var isNew = false;

const CreateShopScreen = (props) => {
  const shopId = "15C5GS";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dispatchFcn = async () => {
      setLoading(true);
      await dispatch(ShopActions.fetchShop());
      await dispatch(OrderActions.fetchOrders(shopId));
      setLoading(false);
    };

    dispatchFcn();
  }, [dispatch]);

  const shop = useSelector((state) =>
    state.shops.ShopData.find((item) => item.shop_Id === shopId)
  );

  const activeOrders = useSelector((state) => state.orders.active);
  const deliveredOrders = useSelector((state) => state.orders.delivered);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const AddNavigate = (shopId) => {
    props.navigation.navigate("AddShop", { shopId: shopId });
  };

  const OrderDetailNavigate = (Order) => {
    props.navigation.navigate("OrderDetail", {
      Order: Order,
    });
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

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ flex: 1 }}>
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
              onPress={() =>
                props.navigation.navigate("Main", { shopId: shopId })
              }
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Make Changes</Text>
              </View>
            </TouchableCmp>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
              backgroundColor: "white",
              padding:5
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "open-sans-bold",
                fontSize: 20,
              }}
            >
              Active Orders
            </Text>
          </View>
        </View>
      }
      data={activeOrders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          date={itemData.item.readableDate}
          id={itemData.item.id}
          paymentMethod={itemData.item.paymentMethod}
          paymentStatus={itemData.item.paymentStatus}
          navigate={() => {
            OrderDetailNavigate(itemData.item);
          }}
        />
      )}
    />
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
    height: 180,
    backgroundColor: "white",
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
