import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { View, Platform, SafeAreaView, Button } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
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
import EditGlobal from "../screens/Admin/EditGlobal";
import EditLocal from "../screens/Admin/EditLocal";
import EditProduct from "../screens/Admin/EditProduct";
import ShopDetailScreen from "../screens/Admin/ShopDetailScreen";
import EditDetailScreen from "../screens/Admin/EditDetailScreen";
import CreateShopScreen from "../screens/Admin/CreateShopScreen";
import AddShopDetail from "../screens/Admin/AddShopDetail";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import VerificationScreen from "../screens/Auth/VerificationScreen";
import StartupScreen from "../screens/StartupScreen";
import { useDispatch } from "react-redux";
import * as AuthActions from "../store/actions/AuthActions";

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
      drawerLockMode: "locked-closed",
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
    Create: CreateShopScreen,
    AddShop: AddShopDetail,
    Main: ShopDetailScreen,
    EditShop: EditDetailScreen,
    Global: AddGCScreen,
    Local: AddLCScreen,
    Product: AddProductScreen,
    Add: AddCategory,
    AddLocal: AddLocalCategory,
    AddProduct: AddProduct,
    EditGlobal: EditGlobal,
    EditLocal: EditLocal,
    EditProduct: EditProduct,
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

const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen,
  Verify: VerificationScreen,
});

const shopNavigator = createDrawerNavigator(
  {
    Start: StartNavigator,
    All: HomeNavigator,
    Cart: CartNavigator,
    Order: OrderNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    unmountInactiveRoutes: true,
    initialRouteName: "Start",
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingVertical: 40, paddingHorizontal: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(AuthActions.logout()); 
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const shopAdminNavigator = createDrawerNavigator(
  {
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

const FirstNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: shopNavigator,
  Admin: shopAdminNavigator,
});

export default createAppContainer(FirstNavigator);
