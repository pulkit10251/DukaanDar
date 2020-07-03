import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import Colors from "../constants/Colors";

import StartScreen from "../screens/shop/StartScreen";
import IntroScreen from "../screens/shop/IntroScreen";
import CategoriesScreen from "../screens/shop/CategoriesScreen";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductScreen from "../screens/shop/ProductScreen";
import AllScreen from "../screens/shop/AllScreen";
import SearchScreen from "../screens/shop/SearchScreen";
import CartScreen from "../screens/shop/CartScreen";
import { Ionicons } from "@expo/vector-icons";
import QRCodeScreen from "../screens/shop/QRCodeScreen";
import CheckoutScreen from "../screens/shop/CheckoutScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import OrderDetailScreen from "../screens/shop/OrderDetailScreen";
import AddProductScreen from "../screens/Admin/AddProductScreen";
import AddGCScreen from "../screens/Admin/AddGCScreen";
import AddLCScreen from "../screens/Admin/AddLCScreen";
import AddCategory from "../screens/Admin/AddCategory";
import AddLocalCategory from "../screens/Admin/AddLocalCategory";
import AddProduct from "../screens/Admin/AddProduct";

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
    QR: QRCodeScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    initialRouteName: "start",
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-folder" : "ios-folder"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
      title: "Change Shop",
    },
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
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-home" : "ios-home"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
      title: "Home",
    },
  }
);

const CartNavigator = createStackNavigator(
  {
    cart: CartScreen,
    checkout: CheckoutScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
      title: "My Cart",
    },
  }
);

const OrderNavigator = createStackNavigator(
  {
    order: OrderScreen,
    detail: OrderDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list-box" : "ios-list-box"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
      title: "My Orders",
    },
  }
);

const AdminNavigator = createStackNavigator(
  {
    Global: AddGCScreen,
    Local: AddLCScreen,
    Product: AddProductScreen,
    Add: AddCategory,
    AddLocal: AddLocalCategory,
    AddProduct: AddProduct,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
      title: "Admin",
    },
  }
);

const shopNavigator = createDrawerNavigator(
  {
    Start: StartNavigator,
    All: HomeNavigator,
    Cart: CartNavigator,
    Order: OrderNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    unmountInactiveRoutes: true,
    initialRouteName: "Start",
  }
);

export default createAppContainer(shopNavigator);
