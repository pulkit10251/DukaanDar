import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";

const OrderScreen = (props) => {
  const shopId = useSelector((state) => state.shopId.shopId);
  const orderItems = useSelector(
    (state) => state.store.shops[shopId].YourOrders
  );

  return (
    <FlatList
      data={orderItems.reverse()}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <View>

          <Text>{itemData.item.readableDate}</Text>
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
          onPress={() => NavData.navigation.navigate("Home")}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({});

export default OrderScreen;
