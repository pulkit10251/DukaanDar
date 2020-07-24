import React, { useState, useEffect, useRef } from "react";
import ShopNavigator from "./navigation/ShopNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import ReduxThunk from "redux-thunk";
import ShopReducer from "./store/reducers/ShopReducer";
import ShopIdReducer from "./store/reducers/ShopIdReducer";
import ShopStoreReducer from "./store/reducers/ShopStoreReducer";
import AuthReducer from "./store/reducers/AuthReducer";
import NavigationContainer from "./navigation/NavigationContainer";
import * as firebase from "firebase";
import OrderReducer from "./store/reducers/OrderReducer";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

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
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [FontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const func = async () => {
      
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    };
    func();
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
