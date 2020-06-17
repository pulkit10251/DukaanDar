import React from "react";
import { Text, View, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector } from "react-redux";
import FrontCard from "../../components/UI/FrontCard";
import FrontImages from "../../components/UI/FrontImages";
import Header from "../../components/UI/Header";
import CategoriesScreen from "../../screens/shop/CategoriesScreen";

const AllScreen = (props) => {
  const CategoryNavigate = (id) => {
    props.navigation.navigate("Category", {
      shopId: id,
    });
  };

  const searchScreenNavigate = () => {
    props.navigation.navigate("Search");
  };

  const productDetailNavigate = (product, categoryList) => {
    props.navigation.navigate("productDetail", {
      product: product,
      categoryList: categoryList,
    });
  };
  const shopId = props.navigation.getParam("shopId");

  const shop = useSelector((state) =>
    state.shops.ShopData.find((shop) => shop.shop_Id === shopId)
  );

  const FrontData = shop.shop_Front;

  return (
    <View style={styles.container}>
      <Header
        CategoryNavigate={CategoryNavigate}
        id={shopId}
        SearchNavigate={searchScreenNavigate}
      />
      <FlatList
        ListHeaderComponent={
          <View>
            <FrontImages shop_Offers={shop.shop_Offers} />
          </View>
        }
        data={FrontData}
        keyExtractor={(item) => String(item.Local_Id)}
        renderItem={(itemData) => (
          <FrontCard
            data={itemData.item.category_Products}
            name={itemData.item.category_Name}
            navigation={productDetailNavigate}
          />
        )}
      />
    </View>
  );
};

AllScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "DukaanDar",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 10 },
});

export default AllScreen;
