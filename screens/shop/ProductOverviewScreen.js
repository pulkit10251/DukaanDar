import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import ProductsCard from "../../components/UI/ProductsCard";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useDispatch, useSelector } from "react-redux";

const ProductOverviewScreen = (props) => {
  const categoryList = props.navigation.getParam("CatList");

  const productDetailNavigate = (product, categoryList, shopId) => {
    props.navigation.navigate("productDetail", {
      product: product,
      categoryList: categoryList,
      shopId: shopId,
    });
  };

  const shopId = props.navigation.getParam("shopId");

  const dispatch = useDispatch();
  var quantity = 0;
  const cartItems = useSelector((state) => state.store.shops[shopId].cartItems);

  return (
    <FlatList
      data={categoryList}
      keyExtractor={(item) => item.prod_Id}
      renderItem={(itemData) => (
        <View>
          <ProductsCard
            image={itemData.item.prod_ImageUrl}
            product_Name={itemData.item.prod_Name}
            price={itemData.item.prod_Price}
            mrp={itemData.item.prod_Mrp}
            qty={itemData.item.prod_Quantity}
            unit={itemData.item.prod_Unit}
            Avail={itemData.item.prod_Availability}
            product={itemData.item}
            shopId={shopId}
            navigate={productDetailNavigate}
            dispatch={dispatch}
            cartItems={cartItems}
            catList={categoryList}
          />
        </View>
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: NavData.navigation.getParam("CatTitle"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            NavData.navigation.navigate("cart", {
              shopId: NavData.navigation.getParam("shopId"),
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default ProductOverviewScreen;
