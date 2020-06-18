import React, { useState, useEffect } from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import SearchBar from "../../components/UI/SearchBar";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import stringSimilarity from "string-similarity";
import SearchScreenBar from "../../components/UI/SearchScreenBar";

const SearchScreen = (props) => {
  const [value, setvalue] = useState("");
  useEffect(() => {
    props.navigation.setParams({
      setValue: setvalue,
    });
  }, []);

  const productDetailNavigate = (product, categoryList) => {
    props.navigation.navigate("productDetail", {
      product: product,
      categoryList: categoryList,
    });
  };
  const categoryList = props.navigation.getParam("categories");

  const filterList = (value, categoryList) => {
    const prod_list = [];
    for (var i = 0; i < categoryList.length; i++) {
      const globalCat = categoryList[i].category_Local;

      for (var j = 0; j < globalCat.length; j++) {
        const LocalCat = globalCat[j].category_Products;
        const category = globalCat[j];
        for (var k = 0; k < LocalCat.length; k++) {
          const Product = LocalCat[k];
          if (
            stringSimilarity.compareTwoStrings(value, Product.prod_Name) >= 0.3
          ) {
            prod_list.push({ product: Product, category: category });
          }
        }
      }
    }
    return prod_list;
  };

  const filter = filterList(value, categoryList);

  return (
    <View>
      <FlatList
        data={filter}
        keyExtractor={(item) => String(item.product.prod_Id)}
        renderItem={(itemData) => (
          <View style={styles.container}>
            <SearchScreenBar
              imageUrl={itemData.item.product.prod_ImageUrl}
              name={itemData.item.product.prod_Name}
              categoryName={itemData.item.category.category_Name}
              navigate={productDetailNavigate}
              catList={itemData.item.category.category_Products}
              product={itemData.item.product}
            />
          </View>
        )}
      />
    </View>
  );
};

SearchScreen.navigationOptions = (NavData) => {
  const setvalue = NavData.navigation.getParam("setValue");
  return {
    headerTitle: () => (
      <View>
        <SearchBar setData={setvalue} />
      </View>
    ),

    headerTitleContainerStyle: {
      left: Dimensions.get("screen").width * 0.15,
    },

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
  headerStyle: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    width: Dimensions.get("screen").width * 0.6,
  },
  container: {
    alignItems: "center",
  },
});

export default SearchScreen;
