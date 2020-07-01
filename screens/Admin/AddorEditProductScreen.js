import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AdminProductsCard from "../../components/UI/AdminProductsCard";

const AddorEditProductScreen = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const catId = props.navigation.getParam("catId");
  const locId = props.navigation.getParam("LocId");

  const shopData = useSelector((state) => state.shops.ShopData);

  const shop = shopData.find((item) => item.shop_Id === shopId);
  const category = shop.shop_Categories.find(
    (item) => item.category_Id === catId
  );

  const localCat = category.category_Local.find(
    (item) => item.Local_Id === locId
  );

  const products = localCat.category_Products;

  const dispatch = useDispatch();

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.prod_Id)}
        renderItem={(itemData) => (
          <AdminProductsCard
            product={itemData.item}
            prod_Name={itemData.item.prod_Name}
            prod_Image={itemData.item.prod_ImageUrl}
            shopId={shopId}
            catId={catId}
            locId={locId}
            dispatch={dispatch}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddorEditProductScreen;
