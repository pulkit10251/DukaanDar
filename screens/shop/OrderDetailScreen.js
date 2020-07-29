import React, { useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import CartPriceContainer from "../../components/UI/CartPriceContainer";
import OrderBox from "../../components/UI/OrderBox";
import { useDispatch, useSelector } from "react-redux";
import * as ShopStoreActions from "../../store/actions/ShopStoreAction";

const OrderDetailScreen = (props) => {
  const cartItems = props.navigation.getParam("cartItems");
  const totalAmount = props.navigation.getParam("totalAmount");
  const totalMrp = props.navigation.getParam("totalMrp");
  const orderId = props.navigation.getParam("orderId");
  const shopId = props.navigation.getParam("shopId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShopStoreActions.getOrderStatus(shopId, orderId));
  }, [dispatch]);

  const status =
    useSelector((state) => state.status.OrderStatus) === null
      ? "Pending"
      : useSelector((state) => state.status.OrderStatus);

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View>
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
              marginVertical: 10,
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "open-sans-bold",
                  fontSize: 18,
                }}
              >
                Order Status :{" "}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "open-sans-bold",
                  fontSize: 18,
                  textTransform: "uppercase",
                  color: status === "Pending" ? "red" : "green",
                }}
              >
                {status}
              </Text>
            </View>
            {status === "PACKED" && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    margin: 5,
                    marginTop: 15,
                    fontFamily: "open-sans-bold",
                  }}
                >
                  Your Order has been packed! You can visit at active hours from
                  now own! please don't be late
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

OrderDetailScreen.navigationOptions = (NavData) => {
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
});

export default OrderDetailScreen;
