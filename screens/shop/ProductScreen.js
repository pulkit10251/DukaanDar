import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

import ProductDetailCard from "../../components/UI/ProductDetailCard";
import ExploreItemBox from "../../components/UI/ExploreItemBox";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../models/CartItem";

const ProductScreen = (props) => {
  const product = props.navigation.getParam("product");
  const LocalList = props.navigation.getParam("categoryList");

  const shopId = props.navigation.getParam("shopId")

  const list = props.navigation
    .getParam("categoryList")
    .filter((item) => item.prod_Id != product.prod_Id);

  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.store.shops[shopId].cartItems);

  const productDetailNavigate = (product, categoryList,shopId) => {
    props.navigation.replace("productDetail", {
      product: product,
      categoryList: categoryList,
      shopId: shopId
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.prod_ImageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <ProductDetailCard
          Name={product.prod_Name}
          Price={product.prod_Price}
          Mrp={product.prod_Mrp}
          Qty={product.prod_Quantity}
          Unit={product.prod_Unit}
          Mfd={product.prod_MfdDate}
          Shelf={product.prod_ShelfLife}
          Avail={product.prod_Availability}
          product={product}
          shopId={shopId}
          dispatch={dispatch}
          cartItem={cartItem}
          catList={LocalList}
        />
        <View style={styles.ExploreContainer}>
          <Text style={styles.ExploreText}>Explore other Products</Text>
          <FlatList
            horizontal
            data={list}
            keyExtractor={(item) => item.prod_Id}
            showsHorizontalScrollIndicator={false}
            renderItem={(itemData) => (
              <ExploreItemBox
                image={itemData.item.prod_ImageUrl}
                title={itemData.item.prod_Name}
                product={itemData.item}
                list={LocalList}
                Avail={itemData.item.prod_Availability}
                shopId={shopId}
                navigate={productDetailNavigate}
                cartItem={cartItem}
                dispatch={dispatch}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

ProductScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: NavData.navigation.getParam("product").prod_Name,
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D3D3D3",
    flex: 1,
  },
  imageContainer: {
    backgroundColor: "white",
    width: "100%",
    height: Dimensions.get("screen").height * 0.4,
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ExploreContainer: {
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  ExploreText: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("screen").width * 0.045,
    textAlign: "center",
    margin: 10,
  },
});

export default ProductScreen;
