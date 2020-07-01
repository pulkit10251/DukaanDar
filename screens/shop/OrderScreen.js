import React from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";
import OrderItem from "../../components/UI/OrderItem";
import Imagess from "../../constants/Imagess";

const OrderScreen = (props) => {
  const shopId = useSelector((state) => state.shopId.shopId);
  const orderItems = useSelector(
    (state) => state.store.shops[shopId].YourOrders
  );

  const OrderDetailNavigate = (cartItems, totalAmount, totalMrp) => {
    props.navigation.navigate("detail", {
      cartItems: cartItems,
      totalAmount: totalAmount,
      totalMrp: totalMrp,
    });
  };

  if (orderItems.length === 0) {
    return (
      <View style={styles.screen}>
        <Image
          source={{ uri: Imagess.NoOrders }}
          style={styles.imageContainer}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={orderItems.reverse()}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <View>
          <OrderItem
            date={itemData.item.readableDate}
            id={itemData.item.id}
            paymentMethod={itemData.item.paymentMethod}
            paymentStatus={itemData.item.paymentStatus}
            navigate={() =>
              OrderDetailNavigate(
                itemData.item.cartItems,
                itemData.item.totalAmount,
                itemData.item.totalMrp
              )
            }
          />
        </View>
      )}
    />
  );
};

OrderScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "My Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={
            Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
          }
          onPress={() => NavData.navigation.navigate("All")}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    width: "95%",
    alignSelf: "center",
    aspectRatio: 1,
  },
});

export default OrderScreen;
