import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import CategoriesCard from "../../components/UI/CategoriesCard";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const CategoriesScreen = (props) => {
  const shopId = props.navigation.getParam("shopId");
  const shop = useSelector((state) =>
    state.shops.ShopData.find((shop) => shop.shop_Id === shopId)
  );
  const categories = shop.shop_Categories;

  const ProductNavigate = (CatTitle, LocalCat, shopId) => {
    props.navigation.navigate("productOverview", {
      CatTitle: CatTitle,
      CatList: LocalCat,
      shopId: shopId,
    });
  };

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.category_Id)}
        renderItem={(itemData) => (
          <CategoriesCard
            category={itemData.item.category_Name}
            catImage={itemData.item.category_Image}
            catList={itemData.item.category_Local}
            shopId={shopId}
            products={ProductNavigate}
          />
        )}
      />
    </View>
  );
};

CategoriesScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "All Categories",
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
    backgroundColor: "#888",
    flex: 1,
  },
});

export default CategoriesScreen;
