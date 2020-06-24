import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartPriceContainer from "../../components/UI/CartPriceContainer";
import ProductsCard from "../../components/UI/ProductsCard";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const CartScreen = (props) => {
  const shopId = useSelector((state) => state.shopId.shopId);

  const totalAmount = useSelector(
    (state) => state.store.shops[shopId].TotalAmount
  );
  const totalAmountMrp = useSelector(
    (state) => state.store.shops[shopId].TotalMrp
  );
  const productDetailNavigate = (product, categoryList, shopId) => {
    props.navigation.navigate("productDetail", {
      product: product,
      categoryList: categoryList,
      shopId: shopId,
    });
  };

  const checkoutScreenNavigate = (cartItems, totalAmount, shopId) => {
    props.navigation.navigate("checkout", {
      cartItems: cartItems,
      totalAmount: totalAmount,
      shopId: shopId,
    });
  };

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
    for (const key in state.store.shops[shopId].cartItems) {
      cartItems.push({
        product: state.store.shops[shopId].cartItems[key].product,
        quantity: state.store.shops[shopId].cartItems[key].quantity,
        sum: state.store.shops[shopId].cartItems[key].sum,
        catList: state.store.shops[shopId].cartItems[key].catList,
        id: key,
      });
    }
    return cartItems.sort((a, b) =>
      a.product.prod_Id > b.product.prod_Id ? 1 : -1
    );
  });

  const cartItemsObject = useSelector(
    (state) => state.store.shops[shopId].cartItems
  );

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
                  shopId={shopId}
                  catList={
                    cartItemsObject[itemData.item.product.prod_Id].catList
                  }
                />
              </View>
            )}
          />
          <TouchableCmp
            onPress={() => {
              checkoutScreenNavigate(cartItems, totalAmount, shopId);
            }}
          >
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
          </TouchableCmp>
        </View>
      )}
    </View>
  );
};

CartScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "My Cart",
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
