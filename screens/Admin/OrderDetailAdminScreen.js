import React from "react";
import { Text, View, StyleSheet, FlatList, Platform } from "react-native";
import CartPriceContainer from "../../components/UI/CartPriceContainer";
import OrderBox from "../../components/UI/OrderBox";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as Linking from "expo-linking";

const OrderDetailAdminScreen = (props) => {
  const order = props.navigation.getParam("Order");
  const cartItems = order.cartItems;
  const totalMrp = order.totalMrp;
  const totalAmount = order.totalAmount;
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
                <Text style={{ fontSize: 18, fontFamily: "open-sans" }}>
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
                <Text style={{ fontSize: 18, fontFamily: "open-sans" }}>
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
                <Text style={{ fontSize: 18, fontFamily: "open-sans" }}>
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
    fontSize: 18,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
  },
  customerInfo: {
    width: "95%",
    elevation: 2,
    backgroundColor: "white",
    height: 200,
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
