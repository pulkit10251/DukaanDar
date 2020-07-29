import React from "react";
import { Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import OrderItemAdmin from "../../components/UI/OrderItemAdmin";

const DeliveredOrder = (props) => {
  const delivered = useSelector((state) => state.orders.delivered);
  const shopId = props.navigation.getParam("shopId");

  const OrderDetailNavigate = (Order, shopId) => {
    props.navigation.navigate("OrderDetail", {
      Order: Order,
      ShopId: shopId,
    });
  };

  return (
    <View>
      <FlatList
        data={delivered.reverse()}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View>
            <OrderItemAdmin
              date={itemData.item.date}
              id={itemData.item.id}
              paymentMethod={itemData.item.paymentMethod}
              paymentStatus={itemData.item.paymentStatus}
              orderStatus={itemData.item.orderStatus}
              name={itemData.item.customerName}
              navigate={() => {
                OrderDetailNavigate(itemData.item, shopId);
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

DeliveredOrder.navigationOptions = (NavData) => {
  return {
    headerTitle: "Delivered Order",
  };
};

export default DeliveredOrder;
