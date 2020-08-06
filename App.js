import React, { useState, useEffect, useRef } from "react";
import ShopNavigator from "./navigation/ShopNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Platform } from "react-native";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import ReduxThunk from "redux-thunk";
import ShopReducer from "./store/reducers/ShopReducer";
import ShopIdReducer from "./store/reducers/ShopIdReducer";
import ShopStoreReducer from "./store/reducers/ShopStoreReducer";
import AuthReducer from "./store/reducers/AuthReducer";
import NavigationContainer from "./navigation/NavigationContainer";
import OrderReducer from "./store/reducers/OrderReducer";
import * as Notifications from "expo-notifications";
import OrderStatusReducer from "./store/reducers/OrderStatusReducer";
import ProfileReducer from "./store/reducers/ProfileReducer";
import DukaanDarIdReducer from "./store/reducers/DukaanDarIdReducer";

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const rootReducer = combineReducers({
  shops: ShopReducer,
  shopId: ShopIdReducer,
  store: ShopStoreReducer,
  auth: AuthReducer,
  orders: OrderReducer,
  status: OrderStatusReducer,
  profile: ProfileReducer,
  dukanId: DukaanDarIdReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [FontLoaded, setFontLoaded] = useState(false);

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  if (!FontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
