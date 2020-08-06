import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import { normalize } from "react-native-elements";

const ProductScreen = (props) => {
  const product = props.navigation.getParam("product");
  const LocalList = props.navigation.getParam("categoryList");

  const shopId = props.navigation.getParam("shopId");

  const list = props.navigation
    .getParam("categoryList")
    .filter((item) => item.prod_Id != product.prod_Id);

  const cartItem = useSelector((state) => state.store.shops[shopId].cartItems);

  const productDetailNavigate = (product, categoryList, shopId) => {
    props.navigation.replace("productDetail", {
      product: product,
      categoryList: categoryList,
      shopId: shopId,
    });
  };
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View
            style={{
              width: "65%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: product.prod_ImageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              width: "90%",
              height: 60,
              position: "absolute",
              marginRight: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              transform: [{ rotate: "270deg" }],
              left: Dimensions.get("screen").width * 0.42,
              margin: 10,
              backgroundColor: Colors.other,
            }}
          >
            <Text
              style={{
                fontFamily: "open-sans-bold",
                textAlignVertical: "top",
                textAlign: "center",
                fontSize: normalize(20),
                color: "white",
              }}
            >
              {product.prod_Name}
            </Text>
          </View>
          <View
            style={{
              width: 80,
              aspectRatio: 1,
              position: "absolute",
              bottom: 10,
              left: 10,
              backgroundColor: Colors.other,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{ width: "100%", height: "60%", alignItems: "center" }}
            >
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: normalize(36),
                  color: "white",
                }}
              >
                {product.prod_Quantity}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "open-sans-bold",
                  fontSize: normalize(16),
                  marginTop:5,
                  color: "white",
                }}
              >
                {product.prod_Unit}
              </Text>
            </View>
          </View>
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
    aspectRatio: 1,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: normalize(18),
    textAlign: "center",
    margin: 10,
  },
});

export default ProductScreen;
