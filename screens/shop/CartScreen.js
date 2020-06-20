import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Flatlist,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import CartPriceContainer from "../../components/UI/CartPriceContainer";
import ProductsCard from "../../components/UI/ProductsCard";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = (props) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalAmountMrp = useSelector((state) => state.cart.totalAmountMRP);
  const productDetailNavigate = (product, categoryList) => {
    props.navigation.navigate("productDetail", {
      product: product,
      categoryList: categoryList,
    });
  };
  const shopId = props.navigation.getParam("shopId");

  const AllNavigate = (id) => {
    props.navigation.navigate("All", {
      shopId: id,
    });
  };

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const cartItems = [];
    for (const key in state.cart.items) {
      cartItems.push({
        product: state.cart.items[key].product,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        id: key,
      });
    }
    return cartItems;
  });

  const cartItemsObject = useSelector((state) => state.cart.items);
  return (
    <View style={styles.screen}>
      {totalAmount === 0 ? (
        <View>
          <Image
            source={{
              uri: "https://tyjara.com/assets/site/img/empty-cart.png",
            }}
            style={styles.imageStyle}
          />
          <TouchableCmp onPress={() => AllNavigate(shopId)}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Start Shopping</Text>
            </View>
          </TouchableCmp>
        </View>
      ) : (
        <View style={styles.screen}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <View>
                <View style={styles.container}>
                  <CartPriceContainer
                    totalMrp={totalAmountMrp}
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
                <ProductsCard
                  image={itemData.item.product.prod_ImageUrl}
                  product_Name={itemData.item.product.prod_Name}
                  price={itemData.item.product.prod_Price}
                  mrp={itemData.item.product.prod_Mrp}
                  qty={itemData.item.product.prod_Quantity}
                  unit={itemData.item.product.prod_Unit}
                  Avail={itemData.item.product.prod_Availability}
                  product={itemData.item.product}
                  navigate={productDetailNavigate}
                  dispatch={dispatch}
                  cartItems={cartItemsObject}
                  catList={
                    cartItemsObject[itemData.item.product.prod_Id].catList
                  }
                />
              </View>
            )}
          />
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Checkout</Text>
            <Text style={styles.footerAmount}>₹ {totalAmount}</Text>
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "md-arrow-forward"
                  : "ios-arrow-forward"
              }
              size={20}
              style={styles.iconStyle}
            />
          </View>
        </View>
      )}
    </View>
  );
};

CartScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "Your Cart",
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
  footerContainer: {
    backgroundColor: "#DC143C",
    height: 40,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    margin: "auto",
  },
  footerText: {
    color: "white",
    fontSize: 15,
    fontFamily: "open-sans",
  },
  footerAmount: {
    color: "white",
    fontSize: 15,
    marginLeft: "auto",
  },
  iconStyle: {
    marginHorizontal: 10,
    color: "white",
  },
  imageStyle: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width,
    alignSelf: "center",
    marginVertical: 50,
  },
  buttonContainer: {
    width: Dimensions.get("screen").width * 0.3,
    height: Dimensions.get("screen").height * 0.05,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC143C",
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 12,
  },
});

export default CartScreen;
