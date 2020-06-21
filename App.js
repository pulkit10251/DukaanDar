import React, { useState } from "react";
import ShopNavigator from "./navigation/ShopNavigator";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import ShopReducer from "./store/reducers/ShopReducer";
import CartReducer from "./store/reducers/CartReducer";
import ShopIdReducer from "./store/reducers/ShopIdReducer";

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const rootReducer = combineReducers({
  shops: ShopReducer,
  cart: CartReducer,
  shopId: ShopIdReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [FontLoaded, setFontLoaded] = useState(false);
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
      <ShopNavigator />
    </Provider>
  );
}
