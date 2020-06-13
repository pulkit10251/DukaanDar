import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, Platform } from "react-native";
import Card from "../../components/UI/Card";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const StartScreen = (props) => {
  const shops = useSelector((state) => state.shops.ShopData);
  const IntroNavigate = (id,shopName) => {
    props.navigation.navigate("Intro", {
      shopId: id,
      shopTitle : shopName
    });
  };


  return (
    <View>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.shop_Id}
        renderItem={(itemData) => (
          <Card
            shopName={itemData.item.shop_Name}
            deleteShop={() => {}}
            GotoShopping={() => {
              IntroNavigate(itemData.item.shop_Id,itemData.item.shop_Name);
            }}
          />
        )}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          "Click on the Add Button on the Extreme right{"\n"} to Add new Shops"
        </Text>
      </View>
    </View>
  );
};

StartScreen.navigationOptions = (NavData) => {
  return {
    headerTitle: "DukaanDar",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
  },
  textContainer: {
    alignItems: "center",
  },
});

export default StartScreen;
