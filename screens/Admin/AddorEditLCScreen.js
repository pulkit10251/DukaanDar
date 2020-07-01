import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AdminLocalCategoriesCard from "../../components/UI/AdminLocalCategoriesCard";
import { useSelector, useDispatch, connect } from "react-redux";

const AddorEditLCScreen = (props) => {
  const shopData = useSelector((state) => state.shops.ShopData);

  const catId = props.navigation.getParam("catId");
  const shopId = props.navigation.getParam("shopId");

  const shop = shopData.find((item) => item.shop_Id === shopId);
  const categories = shop.shop_Categories.find(
    (item) => item.category_Id === catId
  );
  const LocalCategories = categories.category_Local;
  const dispatch = useDispatch();

  const ProductCategoryNavigate = (shopId, catId, LocId) => {
    props.navigation.navigate("Product", {
      shopId: shopId,
      catId: catId,
      LocId: LocId,
    });
  };

  return (
    <View>
      <FlatList
        data={LocalCategories}
        keyExtractor={(item) => String(item.Local_Id)}
        renderItem={(itemData) => (
          <AdminLocalCategoriesCard
            category={itemData.item.category_Name}
            catImage={itemData.item.CatLocImage}
            catList={itemData.item.category_Products}
            LocId={itemData.item.Local_Id}
            catId={itemData.item.Global_Id}
            shopId={shopId}
            dispatch={dispatch}
            navigate={ProductCategoryNavigate}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddorEditLCScreen;
