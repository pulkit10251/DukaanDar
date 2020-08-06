import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import CartPriceContainer from "../../components/UI/CartPriceContainer";
import OrderBox from "../../components/UI/OrderBox";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as Linking from "expo-linking";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";
import { useDispatch, useSelector } from "react-redux";
import * as OrderActions from "../../store/actions/OrderAction";
import { normalize } from "react-native-elements";
import { normalizeUnits } from "moment";

const sendPushNotification = async (expoPushToken) => {
  console.log("called");
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Order Packed!",
    body:
      "The Order you placed is packed. You can take it and pay in active hours!",
    data: { data: "Hello" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

const OrderDetailAdminScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const order = props.navigation.getParam("Order");
  const orderId = order.id;
  const cartItems = order.cartItems;
  const totalMrp = order.totalMrp;
  const totalAmount = order.totalAmount;
  const expoPushToken = order.customerExpoId;
  const shopId = props.navigation.getParam("ShopId");
  const status = order.orderStatus;
  const userId = order.userId;
  const paymentStatus = order.paymentStatus;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.customerInfo}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={styles.text}>Customer Name : </Text>
                <Text
                  style={{ fontSize: normalize(14), fontFamily: "open-sans" }}
                >
                  {order.customerName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={styles.text}>Contact No. : </Text>
                <Text
                  style={{ fontSize: normalize(14), fontFamily: "open-sans" }}
                >
                  {order.customerContact}
                </Text>

                <Ionicons
                  name={Platform.OS === "android" ? "md-call" : "ios-call"}
                  style={{ marginLeft: "auto", marginRight: 30 }}
                  size={20}
                  color={Colors.primary}
                  onPress={() => {
                    Linking.openURL(`tel:${order.customerContact}`);
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text style={styles.text}>Email : </Text>
                <Text
                  style={{ fontSize: normalize(14), fontFamily: "open-sans" }}
                >
                  {order.customerEmail}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <CartPriceContainer
                totalMrp={totalMrp}
                totalAmount={totalAmount}
              />
            </View>
            <View style={styles.header}>
              <Text style={styles.text}>Your Items</Text>
            </View>
          </View>
        )}
        renderItem={(itemData) => (
          <View style={styles.container}>
            <OrderBox
              product={itemData.item.product}
              price={totalAmount}
              mrp={totalMrp}
              quantity={itemData.item.quantity}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View
            style={{
              padding: 5,
              backgroundColor: "white",
              width: "100%",
              alignSelf: "center",
              marginVertical: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: normalize(12),
                }}
              >
                Order Status :{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  color: status === "PACKED" ? "green" : "red",
                  fontSize: normalize(12),
                }}
              >
                {status.toUpperCase()}
              </Text>
              {status !== "PACKED" && (
                <TouchableCmp
                  onPress={() => {
                    Alert.alert(
                      "Caution! ",
                      "Set this order to packed only if you have packed it as it will notify the customer about the same!",
                      [
                        {
                          text: "cancel",
                          style: "cancel",
                        },
                        {
                          text: "ok",
                          onPress: async () => {
                            if (expoPushToken !== undefined) {
                              sendPushNotification(expoPushToken);
                            }
                            setLoading(true);
                            await dispatch(
                              ShopStoreActions.changeOrderStatus(
                                shopId,
                                orderId,
                                "PACKED",
                                userId
                              )
                            );
                            setLoading(false);
                            props.navigation.pop();
                          },
                        },
                      ]
                    );
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        status === "PACKED" ? Colors.accent : "red",
                      padding: 5,
                      margin: 5,
                      marginLeft: "auto",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: normalize(12) }}>
                      SET AS PACKED
                    </Text>
                  </View>
                </TouchableCmp>
              )}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: normalize(12),
                }}
              >
                Payment Status :{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: normalize(12),
                  color: paymentStatus ? "green" : "red",
                }}
              >
                {paymentStatus ? "PAID" : "PENDING"}
              </Text>
              {!paymentStatus && (
                <TouchableCmp
                  onPress={() => {
                    {
                      Alert.alert(
                        "Caution! ",
                        "Set this order to Paid only if customer have paid for it!",
                        [
                          {
                            text: "cancel",
                            style: "cancel",
                          },
                          {
                            text: "ok",
                            onPress: async () => {
                              setLoading(true);
                              await dispatch(
                                OrderActions.changePaymentStatus(
                                  userId,
                                  shopId,
                                  orderId
                                )
                              );
                              setLoading(false);
                              props.navigation.pop();
                            },
                          },
                        ]
                      );
                    }
                  }}
                >
                  <View
                    style={{
                      backgroundColor: paymentStatus ? Colors.accent : "red",
                      padding: 5,
                      margin: 10,
                      marginLeft: "auto",
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: normalize(12) }}>
                      SET AS PAID
                    </Text>
                  </View>
                </TouchableCmp>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

OrderDetailAdminScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "Order Detail",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
    elevation: 1,
    borderRadius: 2,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: normalize(14),
    textAlign: "center",
  },
  container: {
    alignItems: "center",
  },
  customerInfo: {
    width: "95%",
    elevation: 2,
    backgroundColor: "white",
    alignSelf: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
});

export default OrderDetailAdminScreen;
