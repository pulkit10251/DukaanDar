import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import SearchBar from "../../components/UI/SearchBar";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const SearchScreen = (props) => {
  const [value, setvalue] = useState("");
  useEffect(() => {
    props.navigation.setParams({
      setValue: setvalue,
    });
  }, []);

  return (
    <View>
      <Text>Search Screen</Text>
      <Text>{value}</Text>
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
});

export default SearchScreen;
