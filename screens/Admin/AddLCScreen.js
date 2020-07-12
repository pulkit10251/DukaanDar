import React ,{useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AdminLocalCategoriesCard from "../../components/UI/AdminLocalCategoriesCard";
import { useSelector, useDispatch, connect } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import * as ShopActions from "../../store/actions/ShopAction";

const AddLCScreen = (props) => {
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

  useEffect(() => {
    dispatch(ShopActions.addServer(shopData));
  }, [dispatch, shopData]);

  const EditLocalCategory = (shopId, catName, ImageUrl, GlobalId, LocalId) => {
    props.navigation.navigate("EditLocal", {
      shopId: shopId,
      catName: catName,
      ImageUrl: ImageUrl,
      GlobalId: GlobalId,
      LocalId: LocalId,
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
            editNavigate={EditLocalCategory}
          />
        )}
      />
    </View>
  );
};

AddLCScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "DukaanDar",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            const ShopId = NavData.navigation.getParam("shopId");
            const GlobalId = NavData.navigation.getParam("catId");
            NavData.navigation.navigate("AddLocal", {
              shopId: ShopId,
              GlobalId: GlobalId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default AddLCScreen;
