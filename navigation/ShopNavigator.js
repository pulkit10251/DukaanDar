import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Colors from "../constants/Colors";

import AddScreen from "../screens/shop/AddScreen";
import StartScreen from "../screens/shop/StartScreen";
import IntroScreen from "../screens/shop/IntroScreen";
import CategoriesScreen from "../screens/shop/CategoriesScreen";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductScreen from "../screens/shop/ProductScreen";
import AllScreen from "../screens/shop/AllScreen";
import SearchScreen from "../screens/shop/SearchScreen";
import CartScreen from "../screens/shop/CartScreen";

defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans",
  },
};

const StartNavigator = createStackNavigator(
  {
    start: StartScreen,
    Intro: IntroScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    initialRouteName: "start",
  }
);

const HomeNavigator = createStackNavigator(
  {
    All: AllScreen,
    Search: SearchScreen,
    Category: CategoriesScreen,
    productOverview: ProductOverviewScreen,
    productDetail: ProductScreen,
    cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    initialRouteName: "All",
  }
);

const CartNavigator = createStackNavigator(
  {
    cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const shopNavigator = createDrawerNavigator(
  {
    Start: StartNavigator,
    Home: HomeNavigator,
    Cart: CartNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    unmountInactiveRoutes: true,
    hideStatusBar: true,
  }
);

export default createAppContainer(shopNavigator);
